"use client";
import { useEffect, useState } from 'react';
import { client } from "@/sanity/lib/client";

import Image from 'next/image';
import { useLanguage } from '@/components/elements/LanguageContext';
import PageHeader from "@/components/elements/pageTitle";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface Image {
  _key: string;
  imageUrl: string;
  title: { [key: string]: string } | null;
}

interface ImageGroup {
  _id: string;
  title: { [key: string]: string } | null;
  images: Image[];
}

const ImageGallery = () => {
  const [groups, setGroups] = useState<ImageGroup[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { language } = useLanguage();

  const galleriesPerPage = 6;
  const imagesPerGallery = 4;

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch<ImageGroup[]>(`
        *[_type == "imageGroup"] {
          _id,
          title,
          images[] {
            _key,
            "imageUrl": asset->url,
            title
          }
        }
      `);
      setGroups(data);
    };

    fetchData();
  }, [language]);

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * galleriesPerPage;
  const selectedGroups = groups.slice(startIndex, startIndex + galleriesPerPage);

  return (
    <div>
      <PageHeader title={language === 'ne' ? 'तस्बिर ग्यालेरी' : 'Image Gallery'} breadcrumb={language === 'ne' ? 'तस्बिर ग्यालेरी' : 'Image Gallery'} />
      <div className="container mx-auto py-8">
        {selectedGroups.map((group) => (
          <div key={group._id} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {group.title?.[language] || group.title?.en || 'Untitled Group'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {group.images.slice(0, imagesPerGallery).map((image, index) => (
                <div key={image._key} className="relative w-64 h-56">
                  <a href={image.imageUrl} data-fancybox='gallery' data-caption={`${group.title?.[language] || group.title?.en || 'Untitled Group'} - ${image.title?.[language] || image.title?.en || 'Untitled Image'}`}>
                    <Image
                      src={image.imageUrl}
                      alt={image.title?.[language] || image.title?.en || 'Untitled Image'}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    {index === imagesPerGallery - 1 && group.images.length > imagesPerGallery && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <p className="text-white text-lg font-bold">{`+ ${group.images.length - imagesPerGallery} more images`}</p>
                      </div>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-primary-600 text-white'} rounded-md`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={startIndex + galleriesPerPage >= groups.length}
            className={`px-4 py-2 mx-2 ${startIndex + galleriesPerPage >= groups.length ? 'bg-gray-300' : 'bg-primary-600 text-white'} rounded-md`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
