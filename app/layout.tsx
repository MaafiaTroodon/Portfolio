import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Malhar Datta Mahajan | Portfolio",
  description: "Portfolio of Malhar Datta Mahajan - Software Developer based in Halifax, NS",
  openGraph: {
    title: "Malhar Datta Mahajan | Portfolio",
    description: "Portfolio of Malhar Datta Mahajan - Software Developer based in Halifax, NS",
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
      <body className={poppins.variable}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster 
            position="bottom-right" 
            richColors 
            toastOptions={{
              style: {
                color: '#ffffff',
              },
              error: {
                style: {
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                },
              },
              success: {
                style: {
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}

