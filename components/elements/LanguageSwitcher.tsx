// components/elements/LanguageSwitcher.tsx

"use client";
import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-40 right-0 flex flex-col space-y-0 bg-white p-1 rounded-lg shadow-lg z-50">
      <button
        className={`px-2 py-1 text-sm rounded-sm ${language === 'en' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setLanguage('en')}
      >
        English
      </button>
      <button
        className={`px-2 py-1 text-sm  rounded-sm ${language === 'ne' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setLanguage('ne')}
      >
        नेपाली
      </button>
    </div>
  );
};

export default LanguageSwitcher;
