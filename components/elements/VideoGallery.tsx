"use client";
import { useEffect, useState } from 'react';
import { client } from "@/sanity/lib/client";
import { useLanguage } from '@/components/elements/LanguageContext';
import PageHeader from "@/components/elements/pageTitle";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface Video {
  _id: string;
  title: { [key: string]: string } | null;
  url: string;
}

const VideoGallery = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { language } = useLanguage();

  const videosPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch<Video[]>(`
        *[_type == "video"] {
          _id,
          title,
          url
        }
      `);
      setVideos(data);
    };

    fetchData();
  }, [language]);

  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  };

  const getYouTubeThumbnailUrl = (videoId: string | null): string | null => {
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * videosPerPage;
  const selectedVideos = videos.slice(startIndex, startIndex + videosPerPage);

  return (
    <div>
      <PageHeader title={language === 'ne' ? 'भिडियो ग्यालेरी' : 'Video Gallery'} breadcrumb={language === 'ne' ? 'भिडियो ग्यालरी' : 'Video Gallery'} />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">
          {language === 'en' ? 'Video Gallery' : 'भिडियो ग्यालरी'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedVideos.map((video) => {
            const videoId = getYouTubeVideoId(video.url);
            const thumbnailUrl = getYouTubeThumbnailUrl(videoId) || '';
            const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

            return (
              <div key={video._id} className="relative" data-fancybox>
                {embedUrl ? (
                  <a href={embedUrl} data-fancybox="gallery" data-caption={video.title?.[language] || video.title?.en || 'Untitled Video'}>
                    <div className="relative">
                      <img src={thumbnailUrl} alt={video.title?.[language] || video.title?.en || 'Untitled Video'} className="w-full h-64 object-cover rounded-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 8l6 4-6 4V8z" />
                          <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm14 16H5V5h14v14z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </a>
                ) : (
                  <p className="text-center text-red-500">Invalid video URL</p>
                )}
                <p className="mt-2 text-center">
                  {video.title?.[language] || video.title?.en || 'Untitled Video'}
                </p>
              </div>
            );
          })}
        </div>

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
            disabled={startIndex + videosPerPage >= videos.length}
            className={`px-4 py-2 mx-2 ${startIndex + videosPerPage >= videos.length ? 'bg-gray-300' : 'bg-primary-600 text-white'} rounded-md`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
