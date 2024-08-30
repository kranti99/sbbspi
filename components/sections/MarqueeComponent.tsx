"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from '@/sanity/lib/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons"; // Importing the FontAwesome bell icon
import { useLanguage } from "@/components/elements/LanguageContext"; // Ensure this path is correct

interface MarqueeItem {
  title: string;
  url: string;
}

interface NewsItem {
  _id: string;
  title: string;
}

function MarqueeComponent() {
  const [items, setItems] = useState<MarqueeItem[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchMarqueeItems = async () => {
      const newsData: NewsItem[] = await client.fetch(`
        *[_type == "news"] | order(date desc) {
          _id,
          title
        }
      `);

      const noticeData: NewsItem[] = await client.fetch(`
        *[_type == "notice"] | order(date desc) {
          _id,
          title
        }
      `);

      const items = [
        ...newsData.map((news) => ({
          title: news.title,
          url: `/news/${news._id}`,
        })),
        ...noticeData.map((notice) => ({
          title: notice.title,
          url: `/notices/${notice._id}`,
        })),
      ];

      setItems(items);
    };

    fetchMarqueeItems();
  }, []);

  return (
    <div className="relative overflow-hidden bg-gray-100 text-black py-2 px-4 rounded-md shadow-md">
      <div className="flex items-center">
        <div className="bg-primary-600 text-white py-1 px-3 rounded-l-md font-semibold flex items-center space-x-2 mr-2">
          <FontAwesomeIcon icon={faBell} />
          <span>{language === 'en' ? 'Latest Updates' : 'पछिल्लो अपडेट'}</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex items-center whitespace-nowrap marquee-container">
            <div className="flex space-x-16">
              {items.concat(items).map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="flex items-center mx-4 text-sm hover:underline"
                >
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .marquee-container {
          animation: marquee 60s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default MarqueeComponent;
