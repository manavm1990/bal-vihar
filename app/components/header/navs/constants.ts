interface NavigationItem {
  name: string
  link: string
  items: NavigationSubItem[]
}

interface NavigationSubItem {
  name: string
  link: string
}

export const NAVIGATION = [
  {
    name: 'About Us',
    link: '/about-us',
    items: [
      { name: 'History', link: '/about-us/history' },
      { name: "President's Message", link: '/about-us/presidents-message' },
      { name: 'Advisory Board', link: '/about-us/advisory-board' },
      { name: 'Administrative Team', link: '/about-us/administrative-team' },
      { name: 'Policies & Procedures', link: '/about-us/policies-and-procedures' },
      { name: 'Community Outreach', link: '/about-us/community-outreach' },
    ],
  },
  {
    name: 'Admissions',
    link: '/admissions',
    items: [
      { name: 'Admission Process', link: '/admissions/admission-process' },
      { name: 'Tuition', link: '/admissions/tuition' },
      { name: 'Refund Policy', link: '/admissions/refund-policy' },
    ],
  },
  {
    name: 'Education',
    link: '/education',
    items: [
      { name: 'Curriculum  (K - 7)', link: '/education/curriculum-k-7' },
      { name: 'Curriculum - Youth Group', link: '/education/curriculum-youth-group' },
      { name: 'Education Policy', link: '/education/education-policy' },
      { name: 'Class Webpages', link: '/education/class-webpages' },
      { name: 'Class Schedule', link: '/education/class-schedule' },
      { name: 'Facility', link: '/education/facility' },
    ],
  },
  {
    name: 'News & Events',
    link: '/news-and-events',
    items: [
      { name: 'Bal Vihar in News', link: '/news-and-events/bal-vihar-in-news' },
      { name: 'Upcoming Classes/Events', link: '/news-and-events/upcoming-classes-events' },
    ],
  },
  {
    name: 'Resources',
    link: '/resources',
    items: [
      { name: 'Parents Resources', link: '/resources/parents-resources' },
      { name: 'Student Resources', link: '/resources/student-resources' },
      { name: 'Faculty Resources', link: '/resources/faculty-resources' },
      { name: 'Admin Resources', link: '/resources/admin-resources' },
    ],
  },
  {
    name: 'Giving',
    link: '/giving',
    items: [
      { name: 'Welcome Message', link: '/giving/welcome-message' },
      { name: 'Give Online', link: '/giving/give-online' },
      { name: 'Make a Gift', link: '/giving/make-a-gift' },
      { name: 'Matching Gift Program', link: '/giving/matching-gift-program' },
      { name: 'Matching Gift Companies', link: '/giving/matching-gift-companies' },
      { name: 'Event Sponsors', link: '/giving/event-sponsors' },
    ],
  },
  {
    name: 'Volunteering',
    link: '/volunteering',
    items: [
      { name: 'Why Volunteer?', link: '/volunteering/why-volunteer' },
      { name: 'Volunteer Opportunities', link: '/volunteering/volunteer-opportunities' },
      { name: 'Volunteer Application', link: '/volunteering/volunteer-application' },
      { name: 'Volunteer Policies', link: '/volunteering/volunteer-policies' },
      { name: 'Volunteers List', link: '/volunteering/volunteers-list' },
    ],
  },
  {
    name: 'Community Projects',
    link: '/community-projects',
    items: [
      { name: 'CANstruction', link: '/community-projects/canstruction' },
      { name: 'Clothes Drive', link: '/community-projects/clothes-drive' },
      { name: 'Independence Day', link: '/community-projects/independence-day' },
      { name: 'International Yoga Day', link: '/community-projects/international-yoga-day' },
      { name: 'Walk for Water', link: '/community-projects/walk-for-water' },
    ],
  },
] as const satisfies readonly NavigationItem[]
