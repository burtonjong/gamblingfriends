"use client";

import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "./useCounter";

interface ShowCounterProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ExpiredNotice: React.FC = () => {
  return (
    <div className="flex">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter: React.FC<ShowCounterProps> = ({
  days,
  hours,
  minutes,
  seconds,
}) => {
  // Add 'days' to props validation
  if (days === undefined) {
    return null;
  }
  return (
    <div className="size-full bg-slate-500 p-5">
      <div className="flex justify-center p-5">
        <h1 className="text-3xl font-bold text-white">Countdown</h1>
      </div>
      <div className="flex size-full space-x-4 p-10 text-xl text-white">
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />

        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />

        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />

        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
      </div>
    </div>
  );
};

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
