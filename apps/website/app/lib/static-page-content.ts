import type { Metadata } from "next";

import { BASE_TITLE } from "./constants";

export interface StaticPageLink {
  label: string;
  href: string;
  description: string;
}

export interface StaticPageContent {
  title: string;
  description: string;
  content: string;
  links?: StaticPageLink[];
  singleColumn?: boolean;
}

export const STATIC_PAGES = {
  about: {
    title: "About Us",
    description:
      "Vision, mission, nonprofit status, and program overview for Bal Vihar of St. Louis.",
    content:
      "## Vision\n\nTo foster and preserve Indian cultural values amongst children.\n\n## Mission\n\n*To make Bal Vihar of St. Louis an exciting and encouraging educational environment for children through appropriate activities conducted by committed professional volunteers.*\n\n---\n\n## About Us\n\nFounded in 1992, the Center for Indian Cultural Education was originally supported by Mahatma Gandhi Center till it received its independent status as a non-profit organization with exemption from the Federal Income tax under section **501(c)(3)**. The donations are tax deductible per our organization status. Its detail is as follows:\n\n* IRS Employee ID#: 20-2542002\n* Effective date: March 31, 2005\n* State of MO ID: N00647451\n\nThe cultural school is designed to promote, instill, and foster Indian culture in children of *ages 5 and above*. The children ages 5 through 12 are involved in activities such as prayers, yogasana, teachings of Indian culture, studies of values from the Indian epics Mahabharat, Ramayan and exposure to Hitopadesh, Panchtantra etc. The children also participate in local community activities.   \n  \nFor the youth group (ages 13 years and above), Bal Vihar encourages children to participate in different activities that promote respect and understanding of different cultures. Students have provided practical help to the communities in need. Various in-house community events such as Grand Parents program, Youth Lunch Program and helping at the Blood and Bone Marrow Drives have been a good success in the past few years.\n\nThe school provides **Community Service Hours Certificate** to students to use for high school graduation.  Bal Vihar is not only teaching Indian culture but also exposing the students to other cultures and religions by having our classes visit other places of worship.\n\nThe school meets every other Sunday from August through May from 10 am - 12:30 pm at **Hindu Temple Community Center**, 725 Weidman Road, Ballwin, MO 63011.  \n  \nTo find out more about this school, you can [contact](/questions) any member of the [Administrative Team](/about-us/administrative-team)",
    links: [
      {
        label: "History",
        href: "/about-us/history",
        description: "Learn how Bal Vihar has served the St. Louis community since 1992.",
      },
      {
        label: "President's Message",
        href: "/presidents-message",
        description: "Read the current message from Bal Vihar leadership.",
      },
      {
        label: "Advisory Board",
        href: "/about-us/advisory-board",
        description: "Meet the advisors supporting the organization.",
      },
      {
        label: "Administrative Team",
        href: "/about-us/administrative-team",
        description: "See how volunteer teams support operations, education, and events.",
      },
      {
        label: "Policies & Procedures",
        href: "/about-us/policies-procedures",
        description: "Review the policies that guide Bal Vihar families and volunteers.",
      },
      {
        label: "Community Outreach",
        href: "/about-us/community-outreach",
        description: "See how service projects are integrated into the program.",
      },
    ],
  },
  advisoryBoard: {
    title: "Advisory Board",
    description: "Advisory board information for Bal Vihar of St. Louis.",
    content:
      "Bal Vihar has an advisory board consistent of prominent people from the community. Board meetings are held quarterly. The board functions as providing future direction and support to the Bal Vihar’s management team.  \n  \nAdvisory board is designed to provide guidance and oversight for: -\n\n* operational improvements.\n* changes to policies and procedures.\n* growth of the organization.",
  },
  communityOutreach: {
    title: "Community Outreach",
    description: "Community outreach and service project context for Bal Vihar students.",
    content:
      "## [Community Projects](/community-projects)\n\nSince the inception of Bal Vihar, community service projects have been an integral part of the program. Children as young as 5 years to the youth group participate each year and learn practical ways to give back to the community in need by various projects.  The younger children are involved in yearly food and clothing drives, writing postcards for nursing home and elderly patients and visiting them. The older children volunteer at various food pantries, soup kitchens, summer projects and grounds maintenance at the Hindu Temple. Bal Vihar is not only teaching Indian culture but also exposing the students to other cultures and religions.  We have partnered with “Faith Beyond Walls” and participate in many interfaith community outreach, discussions and service projects. Various field trips are offered to the youth group to interact and exchange views with the youth from the other faiths.\n\nFollowing is a list of various places/ projects where Bal Vihar children have volunteered and this list grows each year according the needs.\n\n| * Annie Malone children & family service center * Bhutan Refugees * Circle of Concern * Donation of items for Katrina Relief * Faith Beyond Walls tree planting and SLICE program * Joint Neighborhood Ministries * Missouri Baptist Hospital * Missouri School for Blind | * Our Little Haven * Ranken Jordan Hospital * Ronald McDonald House * St. Louis Children’s Hospital * St. Patrick’s Center * Supporting our troops in Iraq and Afghanistan * Yearly Clothing drive * Yearly Food drive |\n\nVarious in-house community events such as Grand Parents program, Youth Lunch Program and helping at the Blood and Bone Marrow Drives have been a good success in the past few years. The school provides Community Service Hours Certificate to students to use for high school graduation.\n\nTo find out more about this school, you can [contact](/questions) any member of the [administrative team](/about-us/administrative-team).",
  },
  admissions: {
    title: "Admissions",
    description: "Admissions overview for students ages 5 through 18.",
    content:
      "Bal Vihar of St. Louis admits any student aged 5 through 18, regardless of their background, and expects all to abide by the [policies and procedures](/about-us/policies-procedures).",
    links: [
      {
        label: "Admissions Policies",
        href: "/about-us/policies-procedures#admissions",
        description:
          "Eligibility, registration dates, fees, refunds, class allocation, preview, and financial assistance.",
      },
    ],
  },
  education: {
    title: "Education",
    description: "Education philosophy and curriculum overview for Bal Vihar.",
    content:
      'Bal Vihar helps students to learn Indian culture and its application to global multicultural and multifaceted society. With value based teaching, the students learn respect, honesty and good citizenship. They are also taught discipline, tolerance and devotion in their daily routine.\n\nBal Vihar\'s main goal is to integrate Indian cultural values with the mainstream. This organization prepares the future achievers of the United States to be well rounded and apply the learned values for the best of the communities. The ultimate goal is "**to throw the light of cultural knowledge on every child, to make every child an outstanding citizen and to spread the song of peace and harmony around the world**".',
    links: [
      {
        label: "Curriculum K–7",
        href: "/education/curriculum-k-7",
        description: "Objectives, methodology, and assessment for the K–7 curriculum.",
      },
      {
        label: "Youth Group Curriculum",
        href: "/education/curriculum-youth-group",
        description: "Program goals and expectations for youth group students.",
      },
      {
        label: "Education Policies",
        href: "/about-us/policies-procedures#education",
        description: "Graduation, promotions, attendance, and youth group expectations.",
      },
      {
        label: "Class Schedule",
        href: "/education/class-schedule",
        description: "Class schedule information.",
      },
      {
        label: "Class Webpages",
        href: "/education/class-webpages",
        description: "What each class covered, homework and helpful links.",
      },
      {
        label: "Daily Gita on YouTube",
        href: "https://youtu.be/5wC1C89AQRA",
        description:
          "A YouTube channel for the daily Gita, created by volunteers and Lal Prabhu Ji. Opens YouTube.",
      },
    ],
  },
  curriculumK7: {
    title: "Curriculum K–7",
    description: "Objectives, methodology, and assessment for the K–7 curriculum.",
    content:
      "## Objectives\n\nThe Goal of the Education in Bal Vihar is to offer students a window into the Indian heritage and culture.  The focus is to create and sustain the student’s interest and enthusiasm on information related to India and also, increase/build self-identity. In addition to a well rounded education, Bal Vihar offers several opportunities for the students to find the joy in being of Indian origin through school wide celebrations, holiday celebrations, and social action projects. The curriculum is built to meet the vision of the organization.\n\nThe Curriculum is **divided into three units: Religion, Culture, and Social** (History/Geography). Each year, the topics of study will be built on the material learnt in the previous class to allow for continuity.\n\n### Religion\n\n* Understand the ethical and moral values from stories from the holy books and their practical implication.\n* The ability to name and describe the Das Avatars and discuss Krishna Avatar in detail.\n* Knowledge of the two epics Ramayana and Mahabharata.\n* An understanding of the values and ethical dilemmas in the two epics.\n* The ability to describe the basics of symbolisms and samskaras.\n* An appreciation of Hinduism and its place in the world religions.\n* The ability to explain the significance of various Hindu festivals.\n* Basic knowledge of Hindu festivals.\n\n### Culture\n\n* The ability to explain the significance of various Indian festivals.\n* An understanding of Indian art forms, architecture, literature, sports, and music.\n* An appreciation for the diversity associated with various cultures in India.\n\n### Social\n\n#### History\n\n- An understanding of the Indian historical facts and context.\n- The ability to analyze and identify change in India over time and its drivers.\n- An appreciation for the role of India played in shaping the human story.\n- The ability to speak and present effectively about Indian history.\n- The ability to peruse library and internet resources for relevant materials.\n\n#### Geography\n\n- The ability to identify the location of India and identify its neighboring countries.\n- The ability to identify the major physical features of India (The Great Himalayan Mountain Ranges, the Indo-Gangetic plain, the desert region, and the peninsular South Indian region), urban centers, and rivers.\n- An understanding of the role of rivers in the development of India.\n- Understand the meteorological processes, the resulting seasons (summer, monsoon, post-monsoon, and winter), and its influence on agriculture.\n\n## Methodology\n\nTeaching in Bal Vihar is “Learner/Student-Centered” . Depending on the student’s learning style, the individual teachers focus on effective ways and modes for providing the learning experience. To this end, the teachers are encouraged to use a variety of methods such as interactive lectures, audio-visual materials, group discussions, student presentations, individual research, case studies, simulations, field work etc.\n\n## Assessment\n\nStudents are assessed on continuous basis to see how they are performing, identify areas of improvement, and provide feedback to parents. Assessment can be based on writing an individual paper, preparing a group presentation, class participation, attendance, homework problem sets, exams (essay, short answer, multiple choice, true/false), and so on and is left to the discretion of the teacher. An end of year, feedback of all the students as determined by the respective teachers (i.e surveys, recognitions, awards etc.) will be provided to all parents.\n\nAll parents are requested to participate in any surveys that teachers might send. Teamwork between parents, teachers, and school administrators is vital for student and school success.",
  },
  curriculumYouthGroup: {
    title: "Curriculum Youth Group",
    description: "Youth group curriculum and program expectations.",
    content:
      '(Y1 - Y5)\n\n## Objectives\n\nGuide the students to gain a sense of belonging to the community and to help them associate and identify them confidently and proudly of their Indian cultural and religious roots.  This is proposed to be achieved through various class room activities, workshops, seminars, lectures, hands on community service and volunteering activities.  All sessions will be interactive.\n\nThe Curriculum is divided into five units: Religion, interactive classroom discussion and home work, community and interfaith volunteer activities, field trips to gain knowledge about other cultures/religions and Bal Vihar class room volunteering.  There is also project based learning, other electives and interactive discussion sessions.\n\n* Y1,Y2 and Y3: Students will go through the full curriculum as above (10:00-12:30)\n* Y1,Y2 and Y3: Will learn Bagavad Gita as the basis for religious education. Other religious activities such as reciting Hanuman Chalisa and discussion on Ramayana will be at the discretion of the faculty.\n* Y3: Graduation from the Balvihar program is offered once the student completes Y3\n* Y4: Students will be offered Project based learning and involved in management and planning the community project events. They will be offered leadership guidance. Few of the students may be selected to run the “newsletter” program.\n* Y4: Will also assist in class rooms.\n* Y5: Serve as teachers in the class rooms and lead community project activities. These activities will allow the students to read more and be confident to teach the younger classes to be good role models and to strengthen their own belief.\n* Y5: Will be given a “Farewell” at the completion of the program\n\n## Unit 1: Religious Connection\n\n* Bhagavad Gita discourse by HG Lal Gopal Das Prabhu, President ISKCON\n* Bhagavad Gita Chapters 2, 12 and 16 in Y3 group by Dr. Hamsa Subramanian\n* Hanuman Chalisa, Ramayana\n* Mahabharata DVD\n\n## Unit 2 – Interactive classroom discussion, Student presentations and home work\n\n* Differences and similarities between Western (US) and Asian (Indian) cultures.\n* Peer Pressure and Family expectations/ Role of alcohol, drugs/Dating\n* Self Identity and Self Respect.\n* Be proud of who you are.\n* Role Models\n* What does the religion teach you?\n* Santana Dharma\n* Comparison of different world religions (3 lectures)\n* The Three Gunas\n* Asato Ma Sat Gamaya\n* Hindu scriptures\n* Karma Yoga\n* Swami Vivekananda\n* Vedic Math\n* Ancient Indian Science (4 Lectures)\n* Character comparison Krishna and Rama\n\n### Student Presentations\n\n* Non-Violence: Is it still relevant in this day and age?\n* Financial Melt Down? What do YOU want to do about it? Is there a difference between “Need and Greed” and could you tie to your "Karmas"?\n* Career Choices: Have you ever thought about it? What should you really look in a career?\n* Laws of Karma: How can the theory of Karma help you lead a positive life? Should we question laws of Karma? Is there a better explanation?\n* Three Guna\'s: Where do I fit in?\n* Vegetarianism: What is your opinion? Is it a personal Choice? How do like to approach people if you want to convince them to be a vegetarian?\n* Role of women in Hindu Religion: Compare with other religion. Do think that women were generally suppressed in the past by each society?\n* Why are there so many disasters in the world in the last few years? Are we near the end of Kal Yug?\n* "Grant me the serenity to accept the things I cannot change, courage to change what I can and wisdom to know the difference." St. Francis of Assisi. What do you think St. Fransis meant by this prayer? Do you think this holds true in what Gita teaches us? Refer to chapter two and make references to slokas that may explain St. Francis\'s prayer.\n* How does practice of Hinduism address protecting environment?\n* Arranged marriages: What do you know about them? Pros and Cons? Address sacrifice, adjustment, patience and respect?\n* Why should we go to temples and attend rituals?\n\n## Unit 3 – Service Oriented – Field and community service activities\n\nCommunity service projects participation in a more active manner by providing help within Bal Vihar and to the outside community. A calendar of activities would be given. The following activities are proposed\n\n* Food Drive\n* Clothing drive\n* In house community projects with younger classes\n* CANstruction drive\n* Poverty simulation\n* Volunteer at various food banks\n* Volunteer at Hindu Temple\n* Other Interfaith projects\n\n## Unit 4 – Bal Vihar Classroom Volunteers\n\n* Assist teachers and other volunteers in day-to-day running of a session. This will be done in rotation among the youth.  This activity will enable the youth to become Bal Vihar teachers as they get older. Currently Y5 will teach and Y4 will be assisting.\n* The specific tasks of assisting in Y4 and Y5 will include research and preparing for the classes, some communication to the parents before and after each class and teaching at least 3-5 classes. Some youth may be given the opportunity to take classes on their own.\n* Bal Vihar teaching and youth group coordinators will further redefine these roles\n\n## Unit 5- Field Trips – Subject to change every year\n\n* Hindu temple Visit on the first day of the class for the Y1 class\n* Sikh Gurdwara\n* Jewish temple\n* ISKCON\n* Buddhist monastery\n* Vedanta Society\n* Bahai Temple\n* Out of town trip to various temples',
  },
  classSchedule: {
    title: "Class Schedule",
    description: "Saturday class schedules for K–7 and youth groups.",
    content: `## Groups K–3

| Time | K-1 | Group 1A | Group 2A | Group 3A |
| --- | --- | --- | --- | --- |
| 10:00 a.m. | Arathi — Room #5 | Arathi — Room #10 | Arathi — Room #11 | Arathi — Room #4 |
| 10:05 a.m. | Class instruction — Room #5 | Class instruction — Room #10 | Class instruction — Room #11 | Class instruction — Room #4 |
| 10:55 a.m. | Break | Break | Break | Break |
| 11:05 a.m. | Transition to yoga / bhajan | Transition to yoga / bhajan | Transition to yoga / bhajan | Transition to yoga / bhajan |
| 11:15 a.m. | Bhajan — Stage Right, Room #6 | Bhajan — Stage Right, Room #6 | Bhajan — Stage Right, Room #6 | Bhajan — Stage Right, Room #6 |
| 11:45 a.m. | Yoga — Stage Right, Room #6 | Bhajan — Stage Left, Room #9 | Yoga — Stage Area Center | Bhajan — Center Hall |
| 12:20 p.m. | Dismissal | Dismissal | Dismissal | Dismissal |

## Groups 4–7

| Time | Group 4A | Group 5A | Group 6A | Group 7A |
| --- | --- | --- | --- | --- |
| 10:00 a.m. | Assembly — Stage Area Center (Room #8) | Assembly — Hall Area 1 | Assembly — Hall Area 2 | Assembly — Stage Area Left |
| 10:05 a.m. | Bhajan — Stage Area Center (Room #8) | Yoga — Hall Area 1 | Yoga — Hall Area 2 | Bhajan — Stage Area Left |
| 10:35 a.m. | Yoga — Stage Area Center (Room #4) | Bhajan — Room #3 | Bhajan — Room #2 | Yoga — Stage Area Left |
| 11:05 a.m. | Transition to class | Transition to class | Transition to class | Transition to class |
| 11:10 a.m. | Break | Break | Break | Break |
| 11:20 a.m. | Class instruction — Room #10 | Class instruction — Room #10 | Class instruction — Room #10 | Class instruction — Room #10 |
| 12:30 p.m. | Dismissal | Dismissal | Dismissal | Dismissal |

## Youth Group

### Y1 Schedule

| Time | Room #13 | Teachers |
| --- | --- | --- |
| 10:00 – 10:15 a.m. | Invocation / guided meditation | Pradeep Singh, Mira Aubuchon, Ravi Ramphe |
| 10:15 – 11:15 a.m. | Bhagavad Gita | Ravi Ramphe |
| 11:15 – 11:30 a.m. | Break | |
| 11:30 a.m. – 12:30 p.m. | Class discussion, topics / speakers | Pradeep Singh, Mira Aubuchon |

### Y2 Schedule

| Time | Room #12 | Teachers |
| --- | --- | --- |
| 10:00 – 10:45 a.m. | Invocation / guided meditation | Venu Vennam, Niraj Shah, Padmadisha Das |
| 10:15 – 11:15 a.m. | Bhagavad Gita | Padmadisha Das |
| 11:15 – 11:30 a.m. | Break | |
| 11:30 a.m. – 12:30 p.m. | Class discussion, topics / speakers | Venu Vennam, Niraj Shah |

### Y3 Schedule

| Time | Room #1 | Teachers |
| --- | --- | --- |
| 10:00 – 10:15 a.m. | Invocation | Suresh Shaddarsanam, Neelima Swarna, Bhupal Dev |
| 10:15 – 11:15 a.m. | Bhagavad Gita | Bhupal Dev |
| 11:15 – 11:30 a.m. | Break | |
| 11:30 a.m. – 12:30 p.m. | Classroom discussion / guest speakers | Suresh Shaddarsanam, Neelima Swarna |

### Y4 Schedule

Y4 assists in classrooms: **Team A** from 10:00 – 11:15 a.m., **Team B** from 11:15 a.m. – 12:30 p.m. Both meet in Room #14.

| Time | Team A | Team B |
| --- | --- | --- |
| 10:00 – 10:15 a.m. | Assembly — Room #14 | Assembly — Room #14 |
| 10:15 – 11:05 a.m. | Community service | Room #14 |
| 11:20 – 11:30 a.m. | Meet with classroom teachers | Meet with classroom teachers |
| 11:30 a.m. – 12:30 p.m. | Room #14 | Community service |`,
    singleColumn: true,
  },
  giving: {
    title: "Giving",
    description: "Giving overview and donation options for Bal Vihar of St. Louis.",
    content:
      "**DEHI SAUBHAAGYAM AAROGYAM DEHIME PARAMAM SUKHAM RUPAM DEHI JAYAM DEHI YASHO DEHI DWISHOJAHI**\n\nUse the section links below for giving options.",
    links: [
      {
        label: "Welcome Message",
        href: "/giving/welcome-message",
        description: "A message for donors and supporters.",
      },
      {
        label: "Give Online",
        href: "/giving/give-online",
        description: "Tax-deductible donation information and online giving context.",
      },
      {
        label: "Make a Gift",
        href: "/giving/make-a-gift",
        description: "Ways to support Bal Vihar through individual gifts.",
      },
      {
        label: "Matching Gift Program",
        href: "/giving/matching-gift-program",
        description: "How matching gifts can amplify support.",
      },
      {
        label: "Matching Gift Companies",
        href: "/giving/matching-gift-companies",
        description: "Companies with matching-gift programs.",
      },
      {
        label: "Event Sponsors",
        href: "/giving/event-sponsors",
        description: "Sponsor recognition information.",
      },
    ],
  },
  welcomeMessage: {
    title: "Welcome Message",
    description: "Welcome message for Bal Vihar supporters and donors.",
    content:
      "Greetings from the fund-raising team and thank you for your interest in giving to the Center for Indian Cultural Education - Bal Vihar of St. Louis.   It is our hope that this site will help you learn more about the many ways to support us and the importance of your contributions.\n\nParents, alumni, grandparents, friends and various businesses have supported the school generously in the past.  Our exceptional volunteer faculty and thorough curriculum that constitute the educational experience would not be possible without the generous support of your time and money. The yearly fees support part of the expenses and our future growth depends on your contributions to fulfill our vision and mission. *A donation to Bal Vihar of St. Louis is an investment in the future of our children, to improve our offerings and to build our infrastructure*.  We hope that you will consider making a gift today.  Your **tax-deductable (****IRS Employee ID# : 20-2542002)**donation will make a difference.\n\n## Why Bal Vihar?\n\n## Watch these Videos",
  },
  giveOnline: {
    title: "Give Online",
    description: "Online giving and tax-deductible donation information.",
    content:
      "Thanks to generous people like you who share a passion for community work and cultural education. The Center for Indian Cultural Education, Bal Vihar of St. Louis is a **non-profit organization** (**Federal Tax ID 20-2542002**) under section **501(c) (3)**. Your individual donations are ***tax deductible***.\n\nBal Vihar of St. Louis is able to operate because of the generous support of people who share our commitment to bring students and culture together to enrich each other's lives. Bal Vihar of St. Louis relies on donations from caring people and corporations like **YOU**.\n\nDonate generously using our secured online portal.",
  },
  makeGift: {
    title: "Make a Gift",
    description: "Ways to make a gift to Bal Vihar of St. Louis.",
    content:
      'The **Online Appeal** is and must always be the priority at **Bal Vihar of St. Louis** as it provides essential support on an annual basis to furnish the necessary resources to provide an exceptional educational experience to our kids. Online donation gifts provide the edge needed to support and enhance curriculum, technology (projectors), major events, field trips and cover the difference between tuition income and the actual cost to nurture each Bal Vihar student.\n\nYour **tax-deductible** (**IRS Employee ID# : 20-2542002**) gift will help us provide the flexibility needed to meet the daily challenges of providing a quality cultural education and to maintain a path of learning excellence.\n\nThe online donation is an unrestricted source of income that gives Bal Vihar of St.  Louis the opportunity to allocate funds where the need is greatest.\n\nParents, alumni, parents of alumni, grandparents, faculty/staff, friends, foundations, and corporations may fund outstanding cultural curriculum, spiritual yoga, and major events celebrations along with new building need by donating online each year.\n\nGifts may be made to the Bal Vihar of St. Louis as follows: -\n\n* **Check -** Checks made payable to "**Center for Indian Cultural Education**" and mailed to following address: -\n\nCenter for Indian Cultural Education\n\nBal Vihar of St. Louis\n\n1700 Countrytop Court\n\nWildwood, MO 63038 USA\n\n* **Online** (*secured*) donation\n\n* **Matching Gifts** - are received from participating companies that match the amount of dollars given to "Center for Indian Cultural Education" by their employees and spouses, or retirees.\n\n* **Stocks -** Please send an inquiry to above address and we will contact you with more information.\n\n**Every gift – no matter the size – makes a difference at Bal Vihar of St. Louis.**\n\n*All gifts to Bal Vihar of St. Louis offer donors varying degrees of tax and financial benefits. Consult with your personal financial or legal adviser in making a gift that is the best choice for you.*',
  },
  matchingGiftProgram: {
    title: "Matching Gift Program",
    description: "Matching gift program information for donors.",
    content:
      'With matching gifts you can sometimes **double** or even **triple** your gift!\n\nOne of the smartest ways to give is through a matching gift program, where a company will match donations to charitable organizations. *These matches are often dollar for dollar, which doubles or sometimes triples your charitable-donation power*. Many employers sponsor matching gift programs and will match charitable contributions made by their employees.\n\n## How It Works (Manual Process)\n\n1. Check with your company\'s **human resources** or payroll department to see whether it offers a *matching gift program*.\n2. Ask for donation guidelines and a list of eligible charities (Bal Vihar of St. Louis is a "**Cultural**" organization) if your company does offer a matching gift program.\n3. Print a matching gift program form.\n4. Decide how much you want to donate.\n5. Make a **check** payable to "**Center for Indian Cultural Education**" and submit it to our treasurer or any admin staff member with "Employee Section" of matching gift program form completely filled in.\n6. Once received, we will complete rest of the form to ensure that the match is donated and received by Bal Vihar of St. Louis. We will mail form to your matching gift administrator.\n7. Usually, it takes any where from 3 to 4 months to receive the payment from your company.\n\n## How It Works (Online Process)\n\nThese days most of the companies are using online form to  submit matching gift program.\n\n1. Go to your company\'s **matching gift website  /portal**. Your Human Resource (**HR**) personnel should be able to locate this website for you.\n2. Log in using your User ID (SSN#) and password. You will need to select "**Center for Indian Cultural Education**" or "**Bal Vihar of St. Louis**" as the recipient organization and enter the amount, type and date of your gift.\n3. You will have the ability to print a confirmation of your gift registration.\n4. We will be notified and we will confirm receipt of a gift.\n5. Once confirmed by the organization and subsequently approved by your company\'s matching gift administrator, a gift will be recorded as eligible for the match.\n6. Matching gift check will be sent directly to the Bal Vihar of St. Louis.  \n   (Payments are usually made on a quarterly basis.)\n\n**If you have any question regarding the matching gift program, please contact [the fundraising team](/questions).**',
  },
  matchingGiftCompanies: {
    title: "Matching Gift Companies",
    description: "Matching gift company information.",
    content:
      "Your employer may match charitable contributions made by their employees. It is a great way to increase the size of your donation and voicing your support of Bal Vihar of St. Louis. Please contact the Human Resources Department at your place of employment for the appropriate form(s) and confirmation of a matching gifts program.\n\n## St. Louis Companies with Matching Gift Programs\n\n(We attempt to update this list annually, but please be aware companies may discontinue matching gift programs in the meantime)\n\n| * AAA of Missouri * AON * American Express * Ameren/UE * Anheuser-Busch InBev * AT&T * Bank of America * Boeing * Brown Shoe * Charles Schwab * Champion International Corporation * Compaq * Cooper Industries (Cooper Bussmann) * CPI Corporation * Daimler-Chrysler * Deaconess * Emerson * Energizer * First Data Corporation * Gannett Co. * General Dynamics * W. W. Grainger, Inc. * H & R Block * Harcourt, Inc. * Home Depot * IKON * Kemper Group * Laclede Gas * Mallinckrodt Medical Inc. * MasterCard Worldwide | * McDonnell Douglas Foundation * McGraw-Hill Companies * Merrill Lynch * Memco Barge Line * Microsoft * Monsanto Company * Mutual of America * Nestle Purina * Novus International * Office Depot * OHIC Insurance Co. - Columbia, MO * Peabody Energy * PepsiCo * Pfizer, Inc. * Philip Morris Companies * Prudential * Ralston Purina Company * Reliable Life Insurance * Rockwell Automation * SAFECO Insurance Companies * SIRSI Corporation * Solutia Fund * SYSCO * Tenet Healthcare * Tripos, Inc. * Tyco Healthcare/Mallinckrodt * U.S. Bank * Union Pacific Corporation * United Parcel Service * XTRA Corporation |",
    singleColumn: true,
  },
  eventSponsors: {
    title: "Event Sponsors",
    description: "Event sponsor information for Bal Vihar.",
    content:
      "2012 - 2013\n\nUTSAV - 20 Years Celebration\n\n2011 - 2012\n\n2010 - 2011\n\n2009 - 2010\n\n## Fundraising Gala Event for New School Building (2010)\n\nWe would like to extend our sincere appreciation and thanks to all of the businesses and individuals that donated to the Center for Indian Cultural Education - Bal Vihar of St. Louis fundraising event on **April 24, 2010** at Lafayette High School, Wildwood, MO. We met our goal and collected more than $230,000.",
  },
  volunteering: {
    title: "Volunteering",
    description: "Volunteer information and opportunities at Bal Vihar.",
    content:
      "Explore the volunteering section links below for roles, policies, and how to apply.\n\n## B-VISION Impact Award\n\n* [Guidelines](https://docs.google.com/document/d/1gz5G05b0LYaJ7t61iCeA8Rd_WexuNMhE/edit?usp=sharing&ouid=112480514389048193924&rtpof=true&sd=true)\n* [Tracking Sheet](https://docs.google.com/spreadsheets/d/1Z7_CjWQNsBynD2bwP2TplbfAGVt6MU98/edit?usp=sharing&ouid=112480514389048193924&rtpof=true&sd=true)\n* [Checklist](https://docs.google.com/presentation/d/1756nN0MXCDnFXKoj1NU6Q-6mp2sNMaPE/edit?usp=sharing&ouid=112480514389048193924&rtpof=true&sd=true)\n* [Submission form](https://forms.gle/a5YmconVUQcZy2Wu7)",
    links: [
      {
        label: "Why Volunteer?",
        href: "/volunteering/why-volunteer",
        description: "Why volunteer service matters to Bal Vihar.",
      },
      {
        label: "Volunteer Opportunities",
        href: "/volunteering/volunteer-opportunities",
        description: "Education, events, and administration volunteer roles.",
      },
      {
        label: "Volunteer Application",
        href: "/volunteering/volunteer-application",
        description: "How to start the volunteer application process.",
      },
      {
        label: "Volunteer Policies",
        href: "/about-us/policies-procedures#volunteer",
        description: "Expectations and policies for volunteers.",
      },
      {
        label: "Volunteers List",
        href: "/volunteering/volunteers-list",
        description: "Volunteer list.",
      },
    ],
  },
  whyVolunteer: {
    title: "Why Volunteer?",
    description: "Why volunteering matters at Bal Vihar.",
    content:
      "Bal Vihar is a non-profit educational organization made of community volunteers where all parents are expected to share the workload. This permits us to run the organization effectively and efficiently.\n\nParents volunteer for a wide variety of reasons, especially wanting to help kids learn our culture and celebrate our major eventss. There is a long tradition of seeing ***volunteering as a form of charity***, based on altruism and selflessness. When you volunteer you are giving something back to your community by lending a helping hand to people and organizations.\n\nWhat you may not realize is that volunteering also benefits you as a person. There are many good reasons to get involved in the community, including learning something about yourself.\n\nBal Vihar of St. Louis offers volunteer oppurtunities for both youth group students and parents.",
  },
  volunteerOpportunities: {
    title: "Volunteer Opportunities",
    description: "Education, events, and administration volunteer opportunities.",
    content:
      "Bal Vihar is a volunteer based organization, and thus always in need of volunteers. All volunteers are not paid any fees for their services. The volunteers at Bal Vihar fall into one of these categories:\n\n* Education / Teaching\n* Events\n* Administration\n\n## Education / Teaching\n\nAs we expand our enrollment and continually extend our offerings, we look for teacher volunteers. The success of Bal Vihar depends on the quality and delivery of the curriculum. This can be accomplished only with the enthusiastic, cooperative, and professional teaching volunteering staff members. We like to keep the number of students in each class to a maximum of 25 students and thus some times we split the class if this size is exceeded. So if any one interested, in teaching culture, religion or history, please [contact](/questions) our **education** team.\n\nWe require the following volunteers:\n\n* Teachers for Groups 1 to Y3\n* Bhajans and Prayers\n* Yoga\n* Community Service\n* Arts and Crafts\n* Class room parents\n\nNo prior teaching experience is needed. The curriculum is well designed and new comers will be paired with the experienced Bal Vihar teacher for the first year. Once, the teacher is experienced, a lead role is possible the following year. Please note that the teaching responsibility is a year long commitment and will require you to attend one summer session and two teachers meeting during the year.\n\n## Events\n\nBal Vihar conducts several events for the students and parents. All these events are planned and executed by parent volunteers. The events include – picnic, Diwali, holi, republic day, annual day, and family night. Each event is led by a parent volunteer and team of parents takes various activities for each event. You can see the description of these events at [events overview](/news-and-events). Please [contact](/questions) events team if you want to be involved with any of these events.\n\nFamily Night\n\nFamily Night is an exciting event usually held in one of the school Gyms. It gives students, parents, teachers and their families an opportunity to socialize , dance to dandiya beats and play games\n\nThe responsibilities include:-\n\n* Photography and Video Recording\n* Reserve the Event site well in advance (preferably 3-4 months as most of the parks get booked early)\n* Arrange and Set up Games for kids\n* Food Arrangements and distribution\n* Cleaning by all the volunteers\n\nDiwali\n\nDiwali Celebration is a major activity of Bal Vihar. There are usually 3-4 event coordinators and 20 parent volunteers needed for various activities. The event begins with pictures of all students in their class, pooja at the temple, Prasad and/or dinner followed by fireworks. The activities for this event include:-\n\n* Pooja materials purchase\n* Plan and Execute Diwali Pooja at the Hindu Temple\n* Plan, Purchase, Distribute and Monitor Fireworks\n* Photography and Video Recording\n* Plan and Organize Prasad and Dinner\n* Clean up\n\nHoli\n\nHoli program is conducted during spring. The program starts with a quick lunch for kids.  Children get to play colors after a short presentation or play. The activities include: -\n\n* Photography and Video Recording\n* Coordinate / Buy Colors, Packaging and Distribution\n* Food Arrangements and Distribution\n* Cleaning and Protecting the MGC and Hindu Temple Building from Color and Dirt\n\nAnnual Day\n\nBal Vihar year concludes with the Annual day program. This is the main event where almost everyone participates. It requires much more organized effort from students, parents, teachers and administrative staff. Each year the annual day preparations begin at least 5-6 months before the event. Teachers usually propose a theme and participants prepare keeping theme most groups perform in various events. Rehearsals start at least few weeks before the event. We would like to avoid distraction from the regular Bal Vihar curriculum. Most of the program them usually involves what the students have learned or related activities. Graduating students are awarded certificates. Teachers and volunteers are recognized. There is usually one chief guest, who delivers a small speech related to students or culture.\n\nThe responsibilities include: -\n\n* Two leads\n* Photography, video taping\n* Logistics of putting a program together by the mutual consent of teachers from each group, Yoga and Bhajans and arrangement of the MC\n* Management of sound system and AV equipment\n* Advertisement, creating, printing and distribution of the program souvenir\n* Arrangement, escorting and food needs of chief guest/guests (one volunteer)\n* Stage preparation, setting up, cleaning and seating Arrangement of the hall usually the day before or same day early morning\n* Order, delivery, set up and distribution of food\n* Cleaning and conclusion\n\n## Administration\n\nAfter participating at Bal vihar for few years, you get the opportunity to get more involved through the administration team. The roles within the administration team include: -\n\n* Operations\n* Website\n* Marketing and communications\n* Events Coordination and Execution\n* Fund Raising\n\nOperations\n\nThe Bal Vihar operations team is responsible for the day to day planning and execution of all Bal Vihar activities. This team has the following responsibilities: -\n\n* Secretary\n* Parents Coordination\n* Volunteer Coordination and Management\n* Logistics Coordinator - Take the teaching material, AV aids and lost & found items to the storage facility.\n* Prasadam coordination\n\nPlease [contact](/questions) operations team for further information. \n\nWebsite\n\nThe Bal Vihar Web team is responsible for the design and maintenance of the bal vihar web site, email lists and the contents. This team has the following responsibilities: -\n\n* Website Coordination\n* Website Content Management\n* Website Development\n* Marketing Materials\n* Marketing Communications\n\nVolunteers are needed to fill these roles. Volunteers with the website related expertise are encouraged to take appropriate relevant position. Also, Bal Vihar parent with the artistic skills can contribute in our marketing areas. Please [contact](/questions) website team for more information.\n\nEvents management\n\nWe described all the events above. The event management as part of the administration team is to plan and manage these events through the volunteers. This role organizes the meetings, plans the event and communicates with all parents, education team and the other administration team. They are responsible for the budgets etc as well.\n\nFund Raising\n\nBal Vihar is a non-profit organization and the fees we collect goes towards the educational expenses of the school. We need to raise additional funds for improving infrastructure, teaching aids and facilities for students. To this end, this effort is divided into two broad categories: -\n\n* Short term quick wins – sign up programs with Schnucks, Dierberg, Pizza Hut corporation etc. to donate the a part of the money to Bal Vihar for each transaction.\n* Long term big wins – Write up proposals and secure corporate and government funding\n\nPlease [contact](/questions) fundraising team for more information.\n\nIf you did not sign up for any of the above volunteer roles, sign up here and you will be called upon for any help and at any time.  \nIf you are interested in any of these positions, please contact one of the [administration team](/about-us/administrative-team) members or use the [contact form](/questions).",
  },
  volunteerApplication: {
    title: "Volunteer Application",
    description:
      "Apply to volunteer with Bal Vihar of St. Louis for teaching, events, and community programs.",
    content:
      "Bal Vihar is a volunteer-run organization, and every one of our programs depends on parents and community members who give their time. Tell us where you would like to help and a member of the volunteer team will be in touch.\n\nNot sure where to start? Read about the [volunteer opportunities](/volunteering/volunteer-opportunities) and the [volunteer policies](/about-us/policies-procedures#volunteer) first.",
    singleColumn: true,
  },
  volunteersList: {
    title: "Volunteers List",
    description: "Volunteers list.",
    content:
      "Meet the volunteers serving on Bal Vihar’s Advisory Board, Executive Committee, and Administrative Team.",
    singleColumn: true,
  },
} satisfies Record<string, StaticPageContent>;

export const createStaticPageMetadata = (page: StaticPageContent): Metadata => ({
  title: `${BASE_TITLE} | ${page.title}`,
  description: page.description,
});
