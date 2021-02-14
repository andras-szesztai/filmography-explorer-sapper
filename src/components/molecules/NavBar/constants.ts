import type { TLinkNames, TPathNames } from '../../../types/links'

export const LINKS: { href: TPathNames; text: TLinkNames; delay: number }[] = [
  { href: '/', text: 'Explore', delay: 0 },
  { href: '/watchlist', text: 'Watchlist', delay: 100 },
  { href: '/about', text: 'About', delay: 200 },
]
