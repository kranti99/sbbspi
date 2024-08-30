import React, { useState, useEffect, MouseEvent } from 'react';
import { client, urlFor } from '@/lib/sanity';

interface PopupProps {
  onClose: () => void;
}

interface PopupData {
  imageUrl?: string;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);

  useEffect(() => {
    const fetchPopupData = async () => {
      const popupData = await client.fetch(`*[_type == "popup"]`);
      if (popupData) {
        setPopups(popupData.slice(0, 3)); // Limit to 3 popups
      }
    };
    fetchPopupData();
  }, []);

  const handleNextPopup = () => {
    if (currentPopupIndex < popups.length - 1) {
      setCurrentPopupIndex(currentPopupIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePopupClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent closing when clicking inside the popup
  };

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleNextPopup();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick} // Handle click outside the popup
    >
      {popups.map((popup, index) => (
        index === currentPopupIndex && (
          <div
            key={index}
            className="relative bg-white rounded-lg overflow-hidden shadow-lg m-4 max-w-2xl transition-transform transform scale-100 duration-300 ease-out"
            style={{ maxHeight: '96vh' }}
            onClick={handlePopupClick}
          >
            {popup.imageUrl && (
              <img src={urlFor(popup.imageUrl).url()} alt="Popup Image" className="max-w-full max-h-full" />
            )}
            <button
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-lg py-0 px-3 hover:bg-gray-900 text-4xl"
              onClick={handleNextPopup}
            >
              &times;
            </button>
          </div>
        )
      ))}
    </div>
  );
};

export default Popup;
