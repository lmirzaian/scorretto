export type GamePhase = 'home' | 'setup' | 'playing' | 'victory';

export interface Level {
  id: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  label: string;
  pack: string;
}

export type CategorySensitivity = 'low' | 'medium' | 'high';

export interface CategoryItem {
  id: string;
  label: string;
  packId: string;
  tags?: string[];
  sensitivity?: CategorySensitivity;
  notes?: string;
}

export interface CategoryPack {
  id: string;
  name: string;
  description: string;
  tone: 'light' | 'medium' | 'hot';
  enabledByDefault: boolean;
  warning?: string;
  categories: CategoryItem[];
}

export interface RoundType {
  id: string;
  name: string;
  prompt: string;
  instruction: string;
  isClassic: boolean;
}

export interface SpecialCard {
  id: string;
  name: string;
  description: string;
  pack: string;
}

export type TeamId = 'A' | 'B';

export interface GameState {
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  targetScore: number;
  currentRoundNumber: number;
  currentLevel: Level | null;
  currentCategory: Category | null;
  currentRoundType: RoundType | null;
  teamASpecialCards: SpecialCard[];
  teamBSpecialCards: SpecialCard[];
  lastRoundWinner: TeamId | null;
  startingTeam: TeamId;
  gamePhase: GamePhase;
}
