import { MutedP, Small } from '../ui/typography'
import Links from './links.client'

export default function Footer() {
  return (
    <footer className="space-y-3 border-t-2 border-t-slate-200 p-4 shadow-lg">
      <MutedP className="text-slate-500">
        © {new Date().getFullYear()} Center for Indian Cultural Education – Bal Vihar of St. Louis
        All rights reserved.
      </MutedP>
      <Small>
        Website Creation & Hosting Services Provided by:{' '}
        <a href="https://github.com/manavm1990">@manavm1990</a>
      </Small>

      <Links />
    </footer>
  )
}
