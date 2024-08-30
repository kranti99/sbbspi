import { defineType, defineField } from "sanity";

export default defineType({
  name: "news",
  type: "document",
  title: "News",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "featureImage",
      type: "image",
      title: "Feature Image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
