"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { client } from '@/sanity/lib/client';
import PageHeader from "@/components/elements/pageTitle";
import { useLanguage } from "@/components/elements/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faImage } from "@fortawesome/free-solid-svg-icons";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const NoticeArchivePage = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recentNotices, setRecentNotices] = useState([]);
  const itemsPerPage = 12;
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      const countQuery = '*[_type == "notice"]{_id}';
      const totalNotices = await client.fetch(countQuery);
      setTotalPages(Math.ceil(totalNotices.length / itemsPerPage));

      const data = await client.fetch(
        `*[_type == "notice"] | order(date desc) [${
          (currentPage - 1) * itemsPerPage
        }...${currentPage * itemsPerPage}] {
          _id,
          title,
          date,
          "fileUrl": file.asset->url,
          "fileType": file.asset->mimeType,
          _createdAt
        }`
      );
      setNotices(data);

      const recentData = await client.fetch(
        `*[_type == "notice"] | order(_createdAt desc) [0...5] {
          _id,
          title,
          "fileUrl": file.asset->url
        }`
      );
      setRecentNotices(recentData);
    };
    fetchData();
  }, [currentPage]);

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  return (
    <>
      <PageHeader title={language === "ne" ? "सूचना" : "Notice"} breadcrumb={language === "ne" ? "सूचना" : "Notice"} />

      <div className="bg-white py-16 px-8">
        <div className="container mx-auto flex flex-wrap">
          <div className="w-full pr-8">
            <table className="w-full table-auto shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className= "text-left text-white">
                  <th className="px-6 py-3 bg-primary-800">#</th>
                  <th className="px-6 py-3 bg-primary-800">Title</th>
                  <th className="px-6 py-3 bg-primary-800">Date</th>
                  <th className="px-6 py-3 bg-primary-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice, index) => (
                  <tr key={notice._id} className="border-b hover:bg-primary-200">
                    <td className="px-6 py-4">
                      <Link href={notice.fileUrl} data-fancybox={notice.title} data-caption={notice.title}>

                      {notice.fileType === "application/pdf" ? (
                        <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
                      ) : (
                        <FontAwesomeIcon icon={faImage} className="text-blue-500" />
                      )}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={notice.fileUrl} data-fancybox={notice.title} data-caption={notice.title}
                        className="text-primary-900 hover:underline"
                      >
                        {notice.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                    <Link href={notice.fileUrl} data-fancybox={notice.title} data-caption={notice.title}>
                      {new Date(notice._createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={notice.fileUrl} data-fancybox={notice.title} data-caption={notice.title}
                        className="text-primary-900 hover:underline"
                      >
                        {notice.fileType === "application/pdf"
                          ? "View PDF"
                          : "View Image"}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-8">
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full mr-4 hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeArchivePage;
