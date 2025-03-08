import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import type { ContactFormData } from './contact.types'

export default function EmailTemplate({
  firstName,
  lastName,
  email,
  phone,
  message,
}: ContactFormData) {
  return (
    <Html>
      <Head />
      <Preview>
        `New contact form submission from ${firstName} ${lastName}`
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-10 max-w-xl rounded border border-solid border-gray-200 p-6">
            <Section className="mt-8">
              <Img src="/logo.svg" width="40" height="37" alt="Logo" className="mx-auto my-0" />
            </Section>
            <Heading className="text-navy my-8 text-center text-2xl font-normal">
              New Contact Form Submission
            </Heading>

            <Text className="text-base leading-6 text-black">
              <strong>First Name:</strong> {firstName}
            </Text>
            <Text className="text-base leading-6 text-black">
              <strong>Last Name:</strong> {lastName}
            </Text>
            <Text className="text-base leading-6 text-black">
              <strong>Email:</strong> {email}
            </Text>
            <Text className="text-base leading-6 text-black">
              <strong>Phone:</strong> {phone}
            </Text>
            <Text className="text-base leading-6 text-black">
              <strong>Message:</strong> {message}
            </Text>

            <Hr className="my-6 w-full border border-solid border-gray-200" />

            <Text className="text-sm leading-6 text-gray-600">
              This email was sent from the contact form on your website. If you did not expect this
              email, please ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
