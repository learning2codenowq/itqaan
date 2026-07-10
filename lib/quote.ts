// lib/quote.ts
//
// Single source of truth for the quote builder + homepage packages.
// Prices use charm pricing (…97) — review the exact figures before going live.

export const CURRENCY = 'AED'

export function formatPrice(n: number): string {
  return `${CURRENCY} ${n.toLocaleString('en-US')}`
}

/* ── Scarcity ──
   Update `slotsLeft` as you book projects. When it hits 0 the site switches
   to "fully booked" mode: badges flip, and /quote becomes a soft-gated
   application (still captures leads, framed as "apply, reviewed when the next
   intake opens"). `perMonth` is your total monthly capacity. `nextAvailable`
   is computed automatically as the next calendar month, so it stays correct
   without editing. */
export const capacity = {
  slotsLeft: 1,
  perMonth: 4,
  get nextAvailable(): string {
    return nextMonthLabel()
  },
}

export function currentMonthLabel(): string {
  return new Date().toLocaleString('en-US', { month: 'long' })
}

/* Next calendar month, e.g. "August" in July, "January" in December.
   Building the date from (year, month + 1, 1) handles the year rollover. */
export function nextMonthLabel(): string {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 1)
    .toLocaleString('en-US', { month: 'long' })
}

export type Option = {
  id: string
  label: string
  desc?: string
  price?: number      // one-off, AED
  monthly?: number    // recurring, AED / month
  from?: boolean      // show a "from" prefix (starting price)
}

/* ── Step 1: primary need ── */
export const primaryNeeds: Option[] = [
  { id: 'website', label: 'A website',       desc: 'A new site or redesign existing website' },
  { id: 'brand',   label: 'Brand identity',  desc: 'Logo, colours, type, guidelines' },
  { id: 'graphic', label: 'Graphic design',  desc: 'Social Media posts, print, pitch decks, documents' },
  { id: 'seo',     label: 'SEO & growth',    desc: 'Get found on Google and AI assistants' },
  { id: 'unsure',  label: 'Not sure yet',    desc: "Let's figure it out together" },
]

/* ── Step 2a: website type ── */
export const siteTypes: Option[] = [
  { id: 'one-page', label: 'One-page website',        desc: 'A single, focused page',        price: 997,  from: true },
  { id: 'business', label: 'Multi-page business site', desc: 'Around 5 to 10 pages',          price: 2497, from: true },
  { id: 'store',    label: 'Online store',            desc: 'Sell your products online',     price: 4497, from: true },
  { id: 'webapp',   label: 'Web app / custom',        desc: 'Custom features and logic',     price: 6997, from: true },
]

/* ── Step 2a-store: online store scope (only shown when siteType === 'store') ──
   Product range is informational only: the Shopify store handles any number of
   products, so it never changes the price. It just helps scope the project and
   sets the expectation early. The paid features nudge the estimate; the
   "included" list is display-only, to show what the base price already covers. */
export const storeRanges: Option[] = [
  { id: 'r25',   label: 'Up to 25 products' },
  { id: 'r100',  label: '25 to 100 products' },
  { id: 'r500',  label: '100 to 500 products' },
  { id: 'r500p', label: '500+ products' },
]

export const storeIncluded: Option[] = [
  { id: 'analytics', label: 'Analytics dashboard' },
  { id: 'manage',    label: 'You manage products & orders' },
  { id: 'payments',  label: 'Secure payments & checkout' },
  { id: 'mobile',    label: 'Mobile-optimised store' },
]

export const storeFeatures: Option[] = [
  { id: 'cart',    label: 'Abandoned-cart recovery',          desc: 'Follow up customers who did not check out', price: 297 },
  { id: 'reviews', label: 'Product reviews',                  desc: 'Automated flows to build trust with customer testimonials',         price: 397 },
  { id: 'loyalty', label: 'Loyalty & rewards',                desc: 'Points and rewards for repeat buyers',      price: 597 },
  { id: 'lang',    label: 'Multi-language (Arabic + English)', desc: 'Serve customers in both languages',        price: 397 },
  { id: 'cro',     label: 'Conversion rate optimisation',     desc: 'Tweaks that turn more visitors into buyers, e.g. a low-stock badge on product page', price: 497 },
]

