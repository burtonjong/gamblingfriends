import MainSpreadsheet from "@/components/spreadsheet/MainSpreadsheet";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between p-12">
      <MainSpreadsheet />
    </div>
  );
}
