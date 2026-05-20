export type GamePhase = 'home' | 'setup' | 'playing' | 'victory';
export type RoundKind = 'classic' | 'context';
export type RoundFlowPhase = 'ready' | 'extracted' | 'performance' | 'opponentIntervention' | 'defense' | 'judging' | 'roundSummary';

export interface Level { id: string; name: string; description: string; }
export interface Category { id: string; label: string; pack: string; }
export type CategorySensitivity = 'low' | 'medium' | 'high';
export interface CategoryItem { id: string; label: string; packId: string; tags?: string[]; sensitivity?: CategorySensitivity; notes?: string; }
export interface CategoryPack { id: string; name: string; description: string; tone: 'light' | 'medium' | 'hot'; enabledByDefault: boolean; warning?: string; categories: CategoryItem[]; }

export interface RoundType {
  id: string; name: string; kind: RoundKind; description: string; setupText: string;
  activePlayerInstruction: string; opponentInstruction: string; successCondition: string; failureCondition: string;
  suggestedTimerSeconds: number; allowsInterruption: boolean; allowsDefense: boolean; allowsSteal: boolean; weight: number;
}

export interface SpecialCard {
  id: string; name: string; description: string; effectText: string; timing: 'beforeRound' | 'duringRound' | 'afterRound' | 'judging';
  pack: string; cardType: 'jolly' | 'aggravante'; maxUsesPerRound?: 1; bonusAvailable?: boolean; weight?: number;
}
export type TeamId = 'A' | 'B';

export interface RoundLog {
  roundNumber: number; activeTeam: TeamId; activePlayer: string; opponentPlayer: string;
  level: string; category: string; categoryPack: string; roundType: string; kind: RoundKind;
  winner: TeamId | null; points: { A: number; B: number }; bonus: { A: number; B: number };
  usedCardsA: string[]; usedCardsB: string[]; finalPhase: RoundFlowPhase;
}

export interface GameState {
  teamAName: string; teamBName: string; teamAScore: number; teamBScore: number; targetScore: number;
  teamAPlayers: string[]; teamBPlayers: string[]; playerIndexA: number; playerIndexB: number;
  currentRoundNumber: number; currentLevel: Level | null; currentCategory: Category | null; currentRoundType: RoundType | null;
  teamASpecialCards: SpecialCard[]; teamBSpecialCards: SpecialCard[];
  usedCardThisRoundA: string[]; usedCardThisRoundB: string[]; usedCardTypeA: boolean; usedCardTypeB: boolean;
  lastRoundWinner: TeamId | null; startingTeam: TeamId; gamePhase: GamePhase; roundPhase: RoundFlowPhase; roundHistory: RoundLog[];
  lastCategoryId?: string; lastRoundTypeId?: string;
}
