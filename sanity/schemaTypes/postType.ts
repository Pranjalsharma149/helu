import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug (URL)',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: '📝 Text Blog', value: 'text' },
          { title: '🎥 Video Vlog', value: 'video' }
        ],
        layout: 'radio'
      },
      initialValue: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (shown on blog listing page)',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      hidden: ({document}) => document?.contentType === 'video'
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube or Vimeo)',
      type: 'url',
      description: 'Paste your YouTube or Vimeo link here e.g. https://youtube.com/watch?v=...',
      hidden: ({document}) => document?.contentType !== 'video'
    }),
    defineField({
      name: 'categories',
      title: 'Category',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. 5 min read',
      hidden: ({document}) => document?.contentType === 'video'
    }),
    defineField({
      name: 'medicalReviewer',
      title: 'Medical Reviewer',
      type: 'string',
      description: 'e.g. Dr. Anita Sharma, Ophthalmologist',
      hidden: ({document}) => document?.contentType === 'video'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'blockContent',
      hidden: ({document}) => document?.contentType === 'video'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      contentType: 'contentType'
    },
    prepare(selection) {
      const {author, contentType} = selection
      return {
        ...selection,
        subtitle: `${contentType === 'video' ? '🎥 Vlog' : '📝 Blog'}${author ? ' · by ' + author : ''}`
      }
    },
  },
})