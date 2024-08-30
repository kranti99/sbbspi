// schemas/popup.js
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'popup',
  title: 'Popup',
  type: 'document',
  fields: [
    defineField({
      name: 'imageUrl',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
