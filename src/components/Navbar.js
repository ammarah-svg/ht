"use client"
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-sm text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
         

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 items-center">
            {[
             ['تعریف', '/about'],
             ['رابطہ کریں', '/contact'],
              ['کہانیاں', '/stories'],
              ['بلاگ', '/blogs'],
              ['ہوم', '/'],
            ].map(([title, url]) => (
              <li key={url}>
                <Link 
                  href={url} 
                  className="hover:text-primary transition-colors text-lg font-medium"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors"
          >
            حشمت طاہرہ
          </Link>
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
                ['ہوم', '/'],
                ['کہانیاں', '/stories'],
                ['بلاگ', '/blogs'],
                ['تعریف', '/about'],
                ['رابطہ کریں', '/contact'],
              ].map(([title, url]) => (
                <li key={url}>
                  <Link 
                    href={url} 
                    className="block py-2 hover:text-primary transition-colors text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}