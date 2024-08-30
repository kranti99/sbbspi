// // lib/sanityClient.js

// import { createClient } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";

// export default const client = createClient({
//   projectId: "i99zctfa",
//   dataset: "production",
//   apiVersion: "2023-07-01", // Use the current API version
//   useCdn: true, // `false` if you want to ensure fresh data
//   token: process.env.SANITY_API_TOKEN, // Optional: if you need to use authenticated requests
// });

// const builder = imageUrlBuilder(client);
// export const urlFor = (source) => builder.image(source);

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
export const client = createClient({
  projectId: "i99zctfa",
  dataset: "production",
  apiVersion: "2024-03-11",
  // Set to `true` for production environments
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
