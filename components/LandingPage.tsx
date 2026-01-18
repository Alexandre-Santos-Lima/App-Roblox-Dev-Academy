
import React, { useRef } from 'react';
import { AUDIO_URLS } from '../constants';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const startAudio = useRef(new Audio(AUDIO_URLS.lesson_start));

  const handleStart = () => {
    startAudio.current.currentTime = 0;
    startAudio.current.play().catch(() => {});
    onStart();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#1B1D1E] p-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mb-12">
          {/* Círculo Principal: Cinza Claro com ícone Preto */}
          <div className="w-48 h-48 bg-[#F3F4F6] rounded-[2.5rem] flex items-center justify-center rotate-6 shadow-[0_0_50px_rgba(255,255,255,0.1)] animate-pulse">
             <i className="fas fa-cube text-8xl text-black -rotate-6"></i>
          </div>
          {/* Badge Menor: Preto com ícone Branco para contraste */}
          <div className="absolute -bottom-4 -right-4 bg-black w-16 h-16 rounded-2xl flex items-center justify-center border-4 border-[#1B1D1E] shadow-xl">
             <i className="fas fa-code text-2xl text-white"></i>
          </div>
        </div>
        
        <h1 className="text-4xl font-black text-center mb-4 tracking-tight">
          Crie seu mundo <span className="text-[#F3F4F6]">Luau</span>
        </h1>
        <p className="text-[#ABB2BF] text-center text-lg max-w-[280px] leading-relaxed">
          Aprenda a programar o próximo hit do Roblox de forma divertida e rápida!
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Botão Principal: Cinza Claro com texto Preto */}
        <button 
          onClick={handleStart}
          className="w-full bg-[#F3F4F6] text-black text-xl font-black py-5 rounded-3xl shadow-[0_6px_0_0_#D1D5DB] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest hover:bg-white"
        >
          Iniciar Jornada
        </button>
        <button className="w-full bg-transparent border border-[#3F4142] text-[#ABB2BF] text-sm font-black py-4 rounded-3xl uppercase tracking-widest hover:bg-[#2D2F30] transition-colors">
          Eu já tenho experiência
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
