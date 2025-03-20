"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { language, translations } = useLanguage();

  const contactTranslations = {
    ur: {
      name: "آپ کا نام",
      email: "آپ کا ای میل",
      message: "آپ کا پیغام",
      send: "پیغام بھیجیں",
      title: "رابطہ کریں",
      description: "اگر آپ کو کوئی سوال ہے تو براہ کرم ہم سے رابطہ کریں۔",
      switchLang: "Switch to English",
      errors: {
        required: "براہ کرم تمام فیلڈز پُر کریں۔",
        invalidEmail: "درست ای میل درج کریں۔",
        success: "پیغام کامیابی سے بھیج دیا گیا!",
        error: "پیغام بھیجنے میں ناکام، براہ کرم دوبارہ کوشش کریں۔"
      }
    },
    en: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message",
      title: "Contact Us",
      description: "If you have any questions, please feel free to contact us.",
      switchLang: "اردو میں دیکھیں",
      errors: {
        required: "Please fill in all fields.",
        invalidEmail: "Please enter a valid email.",
        success: "Message sent successfully!",
        error: "Failed to send message. Please try again."
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const t = translations[language];

    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t.errors.required);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error(t.errors.invalidEmail);
      return;
    }

    try {
      await emailjs.send(
        "service_5exz7y6",
        "template_uvsl6wk",
        formData,
        "n4nvitPZ3Q1bXHOzU"
      );
      toast.success(t.errors.success);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(t.errors.error);
      console.error("EmailJS Error:", error);
    }
  };

  const t = contactTranslations[language];
  const isUrdu = language === "ur";

  return (
    <div className="w-full py-4 px-6">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="flex flex-col items-center relative">

        <div className="text-center mt-8 mb-6">
          <h2 
            className={`text-3xl font-bold text-white mb-3`}
            dir={isUrdu ? "rtl" : "ltr"}
          >
            {t.title}
          </h2>
          <p 
            className={`text-base text-white/80 max-w-2xl`}
            dir={isUrdu ? "rtl" : "ltr"}
          >
            {t.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
          <input
            type="text"
            name="name"
            placeholder={t.name}
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 border border-white/50 bg-white/10 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#da713a] ${
              isUrdu ? 'text-right' : 'text-left'
            }`}
            dir={isUrdu ? "rtl" : "ltr"}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t.email}
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border border-white/50 bg-white/10 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#da713a] ${
              isUrdu ? 'text-right' : 'text-left'
            }`}
            dir={isUrdu ? "rtl" : "ltr"}
            required
          />
          <textarea
            name="message"
            placeholder={t.message}
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-3 border border-white/50 bg-white/10 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#da713a] ${
              isUrdu ? 'text-right' : 'text-left'
            }`}
            dir={isUrdu ? "rtl" : "ltr"}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#da713a] text-white py-3 rounded-lg shadow-lg hover:shadow-[#da713a]/50 hover:bg-opacity-90 transition duration-300 text-lg mt-2"
          >
            {t.send}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;