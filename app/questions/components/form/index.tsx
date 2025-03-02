'use client'

import { Button } from '@components/ui/button'
import { FormField } from '@components/ui/form/field'

import { useForm } from '@tanstack/react-form'
import { contactSchema } from './contact.types'

export default function Form() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
    validators: {
      onBlur: contactSchema,
      onChange: contactSchema,
    },
  })

  return (
    <form
      action="#"
      method="POST"
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <form.Field
          name="firstName"
          children={(field) => (
            <FormField
              label="First name"
              autoComplete="given-name"
              className="col-span-1"
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                field.handleChange(e.target.value)
              }}
              error={field.getMeta().isTouched ? field.getMeta().errors[0]?.message : ''}
            />
          )}
        />

        <form.Field
          name="lastName"
          children={(field) => (
            <FormField
              label="Last name"
              autoComplete="family-name"
              className="col-span-1"
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                field.handleChange(e.target.value)
              }}
              error={field.getMeta().isTouched ? field.getMeta().errors[0]?.message : ''}
            />
          )}
        />

        <form.Field
          name="email"
          children={(field) => (
            <FormField
              label="Email"
              type="email"
              autoComplete="email"
              className="col-span-1"
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                field.handleChange(e.target.value)
              }}
              error={field.getMeta().isTouched ? field.getMeta().errors[0]?.message : ''}
            />
          )}
        />

        <form.Field
          name="phone"
          children={(field) => (
            <FormField
              label="Phone number"
              type="tel"
              autoComplete="tel"
              className="col-span-1"
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                field.handleChange(e.target.value)
              }}
              error={field.getMeta().isTouched ? field.getMeta().errors[0]?.message : ''}
            />
          )}
        />

        <form.Field
          name="message"
          children={(field) => (
            <FormField
              label="Message"
              isTextArea
              rows={4}
              className="col-span-full"
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                field.handleChange(e.target.value)
              }}
              error={field.getMeta().isTouched ? field.getMeta().errors[0]?.message : ''}
            />
          )}
        />
      </div>

      <div className="mt-8">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting, state.isPristine]}
          children={([canSubmit, isSubmitting, isPristine]) => (
            <Button
              type="submit"
              disabled={isPristine || !canSubmit}
              className="bg-primary hover:bg-primary-600 focus-visible:outline-ring rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
          )}
        />
      </div>
    </form>
  )
}
