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
