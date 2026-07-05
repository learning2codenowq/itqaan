// lib/landing-emirates.ts
//
// Emirate/city landing pages, completing UAE coverage alongside the Dubai,
// Abu Dhabi, and UAE pages in lib/landing.ts. Each page targets "web design in
// <emirate>" intent with copy specific to that market, not a find-and-replace
// of the city name.

import { Landing, VALUES_SECTION } from './landing-shared'

export const emirateLandings: Landing[] = [
  {
    slug: 'web-design-sharjah',
    metaTitle: 'Web Design in Sharjah for Muslim Businesses | ITQAAN | From 997 AED',
    metaDescription:
      'Custom web design in Sharjah for Muslim businesses. Fixed prices from 997 AED, no riba, no hidden fees. Fast, mobile-first websites that turn visitors into customers.',
    eyebrow: 'Web design, Sharjah',
    h1: 'Web design in Sharjah for Muslim businesses',
    intro:
      'Sharjah businesses are often family-run, value-driven, and built on reputation. Your website should carry that same character. We design fast, mobile-first sites for Sharjah businesses at a fixed price starting from 997 AED.',
    sections: [
      {
        h2: 'A website that fits how Sharjah does business',
        body: [
          'Sharjah customers are careful buyers. They compare, they ask around, and they look you up before they call. A clear, professional website answers their questions before they ever message you, and quietly settles the question of whether you can be trusted.',
          'We design each site around your business and your customer: clean layout, quick loading, clear prices or services, and a one-tap WhatsApp button, because that is where Sharjah conversations happen.',
        ],
      },
      {
        h2: 'What you get',
        body: [
          'A custom, mobile-first website. Copywriting help so the words actually sell. Basic SEO so you can be found when people search for your service in Sharjah. Enquiry forms that send leads straight to you.',
          'One-page sites start from 997 AED and are often ready in days. Multi-page business sites and online stores are quoted clearly upfront, with no hidden costs.',
        ],
      },
      VALUES_SECTION,
      {
        h2: 'Serving Sharjah remotely, at Sharjah-friendly prices',
        body: [
          'We work remotely over WhatsApp, email, and screen shares, which keeps overhead low and prices fair without cutting quality. You see the design at every stage and approve it before anything goes live.',
          'For a business in Sharjah that means agency-quality work without the agency invoice.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does a website cost in Sharjah?',
        a: 'With ITQAAN, a one-page website starts from 997 AED, a multi-page business site from 2,497 AED, and an online store from 4,497 AED. Every price is fixed and agreed in writing before we begin, with no riba and no hidden fees.',
      },
      {
        q: 'Do you meet clients in Sharjah in person?',
        a: 'Projects are handled remotely over WhatsApp, email, and screen shares, which keeps prices fair and quality high. You see and approve the work at every stage, and most clients find one short call is all the meeting a project needs.',
      },
      {
        q: 'How long does a website take?',
        a: 'A one-page site is usually ready in a few days. A multi-page business site takes one to two weeks, depending on how quickly you can send your content and feedback.',
      },
    ],
    serviceName: 'Web Design in Sharjah',
    areaServed: ['Sharjah', 'United Arab Emirates'],
    related: [
      { label: 'Our web design service', href: '/services/web-design' },
      { label: 'Web design in Dubai', href: '/web-design-dubai' },
      { label: 'Web design in Ajman', href: '/web-design-ajman' },
      { label: 'Websites for Muslim businesses', href: '/websites-for-muslim-businesses' },
    ],
  },
  {
    slug: 'web-design-ajman',
    metaTitle: 'Web Design in Ajman for Small Businesses | ITQAAN | From 997 AED',
    metaDescription:
      'Affordable custom web design in Ajman. Fixed prices from 997 AED, no riba, no hidden fees. Professional websites for Ajman businesses that want to compete beyond their size.',
    eyebrow: 'Web design, Ajman',
    h1: 'Web design in Ajman that punches above its weight',
    intro:
      'Ajman businesses compete with neighbours in Sharjah and Dubai every day. A professional website is the cheapest way to look every bit as established as they do. Fixed prices from 997 AED, agreed before we start.',
    sections: [
      {
        h2: 'Look bigger than your overheads',
        body: [
          'Online, nobody can tell how big your office is. A clean, fast, professional website puts an Ajman business on the same shelf as a Dubai competitor charging twice your price.',
          'We design each site to earn trust in seconds: clear services, real photos of your work, and an obvious way to reach you on WhatsApp.',
        ],
      },
      {
        h2: 'Priced for small businesses, built like it is not',
        body: [
          'A one-page website from 997 AED covers most small service businesses: what you do, why you, and how to contact you, done properly. No monthly platform fees eating your margin.',
          'When you grow, the site grows with you: extra pages, an online store, or SEO can be added later at fixed prices.',
        ],
      },
      VALUES_SECTION,
      {
        h2: 'Found by customers across the northern emirates',
        body: [
          'Many Ajman businesses serve Sharjah and Dubai customers too. We set up your site so it can be found for your service across the areas you actually cover, on Google and on AI assistants.',
          'Everything is handled remotely over WhatsApp and email, on your schedule.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does a website cost in Ajman?',
        a: 'A custom one-page website for an Ajman business starts from 997 AED with ITQAAN. Multi-page sites start from 2,497 AED and online stores from 4,497 AED. Prices are fixed and agreed in writing before work begins.',
      },
      {
        q: 'Is a website worth it for a small Ajman business?',
        a: 'Yes, often more than for a big one. Customers who cannot find you online choose the competitor they can find. A one-page site answers their questions, shows your work, and gives them a WhatsApp button, which is usually all a small business needs to win the enquiry.',
      },
      {
        q: 'Can you also handle my logo and branding?',
        a: 'Yes. Logo design starts from 797 AED, and many Ajman clients combine a one-page website with a logo so the whole business looks consistent from day one.',
      },
    ],
    serviceName: 'Web Design in Ajman',
    areaServed: ['Ajman', 'United Arab Emirates'],
    related: [
      { label: 'Our web design service', href: '/services/web-design' },
      { label: 'Web design in Sharjah', href: '/web-design-sharjah' },
      { label: 'Web design across the UAE', href: '/web-design-uae' },
      { label: 'Branding & identity service', href: '/services/branding' },
    ],
  },
  {
    slug: 'web-design-ras-al-khaimah',
    metaTitle: 'Web Design in Ras Al Khaimah | ITQAAN | From 997 AED',
    metaDescription:
      'Custom web design in Ras Al Khaimah for Muslim businesses. Fixed prices from 997 AED, no riba, no hidden fees. Websites for RAK businesses in tourism, trades, and services.',
    eyebrow: 'Web design, Ras Al Khaimah',
    h1: 'Web design in Ras Al Khaimah for a growing emirate',
    intro:
      'Ras Al Khaimah is growing fast: tourism, manufacturing, free zone businesses, and the trades that serve them all. We build websites that help RAK businesses capture that growth, at a fixed price from 997 AED.',
    sections: [
      {
        h2: 'New customers are arriving. Will they find you?',
        body: [
          'Every new resident, tourist, and free zone company in RAK searches online for the services they need. The businesses that show up with a professional site win those customers by default.',
          'We build fast, mobile-first sites with the right local SEO signals, so when someone searches for your service in Ras Al Khaimah, you are a candidate.',
        ],
      },
      {
        h2: 'What you get',
        body: [
          'A custom, mobile-first website designed around your business. Copywriting help, basic SEO, enquiry forms delivered to your inbox, and a one-tap WhatsApp button.',
          'One-page sites start from 997 AED. Multi-page business sites and online stores are quoted clearly upfront, with no hidden costs.',
        ],
      },
      VALUES_SECTION,
      {
        h2: 'Remote service, full attention',
        body: [
          'Being outside the Dubai bubble should not mean settling for less. We serve RAK clients remotely with the same process and standard as everyone else: one short conversation, a fixed price in writing, and unlimited revisions until you are happy.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does a website cost in Ras Al Khaimah?',
        a: 'With ITQAAN, a one-page website starts from 997 AED, a multi-page business site from 2,497 AED, and an online store from 4,497 AED. Fixed prices, agreed in writing before we begin, with no riba and no hidden fees.',
      },
      {
        q: 'Can my RAK business rank on Google?',
        a: 'Yes. Competition in RAK is lighter than Dubai for most services, which means a technically correct, well-written site can rank locally faster. Basic SEO is included with every site, and a dedicated SEO plan is available if you want to push further.',
      },
      {
        q: 'Do you work with free zone companies?',
        a: 'Yes. Free zone or mainland makes no difference to the project. We build the site around your business and customers, and you own everything at the end.',
      },
    ],
    serviceName: 'Web Design in Ras Al Khaimah',
    areaServed: ['Ras Al Khaimah', 'United Arab Emirates'],
    related: [
      { label: 'Our web design service', href: '/services/web-design' },
      { label: 'Web design across the UAE', href: '/web-design-uae' },
      { label: 'Web design in Fujairah', href: '/web-design-fujairah' },
      { label: 'SEO & GEO service', href: '/services/seo-geo' },
    ],
  },
  {
    slug: 'web-design-fujairah',
    metaTitle: 'Web Design in Fujairah | ITQAAN | From 997 AED',
    metaDescription:
      'Custom web design in Fujairah for Muslim businesses. Fixed prices from 997 AED, no riba, no hidden fees. Websites for east coast businesses in trade, tourism, and services.',
    eyebrow: 'Web design, Fujairah',
    h1: 'Web design in Fujairah, the east coast done properly',
    intro:
      'From the port and its trade to east coast tourism and the local businesses that serve both, Fujairah runs its own economy. We build websites that make Fujairah businesses easy to find and easy to trust, from 997 AED fixed.',
    sections: [
      {
        h2: 'Fewer competitors online means a bigger head start',
        body: [
          'Many Fujairah businesses still have no real website, or one that has not been touched in years. That is an opportunity: a professional site here stands out more than the same site would in Dubai.',
          'Whether you serve local families, port and logistics clients, or visitors on the east coast, we design the site around the customers you actually want.',
        ],
      },
      {
        h2: 'What you get',
        body: [
          'A custom, mobile-first website. Copywriting help so the words sell, basic SEO so Fujairah customers can find you, and enquiry forms plus a WhatsApp button that deliver leads straight to you.',
          'One-page sites start from 997 AED and are often ready in days. Bigger sites are quoted clearly upfront.',
        ],
      },
      VALUES_SECTION,
      {
        h2: 'Distance changes nothing',
        body: [
          'We serve Fujairah clients remotely over WhatsApp, email, and screen shares. Same process, same fixed prices, same standard of work as our Dubai clients, and you approve everything before it goes live.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does a website cost in Fujairah?',
        a: 'With ITQAAN, a one-page website starts from 997 AED, a multi-page business site from 2,497 AED, and an online store from 4,497 AED. Every price is fixed and agreed in writing before we begin.',
      },
      {
        q: 'Can a website bring me customers in Fujairah?',
        a: 'Yes. When someone searches for your service in Fujairah, a fast, professional site with correct local SEO makes you one of the few credible options they find. Basic SEO is included with every site we build.',
      },
      {
        q: 'How does the process work from Fujairah?',
        a: 'Exactly like everywhere else: one short WhatsApp conversation, a fixed price in writing, your first design within days, and unlimited revisions until you are happy. It takes less than an hour of your total time.',
      },
    ],
    serviceName: 'Web Design in Fujairah',
    areaServed: ['Fujairah', 'United Arab Emirates'],
    related: [
      { label: 'Our web design service', href: '/services/web-design' },
      { label: 'Web design in Ras Al Khaimah', href: '/web-design-ras-al-khaimah' },
      { label: 'Web design across the UAE', href: '/web-design-uae' },
      { label: 'How we work', href: '/how-we-work' },
    ],
  },
  {
    slug: 'web-design-umm-al-quwain',
    metaTitle: 'Web Design in Umm Al Quwain | ITQAAN | From 997 AED',
    metaDescription:
      'Custom web design in Umm Al Quwain for Muslim businesses. Fixed prices from 997 AED, no riba, no hidden fees. Professional websites for UAQ businesses of every size.',
    eyebrow: 'Web design, Umm Al Quwain',
    h1: 'Web design in Umm Al Quwain, without the big city prices',
    intro:
      'Umm Al Quwain businesses rarely get pitched by web designers, and when they do, the quotes are Dubai-sized. We build professional, custom websites for UAQ businesses at fixed prices from 997 AED.',
    sections: [
      {
        h2: 'Being found first in a small market',
        body: [
          'In a smaller emirate, one good website goes a long way. When residents or businesses in UAQ search for your service, there are only a handful of credible results, and a professional site puts you among them immediately.',
          'We include the local SEO basics with every site, so your business shows up for searches in Umm Al Quwain and the areas around it that you serve.',
        ],
      },
      {
        h2: 'What you get',
        body: [
          'A custom, mobile-first website designed around your business, not a template. Copywriting help, enquiry forms straight to your inbox, and a one-tap WhatsApp button.',
          'One-page sites start from 997 AED and are often ready within days.',
        ],
      },
      VALUES_SECTION,
      {
        h2: 'Simple, remote, and on your schedule',
        body: [
          'One short WhatsApp conversation, a fixed price in writing, and we handle everything else remotely. You give feedback on the design and approve it before it goes live. Less than an hour of your time in total.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does a website cost in Umm Al Quwain?',
        a: 'With ITQAAN, a one-page website starts from 997 AED, a multi-page business site from 2,497 AED, and an online store from 4,497 AED. Fixed prices in writing before we begin, with no riba and no hidden fees.',
      },
      {
        q: 'Is my UAQ business too small for a website?',
        a: 'No. A one-page site is built exactly for small businesses: what you do, why customers should choose you, and how to reach you. It costs less than most people expect and works for you every day after.',
      },
      {
        q: 'How long does it take?',
        a: 'A one-page site is usually ready in a few days, and a multi-page site within one to two weeks, depending mostly on how quickly you can send your content and feedback.',
      },
    ],
    serviceName: 'Web Design in Umm Al Quwain',
    areaServed: ['Umm Al Quwain', 'United Arab Emirates'],
    related: [
      { label: 'Our web design service', href: '/services/web-design' },
      { label: 'Web design in Ajman', href: '/web-design-ajman' },
      { label: 'Web design across the UAE', href: '/web-design-uae' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    slug: 'web-design-al-ain',
    metaTitle: 'Web Design in Al Ain for Muslim Businesses | ITQAAN | From 997 AED',
    metaDescription:
      'Custom web design in Al Ain for Muslim businesses. Fixed prices from 997 AED, no riba, no hidden fees. Fast, mobile-first websites for the garden city.',
    eyebrow: 'Web design, Al Ain',
    h1: 'Web design in Al Ain for Muslim businesses',
    intro:
      'Al Ain runs on community and reputation: schools, clinics, trades, restaurants, and family businesses that people recommend to each other. A professional website turns those recommendations into customers. Fixed prices from 997 AED.',
    sections: [
      {
        h2: 'Where word of mouth meets Google',
        body: [
          'In Al Ain, most new customers hear about you from someone first, then look you up before they call. If the search turns up nothing, or something outdated, the recommendation loses its power.',
          'A clean, professional site confirms what the recommendation promised: that you are established, careful, and worth contacting. That is the job we build it to do.',
        ],
      },
      {
        h2: 'What you get',
        body: [
          'A custom, mobile-first website designed around your business. Copywriting help, basic SEO for Al Ain searches, enquiry forms delivered straight to you, and a one-tap WhatsApp button.',
          'One-page sites start from 997 AED. Multi-page business sites and online stores are quoted clearly upfront, with no hidden costs.',
        ],
      },
      VALUES_SECTION,
      {
        h2: 'Serving Al Ain remotely',
        body: [
          'We work with Al Ain clients over WhatsApp, email, and screen shares, the same way we serve Dubai and Abu Dhabi. One short conversation, a fixed price in writing, and unlimited revisions until you are happy.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does a website cost in Al Ain?',
        a: 'With ITQAAN, a one-page website starts from 997 AED, a multi-page business site from 2,497 AED, and an online store from 4,497 AED. Every price is fixed and agreed in writing before we begin, with no riba and no hidden fees.',
      },
      {
        q: 'Do you build websites for schools and clinics in Al Ain?',
        a: 'Yes. Schools, tuition centres, clinics, and family businesses are exactly the kind of clients we serve: sites that feel calm and trustworthy, answer parents and patients clearly, and make contacting you effortless.',
      },
      {
        q: 'How long does a website take?',
        a: 'A one-page site is usually ready in a few days. A multi-page business site takes one to two weeks, depending on how quickly you provide your content.',
      },
    ],
    serviceName: 'Web Design in Al Ain',
    areaServed: ['Al Ain', 'Abu Dhabi', 'United Arab Emirates'],
    related: [
      { label: 'Our web design service', href: '/services/web-design' },
      { label: 'Web design in Abu Dhabi', href: '/web-design-abu-dhabi' },
      { label: 'Websites for Muslim businesses', href: '/websites-for-muslim-businesses' },
      { label: 'Websites for Quran academies', href: '/websites-for-quran-academies' },
    ],
  },
]
