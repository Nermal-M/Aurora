import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import GSAPProvider from "@/components/providers/GSAPProvider";
import Cursor from "@/components/ui/Cursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07080D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://psgteamaurora.in"),
  title: "PSG Team Aurora | Mars Rover Team, PSG iTech",
  description:
    "Official website of PSG Team Aurora, an undergraduate Mars rover robotics team from PSG iTech, building the Tarush autonomous rover for international analog competitions.",
  keywords: [
    "PSG Team Aurora",
    "Tarush Rover",
    "Mars Rover",
    "PSG iTech",
    "International Rover Challenge",
    "European Rover Challenge",
    "Robotics",
    "Autonomous Robotics",
  ],
  authors: [{ name: "PSG Team Aurora" }],
  openGraph: {
    title: "PSG Team Aurora | Mars Rover Team, PSG iTech",
    description: "Descent to Mars — Building Tarush for International Rover Challenges.",
    url: "https://psgteamaurora.in",
    siteName: "PSG Team Aurora",
    images: [
      {
        url: "/images/rover-poster.png",
        width: 1200,
        height: 630,
        alt: "Tarush Mars Rover - PSG Team Aurora",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/logo-aurora.png",
    shortcut: "/images/logo-aurora.png",
    apple: "/images/logo-aurora.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,100..900&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-theme="default" className="bg-space-900 text-bone selection:bg-mars selection:text-white">
        <SmoothScrollProvider>
          <GSAPProvider>
            <Cursor />
            {children}
          </GSAPProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
