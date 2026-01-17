
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col bg-[#1B1D1E] p-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mb-12">
          <div className="w-48 h-48 bg-[#00A2FF] rounded-[2.5rem] flex items-center justify-center rotate-6 shadow-[0_0_50px_rgba(0,162,255,0.3)] animate-pulse">
             <i className="fas fa-cube text-8xl text-white -rotate-6"></i>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-[#00E676] w-16 h-16 rounded-2xl flex items-center justify-center border-4 border-[#1B1D1E] shadow-xl">
             <i className="fas fa-code text-2xl text-white"></i>
          </div>
        </div>
        
        <h1 className="text-4xl font-black text-center mb-4 tracking-tight">
          Crie seu mundo <span className="text-[#00A2FF]">Luau</span>
        </h1>
        <p className="text-[#ABB2BF] text-center text-lg max-w-[280px] leading-relaxed">
          Aprenda a programar o próximo hit do Roblox de forma divertida e rápida!
        </p>
      </div>
      
      <div className="space-y-4">
        <button 
          onClick={onStart}
          className="w-full bg-[#00A2FF] text-white text-xl font-black py-5 rounded-3xl shadow-[0_6px_0_0_#0084CC] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest"
        >
          Iniciar Carreira
        </button>
        <button className="w-full bg-transparent border border-[#3F4142] text-[#ABB2BF] text-sm font-black py-4 rounded-3xl uppercase tracking-widest">
          Eu já tenho experiência
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
