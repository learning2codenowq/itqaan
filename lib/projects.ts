// lib/projects.ts
//
// Project + testimonial registry, used by service pages and (later) /portfolio.
// Each slug matches an image at public/projects/<slug>.webp (16:9).
//
// PLACEHOLDER TESTIMONIALS: every quote below is placeholder copy written to
// show the layout. Replace each `quote` with the client's real words and each
// `author` with their real name before pointing anyone at these pages.
// Keep the no-female-imagery rule in mind if project images change.

export type Project = {
  slug: string
  name: string
  category: string
  services: string[]      // service slugs this project proves, see lib/serviceNav.ts
  url?: string            // live site, shown when set
  testimonial?: {
    quote: string
    author: string        // real client name goes here
    role: string          // e.g. 'Owner, Anas Marble'
  }
}

export const projects: Project[] = [
  {
    slug: 'anasmarble',
    name: 'Anas Marble',
    category: 'Marble & stonework',
    services: ['web-design'],
    testimonial: {
      quote:
        'The site looks far more professional than what we had before, and customers now mention it when they call. The whole process took less than an hour of my time.',
      author: 'Anas Marble',
      role: 'Anas Aga',
    },
  },
  {
    slug: 'halalcert',
    name: 'Halal Certification',
    category: 'Certification services',
    services: ['web-design'],
    testimonial: {
      quote:
        'I am super impressed by their work and work ethic. Ma shaa Allah! May Allah bless them immensely, despite my many changes they were full of patience.',
      author: 'Halal Certification',
      role: 'Dr. Umar Al Qadri',
    },
  },
  {
    slug: 'mathtutor',
    name: 'Math Tutor',
    category: 'Tutoring',
    services: ['web-design'],
    testimonial: {
      quote:
        'Alhamdulilah it was really good experience working with ITQAAN. They modified aspects of the websites I required and gave it a better structure. Within a week after completion I have recieved a few leads so far alhamdulilah. They are also very communicative and attentive to detail which is key.',
      author: 'Math Tutor',
      role: 'Shabib',
    },
  },
  {
    slug: 'quranteaching',
    name: 'Quran Teaching',
    category: 'Online Quran academy',
    services: ['web-design'],
    testimonial: {
      quote:
        'The design feels calm, exactly right for teaching the Quran. Enrolment enquiries went up as soon as it launched.',
      author: 'Quran Teaching',
      role: 'Shayan Qureshi',
    },
  },
  {
    slug: 'royalthobes',
    name: 'Royal Thobes',
    category: 'Menswear',
    services: ['web-design', 'ecommerce'],
    testimonial: {
      quote:
        'Fast, honest, and the store works beautifully on mobile. Feedback rounds continued until every detail was right, with no extra charges.',
      author: 'Royal Thobes',
      role: 'Mohamed Hersi',
    },
  },
  {
    slug: 'tadabbur',
    name: 'Tadabbur',
    category: 'Islamic education',
    services: ['web-design'],
    testimonial: {
      quote:
        'A premium site that captures the attention of parents. ITQAAN paid very close attention to all the details and were super fast with their revisions.',
      author: 'Tadabbur',
      role: 'Um Abduallah',
    },
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
