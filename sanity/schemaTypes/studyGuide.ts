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

    // CATEGORIZATION — Category only.
    // Study Guides sit above the subcategory level by definition.
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

    // LINKING
    // No childArticles field. Children connect upward
    // via the article's parentGuide field. The frontend
    // queries "all articles where parentGuide == this guide."
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

    // CONTENT — With internal links and separator
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
            { title: 'Sub-Sub-Section', value: 'h4' },
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
        {
          name: 'separator',
          type: 'object',
          title: 'Section Separator',
          fields: [
            {
              name: 'style',
              type: 'string',
              title: 'Style',
              initialValue: 'line',
              options: {
                list: [
                  { title: 'Line', value: 'line' },
                ],
              },
            },
          ],
          preview: {
            prepare() {
              return {
                title: '── Section Separator ──',
              }
            },
          },
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


    // FAQ — Added for Google rich results
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              description: 'E.g., "What grape is Barolo made from?"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              description: 'Keep it concise — 1-3 sentences. These appear in Google search results.',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
      description: 'Frequently asked questions — renders as dropdowns below the guide body and as FAQ rich results in Google',
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