"use client";

import { createContext, useContext, useState } from 'react';

export const LanguageContext = createContext();

export const translations = {
  ur: {
    nav: {
      home: 'ہوم',
      stories: 'کہانیاں',
      blogs: 'بلاگ',
      about: 'تعریف',
      contact: 'رابطہ کریں',
      dashboard: 'ڈیش بورڈ',
      logout: 'خارج'
    },
    hero: {
      welcome: 'دنیائے کتب میں خوش آمدید',
      discover: 'ہماری لائبریری میں بہترین کتابوں کا مجموعہ دریافت کریں',
      signup: 'اکاؤنٹ بنائیں',
      login: 'لاگ ان کریں',
      newBooks: 'نئی شائع شدہ کتابیں',
      readMore: 'مزید پڑھیں',
      bookDescription: 'یہ ایک عمدہ کتاب ہے جو آپ کو پسند آئے گی۔',
      authorTitle: 'تعارفِ مصنف',
      authorDescription: 'حشمت طاہرہ ایک نامور پاکستانی مصنفہ ہیں، جو اپنی منفرد تحریری اسلوب کے لیے جانی جاتی ہیں۔ انہوں نے اپنی زندگی کا بیشتر حصہ اردو ادب کی خدمت میں گزارا ہے۔ ان کی تحریروں میں پاکستانی معاشرے کی عکاسی، خواتین کے مسائل اور انسانی جذبات کی ترجمانی نمایاں طور پر نظر آتی ہے۔',
      authorDescription2: 'ان کی تخلیقات میں کہانیاں، ناول، اور شاعری شامل ہیں۔ ان کی تحریریں قارئین کے دلوں میں گہری جگہ بناتی ہیں اور معاشرتی شعور کو اجاگر کرتی ہیں۔'
    },
    auth: {
      firstName: 'پہلا نام',
      lastName: 'آخری نام',
      email: 'ای میل',
      password: 'پاس ورڈ',
      role: {
        reader: 'قارئ',
        writer: 'رائٹر'
      },
      haveAccount: 'پہلے سے اکاؤنٹ موجود ہے؟',
      noAccount: 'اکاؤنٹ نہیں ہے؟',
      signupButton: 'سائن اپ کریں',
      loginButton: 'لاگ ان کریں'
    }
  },
  en: {
    nav: {
      home: 'Home',
      stories: 'Stories',
      blogs: 'Blogs',
      about: 'About',
      contact: 'Contact',
      dashboard: 'Dashboard',
      logout: 'Logout'
    },
    hero: {
      welcome: 'Welcome to the World of Books',
      discover: 'Discover our collection of the finest books in our library',
      signup: 'Sign Up',
      login: 'Login',
      newBooks: 'Newly Published Books',
      readMore: 'Read More',
      bookDescription: 'This is an excellent book that you will enjoy.',
      authorTitle: 'About the Author',
      authorDescription: 'Hashmat Tahira is a renowned Pakistani author, known for her unique writing style. She has spent most of her life serving Urdu literature. Her writings prominently reflect Pakistani society, women\'s issues, and human emotions.',
      authorDescription2: 'Her creations include stories, novels, and poetry. Her writings hold a deep place in readers\' hearts and raise social consciousness.'
    },
    auth: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      password: 'Password',
      role: {
        reader: 'Reader',
        writer: 'Writer'
      },
      haveAccount: 'Already have an account?',
      noAccount: 'Don\'t have an account?',
      signupButton: 'Sign Up',
      loginButton: 'Login'
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ur');
  const isUrdu = language === 'ur';

  const toggleLanguage = () => {
    setLanguage(isUrdu ? 'en' : 'ur');
  };

  return (
    <LanguageContext.Provider value={{ language, isUrdu, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}