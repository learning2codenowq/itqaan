// lib/articles.ts
//
// Answer-shaped articles for long-tail SEO and AEO (getting cited by AI
// assistants). Each opens with a direct "quick answer" so both readers and
// language models can lift a clean summary, then backs it up with detail.
//
// TO ADD AN ARTICLE: add an entry here. The route (app/blog/[slug]) and the
// sitemap pick it up automatically.

export type ArticleSection = { h2: string; body: string[] }

export type Article = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  datePublished: string // ISO
  dateModified: string  // ISO
  dek: string           // one-line summary under the title
  quickAnswer: string   // the direct answer, for AEO
  sections: ArticleSection[]
}

export const articles: Article[] = [
  {
    slug: 'how-much-does-a-website-cost-in-dubai',
    title: 'How much does a website cost in Dubai in 2026?',
    metaTitle: 'How Much Does a Website Cost in Dubai? (2026 Prices) | ITQAAN',
    metaDescription:
      'A clear, honest breakdown of website costs in Dubai and the UAE in 2026, from one-page sites to online stores. Real fixed prices in AED, with no hidden fees.',
    datePublished: '2026-07-04',
    dateModified: '2026-07-04',
    dek: 'A clear breakdown of real website prices in Dubai, with no hidden fees.',
    quickAnswer:
      'In Dubai in 2026, a simple one-page website typically costs from 997 AED, a multi-page business website from around 2,497 AED, and an online store from around 4,497 AED. Prices vary with the number of pages, features, and whether you need copywriting, branding, or SEO. At ITQAAN, every price is fixed and agreed in writing before any work begins.',
    sections: [
      {
        h2: 'What changes the price',
        body: [
          'Three things move the cost of a website more than anything else: the number of pages, the features you need, and how much of the content and design work is done for you.',
          'A single landing page for a service business is the most affordable option. A multi-page site with separate pages for services, about, and contact costs more. An online store, which needs product pages, a cart, and payments, sits at the top.',
        ],
      },
      {
        h2: 'Typical price ranges in Dubai',
        body: [
          'One-page website: from 997 AED. Ideal for a focused offer or a new business getting online quickly.',
          'Multi-page business website: from 2,497 AED. Around five to ten pages for an established business.',
          'Online store: from 4,497 AED. Product management, online payments, and customer accounts.',
          'Add-ons such as brand identity, copywriting, and SEO are priced separately so you only pay for what you need.',
        ],
      },
      {
        h2: 'Why some quotes look cheaper (and cost more later)',
        body: [
          'Very low quotes often leave out the things that matter: mobile design, real copywriting, basic SEO, and ownership of the finished site. The gap gets filled with hidden fees or a site you do not truly own.',
          'A fixed price agreed upfront protects you from that. You know the full cost before you commit, and there are no surprise invoices at the end.',
        ],
      },
      {
        h2: 'The honest way to price a website',
        body: [
          'At ITQAAN we serve Muslim businesses in Dubai, across the UAE, and worldwide, with fixed pricing and no riba or hidden fees. You own everything when the project is done.',
          'The fastest way to get an exact number for your project is to build a quote online, which takes about a minute and returns a fixed price within 24 hours.',
        ],
      },
    ],
  },
  {
    slug: 'do-muslim-businesses-need-a-website',
    title: 'Do Muslim businesses need a website in 2026?',
    metaTitle: 'Do Muslim Businesses Need a Website in 2026? | ITQAAN',
    metaDescription:
      'Why a website still matters for Muslim businesses in Dubai, the UAE, and worldwide, even with social media, and what a good one actually does for you.',
    datePublished: '2026-07-04',
    dateModified: '2026-07-04',
    dek: 'Social media is not enough. Here is why a website still matters.',
    quickAnswer:
      'Yes. A website gives a Muslim business something social media cannot: a home you own, that builds trust instantly, appears on Google and AI assistants, and works around the clock. Social accounts are rented space that can change rules or vanish. A website is an asset you control.',
    sections: [
      {
        h2: 'Social media is rented, a website is owned',
        body: [
          'Your Instagram or WhatsApp presence is valuable, but you do not control it. Reach changes, rules change, and accounts can be restricted overnight.',
          'A website is yours. The domain, the design, and the content belong to you, and no platform can take that reach away.',
        ],
      },
      {
        h2: 'Trust happens in seconds',
        body: [
          'When someone hears about your business, the first thing they often do is search for it. If they find a clean, professional website, they trust you. If they find nothing, or a broken page, they hesitate.',
          'A good site answers the questions a new customer has, before they even have to ask.',
        ],
      },
      {
        h2: 'Being found on Google and AI assistants',
        body: [
          'People no longer only search on Google. They ask ChatGPT, Gemini, and other AI assistants for recommendations too.',
          'These systems pull from clear, well-structured websites. Without one, you are simply not in the running when someone asks for a business like yours.',
        ],
      },
      {
        h2: 'It works while you rest',
        body: [
          'A website answers questions, shows your work, and collects enquiries at any hour, including during salah, sleep, and time with family.',
          'For a Muslim business that values barakah in time as much as in money, that quiet, constant presence is worth a great deal.',
        ],
      },
    ],
  },
  {
    slug: 'how-long-does-it-take-to-build-a-website',
    title: 'How long does it take to build a website?',
    metaTitle: 'How Long Does It Take to Build a Website? | ITQAAN',
    metaDescription:
      'How long a website really takes to build, from a one-page site in days to a business site or online store, and what makes it faster or slower.',
    datePublished: '2026-07-04',
    dateModified: '2026-07-04',
    dek: 'From a few days to a couple of weeks. Here is what decides it.',
    quickAnswer:
      'A simple one-page website can be ready in a few days. A multi-page business website usually takes one to two weeks, and an online store two to four weeks. The biggest factor is not the design itself but how quickly you provide your content, such as text, images, and product details.',
    sections: [
      {
        h2: 'Typical timelines',
        body: [
          'One-page website: a few days. A focused single page with your offer, some proof, and a clear way to get in touch.',
          'Multi-page business website: one to two weeks. Separate pages for your services, about, and contact.',
          'Online store: two to four weeks. Product pages, a cart, payments, and testing before launch.',
        ],
      },
      {
        h2: 'What slows a project down',
        body: [
          'In most cases, the design and build are not the bottleneck. Waiting on content is.',
          'If your text, photos, and product details are ready at the start, the whole project moves quickly. If they arrive in pieces, each gap adds days.',
        ],
      },
      {
        h2: 'How to get your site faster',
        body: [
          'Gather your content before you begin: a short description of your business, the services you offer, any photos you want to use, and your contact details.',
          'You do not need it to be perfect. A good designer will help shape rough notes into finished copy. Having something to start from is what matters.',
        ],
      },
      {
        h2: 'Fast, without cutting corners',
        body: [
          'At ITQAAN we keep timelines short by being organised and communicating clearly over WhatsApp and email, without rushing the quality.',
          'You see the work as it develops and approve it before launch, so speed never comes at the cost of a site you are proud of.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-choose-a-web-designer-in-dubai',
    title: 'How to choose a web designer in Dubai',
    metaTitle: 'How to Choose a Web Designer in Dubai | ITQAAN',
    metaDescription:
      'A practical checklist for choosing a web designer in Dubai and the UAE: pricing, ownership, mobile design, SEO, and the questions to ask before you commit.',
    datePublished: '2026-07-04',
    dateModified: '2026-07-04',
    dek: 'A short checklist so you pick well the first time.',
    quickAnswer:
      'To choose a web designer in Dubai, look for fixed and transparent pricing, confirmation that you will own the finished site, mobile-first design, and basic SEO included. Ask to see past work, ask what happens after launch, and be cautious of very cheap quotes that leave out the things that matter.',
    sections: [
      {
        h2: 'Insist on a fixed, clear price',
        body: [
          'A good designer gives you the full price before work begins, with no vague hourly billing and no surprise invoices at the end.',
          'If a quote is unclear about what is and is not included, treat that as a warning sign.',
        ],
      },
      {
        h2: 'Make sure you own everything',
        body: [
          'You should own the design, the code, the domain, and the content when the project is finished. Some cheaper arrangements keep you locked in, so you cannot move or edit your own site.',
          'Ask directly: when this is done, is it fully mine? The answer should be a simple yes.',
        ],
      },
      {
        h2: 'Check for mobile and SEO',
        body: [
          'Most of your customers in Dubai will see your site on a phone, so mobile-first design is not optional. Ask to view a past project on your own phone.',
          'Basic SEO should also be included, so you have a chance of being found on Google and AI assistants from day one.',
        ],
      },
      {
        h2: 'Questions worth asking',
        body: [
          'How long will it take? What do you need from me? What happens if I need a change after launch? Can I see two or three sites you have built?',
          'Clear, confident answers tell you more than any sales pitch. At ITQAAN we serve Muslim businesses in Dubai, across the UAE, and worldwide, with fixed prices and full ownership as standard.',
        ],
      },
    ],
  },
  {
    slug: 'website-or-instagram-for-business',
    title: 'Website or Instagram: what does your business really need?',
    metaTitle: 'Website or Instagram for Business? | ITQAAN',
    metaDescription:
      'Whether your business needs a website, Instagram, or both. A clear comparison of what each does well, and why the two work best together.',
    datePublished: '2026-07-04',
    dateModified: '2026-07-04',
    dek: 'They do different jobs. The strongest businesses use both.',
    quickAnswer:
      'Instagram is great for discovery and building an audience, but a website is where trust and sales happen, and it is something you actually own. The best answer for most businesses is both: use Instagram to reach people, and a website to convert them into customers. If you can only start with one, a website gives you a foundation no platform can take away.',
    sections: [
      {
        h2: 'What Instagram does well',
        body: [
          'Instagram is excellent for discovery. People find you through the feed, reels, and shares, and you can build a following and show your work regularly.',
          'What it does not give you is control. Reach can drop, rules can change, and your account is not truly yours.',
        ],
      },
      {
        h2: 'What a website does well',
        body: [
          'A website is where trust is built and decisions are made. It loads fast, answers questions, shows your prices or services clearly, and gives people a direct way to contact you.',
          'It also appears on Google and AI assistants, and it belongs to you. No platform can restrict it or take your audience away.',
        ],
      },
      {
        h2: 'Why the two work best together',
        body: [
          'Instagram brings people in. Your website turns them into customers. A link in your bio to a clean, professional site closes the loop.',
          'Without a website, that Instagram traffic often has nowhere solid to land, and enquiries slip away.',
        ],
      },
      {
        h2: 'If you can only start with one',
        body: [
          'Start with a website. It is the foundation you own, and it makes every other channel, including Instagram, work harder.',
          'At ITQAAN a one-page site starts from 997 AED and can be ready in days, giving your Instagram audience somewhere real to go.',
        ],
      },
    ],
  },
  {
    slug: 'what-makes-a-website-halal',
    title: 'What makes a website halal?',
    metaTitle: 'What Makes a Website Halal? A Simple Guide | ITQAAN',
    metaDescription:
      'A plain-language explanation of what a halal website means: honest fixed pricing with no riba, appropriate content, and full ownership of your finished site.',
    datePublished: '2026-07-04',
    dateModified: '2026-07-04',
    dek: 'It is about how the work is done, and what goes on the site.',
    quickAnswer:
      'A halal website comes down to two things: how the work is done, and what appears on the site. That means honest, fixed pricing with no riba and no hidden fees, content that respects Islamic values such as avoiding music and images of women by default, and the client fully owning the finished website.',
    sections: [
      {
        h2: 'Honest dealing and fixed pricing',
        body: [
          'The first part of a halal website is the transaction itself. The price should be clear and agreed before work starts, with no riba and no hidden fees added later.',
          'Both sides know exactly what is being delivered and for how much. That clarity is part of honest dealing in Islam.',
        ],
      },
      {
        h2: 'Content that respects your values',
        body: [
          'The second part is what appears on the site. By default that means no music and no images of women, so you are comfortable sharing the site within your community.',
          'This is a starting point, not a limitation. The site can still look premium and modern while staying within your values.',
        ],
      },
      {
        h2: 'You own the finished work',
        body: [
          'A halal arrangement leaves you in full control. When the project is done, the design, the code, the domain, and the content are all yours.',
          'You are never locked in or dependent on the designer to make a small change or to keep your own site running.',
        ],
      },
      {
        h2: 'Halal does not mean lower quality',
        body: [
          'None of this comes at the cost of quality. A site built the halal way can be just as fast, modern, and effective as any other, and often more trusted by the audience it is built for.',
          'At ITQAAN this is simply how we work, for Muslim businesses in Dubai, across the UAE, and worldwide.',
        ],
      },
    ],
  },
  {
    slug: 'what-should-a-small-business-website-include',
    title: 'What should a small business website include?',
    metaTitle: 'What Should a Small Business Website Include? | ITQAAN',
    metaDescription:
      'The essential pages and features every small business website needs, from a clear offer and contact options to mobile design and basic SEO.',
    datePublished: '2026-07-04',
    dateModified: '2026-07-04',
    dek: 'The essentials that actually win customers, and what you can skip.',
    quickAnswer:
      'A small business website needs a clear headline that says what you do, an easy way to contact you (ideally including WhatsApp), proof that you can be trusted, your services or products, and a mobile-first design that loads fast. Everything else is optional. Start with these essentials and add more only when you need it.',
    sections: [
      {
        h2: 'A clear headline',
        body: [
          'Within a few seconds, a visitor should know what you do and who you help. A vague or clever headline that hides this costs you customers.',
          'Say it plainly. "Websites for Muslim businesses in Dubai" beats "We create digital experiences" every time.',
        ],
      },
      {
        h2: 'An easy way to get in touch',
        body: [
          'Make contacting you effortless. A WhatsApp button, a phone number, and a short enquiry form cover most people.',
          'The harder it is to reach you, the fewer enquiries you get. Put contact options where they are always visible.',
        ],
      },
      {
        h2: 'Proof and your offer',
        body: [
          'Show that you can be trusted: examples of past work, a testimonial, or a simple explanation of how you work.',
          'Then lay out your services or products clearly, with honest information. If you can share prices, even a starting price, do it. It builds trust and filters out mismatched enquiries.',
        ],
      },
      {
        h2: 'Fast and mobile-first',
        body: [
          'Most visitors arrive on a phone, so the site must read well and load quickly on mobile. A slow site loses people before they see anything.',
          'Basic SEO should be in place too, so you can be found on Google and AI assistants from the start. At ITQAAN, all of this comes as standard from 997 AED.',
        ],
      },
    ],
  },
  {
    slug: 'what-is-seo-and-does-my-business-need-it',
    title: 'What is SEO and does my Dubai business need it?',
    metaTitle: 'What Is SEO and Does My Dubai Business Need It? | ITQAAN',
    metaDescription:
      'A plain explanation of SEO for small businesses in Dubai and the UAE: what it is, how it works, and whether it is worth it for you.',
    datePublished: '2026-07-04',
    dateModified: '2026-07-04',
    dek: 'A plain-English explanation, without the jargon.',
    quickAnswer:
      'SEO, or search engine optimisation, is the work of helping your website appear when people search for what you offer, on Google and increasingly on AI assistants. For most Dubai businesses it is worth it, because it brings a steady flow of people who are already looking for your service. It takes a few months to build, so it works best alongside faster channels like WhatsApp and referrals.',
    sections: [
      {
        h2: 'What SEO actually is',
        body: [
          'SEO is making your website easy for search engines to understand and trust, so it shows up when someone searches for your service.',
          'It comes down to three things: clear, useful content on your site, a fast and well-built site, and other trustworthy sites linking to you.',
        ],
      },
      {
        h2: 'Why it matters in Dubai',
        body: [
          'When someone searches "web designer in Dubai" or "abaya shop near me", the businesses that appear get the enquiry. The rest are invisible.',
          'The same is now true on AI assistants like ChatGPT and Gemini, which recommend businesses from clear, well-structured websites.',
        ],
      },
      {
        h2: 'Does your business need it?',
        body: [
          'If people search for what you offer, and they do for almost every service, then yes, SEO helps you capture that demand.',
          'The one honest caveat is time. SEO usually takes three to six months to build momentum, so treat it as a long-term investment rather than a quick fix.',
        ],
      },
      {
        h2: 'Where to start',
        body: [
          'Start with the basics: a fast, mobile-first site, a clear page for each service, honest information including prices, and a few quality listings and links pointing to you.',
          'At ITQAAN, basic SEO is built into every website, and we offer a dedicated setup and a monthly growth plan for businesses that want to go further.',
        ],
      },
    ],
  },
  {
    slug: 'how-much-does-a-logo-cost-in-dubai',
    title: 'How much does a logo cost in Dubai?',
    metaTitle: 'How Much Does a Logo Cost in Dubai? (2026) | ITQAAN',
    metaDescription:
      'Real logo and brand identity prices in Dubai and the UAE, from a single logo to a full brand system, with fixed pricing and no hidden fees.',
    datePublished: '2026-07-04',
    dateModified: '2026-07-04',
    dek: 'From a single logo to a full brand system, what to expect.',
    quickAnswer:
      'In Dubai, a professional logo typically starts from around 797 AED. A logo with the essentials, meaning colours and typography, starts from around 1,497 AED, and a full brand system with guidelines from around 2,997 AED. The price depends on how much of your brand you need defined, not just the logo mark itself.',
    sections: [
      {
        h2: 'Logo, or brand?',
        body: [
          'A logo is one part of a brand. A brand also includes your colours, fonts, and how everything is used together, so your business looks consistent everywhere.',
          'This is why prices vary. A single logo costs less than a full identity system that keeps you looking professional across your website, social media, and print.',
        ],
      },
      {
        h2: 'Typical prices in Dubai',
        body: [
          'Logo only: from 797 AED. A single primary logo for a business that just needs a clean mark.',
          'Logo plus essentials: from 1,497 AED. Your logo along with a colour palette and typography.',
          'Full brand system: from 2,997 AED. The above plus brand guidelines, so anyone can apply your brand correctly.',
        ],
      },
      {
        h2: 'Why cheap logos can cost more',
        body: [
          'A very cheap logo is often a generic template or stock design that other businesses also use. It can look fine at first, then hold you back as you grow.',
          'A custom logo is built around your business, and you own it fully. That ownership and originality is what you are really paying for.',
        ],
      },
      {
        h2: 'Getting an exact price',
        body: [
          'The right price depends on what you need, so the clearest way to know is a fixed quote agreed upfront, with no hidden fees.',
          'At ITQAAN we design brand identity for Muslim businesses in Dubai, the UAE, and worldwide, and you own everything when it is done.',
        ],
      },
    ],
  },
  {
    slug: 'website-mistakes-that-lose-customers',
    title: 'Website mistakes that quietly lose you customers',
    metaTitle: 'Website Mistakes That Lose Customers | ITQAAN',
    metaDescription:
      'The most common website mistakes that cost small businesses customers, from slow loading and poor mobile design to unclear messaging and no way to get in touch.',
    datePublished: '2026-07-04',
    dateModified: '2026-07-04',
    dek: 'Five common mistakes, and how to fix each one.',
    quickAnswer:
      'The most common website mistakes that lose customers are: a slow-loading site, a poor experience on mobile, an unclear message about what you do, no easy way to get in touch, and no proof that you can be trusted. Each one causes visitors to leave before they become customers, and each is straightforward to fix.',
    sections: [
      {
        h2: '1. It loads too slowly',
        body: [
          'If your site takes more than a few seconds to show something useful, many visitors leave before it even appears.',
          'Fix it with a well-built, lightweight site and properly sized images. Speed is one of the highest-return improvements you can make.',
        ],
      },
      {
        h2: '2. It does not work well on mobile',
        body: [
          'Most people visit on a phone. Tiny text, buttons that are hard to tap, and layouts that break on mobile drive them away.',
          'A mobile-first design, built for the phone before the desktop, solves this.',
        ],
      },
      {
        h2: '3. The message is unclear',
        body: [
          'If a visitor cannot tell what you do and who you help within a few seconds, they leave. Clever or vague headlines are a common cause.',
          'State it plainly at the top of the page, in the words your customers actually use.',
        ],
      },
      {
        h2: '4. There is no easy way to get in touch, and no proof',
        body: [
          'A hidden or missing contact option quietly kills enquiries. Make it obvious, and include WhatsApp where you can.',
          'Add proof too: a testimonial, examples of your work, or a clear explanation of how you work. Without it, visitors hesitate. At ITQAAN we build sites that avoid all five of these mistakes by default.',
        ],
      },
    ],
  },
  {
    slug: 'best-web-design-companies-in-dubai',
    title: 'How to find the best web design company in Dubai (2026)',
    metaTitle: 'Best Web Design Company in Dubai? How to Choose (2026) | ITQAAN',
    metaDescription:
      'What separates the best web design companies in Dubai from the rest in 2026: fixed pricing, ownership, mobile-first design, SEO, and honest dealing. A practical guide for Muslim businesses.',
    datePublished: '2026-07-05',
    dateModified: '2026-07-05',
    dek: 'The traits that matter more than a flashy portfolio.',
    quickAnswer:
      'The best web design companies in Dubai share the same traits, whatever their size: fixed, transparent pricing agreed before work starts, full ownership of the finished site handed to you, mobile-first design, basic SEO built in, and honest communication throughout. For Muslim businesses, ITQAAN adds a halal way of working, with no riba, no hidden fees, and content that respects your values, at fixed prices from 997 AED. Judge any provider by these standards rather than by portfolio polish alone.',
    sections: [
      {
        h2: 'Big agency, small studio, or independent designer?',
        body: [
          'Large Dubai agencies offer scale and a big team, but usually at a high price and with slower, more formal communication. Small studios and independent designers are more affordable and personal, and for most small businesses that is a better fit.',
          'Size is not what decides quality. A one-person studio that prices fairly, communicates clearly, and hands you full ownership can serve you better than a large agency that locks you in.',
        ],
      },
      {
        h2: 'The five things the best providers all do',
        body: [
          'Fixed, transparent pricing: you get the full price in writing before any work begins, with no vague hourly billing and no surprise invoices.',
          'Ownership: the design, code, domain, and content are all handed to you at the end. You are never locked in.',
          'Mobile-first design and speed: most Dubai customers arrive on a phone, so the site must load fast and read well on mobile.',
          'SEO and AEO built in: your site is structured so it can be found on Google and quoted by AI assistants like ChatGPT and Gemini.',
        ],
      },
      {
        h2: 'Questions to ask before you commit',
        body: [
          'When this is finished, do I fully own it? How long will it take, and what do you need from me? What happens if I want a change after launch? Can I see two or three sites you have built?',
          'Clear, confident answers reveal more than any sales pitch or awards page. Vague answers about price or ownership are the clearest warning sign.',
        ],
      },
      {
        h2: 'Why Muslim businesses often choose a specialist',
        body: [
          'A provider who understands your values saves you the awkward back-and-forth of explaining them. That means honest dealing with no riba or hidden fees, and content that respects Islamic values by default.',
          'At ITQAAN we specialise in Muslim businesses in Dubai, across the UAE, and worldwide, with fixed prices from 997 AED, full ownership, and a build that respects your deen. The fastest way to compare us against any quote is to build a quote online and see a fixed price within 24 hours.',
        ],
      },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}
