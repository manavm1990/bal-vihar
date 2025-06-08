import { valibotResolver } from '@hookform/resolvers/valibot'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ContactFormSchema } from './contact.types'

/**
 * Manages the contact form state and validation.
 * Actual form submission is handled in the parent component.
 */
export default function useContact() {
  const [state, setState] = useState({ success: false, message: '' })
  const [shouldShowStateMessage, setShouldShowStateMessage] = useState(false)

  const form = useForm({
    resolver: valibotResolver(ContactFormSchema),
  })

  const onSubmit = () => {
    setShouldShowStateMessage(true)
    // TODO: Replace with actual submission logic
    setState({ success: true, message: 'Your message has been sent!' })
    form.reset()
    return undefined // Ensure void return
  }

  return {
    form,
    onSubmit,
    state,
    shouldShowStateMessage,
    setShouldShowStateMessage,
    isPending: form.formState.isSubmitting,
    errors: form.formState.errors,
    register: form.register,
    handleSubmit: form.handleSubmit,
  }
}
