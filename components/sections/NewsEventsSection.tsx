"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useLanguage } from "@/components/elements/LanguageContext";

interface NewsItem {
  _id: string;
  title: string;
  date: string;
  imageUrl?: string;
  content: { children: { text: string }[] }[];
}

const NewsEventsSection = () => {
  const { language } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: NewsItem[] = await client.fetch(`
        *[_type == "news"] | order(date desc) {
          _id,
          title,
          date,
          "imageUrl": featureImage.asset->url,
          content
        }
      `);
      setNews(data);
    };
    fetchData();
  }, []);

  const getExcerpt = (blocks: { children: { text: string }[] }[]) => {
    if (!blocks || !blocks[0] || !blocks[0].children) return "";
    const text = blocks[0].children[0].text;
    const words = text.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + "...";
    }
    return text; // Return full text if less than 20 words
  };

  return (
    <div className="relative py-16 px-8 text-white">
      <div className="NewsSection">
        <div className="fixed-bg" style={{ backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a)' }}></div>
        <div className="container mx-auto relative pt-24">
          <h2 className="text-4xl font-bold mb-8 text-center"> {language === 'en' ? 'News/Event' : 'समाचार/घटना'}</h2>
          <div className="flex flex-wrap -mx-4">
            {news.map((item) => (
              <div key={item._id} className="w-full md:w-1/3 px-4 mb-8">
                <Link href={`/news/${item._id}`} className="newsSectionItem block bg-white text-gray-900 overflow-hidden transition-transform transform hover:scale-105">
                  <div className="relative h-64 overflow-hidden">
                    {item.imageUrl ? (
                      <div className="relative h-full">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform transform hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Image
                          src='/img/bhimdutta.png'
                          alt={item.title}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform transform hover:scale-110"
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-6 text-center bg-white relative z-10">
                    <h3 className="text-lg font-semibold mb-2 text-green-600">
                      {item.title.toUpperCase()}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {getExcerpt(item.content)}
                    </p>
                  </div>
                  <div className="newsSectionItem-border"></div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/news"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-800 transition"
            >
              {language === 'en' ? 'More News' : 'थप समाचार'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsEventsSection;
