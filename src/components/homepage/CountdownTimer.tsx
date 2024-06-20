"use client";

import { useCountdown } from "../hooks/useCounter";
import DateTimeDisplay from "./DateTimeDisplay";

interface ShowCounterProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ExpiredNotice: React.FC = () => {
  return (
    <div className="flex min-h-[560px] min-w-[550px] items-center justify-center rounded-md bg-slate-500 font-bold text-white">
      <p>(づ ◕‿◕ )づ</p>
      <p>!! TIME TO GAMBLE !!</p>
      <p>(づ ◕‿◕ )づ</p>
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
    <div className="min-h-[560px] min-w-[550px] rounded-md bg-slate-500 py-20">
      <div className="flex justify-center py-10">
        <h1 className="text-3xl font-bold text-white">Countdown</h1>
      </div>
      <div className="flex justify-center space-x-5 py-10 text-xl text-white">
        <div>
          <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
        </div>
        <div>
          <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
        </div>
        <div>
          <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        </div>
        <div>
          <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
        </div>
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
