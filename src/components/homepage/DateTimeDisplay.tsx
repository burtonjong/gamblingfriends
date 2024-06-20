"use client";

type DateTimeDisplayProps = {
  value: number;
  type: string;
  isDanger: boolean;
};

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  value,
  type,
  isDanger,
}) => {
  return (
    <div className={isDanger ? "countdown danger" : "countdown"}>
      <div className="flex flex-col items-center justify-center font-bold">
        <p className="">{value}</p>
        <span className="">{type}</span>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
