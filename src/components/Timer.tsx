import { useEffect, useState } from 'react';

interface TimerProps {
  seconds?: number;
  runningKey: number;
}

export function Timer({ seconds = 10, runningKey }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
    const interval = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [seconds, runningKey]);

  return (
    <div className="timer card">
      <p className="label">Timer turno</p>
      <p className={timeLeft <= 3 ? 'danger' : ''}>{timeLeft}s</p>
    </div>
  );
}
