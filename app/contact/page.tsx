"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import PageHeader from '@/components/elements/pageTitle';
import { useLanguage } from '@/components/elements/LanguageContext'; // Make sure the path is correct
import Link from 'next/link';

const ContactPage = () => {
  const { language } = useLanguage();
  

  return (
    <div>
      <PageHeader
        title={language === 'ne' ? 'सम्पर्क' : 'Contact Us'}
        breadcrumb={language === 'ne' ? 'सम्पर्क' : 'Contact Us'}
      />
      <div className="container pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link href="tel:9779858488445">
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <FontAwesomeIcon icon={faPhone} size="2x" />
              </div>
              <h2 className="text-lg font-semibold">{language === 'ne' ? 'फोन नम्बर' : 'Phone Number'}</h2>
              <p className="mt-2">9858488445</p>
            </div>
          </Link>
          <Link href="mailto:sbbspiathala@gmail.com">
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </div>
              <h2 className="text-lg font-semibold">
                {language === 'ne' ? 'इमेल ठेगाना' : 'Email Address'}
              </h2>
              <p className="mt-2">sbbspiathala@gmail.com</p>
            </div>
          </Link>
          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
            </div>
            <h2 className="text-lg font-semibold">{language === 'ne' ? 'ठेगाना' : 'Address'}</h2>
            <p className="mt-2">Athala, Bajhang</p>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-16 text-center">
          

          <div className="text-center mt-12">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3471.070024058869!2d81.1709582!3d29.543455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a395d476ca129d%3A0x237af1b50a397d13!2sShahid%20brish%20Bahadur%20Singh%20polytechnic%20institute%20naura%20%2FAthala%20Bajhang!5e0!3m2!1sen!2snp!4v1725007212443!5m2!1sen!2snp"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
            {/* <h3 className="text-lg font-bold mb-4 mt-8">
              {language === 'ne'
                ? 'हामीलाई सामाजिक सञ्जालमा फलो गर्नुहोस्'
                : 'Follow Us On Social Media'}
            </h3>
            <div className="flex justify-center space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100090047912855" className="text-blue-600">
                <FontAwesomeIcon icon={faFacebookF} size="2x" />
              </a>
              <a href="#" className="text-blue-400">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="#" className="text-red-600">
                <FontAwesomeIcon icon={faGooglePlusG} size="2x" />
              </a>
              <a href="#" className="text-blue-800">
                <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
