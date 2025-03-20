"use client"
import Link from "next/link";
import { Menu, LogOut, Globe } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { language, toggleLanguage, translations } = useLanguage();
  const isUrdu = language === "ur";

  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-sm text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" 
            className={`text-xl font-bold tracking-tighter hover:text-primary transition-colors order-2 ${isUrdu ? 'font-urdu' : ''}`}
            dir={isUrdu ? "rtl" : "ltr"}
          >
            {isUrdu ? "حشمت طاہرہ" : "Hashmat Tahira"}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 order-1">
            <div className="flex items-center">
              {user && (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-custom-orange to-custom-orange/80 hover:from-custom-orange/90 hover:to-custom-orange/70 rounded-full transition-all duration-300 text-white text-base font-medium shadow-lg hover:shadow-xl"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{translations[language].nav.logout}</span>
                </button>
              )}
            </div>
            <ul className="flex space-x-6 items-center">
              {[
                ...(isAdmin ? [[translations[language].nav.dashboard, '/dashboard']] : []),
                [translations[language].nav.contact, '/contact'],
                [translations[language].nav.about, '/about'],
                [translations[language].nav.blogs, '/blogs'],
                [translations[language].nav.stories, '/stories'],
                [translations[language].nav.home, '/']
              ].map(([title, url]) => (
                <li key={url}>
                  <Link 
                    href={url} 
                    className="hover:text-primary transition-colors text-base font-medium"
                  >
                    {title}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-custom-orange to-custom-orange/80 hover:from-custom-orange/90 hover:to-custom-orange/70 rounded-full transition-all duration-300 text-white text-base font-medium shadow-lg hover:shadow-xl"
                >
                  <Globe className="h-4 w-4" />
                  <span>{isUrdu ? "English" : "اردو"}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <ul className="pt-2 pb-4 space-y-2">
              {[
                ...(isAdmin ? [[translations[language].nav.dashboard, '/dashboard']] : []),
                [translations[language].nav.contact, '/contact'],
                [translations[language].nav.about, '/about'],
                [translations[language].nav.blogs, '/blogs'],
                [translations[language].nav.stories, '/stories'],
                [translations[language].nav.home, '/'],
                ...(user ? [[translations[language].nav.logout, '#']] : [])
              ].map(([title, url]) => (
                <li key={url}>
                  {title === translations[language].nav.logout ? (
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2 bg-gradient-to-r from-custom-orange to-custom-orange/80 hover:from-custom-orange/90 hover:to-custom-orange/70 rounded-full transition-all duration-300 text-white text-lg font-medium shadow-lg hover:shadow-xl w-full"
                    >
                      {title}
                    </button>
                  ) : (
                    <Link 
                      href={url} 
                      className="block py-2 hover:text-primary transition-colors text-lg font-medium w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      {title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}