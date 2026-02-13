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
          { title: 'Industry', value: 'industry' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'Pick the subcategory that matches your category above',
      options: {
        list: [
          { title: 'Grapes', value: 'Grapes' },
          { title: 'Producers', value: 'Producers' },
          { title: 'Regions', value: 'Regions' },
          { title: 'History', value: 'History' },
          { title: 'Business', value: 'Business' },
          { title: 'Vodka', value: 'Vodka' },
          { title: 'Gin', value: 'Gin' },
          { title: 'Rum', value: 'Rum' },
          { title: 'Tequila', value: 'Tequila' },
          { title: 'Whiskey', value: 'Whiskey' },
          { title: 'Scotch', value: 'Scotch' },
          { title: 'Other Spirits', value: 'Other Spirits' },
          { title: 'Styles', value: 'Styles' },
          { title: 'Specialty', value: 'Specialty' },
          { title: 'Trappist Beer', value: 'Trappist Beer' },
          { title: 'Introduction', value: 'Introduction' },
          { title: 'Production', value: 'Production' },
          { title: 'Experiences', value: 'Experiences' },
          { title: 'Employment', value: 'Employment' },
          { title: 'Ratings Systems', value: 'Ratings Systems' },
          { title: 'Service', value: 'Service' },
          { title: 'Industry Insights', value: 'Industry Insights' },
          { title: 'Reference', value: 'Reference' },
          { title: 'Law', value: 'Law' },
          { title: 'Science', value: 'Science' },
          { title: 'Current Events', value: 'Current Events' },
          { title: 'Consumer Knowledge', value: 'Consumer Knowledge' },
          { title: 'Industry Events', value: 'Industry Events' },
          { title: 'Beverage Business', value: 'Beverage Business' },
          { title: 'Restaurant Awards', value: 'Restaurant Awards' },
          { title: 'Guest Service', value: 'Guest Service' },
          { title: 'Product Knowledge', value: 'Product Knowledge' },
          { title: 'Management Principles', value: 'Management Principles' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // LINKING
    defineField({
      name: 'parentGuide',
      title: 'Parent Study Guide',
      type: 'reference',
      to: [{ type: 'studyGuide' }],
      description: 'The Study Guide this article belongs to (e.g., "Wines of Italy")',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      description: 'Hand-picked articles that appear as "Related Reading" links inside the article',
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'geography',
      title: 'Geography',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'geography' }] }],
      description: 'Where in the world is this article about? Select country and/or region.',
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
        layout: 'grid',
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
        },
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

    // CONTENT — Now includes internal link annotation
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
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal Article Link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Article or Study Guide',
                    to: [
                      { type: 'article' },
                      { type: 'studyGuide' },
                    ],
                  },
                ],
              },
            ],
          },
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
            },
          ],
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
        layout: 'tags',
      },
    }),
    defineField({
      name: 'series',
      title: 'Series/Course',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
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

  preview: {
    select: {
      title: 'title',
      subtitle: 'subcategory',
      media: 'mainImage',
    },
  },
})