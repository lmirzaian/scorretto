import type { Category, CategoryItem, CategoryPack } from '../types/game';

const slug = (v: string) => v.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const make = (packId: string, label: string, sensitivity: CategoryItem['sensitivity']='low'): CategoryItem => ({ id: `${packId}-${slug(label)}`, label, packId, sensitivity });
const pack = (id: string, name: string, description: string, labels: string[], enabledByDefault = true, warning?: string): CategoryPack => ({ id, name, description, tone: 'medium', enabledByDefault, warning, categories: labels.map((l) => make(id, l, warning ? 'high' : 'low')) });

export const categoryPacks: CategoryPack[] = [
  pack('province-italiane', 'Province italiane', 'Province e città metropolitane italiane.', ['Milano','Roma','Napoli','Torino','Bari','Cagliari','Palermo','Firenze']),
  pack('religioni', 'Religioni', 'Contesto delicato: usare con consenso del tavolo.', ['Cattolici','Musulmani','Ebrei','Buddisti','Ateismo'], false, 'Pacchetto delicato: attivalo solo se tutti sono d’accordo.'),
  pack('famiglia', 'Famiglia', 'Ruoli e dinamiche familiari.', ['La mamma','Il papà','La zia','I cugini','Il pranzo di Natale']),
  pack('italia', 'Italia', 'Vizi e virtù quotidiane italiane.', ['La burocrazia','Il bar sotto casa','La fila allo sportello','Il condominio','Il traffico']),
  pack('professioni', 'Professioni', 'Archetipi del lavoro.', ['Medici','Avvocati','Ingegneri','Project manager','Influencer']),
  pack('vita-sociale', 'Vita sociale', 'Serate, gruppi e amicizie.', ['L aperitivo','La chat di gruppo','Il conto diviso','La vacanza tra amici','Il karaoke']),
  pack('ufficio', 'Ufficio', 'Riti aziendali e vita corporate.', ['La call inutile','Il reply all','Il capo motivazionale','Il ticket urgente','L open space']),
  pack('sport', 'Sport', 'Lessico sportivo e tifoseria.', ['Il calcetto','Il VAR','Il telecronista','La squadra del cuore','La conferenza post partita']),
  pack('social-network', 'Social network', 'Algoritmi e dinamiche digitali.', ['Instagram','TikTok','LinkedIn','X/Twitter','Facebook']),
];

export const categories: Category[] = categoryPacks.flatMap((p) => p.categories.map((c) => ({ id: c.id, label: c.label, pack: p.name })));
export const defaultEnabledPackIds = categoryPacks.filter((p) => p.enabledByDefault).map((p) => p.id);
export const getActiveCategories = (activePackIds: string[]): Category[] => {
  const active = new Set(activePackIds);
  return categoryPacks.filter((p) => active.has(p.id)).flatMap((p) => p.categories.map((c) => ({ id: c.id, label: c.label, pack: p.name })));
};
