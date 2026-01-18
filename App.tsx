
import React, { useState, useEffect, useRef } from 'react';
import { AppView, UserProfile, Lesson } from './types';
import { INITIAL_USER, ALL_LEVELS, MAX_LIVES, HEART_REGEN_MS, AUDIO_URLS } from './constants';
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
    return saved ? { ...INITIAL_USER, ...JSON.parse(saved) } : INITIAL_USER;
  });
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showNoLivesModal, setShowNoLivesModal] = useState(false);
  
  // Audio State
  const [isBgmMuted, setIsBgmMuted] = useState(false);
  const bgmRef = useRef<HTMLAudioElement>(new Audio(AUDIO_URLS.bgm));

  // Scroll Preservation Logic
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  // BGM Setup
  useEffect(() => {
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.2; // Volume baixo
    return () => {
      bgmRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (isBgmMuted) {
      bgmRef.current.pause();
    } else if (currentView !== AppView.LANDING) {
      // Tentar tocar apenas se não estiver na landing (começa após login)
      // e se não estiver mutado.
      bgmRef.current.play().catch(e => console.log("Audio play failed (waiting for interaction):", e));
    }
  }, [isBgmMuted, currentView]);

  // Restore scroll when returning to HOME
  useEffect(() => {
    if (currentView === AppView.HOME && mainScrollRef.current) {
      mainScrollRef.current.scrollTop = savedScrollPosition;
    }
  }, [currentView]);

  // Calcula regeneração de vidas offline
  useEffect(() => {
    if (user.lives < MAX_LIVES) {
      const now = Date.now();
      const timePassed = now - user.lastHeartRegen;
      if (timePassed >= HEART_REGEN_MS) {
        const livesToRecover = Math.floor(timePassed / HEART_REGEN_MS);
        const newLives = Math.min(MAX_LIVES, user.lives + livesToRecover);
        const remainderTime = timePassed % HEART_REGEN_MS;
        const newLastRegen = now - remainderTime;

        if (livesToRecover > 0) {
          setUser(prev => ({
            ...prev,
            lives: newLives,
            lastHeartRegen: newLastRegen
          }));
        }
      }
    }
  }, []);

  // Timer vidas online
  useEffect(() => {
    const interval = setInterval(() => {
      setUser(prev => {
        if (prev.lives >= MAX_LIVES) return prev;
        const now = Date.now();
        if (now - prev.lastHeartRegen >= HEART_REGEN_MS) {
          return {
            ...prev,
            lives: prev.lives + 1,
            lastHeartRegen: now
          };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('blox_user', JSON.stringify(user));
  }, [user]);

  const handleLogin = (name: string, email: string) => {
    setUser(prev => ({ ...prev, name, email }));
    setCurrentView(AppView.HOME);
    // Tenta iniciar BGM na primeira interação real
    bgmRef.current.play().catch(() => {});
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const startLesson = (lesson: Lesson) => {
    if (user.lives <= 0) {
      setShowNoLivesModal(true);
      return;
    }
    // Salva posição do scroll antes de sair
    if (mainScrollRef.current) {
      setSavedScrollPosition(mainScrollRef.current.scrollTop);
    }
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
          <div className="w-24 h-24 bg-[#F3F4F6] rounded-3xl mb-8 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
             <i className="fas fa-cube text-5xl text-black"></i>
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">Roblox Dev Academy</h1>
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
          <Header 
            user={user} 
            isBgmMuted={isBgmMuted}
            toggleBgm={() => setIsBgmMuted(!isBgmMuted)}
          />
          <main 
            ref={mainScrollRef}
            className="flex-1 overflow-y-auto pb-24"
          >
            {currentView === AppView.HOME && <HomePage user={user} onStartLesson={startLesson} />}
            {currentView === AppView.PROFILE && <ProfilePage user={user} onUpdate={updateUser} />}
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
          userLives={user.lives}
          onUpdateUser={updateUser}
          onClose={() => setCurrentView(AppView.HOME)} 
          onComplete={completeLesson}
        />
      )}

      {showNoLivesModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
           <div className="bg-[#2D2F30] border border-[#3F4142] rounded-3xl w-full max-w-sm p-6 text-center space-y-4 shadow-2xl">
              <i className="fas fa-heart-crack text-6xl text-[#FF5252] animate-pulse"></i>
              <h2 className="text-2xl font-black text-white">Sem Vidas!</h2>
              <p className="text-[#ABB2BF]">Você precisa descansar ou recarregar para continuar aprendendo.</p>
              <button 
                onClick={() => setShowNoLivesModal(false)}
                className="w-full bg-[#3F4142] text-white font-bold py-3 rounded-xl hover:bg-[#4F5152]"
              >
                Entendido
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
