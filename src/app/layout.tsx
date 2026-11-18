import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, Unbounded } from "next/font/google";
import { LenisProvider } from "@/providers/LenisProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revamak | The Inference Engineering Workbench",
  description: "Profile, benchmark, sweep and deploy open-weight models from a visual canvas or from code. Every decision is versioned, on any engine, cloud or GPU.",
  keywords: ["inference", "LLM", "machine learning", "AI", "optimization", "deployment"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${unbounded.variable}`}
    >
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
