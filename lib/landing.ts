// lib/landing.ts
//
// Content for the SEO/AEO landing pages. Each page targets one real search
// intent (a service + a place) and is written to be clear and quotable, so both
// Google and AI assistants can lift a direct answer from it.
//
// Positioning: websites for Muslim businesses in Dubai, the UAE, and worldwide.
// The halal values (fixed price, no riba, no music, no images of women, you own
// everything) are a differentiator, not the whole pitch.
//
// TO ADD A PAGE: add an entry here, create app/<slug>/page.tsx that renders
// <LandingPage slug="<slug>" />, and add the slug to app/sitemap.ts.

export type LandingSection = { h2: string; body: string[] }
export type LandingFaq = { q: string; a: string }

export type Landing = {
  slug: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  intro: string
  sections: LandingSection[]
  faqs: LandingFaq[]
  serviceName: string
  areaServed: string[]
}

const VALUES_SECTION: LandingSection = {
  h2: 'Built the halal way, with no compromise on quality',
  body: [
    'Every project comes with a fixed price agreed before we start. No riba, no hidden fees, and no surprise invoices at the end.',
    'The work itself respects your values too: no music and no images of women, by default. You get a site that looks premium and that you are comfortable sharing with your community.',
    'When the project is done, you own everything. The design, the code, the domain, and the content are all yours.',
  ],
}

