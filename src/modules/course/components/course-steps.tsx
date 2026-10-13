import Link from "next/link";

const steps = ["Course details", "Sections", "Subsections", "Review & publish"];

export default function CourseSteps({ current, courseId, sectionCount = 0, subsectionCount = 0, reviewReady }: { current: number; courseId?: string; sectionCount?: number; subsectionCount?: number; reviewReady?: boolean }) {
  const urls = courseId ? [
    `/teacher/courses/${courseId}/edit?returnTo=curriculum`,
    `/teacher/courses/${courseId}/curriculum?step=sections`,
    `/teacher/courses/${courseId}/curriculum?step=subsections`,
    `/teacher/courses/${courseId}/curriculum?step=review`,
  ] : [];
  return <nav aria-label="Course creation progress" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
    {steps.map((label, index) => {
      const enabled = !!courseId && (index < 2 || (index === 2 && sectionCount > 0) || (index === 3 && (reviewReady ?? (sectionCount > 0 && subsectionCount >= sectionCount))));
      const className = `flex min-h-16 items-center gap-3 rounded-xl border px-3 py-3 text-sm transition-colors ${index === current ? "border-cyan-400/60 bg-cyan-400/15 text-white" : enabled ? "border-white/15 bg-white/5 text-white/75 hover:bg-white/10" : "border-white/10 bg-white/[0.03] text-white/35"}`;
      const content = <><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${index === current ? "bg-cyan-400 text-slate-950" : "bg-white/10"}`}>{index + 1}</span><span>{label}</span></>;
      return enabled ? <Link key={label} href={urls[index]} className={className} aria-current={index === current ? "step" : undefined}>{content}</Link> : <div key={label} className={className} aria-current={index === current ? "step" : undefined}>{content}</div>;
    })}
  </nav>;
}
