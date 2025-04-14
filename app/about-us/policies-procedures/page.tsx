import type { Metadata } from 'next'

import Article from '@components/article'
import { Separator } from '@components/ui/separator'
import { H2, H4, LeadP, P, Table } from '@components/ui/typography'

import { ABOUT_US_TITLE } from '../constants'

const TITLE = 'Policies & Procedures 📜'

export const metadata: Metadata = {
  title: `${ABOUT_US_TITLE} | ${TITLE}`,
  description: 'Bal Vihar Policies and Procedures',
}

export default function PoliciesProceduresPage() {
  return (
    <div className="[&>article]:mt-8">
      <H2>{TITLE}</H2>

      <LeadP>
        Bal Vihar of St Louis is governed by all the policies and procedures listed in this
        document. However, Bal Vihar administration and management reserves the right to make any
        exceptions on a case by case basis if it is warranted.
      </LeadP>

      <Article title="1.0 Admissions Policies">
        <section>
          <H4>1.1 Registrations</H4>

          <P>
            Online registration is usually open from May 01 and closes end of July of each year.
          </P>

          <P>
            Due to capacity, the class room size will be limited to 30. Additional children will be
            held on waiting list till the count is 15 students to open up a new class. Thus, if
            Group 1 has enrollment more than 30 students and waiting list is more than 15 students,
            Class 1 A will be formed and students will be communicated by Bal Vihar and asked to pay
            school fee.
          </P>
        </section>

        <section>
          <H4>1.2 Fees</H4>

          <P>
            The fees structure is determined by the administration every year. The administration
            team will propose any changes to fees structure to the parents during the February
            parents meeting for the following year. Based on the feedback, the changes will be
            implemented for the following school year. The changes will be communicated to all
            parents via email, updates on the web etc. Students in groups Y5 are exempted from the
            fees and deposits. All payments are collected on line for registrations.
          </P>

          <P>
            Bal Vihar administration reserves the right to increase the fees to cover the increasing
            costs and additional offerings that may be brought forth. This increase does not include
            any increases for additional offerings and services that may be brought forth. The
            increases will be presented to the parents during the meeting in February for the
            following school year.
          </P>
        </section>

        <section>
          <H4>1.3 Refunds</H4>

          <P>
            No refund will be made once the child is registered with the Bal Vihar and one session
            has been already held.
          </P>
        </section>

        <section>
          <H4>1.4 Class Allocation</H4>
          <P>
            Bal Vihar school grades will correspond to the children school grade in their regular
            school. Thus:
          </P>
          <Table
            headers={['Regular School Grade', 'Bal Vihar School Grade']}
            rows={[
              ['Grade K', 'Grade K'],
              ['Grade 1', 'Grade 1'],
              ['Grade 2', 'Grade 2'],
              ['Grade 3', 'Grade 3'],
              ['Grade 4', 'Grade 4'],
              ['Grade 5', 'Grade 5'],
              ['Grade 6', 'Grade 6'],
              ['Grade 7', 'Grade 7'],
              ['Grade 8', 'Youth Group Y1'],
              ['Grade 9', 'Youth Group Y2'],
              ['Grade 10', 'Youth Group Y3'],
            ]}
            footer="No admission will be made in youth group Y4 and Y5. Only children from Y3 will go to Y4 and children from Y4 will go to Y5."
          />
        </section>

        <section>
          <H4>1.5 Bal Vihar Preview</H4>

          <P>
            For all new students or parents that want to learn or observe Bal vihar prior to
            registration, we will allow class observations during March and April of every year. An
            observation form will need to be filled out and will be allowed to attend up to 2
            classes for no cost. Bal Vihar preview will not be available any other time.
          </P>
        </section>

        <section>
          <H4>1.6 Financial Assistance</H4>
          <P>
            It is recognized that there may be a condition where parents may not be able to afford
            the school fee for their child(ren). Under this condition, the following may apply:
          </P>

          <ul>
            <li>
              No more than three children will be allowed in a given school year for the waiver of
              the fee. This will be first come first served basis
            </li>
            <li>
              The request for such condition should be made in May or June for the upcoming year in
              confidence in writing to the executive committee. This request should explain the
              reasons to waive the fee with proper supporting documents.
            </li>
            <li>
              These documents can be tax return or other relevant documents. This will allow the
              executive committee to make appropriate decision.
            </li>

            <li>
              Upon acceptance of the waiver by the Bal Vihar school, the parent(s) is required to
              provide the following service to the Bal Vihar as follows:
              <ul>
                <li>
                  A firm commitment of parent in offering 40 hours worth voluntary service to the
                  Bal Vihar. These service hours will be tracked by the school official to ensure
                  that such service is provided. This requirement is in addition to the parent
                  volunteer requirements.
                </li>
                <li>
                  Failure to meet this requirement will be the cause for student to be discontinued
                  from attending Bal Vihar
                </li>
                <li>
                  If the parent’s financial condition improves during the school year, he or she
                  will be required to pay the school fee without any penalty
                </li>
                <li>
                  If the parent’s financial hardship continues in the following year, a copy of
                  filed detailed tax return for the previous year will be required to convince the
                  Bal Vihar executive committee of continuation of such waiver for the school.
                </li>
              </ul>
            </li>
          </ul>

          <footer>
            It is realized that this provision is made strictly to offer service to the genuine
            cases. A confidential independent investigation will also be carried out by the school
            official to confirm the eligibility.
          </footer>
        </section>
      </Article>

      <Separator className="my-8" />
    </div>
  )
}
