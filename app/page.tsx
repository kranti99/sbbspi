'use client';
import React, { useState, useEffect } from 'react';

import CarouselComponent from "@/components/sections/heroSlider";
import MarqueeComponent from "@/components/sections/MarqueeComponent";
import AboutUsSection from "@/components/sections/about";
import NewsEventsSection from "@/components/sections/NewsEventsSection";
import NoticeSection from "@/components/sections/NoticeSection";
import TeamMembers from "@/components/sections/TeamMembers";
import Popup from '@/components/elements/popop';
import MessageFromPrincipal from '@/components/sections/messageFromPrincipal';

export default function Home() {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupVisible(true);
    }, 500); // Delay to show popup on page load

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="no-scrollbar" style={{maxWidth:'98vw'}}>
      <MarqueeComponent />
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-8/12 px-4">
            <CarouselComponent />
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <NoticeSection />
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4 items-center">
          <div className="w-full lg:w-9/12 px-2">
            <AboutUsSection />
          </div>
          <div className="w-full lg:w-3/12 px-2">
            <MessageFromPrincipal />
          </div>
        </div>
      </div>
      
      <NewsEventsSection />
      <TeamMembers />
      {isPopupVisible && <Popup onClose={handlePopupClose} />}
    </main>
  );
}