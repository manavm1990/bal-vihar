import { useForm } from '@tanstack/react-form'
import { startTransition, useActionState, useState } from 'react'

import { sendEmail } from './actions'
import { contactSchema } from './contact.types'

export default function useContact() {
  const [state, action, isPending] = useActionState(sendEmail, { success: false, message: '' })
  const [shouldShowStateMessage, setShouldShowStateMessage] = useState(false)

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
    onSubmit: ({ value }) => {
      startTransition(() => {
        action(value)
      })
    },
    validators: {
      onBlur: contactSchema,
      onChange: contactSchema,
    },
  })

  return {
    form,
    state,
    sendMail: action,
    isPending,
    shouldShowStateMessage,
    setShouldShowStateMessage,
  } as const
}
