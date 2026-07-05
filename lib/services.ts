// lib/services.ts
//
// Content for the detailed service pages at /services/<slug>. These are the
// pillar pages: long, conversion-focused pages modeled on belgalink.be's
// service pages, adapted to ITQAAN's positioning (Muslim businesses, Dubai and
// the UAE first, halal way of working as the differentiator).
//
// The existing pages in lib/landing.ts stay as location/niche spokes and link
// up to these pillars.
//
// Structure: every block is optional so lighter services can omit what they
// do not need. All prices shown in pricing tiers come live from lib/quote.ts
// via `pricingRefs`; prices written into copy (FAQ answers) must match it.
//
// TO ADD A SERVICE: write its entry here, flip `ready: true` in
// lib/serviceNav.ts, and it appears in the nav, footer, hub, and sitemap.

export type ServiceFaq = { q: string; a: string }

export type ServicePageData = {
  slug: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  intro: string
  heroBullets: string[]
  quotePlan?: string      // ?plan= preselect for /quote CTAs
  problem?: { h2: string; paragraphs: string[] }
  comparison?: {
    h2: string
    sub: string
    columns: string[]     // first column is ITQAAN, rendered highlighted
    rows: { label: string; values: string[] }[]
  }
  notWe?: {
    h2: string
    dontHeading: string
    dont: string[]
    doHeading: string
    doParagraphs: string[]
  }
  processSteps?: { title: string; body: string }[]
  fit?: {
    h2: string
    sub: string
    rows: { tag: string; forYou: string; notForYou: string }[]
  }
  deliverables?: { h2: string; items: string[] }
  pricing?: {
    h2: string
    intro: string
    packageIds?: string[]                                        // from lib/quote.ts packages
    optionSet?: 'brandScopes' | 'graphicItems' | 'seoPlans'      // from lib/quote.ts options
    showCarePlan?: boolean                                       // renders the carePlan card from lib/quote.ts
    note?: string
  }
  showGuarantees?: boolean
  aftercare?: { h2: string; paragraphs: string[]; items: string[] }
  twoOptions?: {
    h2: string
    stayTitle: string
    stay: string[]
    moveTitle: string
    move: string[]
  }
  faqs: ServiceFaq[]
  projectSlugs?: string[]  // testimonials + proof grid, see lib/projects.ts
  serviceName: string
  areaServed: string[]
  related: { label: string; href: string }[]
}

