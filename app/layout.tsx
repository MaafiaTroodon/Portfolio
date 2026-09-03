import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Malhar Datta Mahajan — Software Developer & Systems Analyst",
  description: "Computer Science Co-op student at Dalhousie University with professional experience in software development, systems analysis, Microsoft Power Platform, process automation, data, Microsoft 365, and technical support.",
  openGraph: {
    title: "Malhar Datta Mahajan — Software Developer & Systems Analyst",
    description: "Computer Science Co-op student at Dalhousie University with experience in software, systems analysis, Power Platform, automation, data, Microsoft 365, and technical support.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster 
            position="bottom-right" 
            richColors
          />
        </Providers>
      </body>
    </html>
  );
}
