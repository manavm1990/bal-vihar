'use client'

import { Button } from '@components/ui/button'
import { FormField } from '@components/ui/form/field'
import { H2, P, Strong } from '@components/ui/typography'
import { FADE } from '@lib/animations'
import { AnimatePresence, motion } from 'motion/react'
import Confetti from 'react-confetti'

import useContact from './use-contact'

export default function Form() {
  const {
    onSubmit,
    isPending,
    state,
    shouldShowStateMessage,
    setShouldShowStateMessage,
    errors,
    register,
    handleSubmit,
  } = useContact()

  if (state.success) {
    return (
      <div className="relative">
        <Confetti recycle={false} />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          variants={FADE}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <H2 className="mb-4 text-2xl font-bold">Success!</H2>
          <P className="mb-6">✉️ {state.message}✨</P>
        </motion.div>
      </div>
    )
  }

  return (
    <form
      method="POST"
      className={`space-y-6 ${isPending ? 'pointer-events-none animate-pulse' : ''}`}
      onFocus={() => {
        setShouldShowStateMessage(false)
      }}
      onSubmit={() => {
        handleSubmit(onSubmit)
      }}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <FormField
          label="First name"
          autoComplete="given-name"
          className="col-span-1"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <FormField
          label="Last name"
          autoComplete="family-name"
          className="col-span-1"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          className="col-span-1"
          {...register('email')}
          error={errors.email?.message}
        />
        <FormField
          label="Phone number"
          type="tel"
          autoComplete="tel"
          className="col-span-1"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <FormField
          label="Message"
          isTextArea
          rows={4}
          className="col-span-full"
          {...register('message')}
          error={errors.message?.message}
        />
      </div>
      <div className="mt-8">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary hover:bg-primary-600 focus-visible:outline-ring rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {isPending ? 'Sending...' : 'Send message'}
        </Button>
      </div>
      <AnimatePresence>
        {state.message && shouldShowStateMessage && !isPending && (
          <motion.output
            className="text-red-500"
            variants={FADE}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Strong>{state.message}</Strong>
          </motion.output>
        )}
      </AnimatePresence>
    </form>
  )
}
