export const pickRandom = <T,>(items: T[]): T => {
  if (items.length === 0) {
    throw new Error('Array vuoto: impossibile estrarre un elemento casuale.');
  }
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};

export const pickRandomWeighted = <T,>(items: T[], getWeight: (item: T) => number): T => {
  if (items.length === 0) {
    throw new Error('Array vuoto: impossibile estrarre un elemento pesato.');
  }
  const totalWeight = items.reduce((sum, item) => sum + Math.max(0, getWeight(item)), 0);
  if (totalWeight <= 0) return pickRandom(items);
  let roll = Math.random() * totalWeight;
  for (const item of items) {
    roll -= Math.max(0, getWeight(item));
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
};

export const pickRandomNoImmediateRepeat = <T,>(items: T[], getId: (item: T) => string, lastId?: string): T => {
  if (items.length <= 1 || !lastId) return pickRandom(items);
  const filtered = items.filter((item) => getId(item) !== lastId);
  return filtered.length ? pickRandom(filtered) : pickRandom(items);
};
