import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface NewsItem {
  _id: string;
  title: string;
  imageUrl?: string;
}

interface NoticeItem {
  _id: string;
  title: string;
}

const Sidebar: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [latestNotices, setLatestNotices] = useState<NoticeItem[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      const latestNewsData = await client.fetch(
        `*[_type == "news"] | order(_createdAt desc) [0...5] {
          _id,
          title,
          "imageUrl": featureImage.asset->url
        }`
      );
      setLatestNews(latestNewsData);

      const latestNoticesData = await client.fetch(
        `*[_type == "notice"] | order(_createdAt desc) [0...5] {
          _id,
          title
        }`
      );
      setLatestNotices(latestNoticesData);

      const popularTagsData = ["News", "Events", "Updates", "Announcements"];
      setPopularTags(popularTagsData);
    };
    fetchSidebarData();
  }, []);

  return (
    <aside className="w-full md:w-1/3 mt-8 md:mt-0">
      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Latest News</h3>
        <ul style={{ listStyle: 'none' }}>
          {latestNews.map((item) => (
            <li key={item._id} className="mb-4 border-b-1">
              <Link href={`/news/${item._id}`} className="flex items-center">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="w-12 h-12 object-cover rounded-full mr-4"
                  />
                )}
                <span className="text-gray-700 hover:underline">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;
