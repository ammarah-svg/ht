import { Geist, Geist_Mono, Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata = {
  title: "مصنف کی ویب سائٹ",
  description: "یہ ایک ادبی ویب سائٹ ہے جہاں آپ کہانیاں اور مضامین پڑھ سکتے ہیں۔",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${notoUrdu.variable} bg-gray-50 text-gray-900 font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
