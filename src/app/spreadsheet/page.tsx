import MainSpreadsheet from "@/components/spreadsheet/MainSpreadsheet";
import SpreadsheetTest from "@/components/spreadsheet/SpreadsheetTest";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainSpreadsheet />
      <SpreadsheetTest />
    </main>
  );
}
