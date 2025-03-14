import { H2, H3, P, Strong } from '@components/ui/typography'
import { BASE_TITLE } from '@lib/constants'
import type { Metadata } from 'next'

const TITLE = 'Presidents Message 📜'

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
}

export default function PresidentsMessagePage() {
  return (
    <>
      <H2>President's Message</H2>
      <H3>
        <time dateTime="2024-08-01">August 1, 2024</time>
      </H3>
      <div className="columns-1 space-y-6 py-4 md:columns-2 md:gap-x-12 [&_p]:mt-2 [&_p]:text-pretty">
        <P>
          Center for Indian Cultural Education, Bal Vihar of St. Louis, a nonprofit, 501(c ) 3
          organization was founded 32 years ago to instill and foster East Indian Cultural in the
          children of ages 5 through 18. Bal Vihar has been providing this service to the St. Louis
          community since August 1992 and has been growing in number of students ever since then.
          Sincere thanks to all professional volunteers who invest their valuable time in preserving
          Our Indian culture.
        </P>
        <P>
          Normally, this independent organization has been active in diversity program where Bal
          Vihar youth children had been active in projects at St. Louis Science Center, St. Louis
          arts Museum, Magic House and more projects where children of different faiths such as
          Christians, Muslims, Jews and other faiths work together in projects such as can-structure
          through the St. Louis based Interfaith organization. Our children also carry out
          activities in Churches, Mosques and Synagogue to appreciate diversity and learn other
          faiths. But, due to pandemic environment, coronavirus, the activities were held virtual.
          Starting last school year, we are holding limited sessions in person and also our
          community activities such as Diwali, Holi, Canstruction, Food for Needy and more in the
          St. Louis area.
        </P>
        <P>
          Our students are taught discipline, diversity, respect and devotion in their daily
          routine. The ultimate goal is "to throw the light of cultural knowledge on every child, to
          make every child an outstanding citizen and to spread the song of peace and harmony around
          the world."
        </P>
        <P>
          Center for Indian Cultural Education- Bal Vihar of St. Louis has been holding its classes
          at the Hindu Temple Cultural Center (HTCC) since 2019. Being close to the Hindu temple,
          this exposure allows students appreciate the value of our temples and significance of our
          temples, a worship place.
        </P>
        <P>
          Enrollment of 300 + students for the Cultural Education in the school year 2024-2025
          indicates that there are more children related activities are taking place in the local
          community. Increased volunteering work for our youth, hands-on and interesting projects
          that our educational team and event team are conceptualizing and implementing most
          effective way in our school curriculum. I sincerely appreciate all 60+ volunteering
          teachers and 30+ administration staff who are professional and taking time to join our
          school to achieve our vision and mission. In this voluntary services Bal Vihar volunteers
          are spending more than 5000 hours per school year. Bal Vihar Executive committee sincerely
          appreciates their hard work for our future generation.
        </P>
        <P>
          Many thanks to the Bal Vihar parents for their active role in meeting our vision and
          mission. Likewise, we appreciate local Indian organizations, businesses, local
          Universities, political groups and many nonprofit organizations such as Science Center,
          Arts Museum, Children hospital, Interfaith Organization, the Bach Society, Magic House and
          more for their collaboration with the cultural school.
        </P>

        <P>
          <Strong>
            The Center cultural school is very proud of being partner with the Rockwood school
            district. Our Bal Vihar school received recognition of partnership in Education from
            Rockwood School District Partners in Education Facilitators on May 4, 2023 and April 29,
            2024.{' '}
          </Strong>
        </P>

        <section className="space-y-4">
          <P>During the 2023-2024 school year, Bal Vihar celebrated the following events:</P>

          <ul className="list-disc space-y-4">
            <li>
              The school year started with the family night on September 16, 2023 where all families
              and children met, enjoyed food, and participated in activities such as Dandiya Raas,
              Garba, and more.
            </li>
            <li>
              A grand Diwali celebration was held on November 19, 2023 in person at the Hindu temple
              where students performed Diwali puja followed by food and fireworks.
            </li>
            <li>
              On January 28, 2024, Bal Vihar celebrated India’s 75th Republic Day with more than 500
              participants and dignitaries from diverse backgrounds, including members of the Bach
              Society of St. Louis, MO, the former principal of Lafayette High School, a Professor
              from Washington University, leading medical and legal professionals, and
              representatives from local news media.
            </li>
            <li>
              The youth at Center for Indian Cultural Education - Bal Vihar of St. Louis
              participated in preparing food for the homeless and feeding America by making
              sandwiches, cookies, brownies, and other items to create meal bags for the community.
            </li>
            <li>
              A grand festival of Color – Holi was celebrated on March 30, 2024 at the Hindu temple
              Community Center with plenty of color and food for the children.
            </li>
            <li>
              Bal Vihar is actively pursuing participation with other St. Louis organizations, such
              as:
              <ul>
                <li>
                  The BV yoga team participated in the cultural program organized by the Gujarati
                  Samaj Community Center and performed yoga on April 13, 2024, among other programs.
                </li>
              </ul>
              In addition, our youth gain exposure by teaching children, practicing yoga and
              bhajans, supporting teaching aspects, and organizing cultural events. They earn
              community service hours, a potential Presidential award certificate for volunteering,
              and credit toward their high school graduation.
            </li>
          </ul>
        </section>

        <P>
          Our improved curriculum, hands-on practices for our children, and celebrating Hindu
          Festivals and interfaith events have been Hall mark of our program. I sincerely appreciate
          the hard work that our volunteers carry out by relentless effort in delivering the best
          they can. Bal Vihar is able to realize its vision and goal through these volunteers, and
          parents are setting examples of community services for their children. We still need many
          dedicated volunteers and teachers in particular. Please contact us and set up an example
          for your children by volunteering.
        </P>

        <footer className="italic">
          Best Regards,
          <br />
          Dr. Sudhir Brahmbhatt
        </footer>
      </div>
    </>
  )
}
