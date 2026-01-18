
import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { DEFAULT_AVATARS, ACHIEVEMENTS, AUDIO_URLS } from '../constants';

interface ProfilePageProps { 
  user: UserProfile; 
  onUpdate: (updates: Partial<UserProfile>) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const popAudio = useRef(new Audio(AUDIO_URLS.pop));

  const playPop = () => {
    popAudio.current.currentTime = 0;
    popAudio.current.play().catch(() => {});
  };

  const handleImageClick = () => {
    playPop();
    setShowAvatarModal(true);
  };

  const handleFileUpload = () => {
    playPop();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdate({ avatarUrl: reader.result });
          setShowAvatarModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    playPop();
    if (editName.trim()) {
      onUpdate({ name: editName });
      setIsEditing(false);
    }
  };

  const getAchievementStatus = (id: string, tiers: number[]) => {
    const progress = user.achievementsProgress[id] || 0;
    let level = 0; // 0 = Locked, 1 = Bronze, 2 = Silver, 3 = Gold
    let nextGoal = tiers[0];
    
    if (progress >= tiers[2]) {
      level = 3;
      nextGoal = tiers[2];
    } else if (progress >= tiers[1]) {
      level = 2;
      nextGoal = tiers[2];
    } else if (progress >= tiers[0]) {
      level = 1;
      nextGoal = tiers[1];
    } else {
      level = 0;
      nextGoal = tiers[0];
    }

    return { level, progress, nextGoal };
  };

  return (
    <div className="p-6 space-y-8 pb-12 bg-[#1B1D1E] min-h-full">
      
      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
           <div className="bg-[#2D2F30] border border-[#3F4142] rounded-3xl w-full max-w-sm max-h-[80vh] flex flex-col shadow-2xl">
              <div className="p-6 border-b border-[#3F4142] flex justify-between items-center">
                 <h3 className="text-xl font-black text-white">Escolha seu Avatar</h3>
                 <button onClick={() => setShowAvatarModal(false)} className="text-[#ABB2BF] hover:text-white">
                   <i className="fas fa-times text-xl"></i>
                 </button>
              </div>
              <div className="p-6 overflow-y-auto grid grid-cols-3 gap-4">
                 {DEFAULT_AVATARS.map((url, idx) => (
                   <button 
                     key={idx}
                     onClick={() => { playPop(); onUpdate({ avatarUrl: url }); setShowAvatarModal(false); }}
                     className="aspect-square rounded-2xl bg-[#1B1D1E] border-2 border-[#3F4142] hover:border-[#00A2FF] overflow-hidden transition-all active:scale-95"
                   >
                     <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                   </button>
                 ))}
              </div>
              <div className="p-6 border-t border-[#3F4142]">
                 <button 
                   onClick={handleFileUpload}
                   className="w-full py-3 bg-[#3F4142] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#4F5152]"
                 >
                   <i className="fas fa-upload"></i> Carregar Foto
                 </button>
                 <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange}
                  />
              </div>
           </div>
        </div>
      )}

      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar Display */}
        <div className="relative group cursor-pointer" onClick={handleImageClick}>
          <div className="w-32 h-32 rounded-3xl bg-[#2D2F30] border-4 border-[#3F4142] overflow-hidden shadow-2xl transition-all group-hover:border-[#00A2FF]">
             <img src={user.avatarUrl} className="w-full h-full object-cover" alt="Profile" />
          </div>
          <button className="absolute -bottom-2 -right-2 bg-[#00A2FF] text-white w-10 h-10 rounded-xl border-4 border-[#1B1D1E] shadow-xl flex items-center justify-center transition-transform hover:scale-110">
            <i className="fas fa-camera text-xs"></i>
          </button>
        </div>

        {/* Name Editing */}
        <div className="w-full flex flex-col items-center">
          {isEditing ? (
            <div className="flex items-center gap-2 animate-in fade-in">
              <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="bg-[#2D2F30] border border-[#3F4142] text-white font-black text-xl rounded-xl px-4 py-2 text-center focus:border-[#00A2FF] outline-none w-48"
                autoFocus
              />
              <button onClick={saveProfile} className="bg-[#00E676] text-[#1B1D1E] w-10 h-10 rounded-xl flex items-center justify-center">
                <i className="fas fa-check"></i>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h2 className="text-3xl font-black text-white tracking-tight">{user.name}</h2>
              <button onClick={() => { playPop(); setIsEditing(true); }} className="text-[#3F4142] hover:text-[#00A2FF] transition-colors p-2">
                <i className="fas fa-pen text-sm"></i>
              </button>
            </div>
          )}
          <p className="text-[#ABB2BF] font-bold text-sm uppercase tracking-widest opacity-50 mt-1">Desenvolvedor Luau</p>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Achievements List */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-xl font-black text-white">Conquistas</h3>
          <span className="text-[#ABB2BF] text-xs font-bold">{Object.keys(user.achievementsProgress || {}).length} / {ACHIEVEMENTS.length}</span>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {ACHIEVEMENTS.map((ach) => {
            const { level, progress, nextGoal } = getAchievementStatus(ach.id, ach.tiers);
            
            // Cores baseadas no nível
            const tierColors = ['#3F4142', '#CD7F32', '#C0C0C0', '#FFD700']; // Locked, Bronze, Silver, Gold
            const tierNames = ['Bloqueado', 'Bronze', 'Prata', 'Ouro'];
            const currentColor = tierColors[level];
            const isUnlocked = level > 0;

            return (
              <div key={ach.id} className="bg-[#2D2F30] border border-[#3F4142] rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden group">
                {/* Visual indicator of level */}
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 shrink-0 relative ${level === 3 ? 'animate-pulse' : ''}`}
                  style={{ 
                    borderColor: currentColor, 
                    backgroundColor: isUnlocked ? currentColor + '1A' : '#1B1D1E',
                    opacity: isUnlocked ? 1 : 0.5
                  }}
                >
                  <i className={`fas ${ach.icon} text-xl`} style={{ color: isUnlocked ? currentColor : '#5C6370' }}></i>
                  {level > 0 && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#1B1D1E] border-2 flex items-center justify-center text-[10px] font-black" style={{ borderColor: currentColor, color: currentColor }}>
                      {level}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`font-bold truncate ${isUnlocked ? 'text-white' : 'text-[#5C6370]'}`}>{ach.title}</h4>
                    <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded" style={{ backgroundColor: currentColor + '33', color: currentColor }}>
                      {tierNames[level]}
                    </span>
                  </div>
                  <p className="text-[#ABB2BF] text-xs truncate mb-2">{ach.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-[#1B1D1E] rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000"
                      style={{ 
                        width: `${Math.min((progress / nextGoal) * 100, 100)}%`,
                        backgroundColor: isUnlocked ? currentColor : '#3F4142'
                      }}
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                     <span className="text-[9px] text-[#5C6370] font-mono">{progress} / {nextGoal}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upgrade Banner */}
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
