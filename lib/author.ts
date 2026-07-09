// lib/author.ts
//
// Founder / author identity, the E-E-A-T "who". One source of truth, referenced
// by the homepage entity graph (founder), the blog author byline + bio, and the
// Person JSON-LD nodes on both. Shared @id so every reference resolves to one
// person entity for Google and AI assistants.
//
// The headshot lives at public/shayan-qureshi.webp (square, ~400x400).

export const BASE = 'https://withitqaan.com'
export const AUTHOR_ID = `${BASE}/#shayan`

export const AUTHOR = {
  name: 'Shayan Qureshi',
  role: 'Founder & Lead Designer',
  image: '/shayan-qureshi.webp',
  // Short line under a byline.
  bylineBio:
    '10+ years in design and branding for Muslim brands across the UAE, the GCC, and worldwide.',
  // Fuller bio for the end-of-article author card and Person schema.
  fullBio:
    'Shayan Qureshi is the founder of ITQAAN. Over more than 10 years in design and branding, he has worked with Muslim brands across the UAE, the GCC, and around the world, building websites and brand identities with Islamic values without compromising on quality.',
}

// Person node for JSON-LD @graph. Spread into a page's graph and reference it
// elsewhere via { '@id': AUTHOR_ID }.
export const authorSchemaNode = {
  '@type': 'Person',
  '@id': AUTHOR_ID,
  name: AUTHOR.name,
  jobTitle: AUTHOR.role,
  description: AUTHOR.fullBio,
  image: `${BASE}${AUTHOR.image}`,
  url: BASE,
  worksFor: { '@id': `${BASE}/#organization` },
  knowsAbout: ['Web design', 'Brand identity', 'Graphic design', 'Web design for Muslim businesses'],
}
