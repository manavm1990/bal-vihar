import Article from '@components/article'
import { Bq, P, Strong } from '@components/ui/typography'
import type { Metadata } from 'next'
import { ABOUT_US_TITLE } from '../constants'

const TITLE = 'History 📜'

export const metadata: Metadata = {
  title: `${ABOUT_US_TITLE} | ${TITLE}`,
  description: 'Bal Vihar History',
}

export default function HistoryPage() {
  return (
    <Article title="History 📜">
      <P>
        Bal Vihar is a <Strong>non-profit 501 (c) (3)</Strong> corporation under the name of{' '}
        <Strong>"Center for Indian Cultural Education - Bal Vihar of St. Louis"</Strong>.
      </P>
      <P>
        Since its <Strong>inception in 1992</Strong>, Bal Vihar has been serving the Metro St. Louis
        southeast Asian / Indian community of about 10,000 families. The primary focus of this
        organization is to provide Indian cultural education for children of ages 5 through 16. Bal
        Vihar is a school to educate, foster and preserve Asian cultural values. Bal Vihar has{' '}
        <Strong>300+ students and over 40 volunteer teachers and teaching assistants</Strong>.
      </P>
      <P>
        Bal Vihar, is an all-volunteer organization with a well-defined by-laws and a mature
        organizational structure. There is an established process of election or selection of its
        office bearers. Our volunteers are the best in their fields of business, education, science,
        medicine, and engineering. Bal Vihar has a board of advisors, who are prominent members of
        the community. The organization has seen tremendous growth through the years. The students
        are organized into several classrooms based on their age. There is a well designated
        curriculum for younger children and the youth. There are several interfaith and community
        outreach activities which are included as part of the curriculum.
      </P>
      <P>
        Bal Vihar helps students to learn Indian culture and its application to global multicultural
        and multifaceted society. With value based teaching, the students learn respect, honesty and
        good citizenship. They are also taught discipline, tolerance and devotion in their daily
        routine. Bal Vihar's main goal is to integrate Indian cultural values with the mainstream.
        This organization prepares the future achievers of the United States to be well rounded and
        apply the learned values for the best of the communities.
        <Bq>
          The ultimate goal is to throw the light of cultural knowledge on every child, to make
          every child an outstanding citizen and to spread the song of peace and harmony around the
          world.
        </Bq>
      </P>
    </Article>
  )
}
