import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'video',
  type: 'document',
  title: 'Video',
  fields: [
    defineField({
      name: 'title',
      type: 'object',
      title: 'Title',
      fields: [
        defineField({
          name: 'en',
          type: 'string',
          title: 'English Title',
          // no validation rule, making it optional
        }),
        defineField({
          name: 'ne',
          type: 'string',
          title: 'Nepali Title',
          // no validation rule, making it optional
        }),
      ],
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube URL',
    }),
  ],
});
