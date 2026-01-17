
import React from 'react';
import { UserProfile } from '../types';

interface ProfilePageProps { user: UserProfile; }

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const achievements = [
    { title: "Script Iniciado", icon: "fa-code", color: "text-[#00A2FF]" },
    { title: "Streak Master", icon: "fa-fire", color: "text-orange-500" },
    { title: "Builder Pro", icon: "fa-cube", color: "text-[#00E676]" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12 bg-[#1B1D1E] min-h-full">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-3xl bg-[#2D2F30] border-4 border-[#3F4142] overflow-hidden shadow-2xl">
             <img src={user.avatarUrl} className="w-full h-full object-cover" alt="Profile" />
          </div>
          <button className="absolute -bottom-2 -right-2 bg-[#00A2FF] text-white w-10 h-10 rounded-xl border-4 border-[#1B1D1E] shadow-xl flex items-center justify-center">
            <i className="fas fa-pen text-xs"></i>
          </button>
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">{user.name}</h2>
          <p className="text-[#ABB2BF] font-bold text-sm uppercase tracking-widest opacity-50">Desenvolvedor Luau</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#2D2F30] border border-[#3F4142] p-5 rounded-2xl flex flex-col items-center gap-2 shadow-lg">
          <i className="fas fa-fire text-2xl text-orange-500"></i>
          <div className="text-center">
            <div className="font-black text-xl text-white">{user.streak}</div>
            <div className="text-[10px] font-black text-[#ABB2BF] uppercase tracking-tighter">Dias Ativo</div>
          </div>
        </div>
        <div className="bg-[#2D2F30] border border-[#3F4142] p-5 rounded-2xl flex flex-col items-center gap-2 shadow-lg">
          <i className="fas fa-bolt text-2xl text-yellow-500"></i>
          <div className="text-center">
            <div className="font-black text-xl text-white">{user.xp}</div>
            <div className="text-[10px] font-black text-[#ABB2BF] uppercase tracking-tighter">Total XP</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-xl font-black text-white">Insígnias</h3>
          <button className="text-[#00A2FF] font-black text-[10px] uppercase tracking-widest">Inventário</button>
        </div>
        <div className="bg-[#2D2F30] border border-[#3F4142] rounded-3xl p-6 flex justify-around shadow-xl">
          {achievements.map((ach, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-[#1B1D1E] rounded-2xl flex items-center justify-center border-2 border-[#3F4142] shadow-inner">
                <i className={`fas ${ach.icon} text-2xl ${ach.color} opacity-40`}></i>
              </div>
              <span className="text-[10px] font-black text-[#ABB2BF] text-center max-w-[60px] leading-tight uppercase tracking-tighter">{ach.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#00A2FF] to-[#0055FF] p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-xl font-black uppercase tracking-tighter">Assinatura Dev+</h4>
              <p className="text-xs font-bold opacity-80">Gemas em dobro e IA ilimitada!</p>
            </div>
            <i className="fas fa-crown text-3xl opacity-30 group-hover:rotate-12 transition-transform"></i>
          </div>
          <button className="w-full bg-white text-[#00A2FF] font-black py-4 rounded-2xl uppercase tracking-widest shadow-xl active:scale-95 transition-all text-sm">
            Upgrade Agora
          </button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-10 -mt-10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
