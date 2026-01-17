
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile, Lesson } from './types';
import { INITIAL_USER, ALL_LEVELS } from './constants';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import LessonView from './components/LessonView';
import ProfilePage from './components/ProfilePage';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('blox_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    localStorage.setItem('blox_user', JSON.stringify(user));
  }, [user]);

  const handleLogin = (name: string, email: string) => {
    setUser(prev => ({ ...prev, name, email }));
    setCurrentView(AppView.HOME);
  };

  const startLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentView(AppView.LESSON);
  };

  const completeLesson = (points: number) => {
    setUser(prev => {
      const nextLevelXp = prev.level * 100;
      let newXp = prev.xp + points;
      let newLevel = prev.level;
      if (newXp >= nextLevelXp) {
        newLevel++;
        newXp -= nextLevelXp;
      }
      
      // Flatten all lessons from all levels to find the next one
      const allLessons = [
        ...ALL_LEVELS.beginner.flatMap(m => m.lessons),
        ...ALL_LEVELS.intermediate.flatMap(m => m.lessons),
        ...ALL_LEVELS.advanced.flatMap(m => m.lessons)
      ];
      
      const currentIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
      const nextLessonId = allLessons[currentIndex + 1]?.id;
      const newUnlocked = [...prev.unlockedLessons];
      
      if (nextLessonId && !newUnlocked.includes(nextLessonId)) {
        newUnlocked.push(nextLessonId);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        gems: prev.gems + 10,
        unlockedLessons: newUnlocked
      };
    });
    setCurrentView(AppView.HOME);
    setActiveLesson(null);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#1B1D1E] relative overflow-hidden text-white border-x border-[#3F4142]">
      {currentView === AppView.LANDING && <LandingPage onStart={() => setCurrentView(AppView.LOGIN)} />}
      
      {currentView === AppView.LOGIN && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#1B1D1E]">
          <div className="w-24 h-24 bg-[#00A2FF] rounded-3xl mb-8 flex items-center justify-center shadow-[0_0_30px_rgba(0,162,255,0.4)]">
             <i className="fas fa-cube text-5xl text-white"></i>
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">BloxCode Academy</h1>
          <p className="text-[#ABB2BF] mb-12">O futuro desenvolvedor Roblox começa aqui.</p>
          <button 
            onClick={() => handleLogin("Pro Dev", "dev@roblox.com")}
            className="w-full bg-[#2D2F30] border border-[#3F4142] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#3F4142] transition-all"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="G" />
            Entrar com Google
          </button>
        </div>
      )}

      {(currentView === AppView.HOME || currentView === AppView.PROFILE || currentView === AppView.SHOP || currentView === AppView.LEADERBOARD) && (
        <>
          <Header user={user} />
          <main className="flex-1 overflow-y-auto pb-24">
            {currentView === AppView.HOME && <HomePage user={user} onStartLesson={startLesson} />}
            {currentView === AppView.PROFILE && <ProfilePage user={user} />}
            {currentView === AppView.SHOP && (
              <div className="p-12 text-center space-y-4">
                <i className="fas fa-shopping-bag text-6xl text-[#00A2FF] opacity-50"></i>
                <h2 className="text-2xl font-black">Marketplace</h2>
                <p className="text-[#ABB2BF]">Novas skins e assets em breve.</p>
              </div>
            )}
            {currentView === AppView.LEADERBOARD && (
              <div className="p-12 text-center space-y-4">
                <i className="fas fa-trophy text-6xl text-yellow-500 opacity-50"></i>
                <h2 className="text-2xl font-black">Top Scripts</h2>
                <p className="text-[#ABB2BF]">Os melhores do servidor.</p>
              </div>
            )}
          </main>
          <BottomNav currentView={currentView} setView={setCurrentView} />
        </>
      )}

      {currentView === AppView.LESSON && activeLesson && (
        <LessonView 
          lesson={activeLesson} 
          onClose={() => setCurrentView(AppView.HOME)} 
          onComplete={completeLesson}
        />
      )}
    </div>
  );
};

export default App;
