export const pickRandom = <T,>(items: T[]): T => {
  if (items.length === 0) {
    throw new Error('Array vuoto: impossibile estrarre un elemento casuale.');
  }
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};
