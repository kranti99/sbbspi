import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'imageGroup',
  type: 'document',
  title: 'Image Group',
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
        }),
        defineField({
          name: 'ne',
          type: 'string',
          title: 'Nepali Title',
        }),
      ],
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          type: 'image',
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
                }),
                defineField({
                  name: 'ne',
                  type: 'string',
                  title: 'Nepali Title',
                }),
              ],
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'Optional link to a resource or page',
              validation: (Rule) => Rule.uri({
                allowRelative: true, // Allow relative URLs
                scheme: ['http', 'https', 'mailto', 'tel'] // Valid URL schemes
              }),
            }),
          ],
        },
      ],
    }),
  ],
});
