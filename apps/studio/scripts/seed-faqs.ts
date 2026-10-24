/**
 * One-off: loads the FAQs that used to live in the website code into the `faqs` document.
 *
 * Run from apps/studio, signed in with `bunx sanity login`:
 *   bunx sanity exec scripts/seed-faqs.ts --with-user-token
 *
 * It uses createIfNotExists, so running it again never overwrites edits made in Studio.
 */
import { getCliClient } from "sanity/cli";

type Part = string | { text: string; href: string };

const SCHOOL_ADDRESS = "725 Weidman Road, Ballwin, MO 63011";
const SCHOOL_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Hindu Temple Community Center, ${SCHOOL_ADDRESS}`)}`;

// Wording is unchanged from the old page. Where it said "click here", the words now link.
const FAQS: { question: string; answer: Part[] }[] = [
  {
    question: "What is Bal Vihar of St. Louis?",
    answer: [
      'Bal Vihar is registered as "Center for Indian Cultural Education Bal Vihar of St. Louis". It is a not-for-profit, volunteer-run organization exempt from federal income tax under section 501(c)(3). The primary focus is to instill, foster, and preserve Indian cultural values among children ages 5 through 18.',
    ],
  },
  {
    question: "Where does Bal Vihar of St. Louis meet?",
    answer: [
      "Hindu Temple Community Center, ",
      { text: SCHOOL_ADDRESS, href: SCHOOL_MAPS_URL },
      ".",
    ],
  },
  {
    question: "Can anyone be admitted to Bal Vihar School?",
    answer: [
      "Yes. Children who meet the admission age and program criteria are admitted without regard to religious association, caste, creed, color, or nationality.",
    ],
  },
  {
    question: "What are the admission criteria?",
    answer: [
      "Your child must be 5 years old on a given July 31st to be admitted. Please see the Admissions Policies under Policies & Procedures for details on older children.",
    ],
  },
  {
    question:
      "We just moved to St. Louis and my child was attending Bal Vihar previously. Can he / she join Bal Vihar in middle of the school year.",
    answer: ["No."],
  },
  {
    question: "My child is 14 years old. Can he/she join Bal Vihar?",
    answer: ["Yes, he / she can join Bal Vihar."],
  },
  {
    question:
      "My child’s friend is in a different group than the group assigned to my child. Can he/she switch?",
    answer: [
      "Generally no, unless they were in a large group of the same grade that was split because of class size.",
    ],
  },
  {
    question: "Is there a Registration Fee?",
    answer: [
      "Yes. Registration for students is $250 plus a $50 refundable volunteer deposit. The volunteer deposit is returned upon completion of your selected volunteer activity for the school year.",
    ],
  },
  {
    question: "Is the registration fee refundable if my child does not attend?",
    answer: [
      "Once you register, no fees are returned once the school classes begin. You can get the volunteer deposit back.",
    ],
  },
  {
    question:
      "If I am unable to afford the registration fees for Bal Vihar and my child/children wish to attend what should I do?",
    answer: ["Please refer to the policy."],
  },
  {
    question:
      "Since Bal Vihar is a not-for-profit organization, is the registration fee tax exempt?",
    answer: [
      "No. Registration pays for school services and is not tax deductible. Donations to Bal Vihar are tax-exempt.",
    ],
  },
  {
    question: "Why Bal Vihar charges a registration fee?",
    answer: [
      "Operational expenses, school rental, supplies and events are our major expense items and we generally break even. Bal Vihar is an all volunteer organization and it has no payroll expense.",
    ],
  },
  {
    question: "When can I register my child/children?",
    answer: ["May through July, before the school year starts."],
  },
  {
    question: "I am traveling to India in summer? How could I enroll my child?",
    answer: [
      "Online registration is open from May through July. After the announced deadline, no child is admitted.",
    ],
  },
  {
    question: "When is the school in session?",
    answer: [
      "From 10:00 am - 12:30 pm on select Sundays from August - May, usually every other week. There are breaks, and sometimes classes fall on two Sundays in a row. Please refer to the School Calendar for the complete schedule.",
    ],
  },
  {
    question: "Is every parent required to volunteer?",
    answer: [
      "Yes. Bal Vihar is volunteer-run. At least one parent must volunteer, or the volunteer deposit is not refunded. For families with multiple children, volunteering is per child.",
    ],
  },
  {
    question: "How do I volunteer?",
    answer: [
      "At the time of registration, please pick the event activity from the menu. If you would like to be part of the administration team please contact one of the administrative team members.",
    ],
  },
  {
    question: "I missed my volunteer obligation, what are my options?",
    answer: [
      "If it is the end of the school year and you missed the volunteer obligation and if all volunteer activities are done, you have to forfeit the volunteer deposit. If it is in the beginning or middle of the school year then we may assign you to volunteer in any upcoming activity provided a spot is available. Please contact one of the volunteering team members.",
    ],
  },
  {
    question: "What is Bal Vihar’s primary mode of communication?",
    answer: [
      "Via the e-mail, administration or the teacher will contact you for all the announcements or activities. You can also visit the website or your child/children’s webpage for the day’s activity or class homework.",
    ],
  },
  {
    question: "Can I send a mass e-mail to parents?",
    answer: ["No. Only authorized individuals from the administration can send mass email."],
  },
  {
    question: "Do Bal Vihar children celebrate any festivals?",
    answer: [
      "Yes, Diwali, Holi, Republic day, picnic are the main events. Please ",
      { text: "click here", href: "/photos" },
      " for photos from previous years.",
    ],
  },
  {
    question: "Does Bal Vihar have a designated curriculum?",
    answer: [
      "Yes, regular Bal Vihar curriculum includes religious, social and cultural units besides dedicated yoga and Bhajan curriculum. For details, please ",
      { text: "click here", href: "/education/curriculum#groups-k-7" },
      ". For youth group curriculum, ",
      { text: "click here", href: "/education/curriculum#youth-group" },
      ".",
    ],
  },
  {
    question:
      "Can my child represent Bal Vihar in another local organization function or celebration?",
    answer: ["Only with permission from Bal Vihar faculty or administration."],
  },
  {
    question: "I would like to advertise my business on Bal Vihar’s website. How do I do it?",
    answer: ["Please discuss the rates with the fundraising team."],
  },
  {
    question:
      "Can a mass e-mail about a function or activity by any other organization or a business or an individual be sent to parents?",
    answer: ["No. Bal Vihar mass communication is for school-related activities only."],
  },
  {
    question:
      "Are there any policies and procedure to follow in case of any grievance against a teacher or member of administration?",
    answer: [
      "Yes, Bal Vihar follows a strict National code of ethics and conduct. Policies and Procedures are in place if there are any complaints. Please ",
      { text: "click here", href: "/about-us/policies-procedures" },
      " for details.",
    ],
  },
];

