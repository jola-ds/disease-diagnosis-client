import { AppSidebar } from "@/components/app-sidebar";
import { Nav } from "@/components/nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Disease Diagnosis",
  description: "Predicting common diseases from the symptoms and demographics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
              <Nav />
              {children}
            </main>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
