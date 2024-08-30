"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useLanguage } from "@/components/elements/LanguageContext";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

type PageData = {
  title: {
    en: string;
    ne?: string;
  };
  description: {
    [key: string]: {
      _type: string;
      children: {
        _type: string;
        text: string;
      }[];
    }[];
  };
  featureImageUrl?: string;
};

const MessageFromPrincipal = () => {
  const { language } = useLanguage();
  const [pageData, setPageData] = useState<PageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch<PageData>(
        `*[_type == "page" && slug.current == "message-from-principal"][0]{
          title,
          description,
          "featureImageUrl": featureImage.asset->url
        }`
      );
      setPageData(data);
    };
    fetchData();
  }, []);

  if (!pageData) {
    return <p>Loading...</p>;
  }

  // Truncate description to 100 words
  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const descriptionText = pageData.description[language]?.map(block =>
    block.children?.map(child => child.text).join('')
  ).join(' ') || '';

  return (
    <div className="bg-primary-600 shadow-lg rounded-lg p-4 md:p-4">
      {pageData.featureImageUrl && (
        <div className="flex justify-center mb-4">
          <Image
            src={pageData.featureImageUrl}
            alt="Feature Image"
            width={300}
            height={150}
            className="rounded-md shadow-md"
          />
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4 text-white">{pageData.title[language] || pageData.title.en || "Message from Principal"}</h2>
      <p className="text-gray-700 mb-6 text-white">
        {truncateText(descriptionText, 30)}
      </p>
      <Link href="/message-from-principal" className="inline-block bg-secondary-500 text-black py-2 px-4 rounded-md shadow hover:bg-secondary-600 transition duration-200">
        {language === 'en' ? 'Read More' : 'थप पढ्नुहोस्'}
      </Link>
    </div>
  );
};

export default MessageFromPrincipal;
