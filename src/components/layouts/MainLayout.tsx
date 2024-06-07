import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
  children: ReactNode | ReactNode[];
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center h-screen justify-between">
        {children}
      </main>
      <Footer />
    </>
  );
}
