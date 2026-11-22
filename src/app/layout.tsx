import type { Metadata } from "next";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "./globals.css";
import { CartProvider } from "@/components/cart";
import { ChatLauncher } from "@/components/ChatLauncher";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WelcomeOffer } from "@/components/WelcomeOffer";
import { getCompany, getHome, getNav } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://ummasupplements.com"),
  title: { default: "UMMA Supplements | Collagen for every day", template: "%s | UMMA Supplements" },
  description:
    "Pure, unflavoured collagen peptides for women in their forties and beyond. One scoop in your morning chai.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [home, nav, company] = await Promise.all([getHome(), getNav(), getCompany()]);

  return (
    <html lang="en-IN">
      <body>
        <CartProvider>
          <Header nav={nav} announcement={home.announcement} />
          <main>{children}</main>
          <Footer />
          <ChatLauncher faq={home.faq} whatsapp={company.whatsapp} />
          <WelcomeOffer />
        </CartProvider>
      </body>
    </html>
  );
}
