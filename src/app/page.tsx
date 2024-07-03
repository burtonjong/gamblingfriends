import CountdownTimer from "@/components/homepage/CountdownTimer";
import Podium from "@/components/homepage/Podium";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-row items-center justify-around p-10">
      <div className="">
        <Podium />
      </div>
      <div className="">
        <CountdownTimer />
      </div>
    </div>
  );
}
