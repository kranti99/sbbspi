"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { useLanguage } from '@/components/elements/LanguageContext';

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface Block {
  _type: string;
  children: Array<{ text: string }>;
}

interface Description {
  [key: string]: Block[];
}

interface AboutData {
  description: Description;
}

const AboutUsSection: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`*[_type == "page" && slug.current == "about"][0]`);
      setAboutData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
  }, []);

  if (!aboutData) {
    return <p>Loading...</p>;
  }

  const description = aboutData.description[language]?.map((block) => {
    if (block._type === "block") {
      return block.children[0].text;
    }
    return '';
  }).join(' ');

  return (
    <div className="bg-white py-16 px-8">
      <div className="mx-auto flex flex-wrap">
        {/* Left Column */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-start md:pr-4 mb-8 md:mb-0">
          <div className="bg-primary-600 text-white rounded-md p-4 mb-4 text-center w-full">
            <div className="flex flex-col items-center">
              <p className="flex items-center mb-0">5 star Review</p>
              <span className="text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.26 3.907h4.106c.969 0 1.371 1.24.588 1.81l-3.316 2.416 1.26 3.907c.3.921-.755 1.688-1.54 1.18L10 13.011l-3.316 2.416c-.784.508-1.84-.259-1.54-1.18l1.26-3.907-3.316-2.416c-.784-.57-.381-1.81.588-1.81h4.106l1.26-3.907z"/>
                  </svg>
                ))}
              </span>
            </div>
          </div>
          
          <div className="relative">
            <Image
              src="/img/bhimdatta.png"
              alt="Image 2"
              width={500}
              height={500}
              className="rounded-md shadow-lg"
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <a 
                href="https://www.youtube.com/embed/R6hLWFYB-kc?si=G6gquwI59onF_Wb9"
                data-fancybox
                className="bg-white text-purple-600 p-3 rounded-full shadow-lg"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.5 5.5a.5.5 0 0 1 .812-.39l5 4a.5.5 0 0 1 0 .78l-5 4A.5.5 0 0 1 6 13.5V5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-3/5 flex flex-col justify-center pl-8">
          <div className="mb-8">
            <h2 className="text-xl text-purple-600 font-semibold mb-2">
              {language === 'ne' ? 'आजीवन शिक्षाको प्रवेशद्वार ' : 'Gateway to Lifelong Learning'}
            </h2>
            <h1 className="text-4xl text-black font-bold mb-4">
              {language === 'ne' ? 'भीमदत्त बहुप्राविधिक शिक्षालय ' : 'Bhimdutta Polytechnic Institute'}
            </h1>
            <p className="text-gray-700 mb-8">
              {description.slice(0, 400)}...
            </p>
          </div>
          <div className="flex mb-8">
            {/* Add any additional content or components here */}
          </div>
          
          <button className="bg-primary-600 text-white py-2 px-6 rounded-md self-start hover:bg-primary-800 transition duration-200">
            <Link href="/about"> {language === 'ne' ? 'थप पढ्नुहोस्' : 'About Us'}</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
