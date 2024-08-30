import { defineType, defineField } from "sanity";

export default defineType({
  name: "notice",
  type: "document",
  title: "Notice",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    
    defineField({
      name: "file",
      type: "file",
      title: "File",
      description: "Upload a PDF or an image",
      options: {
        accept: "application/pdf,image/*",
      },
    }),
    defineField({
      name: "date",
      type: "datetime",
      title: "Date",
    }),
  ],
});
