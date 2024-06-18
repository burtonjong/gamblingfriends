import EventClock from "@/components/homepage/EventClock";
import Podium from "@/components/homepage/Podium";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-row items-center justify-around p-12">
      <div>
        <Podium />
      </div>
      <div>
        <EventClock />
      </div>
    </div>
  );
}
