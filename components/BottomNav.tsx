
import React, { useRef } from 'react';
import { AppView } from '../types';
import { AUDIO_URLS } from '../constants';

interface BottomNavProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const popAudio = useRef(new Audio(AUDIO_URLS.pop));

  const navItems = [
    { view: AppView.HOME, icon: 'fa-cubes', label: 'Scripts' },
    { view: AppView.LEADERBOARD, icon: 'fa-bolt', label: 'Arena' },
    { view: AppView.SHOP, icon: 'fa-briefcase', label: 'Assets' },
    { view: AppView.PROFILE, icon: 'fa-user-gear', label: 'Perfil' },
  ];

  const handleNavClick = (view: AppView) => {
    popAudio.current.currentTime = 0;
    popAudio.current.play().catch(() => {});
    setView(view);
  };

  return (
    <nav className="bg-[#1B1D1E]/95 backdrop-blur-md border-t border-[#3F4142] flex justify-around items-center py-3 absolute bottom-0 w-full z-20">
      {navItems.map((item) => (
        <button
          key={item.view}
          onClick={() => handleNavClick(item.view)}
          className={`flex flex-col items-center gap-1.5 transition-all group ${
            currentView === item.view ? 'text-[#00A2FF]' : 'text-[#ABB2BF]'
          }`}
        >
          <div className={`p-2 rounded-xl transition-all ${
            currentView === item.view ? 'bg-[#00A2FF]/10 shadow-[inset_0_0_10px_rgba(0,162,255,0.1)]' : 'group-hover:bg-white/5'
          }`}>
            <i className={`fas ${item.icon} text-xl`}></i>
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.15em]">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
