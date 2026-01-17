
import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="glass-header px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
           <span className="text-[10px] font-black text-[#00A2FF] uppercase tracking-widest leading-none">Level</span>
           <span className="text-xl font-black">{user.level}</span>
        </div>
        <div className="w-24 h-2 bg-[#1B1D1E] rounded-full overflow-hidden border border-[#3F4142]">
          <div 
            className="h-full bg-[#00A2FF] transition-all duration-500 shadow-[0_0_10px_rgba(0,162,255,0.6)]" 
            style={{ width: `${(user.xp / (user.level * 100)) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <i className="fas fa-fire text-orange-500 text-sm"></i>
          <span className="font-black text-sm">{user.streak}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <i className="fas fa-gem text-[#00A2FF] text-sm"></i>
          <span className="font-black text-sm">{user.gems}</span>
        </div>
        <div className="w-9 h-9 rounded-xl bg-[#2D2F30] border border-[#3F4142] overflow-hidden flex items-center justify-center">
           <img src={user.avatarUrl} className="w-7 h-7" alt="Avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
