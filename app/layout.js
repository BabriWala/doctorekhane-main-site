import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
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
        {children}
      </body>
    </html>
  );
}
