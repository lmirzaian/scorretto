import { useEffect, useState } from 'react';

interface TimerProps {
  seconds?: number;
  runningKey: number;
}

export function Timer({ seconds = 10, runningKey }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(seconds);
    setIsRunning(false);
  }, [seconds, runningKey]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const interval = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, timeLeft]);

  return (
    <section className="card timer">
      <p className="label">Dieci secondi per rovinare il clima</p>
      <p className={`timer-display ${timeLeft <= 3 ? 'danger pulse' : ''}`}>{timeLeft}s</p>
      <div className="timer-actions">
        <button onClick={() => setIsRunning(true)}>Avvia timer</button>
        <button className="secondary" onClick={() => setIsRunning(false)}>Pausa</button>
        <button className="secondary" onClick={() => { setIsRunning(false); setTimeLeft(seconds); }}>Reset</button>
      </div>
    </section>
  );
}
