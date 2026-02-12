import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'geography',
  title: 'Geography',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'E.g., "France", "Bordeaux", "Napa Valley"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentGeography',
      title: 'Parent Geography',
      type: 'reference',
      to: [{ type: 'geography' }],
      description: "What does this sit inside? Bordeaux's parent is France. France has no parent.",
    }),
    defineField({
      name: 'continent',
      title: 'Continent',
      type: 'string',
      options: {
        list: [
          { title: 'Europe', value: 'europe' },
          { title: 'North America', value: 'north-america' },
          { title: 'South America', value: 'south-america' },
          { title: 'Asia', value: 'asia' },
          { title: 'Africa', value: 'africa' },
          { title: 'Oceania', value: 'oceania' },
        ],
      },
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'continent',
    },
  },
})