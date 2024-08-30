"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from '@/sanity/lib/client';

import PageHeader from "@/components/elements/pageTitle";
import { useLanguage } from "@/components/elements/LanguageContext";

const NewsArchivePage = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the total number of news items
        const countQuery = '*[_type == "news"]{_id}';
        const totalNews = await client.fetch(countQuery);
        setTotalPages(Math.ceil(totalNews.length / itemsPerPage));

        // Fetch the news items for the current page
        const data = await client.fetch(
          `*[_type == "news"] | order(_createdAt desc) [${
            (currentPage - 1) * itemsPerPage
          }...${currentPage * itemsPerPage}] {
            _id,
            title,
            _createdAt,
            "imageUrl": featureImage.asset->url,
            content
          }`
        );
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
        // Handle error state
      }
    };
    fetchData();
  }, [currentPage, language]);

  const getExcerpt = (blocks) => {
    if (!blocks || !blocks[0] || !blocks[0].children) return "";
    return blocks[0].children[0].text.slice(0, 100) + "...";
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded-full mx-1 ${
            currentPage === i ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="bg-gray-100 pb-16">
      <PageHeader
        title={language === 'ne' ? 'समाचार' : 'News'}
        breadcrumb={language === 'ne' ? 'समाचार' : 'News'}
      />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item._id}>
              <Link
                href={`/news/${item._id}`}
                className="block bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title?.[language] || item.title?.en || 'News Image'}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">
                      {language === 'ne' ? 'तस्बिर उपलब्ध छैन' : 'No Image Available'}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-2">
                    {new Date(item._createdAt).toLocaleDateString(language === 'ne' ? 'ne-NP' : 'en-US', {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600 hover:underline">
                  {item.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {getExcerpt(item.content)}
                  </p>
                  <p className="text-blue-600 hover:underline">
                    {language === 'ne' ? 'अधिक पढ्नुहोस्' : 'Read more'}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">{renderPagination()}</div>
      </div>
    </div>
  );
};

export default NewsArchivePage;
