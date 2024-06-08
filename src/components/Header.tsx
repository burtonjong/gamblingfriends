export default function Header() {
  return (
    <div className="flex h-24 flex-row items-center justify-evenly">
      <a href="http://localhost:3000">Home</a>
      <a href="http://localhost:3000/spreadsheet">Spreadsheet</a>
      <a href="http://localhost:3000/planner">Planner</a>
    </div>
  );
}
