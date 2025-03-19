import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/90 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-right">
            <h3 className="text-2xl font-bold mb-4 text-[#da713a]">ہمارے بارے میں</h3>
            <p className="text-gray-300">
              حشمت طاہرہ کی ادبی دنیا میں خوش آمدید۔ ہم پاکستانی ادب کو فروغ دینے کے لیے کوشاں ہیں۔
            </p>
          </div>

          <div className="text-right">
            <h3 className="text-2xl font-bold mb-4 text-[#da713a]">فوری روابط</h3>
            <ul className="space-y-2">
              <li><Link href="/books" className="text-gray-300 hover:text-[#da713a]">کتابیں</Link></li>
              <li><Link href="/stories" className="text-gray-300 hover:text-[#da713a]">کہانیاں</Link></li>
              <li><Link href="/poetry" className="text-gray-300 hover:text-[#da713a]">شاعری</Link></li>
              <li><Link href="/blogs" className="text-gray-300 hover:text-[#da713a]">بلاگ</Link></li>
            </ul>
          </div>

          <div className="text-right">
            <h3 className="text-2xl font-bold mb-4 text-[#da713a]">رابطہ کریں</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-300 hover:text-[#da713a]">ہم سے رابطہ</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-[#da713a]">ہمارے بارے میں</Link></li>
            </ul>
          
            <div className="flex justify-end space-x-4 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#da713a]">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#da713a]">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#da713a]">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} حشمت طاہرہ - جملہ حقوق محفوظ ہیں
          </p>
        </div>
      </div>
    </footer>
  );
}