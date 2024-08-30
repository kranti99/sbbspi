"use client";

import React, { useEffect, useState } from 'react';
import { client } from "@/sanity/lib/client";
import { PortableText } from '@portabletext/react';
import Link from "next/link";
import { faFilePdf, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const pdfIconUrl = "/path/to/pdf-icon.png"; // Update this path to your PDF icon

const NoticeSection = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`
        *[_type == "notice"] | order(date desc) {
          _id,
          title,
          description,
          date,
          "fileUrl": file.asset->url,
          "fileType": file.asset->mimeType
        }
      `);
      console.log("Fetched notices:", data);
      setNotices(data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white py-8 px-0 ">
      <div className="mx-auto bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center bg-primary-600 px-4 py-2 rounded-t-lg">
          <h2 className="text-2xl font-bold text-white mb-0">
            Notice
          </h2>
          <Link href="/notices">
            <button className="bg-secondary-500 hover:bg-secondary-600 text-black py-1 px-4 rounded-lg">
              View All
            </button>
          </Link>
        </div>
        <div>
          {notices.slice(0, 5).map((notice) => (
            <div
              key={notice._id}
            >
                <Link href={notice.fileUrl} data-fancybox={notice.title} data-caption={notice.title} className="flex items-center border-b border-gray-300 p-3 hover:bg-primary-200 transition duration-300">

              <div className="flex-shrink-0 mr-4">
                <Link href={notice.fileUrl} data-fancybox={notice.title} data-caption={notice.title}>
                  {notice.fileType === "application/pdf" ? (
                    <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
                  ) : (
                    <FontAwesomeIcon icon={faImage} className="text-blue-500" />
                  )}
                </Link>
              </div>
              <div className="flex-grow">
                <h6 className="font-semibold text-black mb-1">
                  <Link href={notice.fileUrl} data-fancybox={notice.title} data-caption={notice.title}>
                    {notice.title}
                  </Link>
                </h6>
              </div>
              </Link>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeSection;
