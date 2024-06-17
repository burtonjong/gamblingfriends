import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ConfigureAmplifyClientSide from "@/components/contexts/ConfigureAmplifyClientSide";
import { UserContextProvider } from "@/components/contexts/UserContext";
import MainLayout from "@/components/layouts/MainLayout";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spreadsheet/Planner",
  description: "Made for wins/losses and planning sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigureAmplifyClientSide />
        <UserContextProvider>
          <MainLayout>{children}</MainLayout>
        </UserContextProvider>
      </body>
    </html>
  );
}
