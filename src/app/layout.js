
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const notoUrdu = Noto_Nastaliq_Urdu({ variable: "--font-urdu", subsets: ["arabic"], display: "swap" });

export const metadata = {
  title: "\u062D\u0634\u0645\u062A \u0637\u0627\u06C1\u0631\u06C1",
  description: "\u06CC\u06C1 \u0627\u06CC\u06A9 \u0627\u062F\u0628\u06CC \u0648\u06CC\u0628 \u0633\u0627\u0626\u0679 \u06C1\u06D2 \u062C\u06C1\u0627\u06BA \u0622\u067E \u06A9\u06C1\u0627\u0646\u06CC\u0627\u06BA \u0627\u0648\u0631 \u0645\u0636\u0627\u0645\u06CC\u0646 \u067E\u0691\u06BE \u0633\u06A9\u062A\u06D2 \u06C1\u06CC\u06BA\u060C",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${notoUrdu.variable} bg-gray-50 text-gray-900 font-sans antialiased`}>
        <ToastProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar/>
              <main className="flex-grow">{children}</main>
              <Footer/>
            </div>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
