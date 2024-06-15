export default function MainSpreadsheet() {
  return (
    <div className="flex w-full flex-row">
      <div className="size-full bg-slate-300">
        <div className="flex flex-row gap-4">
          <button>All time</button>
          <button>Sessions</button>
        </div>
        <div className="h-96 bg-slate-500"></div>
      </div>
    </div>
  );
}
