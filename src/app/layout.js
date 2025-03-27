import { Inter } from "next/font/google";
import "./globals.css";
// import { SiteHeader } from "@/components/Nav/site-header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Swap It - Buy and Sell College Items',
  description: 'A platform for college students to buy and sell items within their campus.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body 
          className={`${inter.className} min-h-screen flex flex-col antialiased`}
          suppressHydrationWarning
        >
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {/* <SiteHeader /> */}
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
