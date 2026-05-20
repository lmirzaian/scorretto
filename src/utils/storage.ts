import type { GameState } from '../types/game';

export const STORAGE_KEY = 'nspdn-offline-room-v1';

export const loadSavedRoom = (): GameState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GameState) : null;
  } catch {
    return null;
  }
};

export const saveRoom = (state: GameState): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const clearSavedRoom = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