export const landings: Landing[] = [
  {
    slug: 'web-design-dubai',
    metaTitle: 'Web Design in Dubai for Muslim Businesses | ITQAAN | From 997 AED',
    metaDescription:
      'Custom web design in Dubai for Muslim businesses. Fixed prices from 997 AED, no riba, no hidden fees. Mobile-first sites that turn visitors into customers. Get a quote in under a minute.',
    eyebrow: 'Web design, Dubai',
    h1: 'Web design in Dubai for Muslim businesses',
    intro:
      'A website is where most people in Dubai decide whether to trust your business. We design fast, mobile-first sites that make that first impression count, at a fixed price starting from 997 AED.',
    sections: [
      {
        h2: 'Why Dubai businesses need more than a template',
        body: [
          'Most of your customers in Dubai will find you on their phone. If your site is slow, hard to read, or looks like everyone else, they leave before they ever see what you offer.',
          'We design each site around your business and your customer, not a generic template. Clean layout, quick loading, clear calls to action, and an easy way for people to reach you on WhatsApp.',
        ],
      },
      {
        h2: 'What you get',
        body: [
          'A custom, mobile-first website. Copywriting help so the words actually sell. Basic SEO so you can be found on Google. A contact and enquiry setup that sends leads straight to you.',
          'One-page sites start from 997 AED and are often ready in days. Multi-page business sites and online stores are quoted clearly upfront, with no hidden costs.',
        ],
      },
      VALUES_SECTION,
      {
        h2: 'Working with a remote designer',
        body: [
          'We serve Dubai clients remotely, which keeps overhead low and prices fair without cutting quality. Everything happens over WhatsApp, email, and screen shares, on your schedule.',
          'You see the work as it develops, give feedback, and we refine it until you are happy before it goes live.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does a website cost in Dubai?',
        a: 'With ITQAAN, a one-page website starts from 997 AED, a multi-page business site from 2,497 AED, and an online store from 4,497 AED. Every price is fixed and agreed before we begin, with no hidden fees.',
      },
      {
        q: 'How long does it take to build a website?',
        a: 'A one-page site is usually ready in a few days. A multi-page business site takes one to two weeks, depending on how quickly you provide your content.',
      },
      {
        q: 'Do you only work with Muslim businesses in Dubai?',
        a: 'We specialise in Muslim businesses, but we serve clients across Dubai, the wider UAE, and worldwide. The halal way we work is available to anyone who wants a fair, transparent project.',
      },
    ],
    serviceName: 'Web Design in Dubai',
    areaServed: ['Dubai', 'United Arab Emirates'],
  },
  {
    slug: 'web-design-uae',
    metaTitle: 'Web Design in the UAE | Websites for Muslim Businesses | ITQAAN',
    metaDescription:
      'Web design across the UAE for Muslim businesses, from Dubai to Abu Dhabi and Sharjah. Fixed prices from 997 AED, no riba, no hidden fees. Fast, mobile-first websites that win customers.',
    eyebrow: 'Web design, UAE',
    h1: 'Web design across the UAE',
    intro:
      'From Dubai to Abu Dhabi, Sharjah, and beyond, we build websites for Muslim businesses that want to look established and win customers online. Fixed prices, starting from 997 AED.',
    sections: [
      {
        h2: 'One standard, every emirate',
        body: [
          'Wherever your business is based in the UAE, the goal is the same: a website that loads fast, reads clearly on a phone, and turns visitors into enquiries.',
          'Because we work remotely, your location never changes the price or the quality. A business in Ajman gets the same care as one in Downtown Dubai.',
        ],
      },
      {
        h2: 'Websites that fit your business',
        body: [
          'A single focused page for a service business. A multi-page site for a growing brand. A full online store if you sell products. We match the site to what you actually need, so you never overpay for pages you will not use.',
          'Every site includes a mobile-first design, basic SEO, and a clear way for customers to contact you.',
        ],
      },
      VALUES_SECTION,
      {
        h2: 'Found on Google and AI assistants',
        body: [
          'We set your site up so it can be found when people search for your service in the UAE, both on Google and increasingly through AI assistants like ChatGPT and Gemini.',
          'Clear structure, honest information, and fast pages are what these systems reward, and they are built into every project.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you build websites for businesses outside Dubai?',
        a: 'Yes. We work with Muslim businesses across the whole UAE, including Abu Dhabi, Sharjah, Ajman, and beyond, as well as clients worldwide. Everything is handled remotely.',
      },
      {
        q: 'How much does a website cost in the UAE?',
        a: 'Prices are fixed and start from 997 AED for a one-page site, 2,497 AED for a multi-page business site, and 4,497 AED for an online store. You get the full price upfront, with no hidden fees.',
      },
      {
        q: 'Can you help my site rank on Google?',
        a: 'Yes. Basic SEO is included with every site, and we offer a dedicated SEO setup and monthly growth plan for businesses that want to rank higher and reach more customers.',
      },
    ],
    serviceName: 'Web Design in the UAE',
    areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah', 'United Arab Emirates'],
  },
  {
    slug: 'websites-for-muslim-businesses',
    metaTitle: 'Websites for Muslim Businesses | Dubai, UAE & Worldwide | ITQAAN',
    metaDescription:
      'Web design and brand identity for Muslim businesses in Dubai, the UAE, and worldwide. Fixed prices from 997 AED, no riba, no hidden fees, no music or images of women. You own everything.',
    eyebrow: 'For Muslim businesses',
    h1: 'Websites for Muslim businesses',
    intro:
      'We help Muslim businesses in Dubai, across the UAE, and around the world present themselves online with confidence. Premium design, fair prices from 997 AED, and work that respects your values.',
    sections: [
      {
        h2: 'A designer who understands your values',
        body: [
          'You should not have to choose between a professional website and one that reflects your deen. We build both into the same project.',
          'That means no riba in the pricing, no images of women, and no music, unless you ask otherwise. It also means honest dealing from the first message to the final handover.',
        ],
      },
      {
        h2: 'Design that earns trust quickly',
        body: [
          'People decide whether to trust a business within seconds of landing on its site. Clean design, clear words, and fast loading do most of that work for you.',
          'We design each site around your customer, so the important things are easy to find and the path to contacting you is obvious.',
        ],
      },
      VALUES_SECTION,
      {
        h2: 'Dubai, the UAE, and worldwide',
        body: [
          'We are rooted in serving the UAE market, but we work with Muslim businesses anywhere in the world. Distance is not a barrier: everything is handled over WhatsApp, email, and screen shares.',
          'Whether you run a shop in Sharjah, a service in London, or a brand selling globally, the standard of work and the honest pricing stay the same.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What makes a website "halal"?',
        a: 'For us it means two things: how the work is done, and what goes on the site. The pricing is fixed with no riba and no hidden fees, and by default the site contains no music and no images of women. You also fully own the finished work.',
      },
      {
        q: 'Do you work with businesses outside the UAE?',
        a: 'Yes. We serve Muslim businesses in Dubai and across the UAE, and we also work with clients worldwide. Everything is handled remotely, so your location does not limit us.',
      },
      {
        q: 'How much does it cost?',
        a: 'Prices are fixed and start from 997 AED for a one-page website. Brand identity starts from 797 AED. You always get the full price agreed in writing before any work begins.',
      },
    ],
    serviceName: 'Web Design for Muslim Businesses',
    areaServed: ['Dubai', 'United Arab Emirates', 'Worldwide'],
  },
]

export function getLanding(slug: string): Landing | undefined {
  return landings.find(l => l.slug === slug)
}
