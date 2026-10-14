import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/35">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 text-xl font-extrabold tracking-tight text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600"><BookOpen className="h-5 w-5" /></span>
              <span>Learn<span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">Flow</span></span>
            </Link>
            <p className="mt-5 max-w-xs leading-7 text-white/50">Follow your curiosity, learn at your pace, and make room for what&apos;s next.</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Explore</h2>
            <ul className="mt-5 space-y-3">{exploreLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-white/50 transition hover:text-cyan-300">{link.label}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Get started</h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/50">Your next skill is waiting. Find a course and take the first step.</p>
            <Link href="/courses" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">Browse courses <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LearnFlow. All rights reserved.</p>
          <p>Keep learning. Keep moving.</p>
        </div>
      </div>
    </footer>
  );
}
