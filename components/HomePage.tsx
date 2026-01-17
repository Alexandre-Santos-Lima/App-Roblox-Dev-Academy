
import React, { useState } from 'react';
import { UserProfile, Lesson, DifficultyLevel } from '../types';
import { ALL_LEVELS } from '../constants';

interface HomePageProps {
  user: UserProfile;
  onStartLesson: (lesson: Lesson) => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onStartLesson }) => {
  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>('beginner');

  const modules = ALL_LEVELS[currentDifficulty];

  const tabs: { id: DifficultyLevel; label: string; icon: string; color: string }[] = [
    { id: 'beginner', label: 'Iniciante', icon: 'fa-seedling', color: '#00E676' },
    { id: 'intermediate', label: 'Intermediário', icon: 'fa-flask', color: '#00BCD4' },
    { id: 'advanced', label: 'Avançado', icon: 'fa-dragon', color: '#673AB7' }
  ];

  return (
    <div className="pb-32 bg-[#1B1D1E] min-h-screen">
      {/* Level Selector Tabs */}
      <div className="sticky top-0 z-30 bg-[#1B1D1E]/95 backdrop-blur-xl border-b border-[#3F4142] px-4 py-2 flex justify-between gap-2 shadow-lg">
        {tabs.map(tab => (
           <button
             key={tab.id}
             onClick={() => setCurrentDifficulty(tab.id)}
             className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all border-2 ${
               currentDifficulty === tab.id 
                 ? 'bg-[#2D2F30] border-opacity-100' 
                 : 'bg-transparent border-transparent opacity-50 hover:opacity-100 hover:bg-[#2D2F30]'
             }`}
             style={{ borderColor: currentDifficulty === tab.id ? tab.color : 'transparent' }}
           >
             <i className={`fas ${tab.icon} text-lg`} style={{ color: tab.color }}></i>
             <span className="text-[9px] font-black uppercase tracking-widest text-white">{tab.label}</span>
           </button>
        ))}
      </div>

      {modules.map((module, mIdx) => (
        <div key={module.id} className="relative mb-8 animate-in fade-in duration-700">
          {/* Biome Header */}
          <div 
            className="px-8 py-12 relative overflow-hidden flex flex-col justify-end border-b border-[#3F4142] min-h-[220px]"
            style={{ backgroundColor: '#1B1D1E' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1B1D1E]/95"></div>
            <div 
              className="absolute -top-20 -right-20 w-80 h-80 blur-[100px] opacity-20 rounded-full"
              style={{ backgroundColor: module.color }}
            ></div>
            
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10">
                    <i className={`fas ${module.icon} text-sm`} style={{ color: module.color }}></i>
                 </div>
                 <span 
                   className="text-[10px] font-black uppercase tracking-[0.3em]"
                   style={{ color: module.color }}
                 >
                   Zona {mIdx + 1}
                 </span>
               </div>
               <h2 className="text-3xl font-black tracking-tighter text-white mb-2 leading-none">{module.title}</h2>
               <p className="text-[#ABB2BF] text-xs font-medium mb-4 max-w-[200px] leading-relaxed">{module.description}</p>
               
               <div className="flex items-center gap-3">
                  <div className="h-2 w-full max-w-[200px] bg-[#2D2F30] rounded-full overflow-hidden border border-[#3F4142]">
                     <div 
                        className="h-full transition-all duration-1000 shadow-[0_0_10px_currentColor]" 
                        style={{ 
                          width: `${(module.lessons.filter(l => user.unlockedLessons.includes(l.id)).length / module.lessons.length) * 100}%`,
                          backgroundColor: module.color,
                          color: module.color
                        }}
                     />
                  </div>
                  <span className="text-[10px] font-bold text-white">
                    {Math.round((module.lessons.filter(l => user.unlockedLessons.includes(l.id)).length / module.lessons.length) * 100)}%
                  </span>
               </div>
            </div>
            <i 
              className={`fas ${module.icon} text-9xl opacity-5 absolute -right-8 -bottom-4 rotate-12`}
              style={{ color: module.color }}
            ></i>
          </div>

          {/* Lesson Path */}
          <div className="flex flex-col items-center py-16 gap-16 relative">
            <div 
              className="absolute top-0 bottom-0 w-3 left-1/2 -ml-[6px] opacity-10 rounded-full"
              style={{ background: `linear-gradient(to bottom, ${module.color}, transparent)` }}
            ></div>

            {module.lessons.map((lesson, lIdx) => {
              const isUnlocked = user.unlockedLessons.includes(lesson.id);
              const currentLessonIndex = user.unlockedLessons.indexOf(lesson.id);
              const isCompleted = currentLessonIndex !== -1 && currentLessonIndex < user.unlockedLessons.length - 1;
              const isActive = user.unlockedLessons[user.unlockedLessons.length - 1] === lesson.id;
              
              const xOffsets = [0, 50, 80, 50, 0, -50, -80, -50];
              const xOffsetValue = xOffsets[lIdx % xOffsets.length];

              return (
                <div 
                  key={lesson.id} 
                  className="relative group transition-transform duration-500 hover:scale-105 z-10"
                  style={{ transform: `translateX(${xOffsetValue}px)` }}
                >
                  <button
                    disabled={!isUnlocked}
                    onClick={() => onStartLesson(lesson)}
                    className={`w-[4.5rem] h-[4.5rem] rounded-[1.5rem] flex items-center justify-center relative transition-all border-[6px] shadow-xl ${
                      isCompleted 
                        ? 'bg-[#1B1D1E] border-[#00E676] opacity-100' 
                        : isUnlocked 
                          ? `bg-[#1B1D1E] ${isActive ? 'scale-110 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : ''}` 
                          : 'bg-[#2D2F30] border-[#3F4142] opacity-60'
                    }`}
                    style={{ 
                      borderColor: isCompleted ? '#00E676' : (isUnlocked ? module.color : '#3F4142'),
                    }}
                  >
                    {isCompleted ? (
                      <i className="fas fa-check text-2xl text-[#00E676]"></i>
                    ) : isUnlocked ? (
                      <div className="flex flex-col items-center">
                         <i className={`fas ${lesson.type === 'code' ? 'fa-code' : (lesson.type === 'quiz' ? 'fa-puzzle-piece' : 'fa-book-open')} text-xl mb-1`} style={{ color: module.color }}></i>
                      </div>
                    ) : (
                      <i className="fas fa-lock text-xl text-[#3F4142]"></i>
                    )}
                    
                    {isActive && (
                      <div 
                        className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-[9px] font-black text-white whitespace-nowrap animate-bounce shadow-lg"
                        style={{ backgroundColor: module.color }}
                      >
                        JOGAR
                      </div>
                    )}
                  </button>
                  
                  {isUnlocked && (
                    <div className={`absolute ${xOffsetValue >= 0 ? '-left-32 text-right' : 'left-24 text-left'} top-1/2 -translate-y-1/2 w-28 pointer-events-none`}>
                       <h4 className="text-[10px] font-black leading-tight text-white uppercase tracking-wide opacity-80 bg-[#1B1D1E]/80 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/5 inline-block">
                          {lesson.title}
                       </h4>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
