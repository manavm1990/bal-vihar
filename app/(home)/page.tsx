import { H2, H3, LeadP, P, Strong } from '@components/ui/typography'
import { HeroCarousel } from './hero-carousel'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <HeroCarousel />
      <section className="container mx-auto flex max-w-prose flex-col gap-4 rounded-lg border-l-4 border-l-[var(--color-primary)] bg-[var(--color-muted)] py-4">
        <H2>Bal Vihar 2025-2026 Registration is Now Open! 📢</H2>

        <H3>Dear Parents and Students,</H3>

        <LeadP>
          Registration for new and existing students is now open. Classes fill up fast, so don't
          wait to register!
        </LeadP>

        <P>
          Bal Vihar of St. Louis has been serving the Metro St. Louis Indian community{' '}
          <Strong>since 1992.</Strong>
        </P>

        <P>
          Bal Vihar of St. Louis will admit any student aged 5 through 18 based on the grade level
          they are enrolled at regular school regardless of their backgrounds and expect all to
          abide by the policies and procedures.
        </P>

        <a href="https://registration.balviharstlouis.org/">
          <Strong>Register now!</Strong>
        </a>
      </section>
    </div>
  )
}
