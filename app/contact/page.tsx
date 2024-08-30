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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can handle form submission logic, such as sending data to a server or displaying it.
    console.log(formData); // Example: Log form data to console
    // Reset form fields if needed
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div>
      <PageHeader
        title={language === 'ne' ? 'सम्पर्क' : 'Contact Us'}
        breadcrumb={language === 'ne' ? 'सम्पर्क' : 'Contact Us'}
      />
      <div className="container pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link href="tel:9779867964282">
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <FontAwesomeIcon icon={faPhone} size="2x" />
              </div>
              <h2 className="text-lg font-semibold">{language === 'ne' ? 'फोन नम्बर' : 'Phone Number'}</h2>
              <p className="mt-2">9867964282</p>
            </div>
          </Link>
          <Link href="mailto:sayiadhussian786@gmail.com">
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </div>
              <h2 className="text-lg font-semibold">
                {language === 'ne' ? 'इमेल ठेगाना' : 'Email Address'}
              </h2>
              <p className="mt-2">sayiadhussian786@gmail.com</p>
            </div>
          </Link>
          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
            </div>
            <h2 className="text-lg font-semibold">{language === 'ne' ? 'ठेगाना' : 'Address'}</h2>
            <p className="mt-2">Patan-06, Baitadi</p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ne' ? 'केवल नमस्कार भन्नुहोस्' : "Don't be a stranger just say hello."}
          </h2>
          <p className="text-gray-600">
            {language === 'ne'
              ? 'हामी केही क्षणहरूमा तपाईंसँग फिर्ता सम्पर्क गर्नेछौं। हाम्रो टोली सँधै तपाईलाई मद्दत र मार्गदर्शन गर्नको लागि त्यहाँ हुन्छ।'
              : 'We will connect back to you in next few moments. Our team of professional scholars are always there to help and guide you.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <form
              className="bg-white p-8 rounded-lg shadow-lg"
              onSubmit={handleSubmit} // Handle form submission
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  {language === 'ne' ? 'तपाईको नाम' : 'Your Name'}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder={language === 'ne' ? 'तपाईको नाम' : 'Your Name'}
                  name="name"
                  value={formData.name} // Bind value to state
                  onChange={handleInputChange} // Handle input change
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  {language === 'ne' ? 'इमेल ठेगाना' : 'Email Address'}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder={language === 'ne' ? 'इमेल ठेगाना' : 'Email Address'}
                  name="email"
                  value={formData.email} // Bind value to state
                  onChange={handleInputChange} // Handle input change
                />
              </div>
              <div className="mb-4 md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  {language === 'ne' ? 'सन्देश' : 'Message'}
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  rows={5}
                  placeholder={language === 'ne' ? 'सन्देश' : 'Message'}
                  name="message"
                  value={formData.message} // Bind value to state
                  onChange={handleInputChange} // Handle input change
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit" // Submit button
                >
                  {language === 'ne' ? 'सन्देश पठाउनुहोस्' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center mt-8">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3473.6216728817626!2d80.54712887532187!3d29.469055875218373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a1430eae715aa1%3A0x293e2fcbc10ade6c!2sBhimdatt%20polytechnic%20institute%20patan%20Baitadi!5e0!3m2!1sen!2snp!4v1720785094107!5m2!1sen!2snp"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
            <h3 className="text-lg font-bold mb-4">
              {language === 'ne'
                ? 'हामीलाई सामाजिक सञ्जालमा फलो गर्नुहोस्'
                : 'Follow Us On Social Media'}
            </h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-blue-600">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
