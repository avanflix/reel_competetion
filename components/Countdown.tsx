"use client";

import { useEffect, useState } from "react";

const DEADLINE = new Date("2026-07-20T23:59:59-04:00").getTime();

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
}

function getRemaining(): Remaining {
  const diff = Math.max(0, DEADLINE - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return { days, hours, minutes };
}

export default function Countdown() {
  const [t, setT] = useState<Remaining | null>(null);

  useEffect(() => {
    setT(getRemaining());
    const id = setInterval(() => setT(getRemaining()), 60000);
    return () => clearInterval(id);
  }, []);

  if (!t) return null;

  const units = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes }
  ];

  return (
    <div
      className="flex items-center gap-3"
      role="timer"
      aria-label="Time remaining until submission deadline"
    >
      {units.map((u) => (
        <div
          key={u.label}
          className="flex w-16 flex-col items-center rounded-xl bg-white/95 py-2 shadow-md"
        >
          <span className="font-marquee text-2xl leading-none text-marquee-crimson tracking-wide">
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-marquee-ink2">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
