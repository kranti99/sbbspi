// schemas/page.js
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ne', title: 'Nepali', type: 'string' },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { 
          name: 'en', 
          title: 'English', 
          type: 'array', 
          of: [{ type: 'block' }] // Only allow block types, no images
        },
        { 
          name: 'ne', 
          title: 'Nepali', 
          type: 'array', 
          of: [{ type: 'block' }] // Only allow block types, no images
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 200,
      },
    }),
    defineField({
      name: 'featureImage',
      title: 'Feature Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
