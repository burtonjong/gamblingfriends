import CountdownTimer from "@/components/homepage/CountdownTimer";
import Podium from "@/components/homepage/Podium";

export default function Home() {
  // const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

  // const NOW_IN_MS = new Date().getTime();

  // const dateTimeAfterThreeDays = new Date(NOW_IN_MS + THREE_DAYS_IN_MS);
  return (
    <div className="flex min-h-screen w-full flex-row items-center justify-around p-12">
      <div>
        <Podium />
      </div>
      <div>
        <CountdownTimer />
      </div>
    </div>
  );
}
