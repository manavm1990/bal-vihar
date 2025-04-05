import Article from '@components/article'
import { P, Strong } from '@components/ui/typography'
import type { Metadata } from 'next'
import { ABOUT_US_TITLE } from '../constants'

const TITLE = 'Administrative Team 👨‍🏫'

export const metadata: Metadata = {
  title: `${ABOUT_US_TITLE} | ${TITLE}`,
  description: 'Learn more about our administrative team and their roles.',
}

export default function AdministrativeTeamPage() {
  return (
    <>
      <Article title={TITLE}>
        <P>
          Bal Vihar of St. Louis has a well organized structure comprised of different teams working
          together for smooth delivery of education, execution of operations and various events.
          These individuals are all dedicated volunteers.
        </P>

        <P>The Organization consists of: </P>

        <ul>
          <li>
            <Strong>Executive Committee</Strong> - oversees the organization and provide the overall
            guidance and support.
          </li>
          <li>
            <Strong>Education</Strong> - This team oversees the class room functions, curriculum,
            student and parent communication.
          </li>
          <li>
            <Strong>Events</Strong> - Planned and newly adopted events are planned and executed by
            this team.
          </li>
          <li>
            <Strong>Community Projects</Strong> - Community Projects and Service to the community is
            an integral part of our curriculum for our children in Youth Group.
          </li>
          <li>
            <Strong>Operations</Strong> - This team oversees day to day operations and planning.
          </li>
          <li>
            <Strong>Website</Strong> - This team oversees website activities, e-mails, photos and
            maintenance.
          </li>
          <li>
            <Strong>Finance</Strong> - This team addresses all operational details of financial
            transactions, prepares budget, and handles treasury functions.
          </li>
          <li>
            <Strong>Marketing & Communications</Strong> - This team is responsible for publishing
            newsletters, submitting events related articles to various news agencies, marketing Bal
            Vihar's events etc.
          </li>
          <li>
            <Strong>Fundraising</Strong> - This team oversees Fundraising activities both in-house
            and outside in the community.
          </li>
          <li>
            <Strong>Youth</Strong> - This team oversees the youth class room activity, curriculum,
            arrange and execute community projects and arrange field trips.
          </li>
          <li>
            <Strong>Legal</Strong> - provides expert legal advice to Bal Vihar.
          </li>
        </ul>
      </Article>
    </>
  )
}
