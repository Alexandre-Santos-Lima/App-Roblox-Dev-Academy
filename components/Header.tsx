
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { MAX_LIVES, HEART_REGEN_MS } from '../constants';

interface HeaderProps {
  user: UserProfile;
  isBgmMuted?: boolean;
  toggleBgm?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, isBgmMuted = false, toggleBgm }) => {
  const [timeToNextHeart, setTimeToNextHeart] = useState<string>('');

  useEffect(() => {
    if (user.lives >= MAX_LIVES) {
      setTimeToNextHeart('');
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const timePassed = now - user.lastHeartRegen;
      const remaining = Math.max(0, HEART_REGEN_MS - timePassed);
      
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeToNextHeart(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [user.lives, user.lastHeartRegen]);

  return (
    <header className="glass-header px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
           <span className="text-[10px] font-black text-[#00A2FF] uppercase tracking-widest leading-none">Level</span>
           <span className="text-xl font-black">{user.level}</span>
        </div>
        <div className="w-16 h-2 bg-[#1B1D1E] rounded-full overflow-hidden border border-[#3F4142]">
          <div 
            className="h-full bg-[#00A2FF] transition-all duration-500 shadow-[0_0_10px_rgba(0,162,255,0.6)]" 
            style={{ width: `${(user.xp / (user.level * 100)) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {toggleBgm && (
          <button onClick={toggleBgm} className="text-[#ABB2BF] hover:text-white transition-colors">
            <i className={`fas ${isBgmMuted ? 'fa-volume-mute' : 'fa-music'} text-xs`}></i>
          </button>
        )}

        {/* Lives Display */}
        <div className="flex items-center gap-1.5 relative group cursor-help">
          <i className="fas fa-heart text-[#FF5252] text-sm animate-pulse-slow"></i>
          <span className="font-black text-sm">{user.lives}</span>
          {timeToNextHeart && (
             <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#ABB2BF] whitespace-nowrap bg-[#1B1D1E] px-1 rounded border border-[#3F4142]">
               {timeToNextHeart}
             </span>
          )}
        </div>

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
