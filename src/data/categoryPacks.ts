import type { Category, CategoryItem, CategoryPack } from '../types/game';

const makeCategory = (
  packId: string,
  label: string,
  sensitivity: CategoryItem['sensitivity'] = 'low',
  tags: string[] = [],
): CategoryItem => ({
  id: `${packId}-${label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
  label,
  packId,
  sensitivity,
  tags,
});

export const categoryPacks: CategoryPack[] = [
  {
    id: 'province-italiane',
    name: 'Province italiane',
    description: 'Città metropolitane e province per round a tema geografico italiano.',
    tone: 'medium',
    enabledByDefault: true,
    categories: [
      'Milano','Roma','Napoli','Torino','Palermo','Genova','Bologna','Firenze','Venezia','Bari','Catania','Verona','Brescia','Bergamo','Padova','Parma','Modena','Reggio Emilia','Monza e Brianza','Como','Varese','Lecco','Pavia','Cremona','Mantova','Sondrio','Lodi','Piacenza','Trento','Bolzano','Trieste','Udine','Cagliari','Sassari','Lecce','Salerno','Caserta','Pisa','Siena','Perugia','Ancona','Pescara','Reggio Calabria','Messina','Siracusa','Trapani','Agrigento',
    ].map((label) => makeCategory('province-italiane', label, 'low', ['provincia'])),
  },
  {
    id: 'religioni',
    name: 'Religioni',
    description: 'Contesti religiosi e sociali: da usare con responsabilità e consenso del tavolo.',
    tone: 'hot',
    enabledByDefault: false,
    warning: 'Pacchetto delicato: usatelo solo se il tavolo è d’accordo. La battuta resta responsabilità del tavolo.',
    categories: [
      'Cattolici','Protestanti','Ortodossi','Musulmani','Ebrei','Buddisti','Induisti','Sikh','Testimoni di Geova','Ateismo','Agnosticismo','La parrocchia','L’oratorio','Il catechismo','Il gruppo giovani','Il prete di paese','Il matrimonio religioso','La messa di Natale','La predica troppo lunga','Il pellegrinaggio','Il ritiro spirituale','La cena dopo la funzione','Il gruppo WhatsApp della parrocchia','La riunione interreligiosa','Il vicino che vuole convertirti','Quello che “io sono spirituale, non religioso”',
    ].map((label) => makeCategory('religioni', label, 'medium', ['contesto sociale'])),
  },
  {
    id: 'famiglia', name: 'Famiglia', description: 'Archetipi e situazioni tipiche della vita familiare.', tone: 'medium', enabledByDefault: true,
    categories: ['La mamma','Il papà','I nonni','La nonna','Il nonno','Gli zii','La zia che commenta tutto','Lo zio al pranzo di Natale','I cugini','Il cugino riuscito male','Il fratello maggiore','Il fratello minore','La sorella maggiore','La sorella minore','I suoceri','La suocera','Il genero','La nuora','Il pranzo di Natale','Il pranzo di Pasqua','La chat di famiglia','La vacanza in famiglia','Il matrimonio del parente','Il battesimo','La cresima','L’eredità','La casa al mare condivisa','Il parente che chiede quando ti sposi','Il parente che chiede quando fai figli','Il parente che dà consigli non richiesti'].map((label) => makeCategory('famiglia', label, 'low', ['famiglia'])),
  },
  {
    id: 'italia', name: 'Italia', description: 'Usi, abitudini e micro-drammi della quotidianità italiana.', tone: 'medium', enabledByDefault: true,
    categories: ['Gli italiani','Il Nord','Il Centro','Il Sud','Le isole','La provincia italiana','La burocrazia italiana','Le poste','Il condominio','Il bar sotto casa','Il caffè','La carbonara','La pizza','Il mare ad agosto','La settimana di Ferragosto','La domenica in famiglia','Il traffico','Il parcheggio','La rotonda','Il treno regionale','Il Frecciarossa in ritardo','L’autogrill','La sagra di paese','La festa patronale','La riunione di condominio','Il gruppo WhatsApp del palazzo','Il calcetto','Il fantacalcio','Il matrimonio italiano','Il pranzo che doveva essere leggero','La dieta che comincia lunedì','La lamentela come sport nazionale','L’amico che “conosce uno”','Il tecnico che arriva tra le 8 e le 18'].map((label) => makeCategory('italia', label, 'low', ['costume'])),
  },
  {
    id: 'professioni', name: 'Professioni', description: 'Professioni, uffici e ruoli lavorativi da improvvisare.', tone: 'medium', enabledByDefault: true,
    categories: ['Medici','Infermieri','Igienisti','Epidemiologi','Direttori sanitari','Ingegneri','Architetti','Avvocati','Commercialisti','Consulenti','HR','Project manager','Startupper','Informatici','Data analyst','Social media manager','Giornalisti','Insegnanti','Professori universitari','Psicologi','Farmacisti','Fisioterapisti','Dentisti','Veterinari','Bancari','Assicuratori','Agenti immobiliari','Camerieri','Chef','Personal trainer','Influencer','Politici','Impiegati comunali','Tassisti','Corrieri','Operatori di call center','Tecnici informatici','Ricercatori','Specializzandi','Studenti universitari'].map((label) => makeCategory('professioni', label, 'low', ['lavoro'])),
  },
];

export const categories: Category[] = categoryPacks.flatMap((pack) =>
  pack.categories.map((category) => ({ id: category.id, label: category.label, pack: pack.name })),
);

export const defaultEnabledPackIds = categoryPacks.filter((pack) => pack.enabledByDefault).map((pack) => pack.id);

export const getActiveCategories = (activePackIds: string[]): Category[] => {
  const active = new Set(activePackIds);
  return categoryPacks
    .filter((pack) => active.has(pack.id))
    .flatMap((pack) => pack.categories.map((category) => ({ id: category.id, label: category.label, pack: pack.name })));
};
