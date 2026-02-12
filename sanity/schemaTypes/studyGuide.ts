import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'studyGuide',
  title: 'Study Guide',
  type: 'document',
  fields: [
    // BASIC INFO
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'E.g., "The Complete Guide to Italian Wine"',
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
      description: 'Brief summary that appears under the title',
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
    }),

    // LINKING
    defineField({
      name: 'childArticles',
      title: 'Child Articles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      description: 'The articles that belong to this Study Guide. These appear as deep-dive links on the guide page.',
    }),
    defineField({
      name: 'geography',
      title: 'Geography',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'geography' }] }],
      description: 'Where in the world does this guide cover? Select country and/or regions.',
    }),

    // KEY FACTS
    defineField({
      name: 'keyFacts',
      title: 'Key Facts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'fact',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'E.g., "Key Grapes" or "Classification System"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'E.g., "Sangiovese, Nebbiolo, Barbera"',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
      description: 'Quick reference facts displayed as a sidebar/card on the guide page',
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
    }),

    // IMAGE
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Hero image for the study guide',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility',
        },
      ],
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
      title: 'Study Guide Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Section Subtitle', value: 'h2' },
            { title: 'Sub-Section', value: 'h3' },
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
            },
          ],
        },
      ],
    }),

    // TAGS
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    // PUBLISHING
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Study Guide',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
})