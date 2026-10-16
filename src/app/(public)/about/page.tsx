import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Heart, Layers3 } from "lucide-react";

const values = [
  { icon: Compass, title: "Curiosity first", text: "The best learning starts with a question. Explore what interests you and see where it leads." },
  { icon: Layers3, title: "Progress in steps", text: "Clear sections and lessons help make a big goal feel approachable." },
  { icon: Heart, title: "Made for real life", text: "Learning should fit around your schedule, goals, and pace." },
];

export default function AboutPage() {
  return <div className="mx-auto max-w-7xl px-6 pb-20">
    <section className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">About LearnFlow</p><h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">A space to learn, <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">grow, and keep going.</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-white/60">LearnFlow brings courses and learners together in one simple place. Discover a topic, follow a clear path, and make progress at a pace that feels right for you.</p><Link href="/courses" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 px-6 py-3.5 font-semibold text-white hover:brightness-110">Explore courses <ArrowRight className="h-4 w-4" /></Link></div><Image src="/image/classroom.jfif" alt="Students learning together in a classroom" width={804} height={680} className="w-full rounded-[32px] border border-white/15 object-cover shadow-[0_35px_100px_rgba(0,0,0,0.3)]" /></section>
    <section className="border-t border-white/10 py-20"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">What guides us</p><h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Built around the learner.</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{values.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><Icon className="h-6 w-6" /></div><h3 className="mt-7 text-xl font-semibold text-white">{title}</h3><p className="mt-3 leading-7 text-white/50">{text}</p></div>)}</div></section>
    <section className="rounded-[28px] border border-white/10 bg-gradient-to-r from-cyan-500/15 to-violet-500/15 p-9 sm:p-12"><h2 className="text-3xl font-bold text-white">Find your next step.</h2><p className="mt-3 max-w-xl text-white/60">The course that moves you forward might be one click away.</p><Link href="/courses" className="mt-7 inline-flex items-center gap-2 font-semibold text-cyan-300 hover:text-cyan-200">Browse courses <ArrowRight className="h-4 w-4" /></Link></section>
  </div>;
}
