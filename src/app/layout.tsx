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
  title: "gamblingfriends",
  description: "Made for wins/losses and planning sessions",
  openGraph: {
    title: "gamblingfriends",
    description: "Made for wins/losses and planning sessions",
    url: "https://main.d2mymh01to4n81.amplifyapp.com/",
    siteName: "gamblingfriends",
    images: [
      {
        url: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8yNl9hX3JlYWxfcGhvdG9fb2ZfY2FzaW5vX2NoaXBzX2IxNmZmODMzLWJjZjgtNGIxYS05MjFlLWMzMDI0MTQ2MjFlMV8yLmpwZw.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    shortcut: ["/favicon.png"],
    icon: ["/favicon.ico?v=1"],
  },
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
