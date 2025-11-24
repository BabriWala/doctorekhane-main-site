import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata = {
  title: "ডাক্তার এখানে",
  description: "বিশ্বস্ত ডাক্তার এর ঠিকানা",
  generator: "---",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  --font-hind-siliguri: ${hindSiliguri.style.fontFamily};
}
        `}</style>
      </head>
      <body className={`${inter.className} ${hindSiliguri.className}`}>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
