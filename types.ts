
export enum AppView {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  LESSON = 'LESSON',
  PROFILE = 'PROFILE',
  SHOP = 'SHOP',
  LEADERBOARD = 'LEADERBOARD'
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tiers: number[]; // Ex: [1, 10, 50] para Bronze, Prata, Ouro
}

export interface UserProfile {
  name: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  gems: number;
  lives: number; // Novas Vidas
  lastHeartRegen: number; // Timestamp da última regeneração ou uso
  unlockedLessons: string[];
  avatarUrl: string;
  achievementsProgress: Record<string, number>; // id -> valor atual
}

export type BloxCharacter = 'bit' | 'bella' | 'captain' | 'spark';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'code' | 'quiz';
  content: string;
  character: BloxCharacter;
  task?: string;
  exampleCode?: string;
  expectedCode?: string;
  options?: string[];
  correctOption?: number;
  points: number;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  color: string;
  icon: string;
  difficulty: DifficultyLevel; // Novo campo
}
