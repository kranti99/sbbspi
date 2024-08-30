"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import PageHeader from "@/components/elements/pageTitle";
import { useLanguage } from '@/components/elements/LanguageContext';

interface TeamMember {
  _id: string;
  name: string;
  jobTitle: string;
  imageUrl: string;
}

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 12;
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch<TeamMember[]>(`
        *[_type == "teamMember"] {
          _id,
          name,
          jobTitle,
          "imageUrl": image.asset->url
        }
      `);
      setTeamMembers(data);
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(teamMembers.length / membersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = teamMembers.slice(indexOfFirstMember, indexOfLastMember);

  return (
    <>
      <PageHeader title={language === 'ne' ? 'हाम्रो समूह' : 'Our Team'} breadcrumb={language === 'ne' ? 'हाम्रो समूह' : 'Our Team'} />

      <div className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            {language === 'ne' ? 'हाम्रो समूह' : 'Our Team'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            {currentMembers.map((member) => (
              <div
                key={member._id}
                className="team-member flex flex-col items-center text-center relative mb-16"
              >
                <div className="relative w-44 h-44 rounded-full overflow-hidden transition-all duration-300">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="info left-0 right-0 bg-white pt-4 pb-2 border-t-4 border-yellow-500 transition-all duration-300 transform translate-y-full hover:translate-y-1/2 hover:border-yellow-500">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.jobTitle}</p>
                </div>
              </div>
            ))}
          </div>
          {teamMembers.length > membersPerPage && (
            <div className="pagination mt-8">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamMembers;
