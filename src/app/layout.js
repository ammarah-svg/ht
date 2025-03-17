
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const notoUrdu = Noto_Nastaliq_Urdu({ variable: "--font-urdu", subsets: ["arabic"], display: "swap" });

export const metadata = {
  title: "حشمت طاہرہ",
  description: "یہ ایک ادبی ویب سائٹ ہے جہاں آپ کہانیاں اور مضامین پڑھ سکتے ہیں۔",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur">
      <body className={`${inter.variable} ${notoUrdu.variable} bg-gray-50 text-gray-900 font-sans antialiased`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
