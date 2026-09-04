import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactWidget from "@/components/layout/ContactWidget";
import ClientProviders from "./client-providers";

export const metadata = {
  title: "ডাক্তার এখানে | বিশ্বস্ত স্বাস্থ্যসেবা",
  description: "বাংলাদেশের ডাক্তার ও হাসপাতাল খুঁজুন, রিভিউ দেখুন এবং অ্যাপয়েন্টমেন্ট নিন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="font-sans">
        <ClientProviders>
          <Header />
          {children}
          <Footer />
          <ContactWidget />
        </ClientProviders>
      </body>
    </html>
  );
}
