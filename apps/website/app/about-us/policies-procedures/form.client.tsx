'use client'

import { Button } from '@components/ui/button'
import { DayPicker } from '@components/ui/form/day-picker'
import { FormField } from '@components/ui/form/field'
import { Select } from '@components/ui/form/select'

export default function Form() {
  return (
    <form className="space-y-6 xl:grid xl:grid-cols-2">
      <DayPicker label="Date Grievance Filed" showOutsideDays={false} numberOfMonths={1} />

      <div className="flex flex-col justify-between xl:col-span-1">
        <FormField label="Your Full Name" type="text" name="name" />

        <Select
          label="Your Association with Bal Vihar"
          id="association"
          name="association"
          options={[
            { value: 'teacher', label: 'Teacher' },
            { value: 'parent', label: 'Parent' },
            { value: 'volunteer', label: 'Volunteer' },
          ]}
        />

        <FormField
          label="Grievance Against"
          placeholder="Full Name of Person"
          type="text"
          name="grievanceFor"
        />
      </div>

      <FormField
        className="col-span-2"
        label="Grievance Details"
        isTextArea
        rows={4}
        name="grievanceDetails"
      />

      <Button
        type="submit"
        className="bg-primary hover:bg-primary-600 rounded-md px-4 py-2 font-semibold text-white"
      >
        Submit
      </Button>
    </form>
  )
}
