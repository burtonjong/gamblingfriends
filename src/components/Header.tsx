export default function Header() {
  return (
    <div className="flex h-24 flex-row items-center justify-evenly bg-slate-500">
      <a href="/spreadsheet">Spreadsheet</a>
      <a href="/">Home</a>
      <a href="/planner">Planner</a>
    </div>
  );
}