const createAnswerBlock = (key: string, parts: Part[]) => {
  const markDefs: { _type: "link"; _key: string; href: string }[] = [];
  const children = parts.map((part, index) => {
    const spanKey = `${key}-span-${index}`;
    if (typeof part === "string") return { _type: "span", _key: spanKey, text: part, marks: [] };

    const markKey = `${key}-link-${index}`;
    markDefs.push({ _type: "link", _key: markKey, href: part.href });

    return { _type: "span", _key: spanKey, text: part.text, marks: [markKey] };
  });

  return { _type: "block", _key: key, style: "normal", markDefs, children };
};

async function seedFaqs() {
  const client = getCliClient({ apiVersion: "2025-01-01" });
  const items = FAQS.map(({ question, answer }, index) => ({
    _type: "faqItem",
    _key: `faq-${index + 1}`,
    question,
    answer: [createAnswerBlock(`faq-${index + 1}-answer`, answer)],
  }));

  await client.createIfNotExists({
    _id: "faqs",
    _type: "faqs",
    title: "Questions & Answers",
    items,
  });
  console.log(`Seeded ${items.length} questions (nothing changes if "faqs" already exists).`);
}

seedFaqs().catch((error: unknown) => {
  console.error("Could not seed the FAQs", error);
  process.exit(1);
});
