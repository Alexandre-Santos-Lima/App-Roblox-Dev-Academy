
import React, { useState, useEffect } from 'react';
import { Lesson, BloxCharacter } from '../types';
import { geminiService } from '../services/geminiService';

interface LessonViewProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: (points: number) => void;
}

const CHARACTER_CONFIG: Record<BloxCharacter, { color: string, icon: string, name: string }> = {
  bit: { color: '#00A2FF', icon: 'fa-robot', name: 'Bit' },
  bella: { color: '#FFB300', icon: 'fa-hammer', name: 'Bella' },
  captain: { color: '#FF5252', icon: 'fa-skull-crossbones', name: 'Capitão' },
  spark: { color: '#9C27B0', icon: 'fa-magic', name: 'Spark' }
};

const LessonView: React.FC<LessonViewProps> = ({ lesson, onClose, onComplete }) => {
  const [step, setStep] = useState<'content' | 'task' | 'success'>('content');
  const [userCode, setUserCode] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showConceptReminder, setShowConceptReminder] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  const charConfig = CHARACTER_CONFIG[lesson.character || 'bit'];

  useEffect(() => {
    setStep('content');
    setUserCode('');
    setSelectedOption(null);
    setAiFeedback(null);
    setHintsUsed(0);
    setAiExplanation(null);
  }, [lesson.id]);

  const handleNext = () => {
    if (step === 'content' && (lesson.type === 'code' || lesson.type === 'quiz')) {
      setStep('task');
    } else if (step === 'success') {
      onComplete(lesson.points);
    } else {
      checkResult();
    }
  };

  const checkResult = async () => {
    setAiFeedback(null);
    if (lesson.type === 'quiz') {
      if (selectedOption === lesson.correctOption) {
        triggerConfetti();
        setStep('success');
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 800);
      }
      return;
    }

    if (lesson.type === 'code') {
      setIsLoading(true);
      const result = await geminiService.checkCode(userCode, lesson.task || "");
      setIsLoading(false);
      
      if (result.isCorrect) {
        triggerConfetti();
        setStep('success');
      } else {
        setAiFeedback(result.feedback);
        setShowError(true);
        setTimeout(() => setShowError(false), 500);
      }
      return;
    }
    setStep('success');
  };

  const triggerConfetti = () => {
    // @ts-ignore
    window.confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: [charConfig.color, '#FFFFFF', '#00E676']
    });
  };

  const askBit = async () => {
    setIsLoading(true);
    const explanation = await geminiService.getExplanation(lesson.title);
    setAiExplanation(explanation);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-[#1B1D1E] z-50 flex flex-col animate-in slide-in-from-bottom duration-300">
      {/* Top Bar */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-[#3F4142] bg-[#2D2F30]/50">
        <button onClick={onClose} className="text-[#ABB2BF] hover:text-white transition-colors p-2">
          <i className="fas fa-times text-xl"></i>
        </button>
        <div className="flex-1 mx-4 h-2 bg-[#1B1D1E] rounded-full overflow-hidden border border-[#3F4142]">
          <div 
            className="h-full transition-all duration-700 shadow-[0_0_10px_currentColor]" 
            style={{ 
              width: step === 'content' ? '33%' : (step === 'task' ? '66%' : '100%'),
              backgroundColor: charConfig.color,
              color: charConfig.color
            }}
          />
        </div>
        <div className="flex items-center gap-2 bg-[#1B1D1E] px-3 py-1 rounded-lg border border-[#3F4142]">
           <i className={`fas ${charConfig.icon} text-[10px]`} style={{ color: charConfig.color }}></i>
           <span className="text-[10px] font-black text-[#ABB2BF] uppercase tracking-tighter">{lesson.points} XP</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {step !== 'success' && (
          <>
            {/* Character Bubble */}
            <div className="flex items-start gap-4 animate-in slide-in-from-left duration-500">
               <div className="relative">
                  <div className="w-14 h-14 bg-[#2D2F30] border-2 rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ borderColor: charConfig.color }}>
                      <i className={`fas ${charConfig.icon} text-2xl`} style={{ color: charConfig.color }}></i>
                  </div>
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md text-[8px] font-black uppercase text-white shadow-sm" style={{ backgroundColor: charConfig.color }}>
                    {charConfig.name}
                  </div>
               </div>
               <div className="bg-[#2D2F30] px-5 py-4 rounded-2xl rounded-tl-none border border-[#3F4142] relative flex-1 shadow-md">
                  <p className="text-[#ABB2BF] text-sm font-bold leading-relaxed">
                    {step === 'content' ? lesson.content : "Agora é sua vez! Mostre o que aprendeu."}
                  </p>
                  <div className="absolute top-4 -left-2 w-4 h-4 bg-[#2D2F30] rotate-45 border-l border-t border-[#3F4142]"></div>
               </div>
            </div>

            {step === 'content' && (
              <div className="bg-[#1B1D1E] border border-[#3F4142] rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: charConfig.color }}>Conceito</h3>
                  <i className="fas fa-book-open opacity-20 text-white"></i>
                </div>
                <h2 className="text-2xl font-black text-white mb-6 tracking-tight">{lesson.title}</h2>
                
                <div className="bg-[#2D2F30] p-5 rounded-2xl border border-[#3F4142] font-mono text-sm relative group overflow-hidden shadow-inner">
                   <div className="text-[#5C6370] mb-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                     <i className="fas fa-terminal"></i> Luau Script
                   </div>
                   <code className="text-[#98C379] block break-words leading-relaxed">
                     {lesson.exampleCode || '-- Sem exemplo'}
                   </code>
                </div>
              </div>
            )}

            {step === 'task' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-[#2D2F30] border-l-4 p-5 rounded-r-2xl relative overflow-hidden shadow-xl" style={{ borderColor: charConfig.color }}>
                   <div className="absolute top-2 right-2 opacity-50">
                      <i className={`fas ${lesson.type === 'code' ? 'fa-code' : 'fa-question'} text-4xl`} style={{ color: charConfig.color }}></i>
                   </div>
                   <h4 className="text-[9px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: charConfig.color }}>Missão</h4>
                   <p className="text-white font-bold text-lg leading-snug pr-12">{lesson.description}</p>
                   {lesson.type === 'code' && <p className="text-sm text-[#ABB2BF] mt-2">{lesson.content}</p>}
                </div>

                {lesson.type === 'code' && (
                  <div className="space-y-4">
                    <div className="bg-[#1B1D1E] rounded-3xl p-6 code-font text-lg relative border-2 border-[#3F4142] shadow-inner focus-within:border-opacity-100 transition-all" style={{ borderColor: showError ? '#FF5252' : '#3F4142' }}>
                       <textarea
                        value={userCode}
                        autoFocus
                        onChange={(e) => setUserCode(e.target.value)}
                        placeholder="-- Escreva aqui..."
                        className={`w-full bg-transparent border-none focus:ring-0 resize-none h-48 outline-none text-[#98C379] placeholder-[#3F4142] leading-relaxed ${showError ? 'animate-shake' : ''}`}
                        spellCheck={false}
                       />
                    </div>
                  </div>
                )}

                {lesson.type === 'quiz' && (
                  <div className="grid grid-cols-1 gap-3">
                    {lesson.options?.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full p-4 text-left rounded-2xl border-2 transition-all flex items-center justify-between group ${
                          selectedOption === idx 
                            ? 'bg-opacity-10 text-white shadow-lg' 
                            : 'border-[#3F4142] bg-[#2D2F30] text-[#ABB2BF] hover:border-white/20'
                        }`}
                        style={{ 
                          borderColor: selectedOption === idx ? charConfig.color : undefined,
                          backgroundColor: selectedOption === idx ? charConfig.color + '1A' : undefined 
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs transition-all ${
                            selectedOption === idx ? 'text-white' : 'bg-[#1B1D1E] text-[#3F4142]'
                          }`} style={{ backgroundColor: selectedOption === idx ? charConfig.color : undefined }}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-sm font-bold tracking-tight">{opt}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {step === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95 duration-500 py-6">
             <div className="relative">
                <div className="w-40 h-40 rounded-full flex items-center justify-center border-4 shadow-2xl bg-opacity-10" style={{ borderColor: charConfig.color, backgroundColor: charConfig.color + '22' }}>
                   <i className={`fas ${charConfig.icon} text-7xl drop-shadow-lg`} style={{ color: charConfig.color }}></i>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#00E676] text-[#1B1D1E] w-12 h-12 rounded-xl flex items-center justify-center border-4 border-[#1B1D1E] shadow-xl rotate-6">
                   <i className="fas fa-check text-xl"></i>
                </div>
             </div>
             <div>
                <h2 className="text-4xl font-black mb-2 text-white tracking-tighter uppercase">Incrível!</h2>
                <p className="text-[#ABB2BF] font-bold text-sm max-w-[200px] mx-auto leading-relaxed">
                   {charConfig.name} está orgulhoso(a) do seu progresso.
                </p>
             </div>
             <div className="flex gap-4">
                <div className="bg-[#2D2F30] border-2 border-[#3F4142] px-5 py-4 rounded-2xl min-w-[110px] shadow-lg">
                   <div className="text-[9px] font-black text-[#ABB2BF] uppercase tracking-widest mb-1">XP Total</div>
                   <div className="text-2xl font-black" style={{ color: charConfig.color }}>+{lesson.points}</div>
                </div>
             </div>
          </div>
        )}

        {aiFeedback && step !== 'success' && (
          <div className="bg-[#FF5252]/10 border-l-4 border-[#FF5252] p-4 rounded-r-xl text-[#FF5252] animate-in slide-in-from-right shadow-lg">
            <h4 className="font-black flex items-center gap-2 mb-1 text-xs uppercase tracking-widest">
              <i className="fas fa-bug"></i> Ops!
            </h4>
            <p className="text-xs font-bold leading-relaxed">{aiFeedback}</p>
          </div>
        )}
      </div>

      <div className="p-6 bg-[#2D2F30] border-t border-[#3F4142] shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        <button
          onClick={handleNext}
          disabled={isLoading || (step === 'task' && lesson.type === 'quiz' && selectedOption === null)}
          className="w-full py-5 rounded-[1.5rem] text-lg font-black uppercase tracking-[0.2em] transition-all shadow-lg active:translate-y-1 active:shadow-none text-white disabled:opacity-30 disabled:grayscale disabled:shadow-none"
          style={{ 
            backgroundColor: step === 'success' ? '#00E676' : charConfig.color,
            boxShadow: `0 6px 0 0 ${step === 'success' ? '#00A354' : charConfig.color}99`
          }}
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : step === 'success' ? 'Continuar' : 'Verificar'}
        </button>
      </div>
    </div>
  );
};

export default LessonView;
