'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from '@/components/elements/LanguageContext';

export default function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`bg-green-700 text-white`}>
      <div className="container mx-auto justify-between items-center py-2 hidden lg:flex">
        <div className="flex items-center space-x-4">
          <span className="text-white hover:text-secondary-100">
            <a href="mailto:sayiadhussian786@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} /> sayiadhussian786@gmail.com
            </a>
          </span>
          <span className="text-white hover:text-secondary-100">
            <a href="tel:9779867964282">
              <FontAwesomeIcon icon={faPhone} />{language === 'ne' ? '९७७-९८६७९६४२८२' : '977-9867964282'}
            </a>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href='/contact'>
            <button className="bg-secondary-400 text-black py-1 px-6 rounded-full hover:bg-secondary-600 hidden lg:block transition-all duration-300">
              {language === 'ne' ? 'सम्पर्क/गुनासो ' : 'Contact/Complaint'}
            </button>
          </Link>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
      <div className={`transition-all duration-300 bg-primary-800 ${isSticky ? 'shadow-lg sticky top-0 z-50 py-2' : 'py-4'}`} style={{ top: isSticky ? '0' : '', position: isSticky ? 'fixed' : 'relative', width: '100%', left: '0' }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href='/'><Image src="/logo.png" alt="CTEVT Logo" width={isSticky ? 50 : 60} height={isSticky ? 50 : 60} /></Link>
            <Link href='/'><h1 className="text-lg font-bold mb-0">
              {language === 'ne' ? 'भीमदत्त बहुप्राविधिक शिक्षालय ' : 'Bhimdutta Polytechnic Institute'}
            </h1></Link>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="hover:text-gray-400">
              {language === 'ne' ? 'गृह' : 'Home'}
            </Link>
            <Link href="/about" className="hover:text-gray-400">
              {language === 'ne' ? 'हाम्रोबारे' : 'About Us'}
            </Link>
            <Link href="/news" className="hover:text-gray-400">
              {language === 'ne' ? 'समाचार' : 'News/Events'}
            </Link>
            <Link href="/notices" className="hover:text-gray-400">
              {language === 'ne' ? 'सूचना' : 'Notice'}
            </Link>
            <div className="relative group">
              <button className="flex items-center hover:text-gray-400">
                {language === 'ne' ? 'ग्यालेरी' : 'Gallery'}
                <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 16l-6-6h12l-6 6z" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white text-black mt-0 rounded-lg shadow-lg py-2 z-10 w-48">
                <Link href="/gallery/images" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-200">
                  {language === 'ne' ? 'फोटो' : 'Images'}
                </Link>
                <Link href="/gallery/videos" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-200">
                  {language === 'ne' ? 'भिडियो' : 'Videos'}
                </Link>
              </div>
            </div>
            <Link href="/contact" className="hover:text-gray-400">
              {language === 'ne' ? 'सम्पर्क' : 'Contact'}
            </Link>
            <div className="relative group">
              <button className="flex items-center hover:text-gray-400">
                {language === 'ne' ? 'अन्य' : 'Others'}
                <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 16l-6-6h12l-6 6z" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white text-black mt-0 rounded-lg shadow-lg py-2 z-10 w-48">
                <Link href="/gallery/images" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-200">
                  {language === 'ne' ? 'प्रधानाध्यापकको सन्देश' : 'Message From Principle'}
                </Link>
                <Link href="/team" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-200">
                  {language === 'ne' ? 'हाम्रो टिम' : 'Our Team'}
                </Link>
              </div>
            </div>
          </nav>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white">
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} style={{ height: '1.5em' }} />
          </button>
        </div>
        {isMenuOpen && (
          <nav className="lg:hidden bg-green-800 py-3 w-full">
            <div className="container mx-auto flex flex-col items-start px-4 space-y-2">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400">Home</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400">About</Link>
              <div className="relative group">
                <button className="flex items-center hover:text-gray-400">
                  Academic Programs
                  <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 16l-6-6h12l-6 6z" />
                  </svg>
                </button>
                <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded-lg shadow-lg py-2">
                  <Link href="/programs/style1" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-200">Programs - Style 1</Link>
                  <Link href="/programs/style2" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-200">Programs - Style 2</Link>
                  <Link href="/programs/style3" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-200">Programs - Style 3</Link>
                </div>
              </div>
              <Link href="/news" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400">News/Events</Link>
              <Link href="/notices" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400">Notices</Link>
              <Link href="/gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400">Gallery</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400">Contact Us</Link>
              <button className="bg-yellow-500 text-black py-2 px-6 rounded-full mt-4 hover:bg-yellow-400 w-full">
                सम्पर्क/गुनासो
              </button>
              <span className="text-white mt-4">
                <a href="mailto:info@ctevt.org.np" className="hover:text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} /> info@ctevt.org.np
                </a>
              </span>
              <span className="text-white">
                <a href="tel:+0012334511" className="hover:text-gray-400">
                  <FontAwesomeIcon icon={faPhone} /> +(00) 123-345-11
                </a>
              </span>
              <div className="flex items-center space-x-2 mt-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
      {/* {isSearchOpen && <SearchComponent onClose={() => setIsSearchOpen(false)} />} */}
    </header>
  );
}
