import MainPlanner from "@/components/planner/MainPlanner";
import Participants from "@/components/planner/Participants";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainPlanner />
      <Participants />
    </main>
  );
}
