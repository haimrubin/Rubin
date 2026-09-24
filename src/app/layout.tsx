import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Noto_Sans_Hebrew } from "next/font/google";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import LanguageScript from "@/components/LanguageScript/LanguageScript";
import ThemeScript from "@/components/ThemeScript/ThemeScript";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.scss";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ["hebrew"],
  variable: "--font-hebrew",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haim Rubin — Full Stack Developer",
  description:
    "Portfolio of Haim Rubin — full stack and WordPress developer building fast, interactive websites and digital experiences.",
  openGraph: {
    title: "Haim Rubin — Full Stack Developer",
    description:
      "Portfolio showcasing websites, products and digital experiences built from scratch.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haim Rubin — Full Stack Developer",
    description:
      "Portfolio showcasing websites, products and digital experiences built from scratch.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${dmSans.variable} ${ibmPlexMono.variable} ${notoSansHebrew.variable}`}
      data-theme="dark"
      data-language="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeScript />
        <LanguageScript />
        <ThemeProvider>
          <LanguageProvider>
            <CustomCursor />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
