import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    // BASIC INFO
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main article headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'The subtitle/excerpt that appears under the title',
    }),

    // CATEGORIZATION
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wine', value: 'wine' },
          { title: 'Spirits', value: 'spirits' },
          { title: 'Beer', value: 'beer' },
          { title: 'Sake', value: 'sake' },
          { title: 'Coffee & Tea', value: 'coffee-tea' },
          { title: 'Education', value: 'education' },
          { title: 'Hospitality', value: 'hospitality' },
          { title: 'Service', value: 'service' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'Optional subcategory for breadcrumb',
    }),

    // MULTI-SITE
    defineField({
      name: 'sites',
      title: 'Publish to Sites',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'SOMM.SITE', value: 'somm' },
          { title: 'BACKBAR', value: 'backbar' },
          { title: 'Beverage.fyi', value: 'beverage' },
          { title: 'Restaurant Standards', value: 'restaurant' },
          { title: 'Hospitality.fyi', value: 'hospitality' },
        ],
        layout: 'grid'
      },
      validation: (Rule) => Rule.required().min(1),
    }),

    
    // IMAGE
      defineField({
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
        description: 'Full-width hero image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alt Text',
            description: 'Describe the image for accessibility',
            validation: (Rule: any) => Rule.required(),
          }
        ],
        validation: (Rule) => Rule.required(),
      }),

    // AUTHOR
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      initialValue: 'Derek Engles',
    }),
    

    // CONTENT
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Section Subtitle', value: 'h2' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alt Text',
          },
          {
            name: 'caption',
            type: 'string',
            title: 'Caption',
          }
        ]
      },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // TAGS & SERIES
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
    }),
    defineField({
      name: 'series',
      title: 'Series/Course',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Group articles into courses (can add multiple)',
    }),

    // PUBLISHING
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})