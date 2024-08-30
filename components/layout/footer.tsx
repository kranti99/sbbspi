'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faLinkedin, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ScrollToTop from "@/components/elements/ScrollToTop";
import { useLanguage } from '@/components/elements/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-custom-dark text-white pt-20 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Social Links */}
          <div>
            <div className="flex items-center space-x-4 pb-2">
              <Image src="/logo.png" alt="Logo" width={80} height={80} className="mb-4" />
              <h1 className="text-lg font-bold">{language === 'ne' ? 'भीमदत्त बहुप्राविधिक शिक्षालय' : 'Bhimdutta Polytechnic Institute'} </h1>
            </div>
            <p className="mb-4">
            {language === 'ne' ? 'भीमदत्त बहुप्राविधिक शिक्षालय (बिडिपिआई) प्राविधिक शिक्षा तथा व्यावसायिक तालीम परिषद् (सीटीईभीटी) को ४८ औँ आङ्गिक संस्था हो ।' : 'Bhimdutta Polytechnic Institute (BDPI) is Forty Eighth constituent institute of the Council for Technical Education and Vocational Training (CTEVT).'}
           

            </p>
            <div className="flex space-x-4">
              <Link href="#"><FontAwesomeIcon icon={faInstagram} className="text-white hover:text-gray-400" /></Link>
              <Link href="#"><FontAwesomeIcon icon={faTwitter} className="text-white hover:text-gray-400" /></Link>
              <Link href="#"><FontAwesomeIcon icon={faLinkedin} className="text-white hover:text-gray-400" /></Link>
              <Link href="#"><FontAwesomeIcon icon={faFacebook} className="text-white hover:text-gray-400" /></Link>
              <Link href="#"><FontAwesomeIcon icon={faYoutube} className="text-white hover:text-gray-400" /></Link>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-bold text-xl mb-4">{language === 'ne' ? 'उपयोगी लिङ्कहरू' : 'Useful Links'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2 footer-links">
                <li><Link href="/about" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faChevronRight} className="mr-2" /> {language === 'ne' ? 'हाम्रोबारे' : 'About Us'}</Link></li>
              
                <li><Link href="/message-from-principal" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faChevronRight} className="mr-2" />{language === 'ne' ? 'प्रधानाध्यापकको सन्देश' : 'Message From Principle'}</Link></li>
                <li><Link href="/team" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faChevronRight} className="mr-2" />{language === 'ne' ? 'हाम्रो टिम' : 'Our Team'}</Link></li>
                <li><Link href="/contact" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faChevronRight} className="mr-2" />{language === 'ne' ? 'सम्पर्क' : 'Contact Us'}</Link></li>
              </ul>
              <ul className="space-y-2 footer-links">
                <li><Link href="/news" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faChevronRight} className="mr-2" />{language === 'ne' ? 'समाचार' : 'News/Events'}</Link></li>
                <li><Link href="/notices" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faChevronRight} className="mr-2" />{language === 'ne' ? 'सूचना' : 'Notice'}</Link></li>
                <li><Link href="/gallery/images" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faChevronRight} className="mr-2" /> {language === 'ne' ? 'फोटो' : 'Images'}</Link></li>
                <li><Link href="/gallery/videos" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faChevronRight} className="mr-2" />{language === 'ne' ? 'भिडियो' : 'Videos'}</Link></li>
              </ul>
            </div>
          </div>

          {/* Facebook Page Widget */}
          <div>
            <h3 className="font-bold text-xl mb-4"> {language === 'ne' ? 'फेसबुक पेज' : 'Facebook Page'}</h3>
            <div className="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-width="" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
              <blockquote cite="https://www.facebook.com/facebook" className="fb-xfbml-parse-ignore">
                <Link href="https://www.facebook.com/facebook">Facebook</Link>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-center md:text-left">
          <div>
            <Link href="tel:9779867964282">
            <div className="bg-primary-600 text-white py-4 px-6 rounded max-w-80 hover:bg-primary-700 flex items-center">
              <FontAwesomeIcon icon={faPhone} className="text-3xl mr-4" />
              <div>
                <p className="text-lg">Phone No: <br/>977-9867964282</p>
              </div>
            </div>
            </Link>
          </div>
          <div>
          <Link href="#">
            <div className="bg-primary-600 text-white py-4 px-6 rounded  max-w-80 hover:bg-primary-700 flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-3xl mr-4" />
              <div>
                <p className="text-lg">Email Address: <br/>sayiadhussian786@gmail.com</p>
              </div>
            </div>
            </Link>
          </div>
          <div>
          <Link href="#">
            <div className="bg-primary-600 text-white py-4 px-6 rounded max-w-80 hover:bg-primary-700 flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-3xl mr-4" />
              <div>
                <p className="text-lg">{language === 'ne' ? 'पाटन-०६, पाटन' : 'Patan-06, Patan'} <br/>
                {language === 'ne' ? 'बैतडी':'Baitadi'}<br/>
                </p>
              </div>
            </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-custom-darker py-4 mt-8">
        <div className="max-w-screen-xl mx-auto text-center md:text-center md:items-center">
          <p className='mb-0'>&copy; {language === 'ne' ? 'भीमदत्त बहुप्राविधिक शिक्षालय २०२४, सर्वाधिकार सुरक्षित' : 'Bhimdutta Polytechnic Institute 2024, All Rights Reserved.'}</p>
        </div>
      </div>
      <ScrollToTop />

    </footer>
  );
}
