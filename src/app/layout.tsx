import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AuthQueryProvider from "@/components/contexts/Auth";
import { UserContextProvider } from "@/components/contexts/UserContext";
import { isAuthenticated } from "@/components/contexts/amplifyUtils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spreadsheet/Planner",
  description: "Made for wins/losses and planning sessions",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthQueryProvider>
          <UserContextProvider>
            <Header isSignedIn={await isAuthenticated()} />
            {children}
            <Footer />
          </UserContextProvider>
        </AuthQueryProvider>
      </body>
    </html>
  );
}
