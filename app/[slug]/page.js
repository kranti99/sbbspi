"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "../../sanity/lib/client";
import { useLanguage } from "../../components/elements/LanguageContext";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import PageHeader from "@/components/elements/pageTitle";

const Page = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(
        `*[_type == "page" && slug.current == $slug][0]{
          title,
          description,
          slug,
          "featureImageUrl": featureImage.asset->url
        }`,
        { slug }
      );
      setPageData(data);
    };
    fetchData();
  }, [slug]);

  if (!pageData) {
    return <p>Loading...</p>;
  }

  const pageTitle = pageData.title?.[language] || pageData.title?.en || "Untitled Page";

  return (
    <div className="pb-16">
      <PageHeader title={pageTitle} breadcrumb={pageTitle} />
      <div className="container mx-auto">
       
        {pageData.featureImageUrl && (
          <div className="mb-8 flex">
            <Image
              src={pageData.featureImageUrl}
              alt="Feature Image"
              width={400} // Adjusted width
              height={225} // Adjusted height
              className="rounded-md shadow-lg"
            />
          </div>
        )}

        <div className="prose prose-lg">
          <PortableText
            value={pageData.description[language] || []}
            components={{
              types: {
                image: ({ value }) => (
                  <div className="my-8 flex justify-center">
                    <Image
                      src={value.asset.url}
                      alt={value.alt || "Image"}
                      width={800}
                      height={450}
                      className="rounded-md shadow-lg"
                    />
                  </div>
                ),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
