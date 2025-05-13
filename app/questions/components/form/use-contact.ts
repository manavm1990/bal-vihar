import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

import { ContactFormSchema } from './contact.types'

/**
 * Manages the contact form state and validation.
 * Actual form submission is handled in the parent component.
 */
export default function useContact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: valibotResolver(ContactFormSchema),
  })

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
  }
}