export const services: ServicePageData[] = [
  {
    slug: 'web-design',
    metaTitle: 'Web Design Service in Dubai | Fixed Prices From 997 AED | ITQAAN',
    metaDescription:
      'Professional web design for Muslim businesses in Dubai and the UAE. Custom, mobile-first websites at fixed prices from 997 AED. No riba, no hidden fees, revisions until you are happy. First design in days.',
    eyebrow: 'Web design',
    h1: 'A website that sells for your business 24/7, without you touching the tech',
    intro:
      'We design custom, mobile-first websites for Muslim businesses in Dubai and across the UAE. One short conversation, a fixed price in writing, and your first design within days. You give feedback, we refine it until you are happy, and you own everything at the end.',
    heroBullets: [
      'A premium custom design that earns trust in seconds',
      'Found on Google and AI assistants, not just pretty',
      'Fixed price from 997 AED, agreed before we start',
    ],
    quotePlan: 'one-page',
    problem: {
      h2: 'Your customers are already searching for you',
      paragraphs: [
        'Imagine a customer in Dubai searches for your business tomorrow. What do they find? A clean, professional site that makes them comfortable sending you money, or an outdated page, a dead Instagram link, or nothing at all?',
        'People judge a business in seconds. If your website is slow, looks like a template, or does not exist, most visitors quietly leave and call your competitor instead. You never hear about these lost customers, but you lose them every day.',
        'The fix does not require months of meetings or agency retainers. It requires one focused website, built properly, with a clear path from visitor to enquiry.',
      ],
    },
    comparison: {
      h2: 'You have plenty of options. Compare them honestly.',
      sub: 'How ITQAAN stacks up against building it yourself, hiring the cheapest freelancer, or going to a traditional Dubai agency.',
      columns: ['ITQAAN', 'DIY builder (Wix)', 'Cheap freelancer', 'Dubai agency'],
      rows: [
        { label: 'Your time investment', values: ['Under 1 hour', '20 to 40 hours', 'Chasing updates', '10+ hours of meetings'] },
        { label: 'First design', values: ['Within days', 'Whatever you build', 'Unpredictable', '4 to 8 weeks'] },
        { label: 'Starting price', values: ['997 AED fixed', 'Monthly fees + your time', 'Cheap, then extras', '10,000 AED and up'] },
        { label: 'Fixed price in writing', values: ['Always', 'No', 'Rarely', 'Often variable'] },
        { label: 'Custom design', values: ['Every project', 'Template look', 'Template look', 'Yes'] },
        { label: 'SEO and AI-search ready', values: ['Built in', 'Very limited', 'Rarely', 'Paid extra'] },
        { label: 'Direct contact with the builder', values: ['Always', 'No one', 'Sometimes', 'Account manager'] },
        { label: 'Revisions until you are happy', values: ['Unlimited', 'Your own hours', 'Awkward', 'Billed extra'] },
        { label: 'Halal values respected', values: ['By default', 'Up to you', 'Hit or miss', 'Not their focus'] },
        { label: 'You own everything', values: ['Design, code, domain', 'Locked to platform', 'Unclear', 'Usually'] },
      ],
    },
    notWe: {
      h2: 'A website should be your best salesman, not a brochure',
      dontHeading: 'What ITQAAN does not do',
      dont: [
        'Build template websites that look like everyone else',
        'Reply after three reminder messages',
        'Charge extra for every small change',
        'Disappear once the invoice is paid',
        'Put riba, hidden fees, or surprise costs anywhere near your project',
      ],
      doHeading: 'What ITQAAN does',
      doParagraphs: [
        'We build professional, conversion-focused websites for Muslim business owners in Dubai, the UAE, and worldwide. Not just a design: the structure, the words, and the technical setup are all built to turn visitors into enquiries.',
        'We think with you. How should your business be positioned online so it attracts the customers you actually want? That thinking is part of every project, not a paid add-on.',
        'And we work the halal way: a fixed price agreed before we start, no riba, no music and no images of women on your site by default, and full ownership handed to you at the end.',
      ],
    },
    processSteps: [
      {
        title: 'One short conversation',
        body: 'A 15-minute chat on WhatsApp or a call. You tell us about your business and your goals, we tell you exactly what it will cost. Fixed, in writing.',
      },
      {
        title: 'Receive your design',
        body: 'Your first design arrives within days, not weeks. You give feedback and we refine it, with unlimited revision rounds until you are happy.',
      },
      {
        title: 'We handle everything else',
        body: 'Domain, copywriting help, SEO setup, forms that send enquiries straight to you. You go live without touching any of the tech.',
      },
      {
        title: 'Live, plus support',
        body: 'Your site goes live and starts working for you around the clock. An optional care plan keeps it updated, fast, and secure after launch.',
      },
    ],
    fit: {
      h2: 'Is ITQAAN right for you?',
      sub: 'An honest check. We are a great fit for some businesses and the wrong fit for others.',
      rows: [
        {
          tag: 'Result',
          forYou: 'You want a professional website that brings in customers, without spending your own evenings on it.',
          notForYou: 'You enjoy building and tweaking your own site and want full hands-on control of every pixel.',
        },
        {
          tag: 'Contact',
          forYou: 'You value direct communication with the person actually building your site, mostly over WhatsApp.',
          notForYou: 'You prefer a big agency setup with account managers and long meetings.',
        },
        {
          tag: 'Price',
          forYou: 'You want certainty about the price in writing before anything starts.',
          notForYou: 'You are fine discovering the final cost as the project goes along.',
        },
        {
          tag: 'Values',
          forYou: 'You want a site and a working relationship that respect your deen: no riba, no music, no images of women.',
          notForYou: 'These values do not matter to your business either way.',
        },
      ],
    },
    deliverables: {
      h2: 'What you get with every website',
      items: [
        'Custom design around your business, never a template',
        'Mobile-first and fast loading',
        'Copywriting help so the words actually sell',
        'Basic SEO so you can be found on Google and AI assistants',
        'Contact and enquiry forms delivered straight to your inbox',
        'One-tap WhatsApp button for instant enquiries',
        'Unlimited revision rounds until you are happy',
        'Full ownership of the design, code, domain, and content',
      ],
    },
    pricing: {
      h2: 'What does a professional website cost?',
      intro:
        'Transparent fixed prices, no surprises. These are the starting prices; after one short conversation you get an exact fixed price for your situation, in writing. What we agree is what you pay.',
      packageIds: ['one-page', 'business', 'store'],
      note:
        'Extra pages are 247 AED each. An optional care plan from 147 AED per month covers hosting help, updates, and support after launch, cancellable any month.',
    },
    showGuarantees: true,
    aftercare: {
      h2: 'After launch, we do not disappear',
      paragraphs: [
        'Many designers vanish once the final payment lands. We stay reachable. Small fixes and honest advice do not stop when the site goes live, and the optional monthly care plan keeps everything in good hands without you thinking about it.',
      ],
      items: [
        'Updates to text, photos, and small layout changes',
        'Site health, speed, and security kept in check',
        'Direct support on WhatsApp and email',
        'No lock-in contracts, cancel any month',
      ],
    },
    twoOptions: {
      h2: 'You have two options',
      stayTitle: 'Change nothing',
      stay: [
        'Your current online presence stays as it is.',
        'Visitors keep leaving without you ever knowing they came.',
        'Competitors with stronger sites keep taking those customers.',
        'Six months from now, you are in exactly the same place.',
      ],
      moveTitle: 'Invest 15 minutes',
      move: [
        'One short conversation about your business and goals.',
        'You get a clear, fixed price on the spot.',
        'Within days you see your first design, and within weeks your site is live.',
        'It then works for your business day and night, while you run your business.',
      ],
    },
    faqs: [
      {
        q: 'How much does a website cost in Dubai?',
        a: 'Agencies in Dubai commonly charge 10,000 AED or more. With ITQAAN, a custom one-page website starts from 997 AED, a multi-page business site from 2,497 AED, and an online store from 4,497 AED. Every price is fixed and agreed in writing before work begins, with no hidden fees and no riba.',
      },
      {
        q: 'What does a website cost per month?',
        a: 'The build itself is a one-time fixed price. If you want us to keep maintaining it, the optional care plan starts from 147 AED per month and covers updates, support, and keeping the site fast and secure. There are no lock-in contracts; you can cancel any month.',
      },
      {
        q: 'How long does it take to build a website?',
        a: 'You see a first design within days. A one-page site is usually live within a week, and a multi-page business site within one to two weeks, depending mostly on how quickly you can send us your content and feedback. From you it takes less than an hour of total time.',
      },
      {
        q: 'Will my website rank on Google?',
        a: 'Every site we build is SEO-ready by default: fast loading, clean structure, correct meta tags, and copy written to be found. That covers the foundation for local searches. For competitive keywords we offer an honest, dedicated SEO and GEO plan; no one can guarantee a number one spot, but we make sure your site does everything right, on Google and on AI assistants like ChatGPT.',
      },
      {
        q: 'What is the difference between a cheap website and a professional one?',
        a: 'A cheap template site displays information; a professional site wins customers. The difference is strategy: words that persuade, a structure that leads visitors to contact you, speed, findability on Google, and a design that builds trust. A 40 AED per month template looks cheaper, but it silently costs you the customers who leave.',
      },
      {
        q: 'Do you work with businesses in Dubai remotely?',
        a: 'Yes. We serve Dubai and UAE clients fully remotely over WhatsApp, email, and screen shares, which keeps overhead low and prices fair without cutting quality. You see the work at every stage and nothing goes live before you approve it.',
      },
    ],
    projectSlugs: ['anasmarble', 'royalthobes', 'quranteaching', 'halalcert', 'tadabbur', 'mathtutor'],
    serviceName: 'Web Design',
    areaServed: ['Dubai', 'United Arab Emirates', 'Worldwide'],
    related: [
      { label: 'Web design in Dubai', href: '/web-design-dubai' },
      { label: 'Web design in Abu Dhabi', href: '/web-design-abu-dhabi' },
      { label: 'Web design across the UAE', href: '/web-design-uae' },
      { label: 'Websites for Muslim businesses', href: '/websites-for-muslim-businesses' },
      { label: 'How much does a website cost in Dubai?', href: '/blog/how-much-does-a-website-cost-in-dubai' },
    ],
  },
  {
    slug: 'ecommerce',
    metaTitle: 'E-commerce Website Development in Dubai | From 4,497 AED | ITQAAN',
    metaDescription:
      'Custom online stores for Muslim businesses in Dubai and the UAE. Fixed price from 4,497 AED, no riba, no hidden fees. Product management, online payments, and a store that sells around the clock.',
    eyebrow: 'E-commerce',
    h1: 'An online store that sells for you around the clock',
    intro:
      'Selling through DMs and spreadsheets caps how far your business can grow. We build custom online stores for Muslim businesses in Dubai and across the UAE: products, payments, and orders handled properly, at a fixed price agreed before we start.',
    heroBullets: [
      'A store that takes orders while you sleep',
      'Online payments, product and order management included',
      'Fixed price from 4,497 AED, no riba, no hidden fees',
    ],
    quotePlan: 'store',
    problem: {
      h2: 'Instagram DMs are not a checkout',
      paragraphs: [
        'If customers have to message you, wait for a reply, and transfer money manually, most of them give up before they buy. Every extra step costs you orders, and you never see the ones who walked away.',
        'A proper store removes the friction: customers browse, choose, and pay in one sitting, and you get a notification that an order came in. That is the entire difference between an audience and a business.',
      ],
    },
    comparison: {
      h2: 'Your options for selling online, compared honestly',
      sub: 'How a custom ITQAAN store stacks up against doing it yourself or staying on social media only.',
      columns: ['ITQAAN', 'DIY (Shopify/Wix)', 'Instagram only'],
      rows: [
        { label: 'Your time investment', values: ['Under 1 hour', '30+ hours', 'Every single DM'] },
        { label: 'Custom design', values: ['Every store', 'Template look', 'No storefront'] },
        { label: 'Checkout and payments', values: ['Set up for you', 'You figure it out', 'Manual transfers'] },
        { label: 'Cost', values: ['4,497 AED fixed', 'Monthly fees + apps + your time', 'Lost orders'] },
        { label: 'Found on Google', values: ['Built in', 'Limited', 'No'] },
        { label: 'You own the platform', values: ['Fully', 'Locked in', 'Rented audience'] },
      ],
    },
    processSteps: [
      {
        title: 'One short conversation',
        body: 'We talk through what you sell, how you deliver, and how you want to get paid. You get a fixed price in writing.',
      },
      {
        title: 'Design first',
        body: 'You see the store design within days and give feedback, with unlimited revision rounds until you are happy.',
      },
      {
        title: 'Products and payments',
        body: 'We set up your products, checkout, and payment methods, and show you how to manage orders yourself.',
      },
      {
        title: 'Launch and support',
        body: 'Your store goes live and starts taking orders. An optional care plan keeps it running smoothly after launch.',
      },
    ],
    deliverables: {
      h2: 'What you get with every store',
      items: [
        'Custom store design around your products, never a template',
        'Mobile-first checkout, where most of your orders will come from',
        'Online payments set up and working',
        'Product and order management you can run yourself',
        'Customer accounts and order notifications',
        'SEO setup so your products can be found on Google',
        'Unlimited revision rounds until you are happy',
        'Full ownership of the store, domain, and content',
      ],
    },
    pricing: {
      h2: 'What does an online store cost?',
      intro:
        'One fixed price for the full build, agreed in writing before we start. No percentage of your sales, no surprise costs.',
      packageIds: ['store'],
      note:
        'An optional care plan from 147 AED per month covers updates, support, and keeping the store fast and secure after launch. Cancellable any month.',
    },
    showGuarantees: true,
    faqs: [
      {
        q: 'How much does an e-commerce website cost in Dubai?',
        a: 'Agencies in Dubai often charge 15,000 AED or more for a store. With ITQAAN, a custom online store starts from 4,497 AED, fixed and agreed in writing before we begin, with no riba and no hidden fees. We do not take a percentage of your sales.',
      },
      {
        q: 'Can I manage products and orders myself?',
        a: 'Yes. The store is set up so you can add products, change prices, and process orders without touching any code. We walk you through it before launch, and stay reachable if you get stuck.',
      },
      {
        q: 'How do customers pay?',
        a: 'We set up online card payments, and where it fits your business, options like cash on delivery or bank transfer. You receive the money directly; it never passes through us.',
      },
      {
        q: 'How long does an online store take to build?',
        a: 'You see the design within days. A typical store is live within two to three weeks, depending on how many products you have and how quickly you can send us photos and details.',
      },
      {
        q: 'Is an online store halal to run?',
        a: 'The store itself is built the halal way: fixed pricing with no riba, no music, and no images of women by default. What you sell and how you finance your business are in your hands; we are happy to build around your requirements.',
      },
    ],
    projectSlugs: ['royalthobes'],
    serviceName: 'E-commerce Development',
    areaServed: ['Dubai', 'United Arab Emirates', 'Worldwide'],
    related: [
      { label: 'Web design service', href: '/services/web-design' },
      { label: 'SEO & GEO service', href: '/services/seo-geo' },
      { label: 'Care plans', href: '/services/care-plans' },
      { label: 'Websites for Muslim businesses', href: '/websites-for-muslim-businesses' },
    ],
  },
  {
    slug: 'branding',
    metaTitle: 'Branding & Logo Design for Muslim Businesses | From 797 AED | ITQAAN',
    metaDescription:
      'Logo and brand identity design for Muslim businesses in Dubai, the UAE, and worldwide. Fixed prices from 797 AED. Logo, colours, typography, and guidelines that make your business look established.',
    eyebrow: 'Branding & identity',
    h1: 'A brand that earns trust before you say a word',
    intro:
      'People decide how professional your business is from the first glance at your logo, your colours, and your consistency. We design complete brand identities for Muslim businesses: from a single strong logo to a full brand system, at a fixed price agreed upfront.',
    heroBullets: [
      'A logo and visual system that looks established, not homemade',
      'Everything delivered in print-ready and web-ready formats',
      'Fixed price from 797 AED, agreed before we start',
    ],
    quotePlan: 'brand',
    problem: {
      h2: 'An inconsistent brand quietly costs you customers',
      paragraphs: [
        'A logo stretched out of shape on a flyer, different colours on every post, a WhatsApp display picture that does not match the website. Each one seems small, but together they tell customers the business behind them is improvised.',
        'A clear identity works the other way: every touchpoint looks like it came from the same confident company. That consistency is what makes a small business feel established, and it is exactly what a brand system gives you.',
      ],
    },
    processSteps: [
      {
        title: 'Understand your business',
        body: 'A short conversation about what you do, who your customers are, and how you want to be seen. Fixed price agreed here.',
      },
      {
        title: 'Concepts',
        body: 'You receive initial logo directions within days and pick the one that feels right.',
      },
      {
        title: 'Refine together',
        body: 'We refine the chosen direction with your feedback, unlimited rounds, until it is exactly right.',
      },
      {
        title: 'Full handover',
        body: 'You get every file and format, plus guidelines if you chose the full system. It is all yours.',
      },
    ],
    deliverables: {
      h2: 'What you get with every identity',
      items: [
        'A logo designed for your business, not from a template or AI generator',
        'All file formats: print, web, and social media',
        'Colour palette and typography that work together',
        'Versions for dark and light backgrounds',
        'Brand guidelines with the full system, so everything stays consistent',
        'Unlimited revision rounds until you are happy',
        'Full ownership of every file',
        'Designed to respect your values, no imagery that conflicts with your deen',
      ],
    },
    pricing: {
      h2: 'What does brand identity design cost?',
      intro:
        'Three clear scopes depending on how much you need. Every price is fixed and agreed in writing before we start.',
      optionSet: 'brandScopes',
      note: 'Not sure which scope fits? Start the quote and we will recommend one honestly, even if it is the cheaper option.',
    },
    showGuarantees: true,
    faqs: [
      {
        q: 'How much does a logo cost in Dubai?',
        a: 'With ITQAAN, a professional logo starts from 797 AED, logo plus colours and typography from 1,497 AED, and a full brand system with guidelines from 2,997 AED. Every price is fixed and agreed before work begins.',
      },
      {
        q: 'What is the difference between a logo and a brand identity?',
        a: 'A logo is one mark. A brand identity is the full visual system around it: colours, typography, and the rules for using them, so your website, packaging, and social media all look like they belong to the same company. The logo is the start; consistency is what builds trust.',
      },
      {
        q: 'How long does branding take?',
        a: 'First logo concepts arrive within days. A logo project typically finishes within a week, and a full brand system within two to three weeks, depending on feedback speed.',
      },
      {
        q: 'Do I own the logo and the files?',
        a: 'Yes, completely. You receive every source file and format, and the rights to the work are yours. Nothing is held back or licensed to you.',
      },
      {
        q: 'Can you rebrand my existing business?',
        a: 'Yes. A rebrand follows the same process; we just start from what exists, keep what works, and fix what does not. If you also need your website updated to match, we handle both together.',
      },
    ],
    serviceName: 'Brand Identity Design',
    areaServed: ['Dubai', 'United Arab Emirates', 'Worldwide'],
    related: [
      { label: 'Web design service', href: '/services/web-design' },
      { label: 'Graphic design service', href: '/services/graphic-design' },
      { label: 'Websites for Muslim businesses', href: '/websites-for-muslim-businesses' },
    ],
  },
  {
    slug: 'seo-geo',
    metaTitle: 'SEO & GEO Services in Dubai | Rank on Google and AI Assistants | ITQAAN',
    metaDescription:
      'SEO and GEO (generative engine optimization) for Muslim businesses in Dubai and the UAE. Get found on Google and recommended by ChatGPT and other AI assistants. One-time setup from 797 AED or monthly growth.',
    eyebrow: 'SEO & GEO',
    h1: 'Get found on Google, and recommended by AI assistants',
    intro:
      'Your customers search on Google, and increasingly they just ask ChatGPT or Gemini who to hire. SEO gets you found in search results; GEO (generative engine optimization) gets you cited and recommended by AI assistants. We do both, honestly, with no fake promises.',
    heroBullets: [
      'Technical SEO, content, and local visibility in Dubai and the UAE',
      'GEO: structured, quotable content that AI assistants can cite',
      'One-time setup from 797 AED, or ongoing monthly growth',
    ],
    problem: {
      h2: 'Search is changing, and most businesses are invisible in both places',
      paragraphs: [
        'For years the game was ranking on Google. That still matters, but a growing share of your customers now ask an AI assistant a question like "who builds websites for Muslim businesses in Dubai" and take the answer they are given.',
        'AI assistants recommend businesses whose websites are fast, clearly structured, and honestly informative, with real answers written on real pages. Most sites have none of that, which means the recommendations go to the few that do.',
        'The good news: the same foundations serve both. Clean structure, fast pages, and clear, truthful content are what Google rewards and what AI systems quote. That is exactly what we build.',
      ],
    },
    notWe: {
      h2: 'Honest SEO, without the snake oil',
      dontHeading: 'What we do not do',
      dont: [
        'Guarantee a number one ranking, because nobody honestly can',
        'Lock you into long contracts',
        'Buy spammy backlinks that get you penalised later',
        'Stuff pages with keywords no human would read',
        'Send confusing reports designed to hide a lack of results',
      ],
      doHeading: 'What we do',
      doParagraphs: [
        'Technical SEO done properly: speed, structure, meta tags, sitemaps, and structured data that machines can read. Content written for the questions your customers actually ask, in language they use.',
        'For GEO, we make your site quotable: visible FAQ answers, clear service descriptions, and schema markup, so when an AI assistant needs an answer about your kind of business, your site is a source it can cite.',
        'And we report plainly: what was done, what moved, and what we recommend next. If something is not worth paying for, we say so.',
      ],
    },
    processSteps: [
      {
        title: 'Audit',
        body: 'We review your site, your competitors, and what your customers search for, then agree a fixed scope.',
      },
      {
        title: 'Fix the foundations',
        body: 'Speed, structure, meta tags, structured data, and local signals for Dubai and the UAE.',
      },
      {
        title: 'Content that answers',
        body: 'Pages and answers written around real questions, readable by people and quotable by AI assistants.',
      },
      {
        title: 'Measure and grow',
        body: 'On the monthly plan we keep building: new content, ongoing improvements, and plain-language reporting.',
      },
    ],
    deliverables: {
      h2: 'What the SEO & GEO setup includes',
      items: [
        'Full technical SEO audit and fixes',
        'Page speed and mobile experience improvements',
        'Meta titles and descriptions written to earn clicks',
        'Structured data (schema) so machines understand your business',
        'Visible FAQ answers that AI assistants can quote',
        'Local SEO signals for Dubai and UAE searches',
        'Google Search Console setup and indexing',
        'A plain-language report of what was done and what to do next',
      ],
    },
    pricing: {
      h2: 'What does SEO cost?',
      intro:
        'A one-time setup to fix the foundations, or a monthly plan for ongoing growth. Fixed prices, no long contracts, cancel the monthly plan any month.',
      optionSet: 'seoPlans',
      note: 'Every website we build already ships SEO-ready. These plans are for going further: competitive keywords, content growth, and AI-assistant visibility.',
    },
    showGuarantees: true,
    faqs: [
      {
        q: 'What is GEO (generative engine optimization)?',
        a: 'GEO means optimizing your website so AI assistants like ChatGPT, Gemini, and Copilot recommend and cite your business when people ask them questions. In practice it means fast pages, clear structure, schema markup, and honest, quotable answers written on your site. It works alongside SEO, not instead of it.',
      },
      {
        q: 'How long does SEO take to show results?',
        a: 'Honest answer: technical fixes can show movement within weeks, but meaningful ranking improvements usually take two to four months, depending on your competition. Anyone promising first-page rankings in days is not being straight with you.',
      },
      {
        q: 'Can you guarantee a number one ranking on Google?',
        a: 'No, and neither can anyone else; Google does not sell guarantees. What we guarantee is honest work: a technically correct site, content that answers real questions, and plain reporting on what moved. That is what rankings are built on.',
      },
      {
        q: 'Do I need SEO if my website is new?',
        a: 'Every site we build already includes basic SEO, so you start on a correct foundation. A dedicated setup or monthly plan makes sense once you want to compete for busier keywords, rank across the UAE, or show up in AI assistant recommendations.',
      },
      {
        q: 'What does the monthly SEO plan include?',
        a: 'Ongoing content written for questions your customers ask, continuous technical improvements, local visibility work for Dubai and the UAE, and a monthly plain-language report. From 397 AED per month, no lock-in contract, cancel any month.',
      },
    ],
    serviceName: 'SEO & GEO',
    areaServed: ['Dubai', 'United Arab Emirates', 'Worldwide'],
    related: [
      { label: 'Web design service', href: '/services/web-design' },
      { label: 'E-commerce service', href: '/services/ecommerce' },
      { label: 'Care plans', href: '/services/care-plans' },
      { label: 'Web design across the UAE', href: '/web-design-uae' },
    ],
  },
  {
    slug: 'graphic-design',
    metaTitle: 'Graphic Design Services | Social Media, Print & Pitch Decks | ITQAAN',
    metaDescription:
      'Graphic design for Muslim businesses: social media packs, business cards, flyers, menus, and pitch decks. Fixed prices from 397 AED, consistent with your brand, delivered fast.',
    eyebrow: 'Graphic design',
    h1: 'Design that makes your brand look like it means business',
    intro:
      'Every post, flyer, and deck your audience sees either builds your brand or chips away at it. We design the materials your business actually uses, consistent with your identity, respectful of your values, and at fixed prices agreed upfront.',
    heroBullets: [
      'Social media packs, print, menus, and pitch decks',
      'Everything consistent with your brand identity',
      'Fixed prices from 397 AED per item set',
    ],
    problem: {
      h2: 'Random design makes a good business look unreliable',
      paragraphs: [
        'A different style on every post, a menu typed in a hurry, a pitch deck assembled the night before. Customers and partners notice, even when they cannot say why something feels off.',
        'Consistent, well-made materials do the opposite: they make people assume the same care goes into your actual product or service. That assumption is worth far more than the design costs.',
      ],
    },
    processSteps: [
      {
        title: 'Tell us what you need',
        body: 'Social pack, print, deck, or menu. We agree the exact items and a fixed price.',
      },
      {
        title: 'We design',
        body: 'First versions within days, in your brand style, or we help define one first.',
      },
      {
        title: 'Refine and deliver',
        body: 'Unlimited revision rounds within scope, then every file delivered in the formats you need.',
      },
    ],
    deliverables: {
      h2: 'What you get with every design order',
      items: [
        'Designs built on your brand identity, not generic templates',
        'Print-ready and web-ready files for every item',
        'Editable source files where you need them',
        'Sized correctly for each platform or print format',
        'No imagery that conflicts with your values',
        'Unlimited revision rounds until you are happy',
        'Fast turnaround, most items within days',
        'Full ownership of everything delivered',
      ],
    },
    pricing: {
      h2: 'What does graphic design cost?',
      intro:
        'Clear per-item pricing. Combine what you need and get one fixed quote before anything starts.',
      optionSet: 'graphicItems',
      note: 'Need something not listed, or a recurring monthly design arrangement? Start the quote and describe it; you will get a fixed price for it.',
    },
    showGuarantees: true,
    faqs: [
      {
        q: 'How much does graphic design cost?',
        a: 'Print items like business cards and flyers start from 397 AED, social media packs and menus from 497 AED, and pitch decks from 697 AED. Each price is fixed and covers the full item set, not a per-hour rate that grows.',
      },
      {
        q: 'How fast can I get my designs?',
        a: 'Most single items are delivered within a few days. Larger sets like a full social media pack or a pitch deck typically take up to a week, depending on feedback speed.',
      },
      {
        q: 'Do I need a brand identity first?',
        a: 'It helps, because designs built on a consistent identity work harder. If you do not have one yet, we can design a logo and basics first, or work carefully with what you have.',
      },
      {
        q: 'What files do I receive?',
        a: 'Everything you need to actually use the work: print-ready PDFs, web and social formats, and editable source files where relevant. You own all of it.',
      },
      {
        q: 'Can you design ongoing monthly content?',
        a: 'Yes. If you need a steady stream of social media designs each month, we can agree a fixed monthly arrangement. Start the quote and describe what you need.',
      },
    ],
    serviceName: 'Graphic Design',
    areaServed: ['Dubai', 'United Arab Emirates', 'Worldwide'],
    related: [
      { label: 'Branding & identity service', href: '/services/branding' },
      { label: 'Web design service', href: '/services/web-design' },
      { label: 'Websites for Muslim businesses', href: '/websites-for-muslim-businesses' },
    ],
  },
  {
    slug: 'care-plans',
    metaTitle: 'Website Care Plans | Hosting, Updates & Support | ITQAAN',
    metaDescription:
      'Monthly website care from 147 AED: updates, support, speed and security monitoring for your website. No lock-in contracts, cancel any month. For businesses in Dubai, the UAE, and worldwide.',
    eyebrow: 'Care plans',
    h1: 'Your website stays fast, secure, and current. Without you thinking about it.',
    intro:
      'A website is not a one-time purchase; it needs small updates, security attention, and someone to call when something breaks. The care plan covers all of it for a fixed monthly price, so your site keeps working while you run your business.',
    heroBullets: [
      'Content updates, monitoring, and support in one plan',
      'Direct help on WhatsApp and email, no ticket queues',
      'From 147 AED per month, cancel any month',
    ],
    problem: {
      h2: 'An unmaintained website slowly becomes a liability',
      paragraphs: [
        'Outdated prices, a broken form nobody noticed, security updates that never happened, a site that gets slower every year. Most website problems are not dramatic; they accumulate quietly until customers are affected.',
        'Many builders disappear after launch, leaving you to figure out hosting renewals and technical errors alone. We think that is a poor way to treat clients, so we built the opposite.',
      ],
    },
    notWe: {
      h2: 'What the care plan is, and what it is not',
      dontHeading: 'Not this',
      dont: [
        'A lock-in contract that renews automatically forever',
        'A ticket system where you wait days for a reply',
        'Surprise invoices for every small request',
        'An excuse to build something that needs constant fixing',
      ],
      doHeading: 'This',
      doParagraphs: [
        'A simple monthly arrangement: your site stays updated, monitored, and supported, and you have a direct line to the person who built it.',
        'Small changes to text, photos, and prices are included. Bigger changes are quoted separately at a fixed price before any work happens, so there are never surprises.',
        'And if you ever want to leave, you cancel, and you keep everything. The site is yours either way.',
      ],
    },
    deliverables: {
      h2: 'What every care plan includes',
      items: [
        'Small updates to text, photos, and prices, done for you',
        'Speed and uptime kept in check',
        'Security updates and backups',
        'Broken links and forms caught and fixed',
        'Direct support on WhatsApp and email',
        'Honest advice when you are deciding what to change',
        'Bigger changes quoted at a fixed price before any work',
        'No lock-in, cancel any month, you keep everything',
      ],
    },
    pricing: {
      h2: 'What does the care plan cost?',
      intro:
        'One simple monthly price. The exact figure depends on your site; a one-page site needs less care than a store, and you get the exact price before you commit.',
      showCarePlan: true,
      note: 'The care plan is optional with every project. Sites we build are handed over fully yours whether you take it or not.',
    },
    showGuarantees: true,
    faqs: [
      {
        q: 'What does the website care plan include?',
        a: 'Small content updates done for you, security updates and backups, speed and uptime monitoring, broken links and forms fixed, and direct support on WhatsApp and email. From 147 AED per month, with the exact price fixed for your site before you commit.',
      },
      {
        q: 'Do I have to take the care plan?',
        a: 'No. It is optional with every project, and your website is handed over fully yours either way. The plan exists for owners who would rather not deal with technical upkeep themselves.',
      },
      {
        q: 'Can I cancel the care plan?',
        a: 'Yes, any month, with no cancellation fee and no lock-in contract. You keep your website, your domain, and all your content.',
      },
      {
        q: 'What counts as a small change?',
        a: 'Updating text, swapping photos, changing prices or opening hours, small layout tweaks. Anything bigger, like a new page or a new feature, is quoted separately at a fixed price before we start, so you always know the cost upfront.',
      },
      {
        q: 'What if my website was built by someone else?',
        a: 'Message us with your site address. If it is something we can maintain properly, we will say so and give you a fixed monthly price; if it is not, we will tell you that honestly too.',
      },
    ],
    serviceName: 'Website Care Plans',
    areaServed: ['Dubai', 'United Arab Emirates', 'Worldwide'],
    related: [
      { label: 'Web design service', href: '/services/web-design' },
      { label: 'SEO & GEO service', href: '/services/seo-geo' },
      { label: 'E-commerce service', href: '/services/ecommerce' },
    ],
  },
]

export function getService(slug: string): ServicePageData | undefined {
  return services.find(s => s.slug === slug)
}
