"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [gambleTime, setGambleTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("07/04/2024 09:42 PM");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      setHours(h);
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setGambleTime(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {gambleTime ? (
        <div>Time to gamble!</div>
      ) : (
        <div className="count-down-main flex size-full items-start justify-center gap-4">
          <div className="timer w-16">
            <div className="overflow-hidden rounded-lg bg-slate-500 px-2 py-4">
              <h3 className="font-Cormorant text-center text-2xl font-semibold text-white">
                {days}
              </h3>
            </div>
            <p className="font-Cormorant mt-1 w-full text-center text-lg font-medium text-gray-900">
              Days
            </p>
          </div>
          <h3 className="font-manrope text-2xl font-semibold text-gray-900"></h3>
          <div className="timer w-16">
            <div className="overflow-hidden rounded-lg bg-slate-500 px-2 py-4">
              <h3 className="font-Cormorant text-center text-2xl font-semibold text-white">
                {hours}
              </h3>
            </div>
            <p className="font-Cormorant mt-1 w-full text-center text-lg font-medium text-gray-900">
              Hours
            </p>
          </div>
          <h3 className="font-manrope text-2xl font-semibold text-gray-900"></h3>
          <div className="timer w-16">
            <div className="overflow-hidden rounded-lg bg-slate-500 px-2 py-4">
              <h3 className="font-Cormorant text-center text-2xl font-semibold text-white">
                {minutes}
              </h3>
            </div>
            <p className="font-Cormorant mt-1 w-full text-center text-lg font-medium text-gray-900">
              Minutes
            </p>
          </div>
          <h3 className="font-manrope text-2xl font-semibold text-gray-900"></h3>
          <div className="timer w-16">
            <div className="overflow-hidden rounded-lg bg-slate-500 px-2 py-4">
              <h3 className="font-Cormorant text-center text-2xl font-semibold text-white">
                {seconds}
              </h3>
            </div>
            <p className="font-Cormorant mt-1 w-full text-center text-lg font-medium text-gray-900">
              Seconds
            </p>
          </div>
        </div>
      )}
    </>
  );
}
