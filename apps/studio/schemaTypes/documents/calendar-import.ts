import {defineField, defineType} from 'sanity'
import {UploadIcon} from '@sanity/icons'

export default defineType({
  name: 'calendarImport',
  title: 'Calendar Import',
  type: 'document',
  icon: UploadIcon,
  description: 'Upload and manage calendar data from Excel/CSV files',
  fields: [
    defineField({
      name: 'title',
      title: 'Import Name',
      type: 'string',
      description: 'A name to identify this import (e.g., "2025-26 Academic Year Calendar")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'academicYear',
      title: 'Academic Year',
      type: 'string',
      description: 'Academic year for this calendar (e.g., "2025-26")',
      validation: (Rule) => Rule.required(),
      initialValue: '2025-26',
    }),
    defineField({
      name: 'uploadedFile',
      title: 'Calendar File',
      type: 'file',
      description: 'Upload Excel (.xlsx) or CSV file containing calendar data',
      options: {
        accept: '.xlsx,.xls,.csv',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Import Status',
      type: 'string',
      description: 'Status of the calendar import process',
      options: {
        list: [
          {title: 'Uploaded', value: 'uploaded'},
          {title: 'Processing', value: 'processing'},
          {title: 'Completed', value: 'completed'},
          {title: 'Error', value: 'error'},
        ],
      },
      initialValue: 'uploaded',
      readOnly: true,
    }),
    defineField({
      name: 'uploadedAt',
      title: 'Upload Date',
      type: 'datetime',
      description: 'When this file was uploaded',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'processedAt',
      title: 'Processed Date',
      type: 'datetime',
      description: 'When this file was last processed',
      readOnly: true,
    }),
    defineField({
      name: 'eventsCount',
      title: 'Events Imported',
      type: 'number',
      description: 'Number of events imported from this file',
      readOnly: true,
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Any additional notes about this import',
    }),
    defineField({
      name: 'errorLog',
      title: 'Error Log',
      type: 'text',
      description: 'Error messages from processing this file',
      readOnly: true,
      hidden: ({document}) => document?.status !== 'error',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      academicYear: 'academicYear',
      status: 'status',
      uploadedAt: 'uploadedAt',
      eventsCount: 'eventsCount',
    },
    prepare({title, academicYear, status, uploadedAt, eventsCount}) {
      const uploadDate = uploadedAt ? new Date(uploadedAt).toLocaleDateString('en-US') : 'Unknown'
      const eventText = eventsCount ? `${eventsCount} events` : 'No events'
      return {
        title: title || 'Untitled Import',
        subtitle: `${academicYear} • ${status} • ${uploadDate} • ${eventText}`,
      }
    },
  },
  orderings: [
    {
      title: 'Upload Date, New to Old',
      name: 'uploadDesc',
      by: [{field: 'uploadedAt', direction: 'desc'}],
    },
    {
      title: 'Academic Year',
      name: 'academicYear',
      by: [{field: 'academicYear', direction: 'desc'}],
    },
  ],
})
