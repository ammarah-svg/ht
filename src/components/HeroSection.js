"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen w-full">
        {/* Hero Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2280&q=80"
            alt="Library Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              دنیائے کتب میں خوش آمدید
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
              ہماری لائبریری میں بہترین کتابوں کا مجموعہ دریافت کریں
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-3 bg-primary text-white rounded-full text-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/50"
              >
                اکاؤنٹ بنائیں
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                لاگ ان کریں
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Featured Books Section */}
        <div className="relative bg-gradient-to-b from-black/0 to-background py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              نئی شائع شدہ کتابیں
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((book) => (
                <motion.div
                  key={book}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: book * 0.1 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative h-64 mb-6">
                      <Image
                        src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80"
                        alt={`Book ${book}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 font-bold">
                      {`کتاب ${book}`}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      یہ ایک عمدہ کتاب ہے جو آپ کو پسند آئے گی۔
                    </p>
                    <button className="w-full px-4 py-2 bg-white text-dark rounded-lg hover:bg-primary transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-primary/50">
                      مزید پڑھیں
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}