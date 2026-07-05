import Article from "@components/article";
import { H3, P, Strong } from "@components/ui/typography";
import { BASE_TITLE } from "@lib/constants";
import type { Metadata } from "next";

const TITLE = "Presidents Message 📜";

export const metadata: Metadata = {
  title: `${BASE_TITLE} | ${TITLE}`,
};

export default function PresidentsMessagePage() {
  return (
    <Article title="President's Message">
      <H3>
        <time dateTime="2026-08-01">August 1, 2026</time>
      </H3>

      <P>
        Center for Indian Cultural Education, Bal Vihar of St. Louis, a nonprofit, 501(c) 3
        organization was founded 34 years ago to instill and foster East Indian Cultural in the
        children of ages 5 through 18. Bal Vihar has been providing this service to the St. Louis
        community since August 1992 and has been growing in number of students ever since then.
        Sincere thanks to all professional volunteers who invest their valuable time in preserving
        Our Indian culture.
      </P>
      <P>
        Normally, this independent organization has been active in diversity program where Bal Vihar
        youth children had been active in projects at St. Louis Science Center, St. Louis arts
        Museum, Magic House and more projects where children of different faiths such as Christians,
        Muslims, Jews and other faiths work together in projects such as can-structure through the
        St. Louis based Interfaith organization. Our children also carry out activities in Churches,
        Mosques and Synagogue to appreciate diversity and learn other faiths. But, due to pandemic
        environment, coronavirus, the activities were held virtual. Starting last school year, we
        are holding limited sessions in person and also our community activities such as Diwali,
        Holi, Canstruction, Food for Needy and more in the St. Louis area.
      </P>
      <P>
        Our students are taught discipline, diversity, respect and devotion in their daily routine.
        The ultimate goal is &quot;to throw the light of cultural knowledge on every child, to make
        every child an outstanding citizen and to spread the song of peace and harmony around the
        world.&quot;
      </P>
      <P>
        Center for Indian Cultural Education- Bal Vihar of St. Louis has been holding its classes at
        the Hindu Temple Cultural Center (HTCC) since 2019. Being close to the Hindu temple, this
        exposure allows students appreciate the value of our temples and significance of our
        temples, a worship place.
      </P>
      <P>
        Enrollment of 350 + students for the Cultural Education in the school year 2026-2027
        indicates that there are more children related activities are taking place in the local
        community. Increased volunteering work for our youth, hands-on and interesting projects that
        our educational team and event team are conceptualizing and implementing most effective way
        in our school curriculum. I sincerely appreciate all 60+ volunteering teachers and 30+
        administration staff who are professional and taking time to join our school to achieve our
        vision and mission. In this voluntary services Bal Vihar volunteers are spending more than
        5000 hours per school year. Bal Vihar Executive committee sincerely appreciates their hard
        work for our future generation.
      </P>
      <P>
        Many thanks to the Bal Vihar parents for their active role in meeting our vision and
        mission. Likewise, we appreciate local Indian organizations, businesses, local Universities,
        political groups and many nonprofit organizations such as Science Center, Arts Museum,
        Children hospital, Interfaith Organization, the Bach Society, Magic House and more for their
        collaboration with the cultural school.
      </P>

      <P>
        <Strong>
          The Center cultural school is very proud of being partner with the Rockwood school
          district. Our Bal Vihar school received recognition of partnership in Education from
          Rockwood School District Partners in Education Facilitators on May 4, 2026, and in 2025,
          2024 and more.
        </Strong>
      </P>

      <section className="space-y-4">
        <P>
          School year 2025-2026 was another exciting year where students performed a variety of
          exciting activities as follows:
        </P>

        <ul className="list-disc space-y-4">
          <li>
            On September 28, 2025, Bal Vihar children visited St. Louis Buddha temple in Augusta,
            MO. It was an exciting event. During the visit, students participated in a
            congregational prayer service, observed Buddhist customs and listened to a lecture on
            the life and teachings of Siddhartha Gautama.
          </li>
          <li>
            On October 26, 2025, Diwali event was an exciting event where children enjoyed praying
            at Hindu Temple and celebrating the festival of light with fireworks and a meal.
          </li>
          <li>
            On January 25, 2026, Bal Vihar celebrated India&apos;s Republic Day in presence of chief
            guest US senator candidate Brian William and leading community leaders. The students of
            different grades created an amazing showcase of various Indian states and their key
            features and celebrations. The event was attended by an amazing audience of more than
            400 students and parents.
          </li>
          <li>
            On April 5, 2026, BV celebrated Holi festival on the HT parking lot including walk for
            water activities with more than 200 children and more parents too.
          </li>
          <li>
            Graduation ceremony of youth students on April 19, 2026, was also a well-attended event
            with Dr. Ramanath Cowsik, Indian Presidential Padma Shri award winner and professor of
            Space science at Washington University. This event included a bridging ceremony of
            children from Group 7 to Y1 and a graduation ceremony for Y5 students.
          </li>
          <li>
            Yoga and Bhajan showcase was an amazing event held on May 3rd where children of all
            groups performed yogas and sang bhajans in this event, which parents attended.
          </li>
          <li>
            Also, Rockwood School District provided a Certificate of Appreciation this year to our
            BV teachers for sharing their talent about Hindu Culture events with Rockwood School
            District students.
          </li>
          <li>
            Under the leadership of community project leaders, BV youth did several community
            projects such as the Mental Health summit, Gardening project, drive to recycle
            electronic waste, sandwiches and care project for a homeless shelter, casserole making
            for St. Patrick Center, Walk for Water, Feed the Needy, and a teachers recycling
            project. We are proud of our youth participating in community projects.
          </li>
        </ul>
      </section>

      <P>
        Now our new 2026-2027 school year registration has opened up as of May 1, 2026 and will
        close by July 31, 2026. Bal Vihar will restrict registration per class so if you have not
        registered, please do so as soon as possible. From May 1st till today, more than 105
        students have already registered. Thank you very much for being part of Bal Vihar family and
        now we are entering into 35 years of Bal Vihar.
      </P>

      <P>
        Our improved curriculum, hands-on practices for our children, and celebrating Hindu
        Festivals and interfaith events have been Hall mark of our program. I sincerely appreciate
        the hard work that our volunteers carry out by relentless effort in delivering the best they
        can. Bal Vihar is able to realize its vision and goal through these volunteers, and parents
        are setting examples of community services for their children. We still need many dedicated
        volunteers and teachers in particular. Please contact us and set up an example for your
        children by volunteering.
      </P>

      <footer className="italic">
        Best Regards,
        <br />
        Sudhir Brahmbhatt
      </footer>
    </Article>
  );
}
