import { defineType, defineField } from "sanity";

export default defineType({
  name: "carousel",
  title: "Carousel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English Title",
          type: "string",
        }),
        defineField({
          name: "ne",
          title: "Nepali Title",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Enables the user to crop the image dynamically
      },
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "Optional link to a resource or page",
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      }), // Link is not mandatory
    }),
  ],
});