/* ── Step 2b: brand identity scope ── */
export const brandScopes: Option[] = [
  { id: 'logo',   label: 'Logo only',              desc: 'A single primary logo',            price: 797,  from: true },
  { id: 'basics', label: 'Logo + essentials',      desc: 'Logo, colours and typography',     price: 1497, from: true },
  { id: 'system', label: 'Full brand system',      desc: 'The above + brand guidelines',     price: 2997, from: true },
]

/* ── Step 2c: graphic design items (multi-select) ── */
export const graphicItems: Option[] = [
  { id: 'social', label: 'Social media pack', desc: 'A set of post templates', price: 497 },
  { id: 'print',  label: 'Print (cards, flyers)', desc: 'Business cards, flyers', price: 397 },
  { id: 'deck',   label: 'Pitch deck',        desc: 'A presentation that sells', price: 697 },
  { id: 'menu',   label: 'Menu / brochure',   desc: 'Menus or brochures',        price: 497 },
]

/* ── Step 2d: SEO plan ── */
export const seoPlans: Option[] = [
  { id: 'setup',   label: 'One-time SEO setup', desc: 'Get your site ranking',      price: 797,  from: true },
  { id: 'monthly', label: 'Monthly SEO & care', desc: 'Ongoing growth every month', monthly: 397, from: true },
]

/* ── Step 3: website add-ons (multi-select) ── */
export const addons: Option[] = [
  { id: 'brand', label: 'Logo & brand kit',  desc: 'Logo, colours, fonts',     price: 1497 },
  { id: 'copy',  label: 'Copywriting',       desc: 'Words that turn visitors into clients',   price: 597 },
  { id: 'seo',   label: 'SEO setup',         desc: 'Rank on Google and AI assistants', price: 797 },
]

export const carePlan: Option = {
  id: 'care', label: 'Monthly care plan', desc: 'Updates and support', monthly: 147,
}

export const EXTRA_PAGE_PRICE = 247

/* ── Step 4: timeline (informational, no price change) ── */
export const timelines: Option[] = [
  { id: 'flexible', label: "I'm flexible",       desc: 'No particular deadline' },
  { id: 'soon',     label: 'Within 1 - 2 months', desc: 'A comfortable timeline' },
  { id: 'asap',     label: 'As soon as possible', desc: 'Priority, may add a rush fee' },
]

/* ── Homepage packages (the visible "from" tiers) ── */
export type Package = {
  id: string          // maps to ?plan= on /quote
  name: string
  price: number
  care?: number
  desc: string
  features: string[]
  popular?: boolean
  need: string        // primary need this preselects
  choice?: string     // sub-choice id (site type / brand scope / seo plan)
}

export const packages: Package[] = [
  {
    id: 'one-page', name: 'Starter', price: 997, care: 147, need: 'website', choice: 'one-page',
    desc: 'A professional one-page website.',
    features: ['Custom design', 'Mobile-first', 'Contact form', 'Basic SEO', 'Live in days, not weeks'],
  },
  {
    id: 'business', name: 'Business', price: 2497, care: 147, need: 'website', choice: 'business', popular: true,
    desc: 'A multi-page site for a growing business.',
    features: ['Up to 10 custom pages', 'Custom design', 'Contact + enquiry forms', 'Full SEO setup', 'Copywriting help'],
  },
  {
    id: 'store', name: 'Store', price: 4497, care: 147, need: 'website', choice: 'store',
    desc: 'A conversion-focused online store.',
    features: ['Built on Shopify, you manage it', 'Unlimited products', 'Product & order management', 'Secure online payments', 'Full SEO setup'],
  },
  {
    id: 'brand', name: 'Brand', price: 1497, need: 'brand', choice: 'basics',
    desc: 'A complete visual identity.',
    features: ['Logo suite', 'Colour palette', 'Typography', 'Brand guidelines', 'Ready for print & web'],
  },
]
