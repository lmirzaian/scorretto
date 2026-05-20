import { useMemo, useState } from 'react';
import { categoryPacks, defaultEnabledPackIds } from '../data/categoryPacks';
import { roundTypes } from '../data/roundTypes';
import { specialCardsDeck } from '../data/specialCards';

interface GameSetupProps {
  onStart: (roomName: string, teamAName: string, teamBName: string, targetScore: number, activePackIds: string[], teamAPlayers: string[], teamBPlayers: string[], testModeEnabled: boolean) => void;
}

export function GameSetup({ onStart }: GameSetupProps) {
  const [roomName, setRoomName] = useState('Serata senza filtro');
  const [teamAName, setTeamAName] = useState('');
  const [teamBName, setTeamBName] = useState('');
  const [targetScore, setTargetScore] = useState(10);
  const [activePackIds, setActivePackIds] = useState<string[]>(defaultEnabledPackIds);
  const [teamAPlayers, setTeamAPlayers] = useState('');
  const [teamBPlayers, setTeamBPlayers] = useState('');
  const [testModeEnabled, setTestModeEnabled] = useState(true);
  const [error, setError] = useState('');

  const activePacks = useMemo(() => categoryPacks.filter((pack) => activePackIds.includes(pack.id)), [activePackIds]);
  const totalCategories = useMemo(() => activePacks.reduce((sum, pack) => sum + pack.categories.length, 0), [activePacks]);
  const sensitivePacks = activePacks.filter((pack) => !!pack.warning);

  const togglePack = (packId: string) => {
    setError('');
    setActivePackIds((prev) => (prev.includes(packId) ? prev.filter((id) => id !== packId) : [...prev, packId]));
  };

  const startGame = () => {
    if (activePackIds.length === 0) {
      setError('Seleziona almeno un pacchetto categorie.');
      return;
    }

    const aPlayers = teamAPlayers.split(',').map((p) => p.trim()).filter(Boolean);
    const bPlayers = teamBPlayers.split(',').map((p) => p.trim()).filter(Boolean);
    onStart(roomName.trim() || 'Serata senza filtro', teamAName.trim() || 'Squadra A', teamBName.trim() || 'Squadra B', Math.max(1, targetScore), activePackIds, aPlayers.length ? aPlayers : ['Giocatore A1'], bPlayers.length ? bPlayers : ['Giocatore B1'], testModeEnabled);
  };

  return (
    <section className="card setup">
      <h2>Setup partita</h2>
      <label>Nome stanza
        <input placeholder="Serata venerdì" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      </label>
      <p className="muted">Compila il verbale e scegli quando finisce la dignità.</p>
      <label className="toggle-row"><input type="checkbox" checked={testModeEnabled} onChange={(e) => setTestModeEnabled(e.target.checked)} /> <strong>Modalità test serata</strong></label>
      <p className="muted tiny">Raccoglie feedback sui round per capire cosa funziona davvero al tavolo.</p>
      <div className="cards-grid two-cols">
        <article className="team-specials">
          <p className="label">Squadra A</p>
          <label>Nome squadra
            <input placeholder="Squadra A" value={teamAName} onChange={(e) => setTeamAName(e.target.value)} />
          </label>
          <label>Giocatori (separati da virgola)
            <input placeholder="Anna, Luca" value={teamAPlayers} onChange={(e) => setTeamAPlayers(e.target.value)} />
          </label>
        </article>
        <article className="team-specials">
          <p className="label">Squadra B</p>
          <label>Nome squadra
            <input placeholder="Squadra B" value={teamBName} onChange={(e) => setTeamBName(e.target.value)} />
          </label>
          <label>Giocatori (separati da virgola)
            <input placeholder="Marta, Paolo" value={teamBPlayers} onChange={(e) => setTeamBPlayers(e.target.value)} />
          </label>
        </article>
      </div>
      <label>Punti per vincere
        <input type="number" min={3} max={30} value={targetScore} onChange={(e) => setTargetScore(Number(e.target.value))} />
      </label>
      <section className="card pack-section">
        <h3>Pacchetti categorie</h3>
        <div className="cards-grid two-cols">
          {categoryPacks.map((pack) => {
            const active = activePackIds.includes(pack.id);
            return (
              <article key={pack.id} className={`team-specials ${active ? 'pack-active' : ''}`}>
                <div className="team-specials-header">
                  <p className="label">{pack.name}</p>
                  <input type="checkbox" checked={active} onChange={() => togglePack(pack.id)} aria-label={`Attiva pacchetto ${pack.name}`} />
                </div>
                <p>{pack.description}</p>
                <p className="muted tiny">Categorie: {pack.categories.length} · Tono: {pack.tone}</p>
                {pack.warning ? <p className="danger tiny">{pack.warning}</p> : null}
              </article>
            );
          })}
        </div>

        {sensitivePacks.length > 0 ? (
          <div className="warning-box">
            <strong>Patto del tavolo:</strong> questo pacchetto può essere delicato. Usatelo solo se tutti sono d’accordo.
          </div>
        ) : null}

        <details>
          <summary>Riepilogo pacchetti</summary>
          <p className="muted tiny">Pacchetti attivi: {activePacks.map((pack) => pack.name).join(', ') || 'Nessuno'}</p>
          <p className="muted tiny">Totale categorie pescabili: {totalCategories}</p>
          <p className="muted tiny">Contesti disponibili: {roundTypes.length}</p>
          <p className="muted tiny">Carte jolly: {specialCardsDeck.filter((c) => c.cardType === 'jolly').length} · Carte aggravante: {specialCardsDeck.filter((c) => c.cardType === 'aggravante').length}</p>
          <p className="muted tiny">Pacchetti delicati attivati: {sensitivePacks.map((pack) => pack.name).join(', ') || 'Nessuno'}</p>
        </details>
      </section>
      {error ? <p className="danger">{error}</p> : null}
      <button onClick={startGame}>Inizia partita</button>
    </section>
  );
}
