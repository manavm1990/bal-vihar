import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { BASE_TITLE } from "./constants";

export interface StaticPageContent {
  title: string;
  subtitle?: string;
  description: string;
  content: string;
  images?: Record<string, StaticImageData>;
  singleColumn?: boolean;
}

export const STATIC_PAGES = {
  about: {
    title: "About Us",
    description:
      "Vision, mission, nonprofit status, and program overview for Bal Vihar of St. Louis.",
    content:
      "## Vision\n\nTo foster and preserve Indian cultural values amongst children.\n\n## Mission\n\n*To make Bal Vihar of St. Louis an exciting and encouraging educational environment for children through appropriate activities conducted by committed professional volunteers.*\n\n---\n\n## About Us\n\nFounded in 1992, the Center for Indian Cultural Education was originally supported by Mahatma Gandhi Center till it received its independent status as a non-profit organization with exemption from the Federal Income tax under section **501(c)(3)**. The donations are tax deductible per our organization status. Its detail is as follows:\n\n* IRS Employee ID#: 20-2542002\n* Effective date: March 31, 2005\n* State of MO ID: N00647451\n\nThe cultural school is designed to promote, instill, and foster Indian culture in children of *ages 5 and above*. The children ages 5 through 12 are involved in activities such as prayers, yogasana, teachings of Indian culture, studies of values from the Indian epics Mahabharat, Ramayan and exposure to Hitopadesh, Panchtantra etc. The children also participate in [local community activities](/about-us/community-outreach).   \n  \nFor the youth group (ages 13 years and above), Bal Vihar encourages children to participate in different activities that promote respect and understanding of different cultures. Students have provided practical help to the communities in need. Various in-house community events such as Grand Parents program, Youth Lunch Program and helping at the Blood and Bone Marrow Drives have been a good success in the past few years.\n\nThe school provides **Community Service Hours Certificate** to students to use for high school graduation.  Bal Vihar is not only teaching Indian culture but also exposing the students to other cultures and religions by having our classes visit other places of worship.\n\nThe school meets on select Sundays, usually every other week, from August through May from 10 am - 12:30 pm at **Hindu Temple Community Center**, 725 Weidman Road, Ballwin, MO 63011.  \n  \nTo find out more about this school, you can [contact](/questions) any member of the [Administrative Team](/about-us/administrative-team)\n\n## Learn more\n\n* [History](/about-us/history)\n* [President's message](/presidents-message)\n* [Administrative team](/about-us/administrative-team)\n* [Policies & procedures](/about-us/policies-procedures)\n* [Community outreach](/about-us/community-outreach)",
  },
  communityOutreach: {
    title: "Community Outreach",
    description: "Community outreach and service project context for Bal Vihar students.",
    content:
      "## Serving the Community\n\nSince the inception of Bal Vihar, community service projects have been an integral part of the program. Children as young as 5 years to the youth group participate each year and learn practical ways to give back to the community in need by various projects.  The younger children are involved in yearly food and clothing drives, writing postcards for nursing home and elderly patients and visiting them. The older children volunteer at various food pantries, soup kitchens, summer projects and grounds maintenance at the Hindu Temple. Bal Vihar is not only teaching Indian culture but also exposing the students to other cultures and religions.  We have partnered with “Faith Beyond Walls” and participate in many interfaith community outreach, discussions and service projects. Various field trips are offered to the youth group to interact and exchange views with the youth from the other faiths.\n\n## Service Partners and Projects\n\nFollowing is a list of various places/ projects where Bal Vihar children have volunteered and this list grows each year according the needs.\n\n* Annie Malone children & family service center\n* Bhutan Refugees\n* Circle of Concern\n* Donation of items for Katrina Relief\n* Faith Beyond Walls tree planting and SLICE program\n* Joint Neighborhood Ministries\n* Missouri Baptist Hospital\n* Missouri School for Blind\n* Our Little Haven\n* Ranken Jordan Hospital\n* Ronald McDonald House\n* St. Louis Children’s Hospital\n* St. Patrick’s Center\n* Supporting our troops in Iraq and Afghanistan\n* Yearly Clothing drive\n* Yearly Food drive\n\nVarious in-house community events such as Grand Parents program, Youth Lunch Program and helping at the Blood and Bone Marrow Drives have been a good success in the past few years. The school provides Community Service Hours Certificate to students to use for high school graduation.\n\nTo find out more about this school, you can [contact](/questions) any member of the [administrative team](/about-us/administrative-team).",
  },
  education: {
    title: "Education",
    description: "Education philosophy and curriculum overview for Bal Vihar.",
    content:
      'Bal Vihar helps students to learn Indian culture and its application to global multicultural and multifaceted society. With value based teaching, the students learn respect, honesty and good citizenship. They are also taught discipline, tolerance and devotion in their daily routine.\n\nBal Vihar\'s main goal is to integrate Indian cultural values with the mainstream. This organization prepares the future achievers of the United States to be well rounded and apply the learned values for the best of the communities. The ultimate goal is "**to throw the light of cultural knowledge on every child, to make every child an outstanding citizen and to spread the song of peace and harmony around the world**".\n\nExplore the [K–7 curriculum](/education/curriculum#groups-k-7), the [youth group curriculum](/education/curriculum#youth-group), the [class schedule](/education/class-schedule), the [class webpages](/education/class-webpages), and the [teaching faculty](/education/teaching-faculty). You can also watch the [Daily Gita on YouTube](https://youtu.be/5wC1C89AQRA), a channel created by volunteers and Lal Prabhu Ji.',
    singleColumn: true,
  },
  curriculumK7: {
    title: "Curriculum K–7",
    description: "Objectives, methodology, and assessment for the K–7 curriculum.",
    content:
      "## Objectives\n\nThe Goal of the Education in Bal Vihar is to offer students a window into the Indian heritage and culture.  The focus is to create and sustain the student’s interest and enthusiasm on information related to India and also, increase/build self-identity. In addition to a well rounded education, Bal Vihar offers several opportunities for the students to find the joy in being of Indian origin through school wide celebrations, holiday celebrations, and social action projects. The curriculum is built to meet the vision of the organization.\n\nThe Curriculum is **divided into three units: Religion, Culture, and Social** (History/Geography). Each year, the topics of study will be built on the material learnt in the previous class to allow for continuity.\n\n### Religion\n\n* Understand the ethical and moral values from stories from the holy books and their practical implication.\n* The ability to name and describe the Das Avatars and discuss Krishna Avatar in detail.\n* Knowledge of the two epics Ramayana and Mahabharata.\n* An understanding of the values and ethical dilemmas in the two epics.\n* The ability to describe the basics of symbolisms and samskaras.\n* An appreciation of Hinduism and its place in the world religions.\n* The ability to explain the significance of various Hindu festivals.\n* Basic knowledge of Hindu festivals.\n\n### Culture\n\n* The ability to explain the significance of various Indian festivals.\n* An understanding of Indian art forms, architecture, literature, sports, and music.\n* An appreciation for the diversity associated with various cultures in India.\n\n### Social\n\n#### History\n\n- An understanding of the Indian historical facts and context.\n- The ability to analyze and identify change in India over time and its drivers.\n- An appreciation for the role of India played in shaping the human story.\n- The ability to speak and present effectively about Indian history.\n- The ability to peruse library and internet resources for relevant materials.\n\n#### Geography\n\n- The ability to identify the location of India and identify its neighboring countries.\n- The ability to identify the major physical features of India (The Great Himalayan Mountain Ranges, the Indo-Gangetic plain, the desert region, and the peninsular South Indian region), urban centers, and rivers.\n- An understanding of the role of rivers in the development of India.\n- Understand the meteorological processes, the resulting seasons (summer, monsoon, post-monsoon, and winter), and its influence on agriculture.\n\n## Methodology\n\nTeaching in Bal Vihar is “Learner/Student-Centered” . Depending on the student’s learning style, the individual teachers focus on effective ways and modes for providing the learning experience. To this end, the teachers are encouraged to use a variety of methods such as interactive lectures, audio-visual materials, group discussions, student presentations, individual research, case studies, simulations, field work etc.\n\n## Assessment\n\nStudents are assessed on continuous basis to see how they are performing, identify areas of improvement, and provide feedback to parents. Assessment can be based on writing an individual paper, preparing a group presentation, class participation, attendance, homework problem sets, exams (essay, short answer, multiple choice, true/false), and so on and is left to the discretion of the teacher. An end of year, feedback of all the students as determined by the respective teachers (i.e surveys, recognitions, awards etc.) will be provided to all parents.\n\nAll parents are requested to participate in any surveys that teachers might send. Teamwork between parents, teachers, and school administrators is vital for student and school success.",
  },
  curriculumYouthGroup: {
    title: "Curriculum Youth Group",
    subtitle: "Levels Y1–Y5",
    description: "Youth group curriculum and program expectations.",
    content:
      '## Objectives\n\nGuide the students to gain a sense of belonging to the community and to help them associate and identify them confidently and proudly of their Indian cultural and religious roots.  This is proposed to be achieved through various class room activities, workshops, seminars, lectures, hands on community service and volunteering activities.  All sessions will be interactive.\n\nThe Curriculum is divided into five units: Religion, interactive classroom discussion and home work, community and interfaith volunteer activities, field trips to gain knowledge about other cultures/religions and Bal Vihar class room volunteering.  There is also project based learning, other electives and interactive discussion sessions.\n\n* Y1,Y2 and Y3: Students will go through the full curriculum as above (10:00-12:30)\n* Y1,Y2 and Y3: Will learn Bagavad Gita as the basis for religious education. Other religious activities such as reciting Hanuman Chalisa and discussion on Ramayana will be at the discretion of the faculty.\n* Y3: Graduation from the Balvihar program is offered once the student completes Y3\n* Y4: Students will be offered Project based learning and involved in management and planning the community project events. They will be offered leadership guidance. Few of the students may be selected to run the “newsletter” program.\n* Y4: Will also assist in class rooms.\n* Y5: Serve as teachers in the class rooms and lead community project activities. These activities will allow the students to read more and be confident to teach the younger classes to be good role models and to strengthen their own belief.\n* Y5: Will be given a “Farewell” at the completion of the program\n\n## Unit 1: Religious Connection\n\n* Bhagavad Gita discourse by HG Lal Gopal Das Prabhu, President ISKCON\n* Bhagavad Gita Chapters 2, 12 and 16 in Y3 group by Dr. Hamsa Subramanian\n* Hanuman Chalisa, Ramayana\n* Mahabharata DVD\n\n## Unit 2 – Interactive classroom discussion, Student presentations and home work\n\n* Differences and similarities between Western (US) and Asian (Indian) cultures.\n* Peer Pressure and Family expectations/ Role of alcohol, drugs/Dating\n* Self Identity and Self Respect.\n* Be proud of who you are.\n* Role Models\n* What does the religion teach you?\n* Santana Dharma\n* Comparison of different world religions (3 lectures)\n* The Three Gunas\n* Asato Ma Sat Gamaya\n* Hindu scriptures\n* Karma Yoga\n* Swami Vivekananda\n* Vedic Math\n* Ancient Indian Science (4 Lectures)\n* Character comparison Krishna and Rama\n\n### Student Presentations\n\n* Non-Violence: Is it still relevant in this day and age?\n* Financial Melt Down? What do YOU want to do about it? Is there a difference between “Need and Greed” and could you tie to your "Karmas"?\n* Career Choices: Have you ever thought about it? What should you really look in a career?\n* Laws of Karma: How can the theory of Karma help you lead a positive life? Should we question laws of Karma? Is there a better explanation?\n* Three Guna\'s: Where do I fit in?\n* Vegetarianism: What is your opinion? Is it a personal Choice? How do like to approach people if you want to convince them to be a vegetarian?\n* Role of women in Hindu Religion: Compare with other religion. Do think that women were generally suppressed in the past by each society?\n* Why are there so many disasters in the world in the last few years? Are we near the end of Kal Yug?\n* "Grant me the serenity to accept the things I cannot change, courage to change what I can and wisdom to know the difference." St. Francis of Assisi. What do you think St. Fransis meant by this prayer? Do you think this holds true in what Gita teaches us? Refer to chapter two and make references to slokas that may explain St. Francis\'s prayer.\n* How does practice of Hinduism address protecting environment?\n* Arranged marriages: What do you know about them? Pros and Cons? Address sacrifice, adjustment, patience and respect?\n* Why should we go to temples and attend rituals?\n\n## Unit 3 – Service Oriented – Field and community service activities\n\nCommunity service projects participation in a more active manner by providing help within Bal Vihar and to the outside community. A calendar of activities would be given. The following activities are proposed\n\n* Food Drive\n* Clothing drive\n* In house community projects with younger classes\n* CANstruction drive\n* Poverty simulation\n* Volunteer at various food banks\n* Volunteer at Hindu Temple\n* Other Interfaith projects\n\n## Unit 4 – Bal Vihar Classroom Volunteers\n\n* Assist teachers and other volunteers in day-to-day running of a session. This will be done in rotation among the youth.  This activity will enable the youth to become Bal Vihar teachers as they get older. Currently Y5 will teach and Y4 will be assisting.\n* The specific tasks of assisting in Y4 and Y5 will include research and preparing for the classes, some communication to the parents before and after each class and teaching at least 3-5 classes. Some youth may be given the opportunity to take classes on their own.\n* Bal Vihar teaching and youth group coordinators will further redefine these roles\n\n## Unit 5- Field Trips – Subject to change every year\n\n* Hindu temple Visit on the first day of the class for the Y1 class\n* Sikh Gurdwara\n* Jewish temple\n* ISKCON\n* Buddhist monastery\n* Vedanta Society\n* Bahai Temple\n* Out of town trip to various temples',
  },
  classSchedule: {
    title: "Class Schedule & Rooms",
    description: "Sunday class times and rooms for K–7 and youth groups, with a floor map.",
    content: `## Youth Group

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
} satisfies Record<string, StaticPageContent>;

export const createStaticPageMetadata = (page: StaticPageContent): Metadata => ({
  title: `${BASE_TITLE} | ${page.title}`,
  description: page.description,
});
