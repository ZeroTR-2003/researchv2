import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { ThemeProvider } from "@/contexts/ThemeContext";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Windhoek Virtual Tour",
    template: "%s · Windhoek Virtual Tour",
  },
  description:
    "Interactive 3D/360 tour of Windhoek landmarks – Christuskirche, Heroes' Acre, and Windhoek City Museum.",
  openGraph: {
    title: "Windhoek Virtual Tour",
    description:
      "Interactive 3D/360 tour of Windhoek landmarks – Christuskirche, Heroes' Acre, and Windhoek City Museum.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Windhoek Virtual Tour",
    description:
      "Interactive 3D/360 tour of Windhoek landmarks – Christuskirche, Heroes' Acre, and Windhoek City Museum.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInit = `(() => {try {const stored = localStorage.getItem('windhoek-theme'); const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; const t = stored ?? (prefersDark ? 'dark' : 'light'); document.documentElement.classList.add(t); document.documentElement.setAttribute('data-theme', t); document.documentElement.style.colorScheme = t;} catch(_) {}})();`;
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${workSans.variable} antialiased bg-sand-50 text-brand-900 dark:bg-slate-950 dark:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
