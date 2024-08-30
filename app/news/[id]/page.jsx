'use client';
// pages/news/[id].jsx
import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from '@/sanity/lib/client';

import { PortableText } from "@portabletext/react";
import Sidebar from "@/components/layout/sidebar"; // Adjust the path based on your setup

const NewsPage = ({ params }) => {
  const { id } = params;
  const [news, setNews] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        const data = await client.fetch(
          `*[_type == "news" && _id == $id][0] {
            title,
            _createdAt,
            content,
            "imageUrl": featureImage.asset->url
          }`,
          { id }
        );
        setNews(data);
      };
      fetchNews();
    }
  }, [id]);

  if (!news) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100 py-16 px-8">
      <div className="container mx-auto flex flex-col md:flex-row">
        <main className="w-full md:w-2/3 md:pr-8">
          <h1 className="text-4xl font-bold mb-8">{news.title}</h1>
          {news.imageUrl && (
            <Image
              src={news.imageUrl}
              alt={news.title}
              width={800}
              height={600}
              className="w-full h-auto object-cover mb-8 rounded-lg"
            />
          )}
          <p className="text-gray-600 text-sm mb-2">
            {new Date(news._createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
          <div className="prose">
            <PortableText value={news.content} />
          </div>
        </main>
        <Sidebar />
      </div>
    </div>
  );
};

export default NewsPage;
