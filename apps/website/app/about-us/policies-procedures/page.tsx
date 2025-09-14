import type { Metadata } from 'next'

import TextColumns from '@components/text-columns'
import { Separator } from '@components/ui/separator'
import { H2, H3, H4, H5, LeadP, P, Strong, Table } from '@components/ui/typography'

import { ABOUT_US_TITLE } from '../constants'
import GrievanceForm from './form.client'

const TITLE = 'Policies & Procedures 📜'

export const metadata: Metadata = {
  title: `${ABOUT_US_TITLE} | ${TITLE}`,
  description: 'Bal Vihar Policies and Procedures',
}

export default function PoliciesProceduresPage() {
  return (
    <div className="[&_h3]:mt-4 [&_h5]:mt-2 [&_ul]:my-2 [&_ul]:list-disc [&>article]:mt-8">
      <H2>{TITLE}</H2>

      <LeadP>
        Bal Vihar of St Louis is governed by all the policies and procedures listed in this
        document. However, Bal Vihar administration and management reserves the right to make any
        exceptions on a case by case basis if it is warranted.
      </LeadP>

      <section>
        <H3>1.0 Admissions Policies</H3>

        <TextColumns>
          <section>
            <H4>1.1 Registrations</H4>

            <P>
              Online registration is usually open from May 01 and closes end of July of each year.
            </P>

            <P>
              Due to capacity, the class room size will be limited to 30. Additional children will
              be held on waiting list till the count is 15 students to open up a new class. Thus, if
              Group 1 has enrollment more than 30 students and waiting list is more than 15
              students, Class 1 A will be formed and students will be communicated by Bal Vihar and
              asked to pay school fee.
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
              Bal Vihar administration reserves the right to increase the fees to cover the
              increasing costs and additional offerings that may be brought forth. This increase
              does not include any increases for additional offerings and services that may be
              brought forth. The increases will be presented to the parents during the meeting in
              February for the following school year.
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
              registration, we will allow class observations during March and April of every year.
              An observation form will need to be filled out and will be allowed to attend up to 2
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
                The request for such condition should be made in May or June for the upcoming year
                in confidence in writing to the executive committee. This request should explain the
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
                    Failure to meet this requirement will be the cause for student to be
                    discontinued from attending Bal Vihar
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
        </TextColumns>
      </section>

      <Separator />

      <section>
        <H3>2.0 Education Policies</H3>

        <TextColumns>
          <section>
            <H4>2.1 Bal Vihar Graduation</H4>
            <P>
              The committee consisting of teacher coordinators and the teachers from the{' '}
              <Strong>Group 7 and Y4 group</Strong> will finalize the list of graduating students
              after taking teacher’s inputs and based on the following criteria:
            </P>

            <section>
              <H5>2.1.A - Children transferring to Bal Vihar of St. Louis:</H5>

              <ul>
                <li>Spend at least two years in either program of Bal Vihar school.</li>
                <li>Provide written evidence of having attended a similar school.</li>
                <li>At least 70% attendance during the year.</li>
              </ul>
            </section>

            <section>
              <H5>2.1.B - Children who have attended only Bal Vihar of St. Louis:</H5>
              <ul>
                <li>Spend at least 2 years overall with Bal Vihar or in youth program.</li>
                <li>At least 70% attendance during the year.</li>
                <li>
                  An interview or other testing with the relevant Bal Vihar teachers as deemed
                  necessary by the teacher coordinator committee.
                </li>
                <li>
                  Failure to meet any of the requirements will automatically require student to
                  repeat the class.
                </li>
                <li>
                  Students must also demonstrate active participation in class discussions and
                  activities.
                </li>
              </ul>
            </section>
          </section>

          <section>
            <H4>2.2 Youth Group Admission Criteria</H4>
            <P>
              If you would like to register as a new student or continue in the youth group, the
              following criteria should be met. Please discuss with your parents before future
              registration:
            </P>

            <ul>
              <li>
                You <Strong>must</Strong> be able to be present in the class by 9:45 AM
              </li>
              <li>
                You <Strong>must</Strong> be available for all classes unless there is a valid
                reason
              </li>
              <li>
                All assigned homework <Strong>needs</Strong> to be completed and emailed by 9:00 PM
                before the next class
              </li>
              <li>
                All students assigned to various classrooms, writing articles, community projects
                and other activities <Strong>must</Strong> be committed and complete those
                assignments in time
              </li>
              <li>
                Once registered, if you have not met the above criteria, you may be asked to leave
                the group and no community credit hours could be claimed.
              </li>
            </ul>

            <P>
              A completion requirement for this group is set by the youth coordinators. Upon
              successful completion of the youth curriculum set by the school, a certificate with
              community service hours that were earned by the youth will be provided. This
              certificate may be used by the student towards community credit hours requirement for
              the high school graduation. Youth is required to sign a completion requirement form
              provided by the teacher.
            </P>
          </section>

          <section>
            <H4>2.3 Community Hours for Youth Group Students</H4>
            <P>
              Bal Vihar students are involved in many volunteer activities and the school wishes to
              recognize that by providing community hours certificate. Students who require
              community credit hours for the high school graduation may also use this certificate.
            </P>

            <P>
              Youth may be required to sign a completion requirement form provided by the teacher.
              The community hours can also be provided to individual students upon completion of any
              volunteer activity sponsored by the Bal Vihar as soon as the activity is completed,
              upon request. The community hours awarded will be decided by the youth teachers taking
              into consideration of the students’ attendance, participation, activities,
              contribution etc.
            </P>
          </section>

          <section>
            <H4>2.4 Promotions</H4>
            <P>
              Bal Vihar students will be promoted to the next group if they have met the following
              criteria:
            </P>
            <ul>
              <li>Attended at least 70% of the classes</li>
              <li>Met all requirements set by the teachers</li>
              <li>Passed any written/oral tests administered by the teachers</li>
              <li>No disciplinary actions taken against the student in the past two years</li>
            </ul>
            <P>
              All students that cannot attend a class must notify their class teacher at least one
              day in advance. This will be considered as an excused absence that will not be counted
              as absent. Teachers will take attendance during every class.
            </P>
          </section>

          <section>
            <H4>2.5 Perfect Attendance Recognition</H4>
            <P>
              These awards can be given within each class by the respective teachers. Two category
              awards include one category where students have 100% attendance and another at least
              90% attendance. Up to two excused absences due to illness will be accepted as an
              attended class for the purpose of this award.
            </P>
          </section>

          <section>
            <H4>2.6 Absenteeism</H4>

            <P>
              If a student is absent for more than 3 consecutive classes without reason or without
              informing the teacher, then the teacher can refer the matter to the teacher
              coordinators. Teacher coordinators will get in touch with the parents of the student
              and ascertain the reason for being absent. If it is deemed necessary, the teacher
              coordinators will recommend to the President of Bal Vihar that the student be asked to
              leave Bal Vihar. The case will be documented and the President will communicate the
              decision to the parents of the child.
            </P>
          </section>
        </TextColumns>
      </section>

      <Separator />

      <section>
        <H3>3.0 Volunteer Policies</H3>

        <TextColumns>
          <section>
            <H4>3.1 Volunteering Requirements</H4>
            <P>
              It is required that every Bal Vihar parent complete a voluntary activity(ies) /
              assignment(s) during Bal Vihar school year. Voluntary activity requirement is per
              child and if more than one child is registered parents are required to volunteer for
              number of activities that equals the number of kids registered.
            </P>

            <P>
              It is the responsibility of the parents to complete the agreed upon voluntary
              assignment and for personal reasons if any parent cannot meet the commitment, it is
              his/her responsibility to delegate the activity to another parent. The volunteer
              coordinator must be notified at least 2 weeks in advance of any changes.
            </P>

            <section>
              <H5>Selecting/Assigning Voluntary Activities</H5>

              <P>
                The Bal Vihar parents can choose the voluntary activities during the registration
                time and the selection/assignment process is based on first come first serve basis.
                Bal Vihar events coordinator reserves the right to re-assign activity assignment on
                as-needed basis.
              </P>
            </section>

            <section>
              <H5>What Qualifies for Volunteer Commitments?</H5>
              <P>
                The following activities are considered as volunteer commitments for Bal Vihar
                school:
              </P>

              <ul>
                <li>
                  Signing up to be a classroom parent (assist with art projects and other activities
                  in the class) and must work at least 8 classes
                </li>
                <li>
                  At least 8 hours of volunteer work including participating event related or other
                  meeting will be considered as the completion of the voluntary requirement
                </li>
                <li>
                  The event leads will provide the completion of the voluntary requirements for all
                  the events
                </li>
                <li>The education leads will certify the class room voluntary requirements</li>
                <li>
                  Teachers, community projects organizers and administrative team members are
                  classified as volunteers.
                </li>
              </ul>
            </section>
          </section>

          <section>
            <H4>3.2 Volunteer Deposit and Refund</H4>

            <P>
              During registration process parents are required to deposit $50 per child and choose
              voluntary activity. For a family, the volunteer deposit cap is $100.
            </P>

            <P>
              The Parents can opt out of voluntary activity assignments by choosing the “Buy-out”
              option thus relieving the parents from work assignments and the $50 deposit per kid
              will be treated as Bal Vihar fee. Voluntary activities need to be completed in the
              same academic year and the parents who fail to do so will fore-go the deposit.
            </P>

            <P>
              Upon satisfactory completion of the voluntary commitment, Bal Vihar will refund
              voluntary deposit to the parents. However, at the discretion of the Volunteer
              management and Event coordinating committee voluntary deposit refund policy could be
              construed as volunteer activity per family based on the volunteer needs.
            </P>
          </section>
        </TextColumns>
      </section>

      <Separator />

      <section>
        <H3>4.0 Grievance Policy</H3>

        <TextColumns>
          <P>
            This grievance policy addresses issues that fall within the framework of the Teacher
            Coordinator Committee’s role and its responsibility for compliance with overall
            grievance policies of Bal Vihar. In case of any conflict between Bal Vihar’s overall
            policy and Teacher Coordinator grievance policy, the former prevails.
          </P>

          <section>
            <H4>4.1 Grievances against teacher(s):</H4>

            <P>
              A formal complaint is filed with the Teacher Coordinator committee in writing. Within
              two weeks or as early as is reasonably possible after receiving the complaint, teacher
              coordinator will investigate and call a meeting where all parties concerned are
              present. Every effort will be made to resolve the issues amicably. In case a
              satisfactory resolution agreeable to all parties concerned is not reached, the issue
              will be turned over to the President and Grievance Committee for further deliberation.
              The resolution is documented and file closed.
            </P>
          </section>

          <section>
            <H4>4.2 Grievances against parent(s) or volunteer(s):</H4>

            <P>
              A formal complaint is filed with the teacher coordinator in writing. The teacher
              coordinator will notify the Parent Coordinator. Within two weeks or as early as is
              reasonably possible, a meeting will be scheduled with the parent concerned, teacher,
              parent coordinator and teacher coordinator. Every effort will be made to resolve the
              issue amicably. In case an agreeable resolution is not reached, complaint is forwarded
              to the President and Bal Vihar Executive Committee members. The outcome is documented
              and file closed.
            </P>
          </section>

          <section>
            <H4>
              4.3 Grievance against a member of teacher coordinator committee or any other
              individual in administrative position:
            </H4>

            <P>
              A formal complaint is made to the President directly. Outcome is documented and filed.
            </P>
          </section>

          <section>
            <H4>4.4 Grievance against another student:</H4>
            <P>
              A formal complaint is filed with a teacher coordinator in writing. Teacher coordinator
              notifies parent. Within two weeks, a meeting is scheduled with student’s parent(s),
              teacher and student. Every effort is made to resolve the issue amicably. In case an
              agreeable resolution is not reached, complaint is passed to the President and
              Grievance Committee. The outcome is documented and file closed.
            </P>
          </section>

          <section className="container mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <H4>Grievance Form</H4>
            <P className="mb-4">
              If you have a grievance, please fill out the form below. The grievance will be
              reviewed by the Grievance Committee and appropriate action will be taken.
            </P>

            <GrievanceForm />
          </section>
        </TextColumns>
      </section>
    </div>
  )
}
