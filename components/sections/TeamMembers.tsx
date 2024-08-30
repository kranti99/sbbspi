"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

interface TeamMember {
  _id: string;
  name: string;
  jobTitle: string;
  imageUrl: string;
}

const TeamMembers: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: TeamMember[] = await client.fetch(`
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

  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {teamMembers.map((member) => (
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
        <button className="bg-primary-600 text-white mt-6 py-2 px-6 rounded-md text-center self-start hover:bg-primary-800 transition duration-200">
          <Link href="/team">View all</Link>
        </button>
      </div>
    </div>
  );
};

export default TeamMembers;
