import { useForm } from '@tanstack/react-form'
import { startTransition, useActionState, useState } from 'react'

import { submitGrievance } from './actions'
import { GrievanceFormSchema } from './grievance.types'

export default function useGrievance() {
  const [state, action, isPending] = useActionState(submitGrievance, {
    success: false,
    message: '',
  })
  const [shouldShowStateMessage, setShouldShowStateMessage] = useState(false)

  const form = useForm({
    defaultValues: {
      fullName: '',
      grievanceFor: '',
      grievanceDetails: '',
    },
    onSubmit: ({ value }) => {
      startTransition(() => {
        action(value)
      })
    },
    validators: {
      onBlur: GrievanceFormSchema,
      onChange: GrievanceFormSchema,
    },
  })

  return {
    form,
    state,
    submitGrievance: action,
    isPending,
    shouldShowStateMessage,
    setShouldShowStateMessage,
  } as const
}
