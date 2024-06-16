"use client";

import { useEffect, useState } from "react";

export default function EventClock() {
  // Add usestate for day hour minute second
  const [day, setDays] = useState(0);
  const [hour, setHours] = useState(0);
  const [minute, setMinutes] = useState(0);
  const [second, setSeconds] = useState(0);
  const [isActive] = useState(true);

  // place holder for now
  //const [time, setTime] = useState(new Date());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        if (second > 0) {
          setSeconds((second) => second - 1);
        } else if (minute > 0) {
          setMinutes((minute) => minute - 1);
          setSeconds(59);
        } else if (hour > 0) {
          setHours((hour) => hour - 1);
          setMinutes(59);
          setSeconds(59);
        } else if (day > 0) {
          setDays((day) => day - 1);
          setHours(23);
          setMinutes(59);
          setSeconds(59);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [second, minute, hour, day, isActive]);

  // Add SVG circle function within the return statement
  return (
    <div className="mx-5 w-80 bg-slate-500 p-5 text-white">
      <div className="">Time until next Event</div>
      <h1 className="text-3xl font-bold">{/*time component*/}</h1>
    </div>
  );
}
