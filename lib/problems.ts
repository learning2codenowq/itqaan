// lib/problems.ts
//
// The "problems we solve" content. Shared by the homepage Problems section
// (condensed) and the /problems-we-solve landing page (full, with FAQ + schema).
//
// This is written in the client's own words first (the pain and what it costs),
// then how ITQAAN fixes it. It doubles as an SEO/AEO asset: the pains here are
// literally how people search and how they describe their situation to an AI
// assistant.
//
// Positioning follows lib/landing.ts: websites for Muslim businesses in Dubai,
// the UAE, and worldwide. The halal way of working is a differentiator, not the
// whole pitch. No em dashes anywhere.

export type Problem = {
  // short label for the homepage grid + the anchor id
  id: string
  tag: string
  // the client's pain, in their words
  pain: string
  // what that pain is quietly costing them
  cost: string
  // how ITQAAN fixes it
  fix: string
}

export const problems: Problem[] = [
  {
    id: 'invisible-on-google',
    tag: 'Invisible online',
    pain: 'My business runs on Instagram and WhatsApp, so when someone Googles me they find nothing, or worse, a competitor.',
    cost: 'Every customer who searches for you and comes up empty is a sale that quietly went to someone else. You never even see it happen.',
    fix: 'A fast, findable website that shows up when people search for your service in Dubai and the UAE, with a clear path straight to your WhatsApp.',
  },
  {
    id: 'dont-own-it',
    tag: 'You do not own it',
    pain: 'I paid someone for a website, but I do not have the login, the domain, or the files. I am locked in and cannot move.',
    cost: 'A site you do not own is rented ground. The day you fall out with whoever holds the keys, your online presence can vanish overnight.',
    fix: 'When your project is done, everything is handed to you: the design, the code, the domain, and every login. It is yours to keep, forever.',
  },
  {
    id: 'surprise-fees',
    tag: 'Surprise invoices',
    pain: 'An agency quoted me one number, then added fee after fee. I no longer know what a website should actually cost.',
    cost: 'Hidden fees and vague quotes turn a simple decision into a stressful one, and often push the final bill far past what you agreed to.',
    fix: 'One fixed price, agreed in writing before any work starts. No riba, no hidden fees, no surprise invoice at the end. You build a quote in a minute and see the number.',
  },
  {
    id: 'looks-dated',
    tag: 'Dated and slow',
    pain: 'My current site looks old, loads slowly, and falls apart on a phone, which is where nearly all my customers actually are.',
    cost: 'A slow, dated site makes an established business look small. People decide whether to trust you in seconds, and a bad first impression is hard to win back.',
    fix: 'A clean, modern, mobile-first design that loads quickly and makes your business look as established as it really is.',
  },
  {
    id: 'reflects-values',
    tag: 'Reflects your values',
    pain: 'I want a professional site that still reflects my deen, without music or imagery I would not be comfortable showing my community.',
    cost: 'Most designers treat your values as an afterthought, leaving you to choose between a site that looks good and one you feel at peace sharing.',
    fix: 'By default your site carries no music and no images of women, and it is built to a premium standard. You never have to choose between quality and your values.',
  },
  {
    id: 'remote-trust',
    tag: 'Working remotely',
    pain: 'I want to hire someone who understands my business, but I am nervous about paying a designer I have never met in person.',
    cost: 'Fear of being let down by a remote hire keeps many good businesses stuck on a weak site far longer than they should be.',
    fix: 'Everything happens over WhatsApp, email, and screen shares, on your schedule. You see the work as it develops and approve it before it goes live. Fixed price, clear stages, no leap of faith.',
  },
]

// For the standalone /problems-we-solve page
export const problemsPage = {
  slug: 'problems-we-solve',
  metaTitle: 'Website Problems We Solve for Muslim Businesses | ITQAAN',
  metaDescription:
    'Invisible on Google, locked out of a site you paid for, hit with surprise fees, or stuck with a dated design. Here are the website problems ITQAAN solves for Muslim businesses in Dubai, the UAE, and worldwide.',
  eyebrow: 'Problems we solve',
  h1: 'The problems we solve',
  intro:
    'Most Muslim business owners we meet are not looking for a website. They are trying to fix something: they are invisible on Google, locked out of a site they paid for, tired of surprise fees, or embarrassed by a dated design. Here is what we hear most often, and how we put it right.',
  faqs: [
    {
      q: 'I already have a website but I do not have the logins. Can you help?',
      a: 'Yes. This is one of the most common problems we fix. We can rebuild your site so that you fully own the design, the code, the domain, and every login. When we are done, everything is handed to you and it is yours to keep.',
    },
    {
      q: 'Why should I trust a designer I cannot meet in person?',
      a: 'We serve clients in Dubai and across the UAE remotely, so everything happens over WhatsApp, email, and screen shares. You see the work as it develops, give feedback at each stage, and approve it before it goes live. The price is fixed in writing before we begin, so there is no leap of faith.',
    },
    {
      q: 'How do I know I will not get surprise fees like last time?',
      a: 'At ITQAAN there is one fixed price, agreed in writing before any work starts, with no riba and no hidden fees. You build a quote online in about a minute and see the starting number for yourself, then receive a firm fixed price within 24 hours.',
    },
    {
      q: 'Can my site reflect my values and still look premium?',
      a: 'Yes. By default your site carries no music and no images of women, and it is built to a premium, modern standard. You never have to choose between a website that looks established and one you feel at peace sharing with your community.',
    },
  ],
}
