"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";
import { useAuth } from "@/context/AuthContext";


export default function HeroSection() {
  const router = useRouter();
  const showToast = useToast();
  const { login, logout, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "reader"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openModal = (signup) => {
    setIsSignUp(signup);
    setIsModalOpen(true);
    setError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "reader"
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          role: formData.role
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }
      
      closeModal();
      const authResult = await login(data.user);
      if (authResult) {
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
      
      closeModal();
      const authResult = await login(data.user);
      if (authResult) {
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
i          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-right" dir="rtl">
              دنیائے کتب میں خوش آمدید
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-right" dir="rtl">
              ہماری لائبریری میں بہترین کتابوں کا مجموعہ دریافت کریں
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => openModal(true)}
                  className="px-6 py-2.5 bg-[#da713a] text-white rounded-full text-base font-semibold hover:bg-[#da713a]/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#da713a]/50"
                >
                  اکاؤنٹ بنائیں
                </button>
                <button
                  onClick={() => openModal(false)}
                  className="px-6 py-2.5 bg-white text-black rounded-full text-base font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  لاگ ان کریں
                </button>
              </div>
            )}
            {user && (
              <div className="flex justify-center">
                <button
                  onClick={logout}
                  className="px-6 py-2.5 bg-[#da713a] text-white rounded-full text-base font-semibold hover:bg-[#da713a]/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#da713a]/50"
                >
                  خارج
                </button>
              </div>
            )}
          </motion.div>

        
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-xl w-96 relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-black text-xl font-bold"
              >
                ✖
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">
                {isSignUp ? "اکاؤنٹ بنائیں" : "لاگ ان کریں"}
              </h2>
              {isSignUp ? (
                <form onSubmit={handleSignup}>
                  <input
                    type="text"
                    placeholder="پہلا نام"
                    className="w-full p-2 border rounded mb-2"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="آخری نام"
                    className="w-full p-2 border rounded mb-2"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                  />
                  <input
                    type="email"
                    placeholder="ای میل"
                    className="w-full p-2 border rounded mb-2"
                    value={formData.email}
                    onChange={(e) => {
                      const value = e.target.value;
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (value && !emailRegex.test(value)) {
                        showToast("Please enter a valid email address", "error");
                      }
                      setFormData({...formData, email: value});
                    }}
                    required
                  />
                  <input
                    type="password"
                    placeholder="پاس ورڈ (مضبوط)"
                    className="w-full p-2 border rounded mb-2"
                    value={formData.password}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value && value.length < 8) {
                        showToast("Password must be at least 8 characters long", "error");
                      }
                      setFormData({...formData, password: value});
                    }}
                    required
                  />
                  <select 
                    className="w-full p-2 border rounded mb-4 text-right"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="reader">قارئ
                       </option>
                    <option value="writer">رائٹر</option>
                  </select>
                  <button 
                    type="submit" 
                    className="w-full bg-[#da713a] text-white p-2 rounded hover:bg-[#da713a]/90 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "..." : "سائن اپ کریں"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="ای میل"
                    className="w-full p-2 border rounded mb-2 text-right placeholder-right"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                  <input
                    type="password"
                    placeholder="پاس ورڈ"
                    className="w-full p-2 border rounded mb-4 text-right placeholder-right"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <button 
                    type="submit" 
                    className="w-full bg-[#da713a] text-white p-2 rounded hover:bg-[#da713a]/90 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "..." : "لاگ ان کریں"}
                  </button>
                </form>
              )}
              <p className="text-center mt-4">
                {isSignUp ? "پہلے سے اکاؤنٹ موجود ہے؟" : "اکاؤنٹ نہیں ہے؟"} {" "}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                  className="text-[#da713a] font-semibold"
                >
                  {isSignUp ? "لاگ ان کریں" : "سائن اپ کریں"}
                </button>
              </p>
            </motion.div>
          </div>
        )}
      </section>

      <section>
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
                    <button className="w-full px-4 py-2 bg-white text-dark rounded-lg hover:bg-[#da713a] transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-[white]/50">
                      مزید پڑھیں
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="py-20">
          {/* About the Author Section */}
          <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="w-full text-center p-8 relative"
  style={{
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url('https://static.vecteezy.com/system/resources/thumbnails/034/073/373/small_2x/a-bookshelf-with-many-books-ai-generated-photo.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }}
>
  <div className="max-w-4xl mx-auto p-10 rounded-lg text-white">
    <h2 className="text-4xl md:text-5xl font-bold mb-20 text-right font-urdu" dir="rtl">
      تعارفِ مصنف
    </h2>
    <p className="text-xl md:text-2xl leading-relaxed mb-6 text-right font-urdu tracking-wide" dir="rtl">
      حشمت طاہرہ ایک نامور پاکستانی مصنفہ ہیں، جو اپنی منفرد تحریری اسلوب کے لیے جانی جاتی ہیں۔ انہوں نے اپنی زندگی کا بیشتر حصہ اردو ادب کی خدمت میں گزارا ہے۔ ان کی تحریروں میں پاکستانی معاشرے کی عکاسی، خواتین کے مسائل اور انسانی جذبات کی ترجمانی نمایاں طور پر نظر آتی ہے۔
    </p>
    <p className="text-xl md:text-2xl leading-relaxed text-right font-urdu tracking-wide" dir="rtl">
      ان کی تخلیقات میں کہانیاں، ناول، اور شاعری شامل ہیں۔ ان کی تحریریں قارئین کے دلوں میں گہری جگہ بناتی ہیں اور معاشرتی شعور کو اجاگر کرتی ہیں۔
    </p>
  </div>
</motion.div>


      </section>

    </>
  );
}