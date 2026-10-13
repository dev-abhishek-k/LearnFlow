"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp, CirclePlay, FileText, FolderClosed, Image as ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";
import { useCourse } from "@/modules/course/hooks/use-courses";
import { useCategories } from "@/modules/category/hooks/use-categories";
import SectionForm from "@/modules/course/components/section-form";
import SubsectionForm from "@/modules/course/components/subsection-form";
import ImagePreview from "@/modules/course/components/image-preview";
import CourseSteps from "@/modules/course/components/course-steps";
import {
  addLesson, addSection, addSubsection, editLesson, editSection, editSubsection,
  getCurriculum, removeLesson, removeSection, removeSubsection,
  type Lesson, type LessonInput, type Section, type Subsection,
} from "@/modules/course/api/curriculum-api";

const field = "w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan-400/60";
const action = "rounded-lg border border-white/15 px-3 py-2 text-sm font-medium text-white/75 hover:bg-white/10 disabled:opacity-50";

export default function CourseCurriculumBuilder() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedStep = searchParams.get("step");
  const course = useCourse(courseId);
  const categories = useCategories();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [addingSection, setAddingSection] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const reload = useCallback(async () => setSections(await getCurriculum(courseId)), [courseId]);
  useEffect(() => {
    let active = true;
    getCurriculum(courseId).then(data => { if (active) setSections(data); })
      .catch(err => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [courseId]);

  async function run(task: () => Promise<unknown>, successMessage = "Curriculum saved") {
    setBusy(true);
    setError("");
    setNotice("");
    try { await task(); await reload(); setNotice(successMessage); return true; }
    catch (err) { setError(err instanceof Error ? err.message : "Could not save curriculum"); return false; }
    finally { setBusy(false); }
  }

  const categoryName = categories.data?.find(category => category.id === course.data?.categoryId)?.name ?? "Uncategorized";
  const subsectionCount = sections.reduce((count, section) => count + section.subSections.length, 0);
  const emptySectionCount = sections.filter(section => section.subSections.length === 0).length;
  const step = requestedStep === "review" && subsectionCount && !emptySectionCount ? "review" : (requestedStep === "subsections" || requestedStep === "review") && sections.length ? "subsections" : "sections";
  const stepNumber = step === "sections" ? 1 : step === "subsections" ? 2 : 3;
  async function publish() {
    setPublishing(true);
    setError("");
    try {
      const response = await fetch(`/api/teacher/courses/${courseId}/publish`, { method: "PATCH", credentials: "include" });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.message || "Could not publish course");
      setNotice("Course published successfully");
      await course.refetch();
    } catch (err) { setError(err instanceof Error ? err.message : "Could not publish course"); }
    finally { setPublishing(false); }
  }
  return <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
    <div className="mb-6 space-y-5"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-medium text-cyan-400">Course builder</p><h1 className="mt-1 text-3xl font-bold text-white">{step === "sections" ? "Organize your sections" : step === "subsections" ? "Add learning content" : "Review your course"}</h1><p className="mt-2 text-sm text-white/55">{step === "sections" ? "Create the main chapters of your course." : step === "subsections" ? "Add subsections and optional video URLs to each chapter." : "Check the curriculum before publishing."}</p></div><Link href="/teacher/courses" className="shrink-0 text-sm text-white/70 hover:text-white">All courses</Link></div><CourseSteps current={stepNumber} courseId={courseId} sectionCount={sections.length} subsectionCount={subsectionCount} reviewReady={sections.length > 0 && emptySectionCount === 0} /></div>
    <div className="overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.06] text-white shadow-xl shadow-black/10 backdrop-blur-2xl">
      <header className="flex gap-4 p-4 sm:p-5">
        <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-900 text-xl font-bold text-cyan-300">
          {course.data?.thumbnail ? (
            // Thumbnails can come from any teacher supplied HTTPS host.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={course.data.thumbnail} alt="" className="h-full w-full object-cover" />
          ) : "LF"}
        </div>
        <div className="min-w-0 pt-2"><h1 className="text-base font-semibold sm:text-lg">{course.data?.title ?? "Course curriculum"}</h1><p className="mt-1 text-xs text-white/50">Category: {categoryName}</p><span className={`mt-2 inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${course.data?.status === "PUBLISHED" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-amber-400/30 bg-amber-400/10 text-amber-300"}`}>{course.data?.status === "PUBLISHED" ? "Published" : "Draft"}</span></div>
      </header>
      <div className="mx-4 border-t border-white/10 sm:mx-5" />
      {course.isError && <p role="alert" className="px-5 py-3 text-red-300">{course.error.message}</p>}
      {error && <p role="alert" className="px-5 py-3 text-red-300">{error}</p>}
      {notice && <p role="status" className="px-5 py-3 text-emerald-300">{notice}</p>}
      <div className="space-y-3 px-3 py-5 sm:px-5">
        {loading ? <p className="px-2 py-5 text-sm text-white/50">Loading curriculum...</p> : sections.length ? sections.map((section, index) => <SectionCard key={section.id} section={section} index={index} courseId={courseId} busy={busy} run={run} stage={step} />) : <p className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-8 text-center text-sm text-white/55">No sections yet. Add your first section to get started.</p>}
        {step === "sections" && (addingSection ? <SectionForm busy={busy} onCancel={() => setAddingSection(false)} onSave={async data => { if (await run(() => addSection(courseId, data), "Section created")) setAddingSection(false); }} /> : <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-cyan-400/40 bg-cyan-400/5 px-4 py-2.5 text-sm font-medium text-cyan-300 hover:bg-cyan-400/10" onClick={() => setAddingSection(true)}><Plus className="h-4 w-4" />Add section</button>)}
      </div>
    </div>
    {step === "subsections" && emptySectionCount > 0 && <p className="mt-4 text-sm text-amber-200">Add a subsection to {emptySectionCount === 1 ? "the remaining section" : `all ${emptySectionCount} remaining sections`} before review.</p>}
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><Link href={step === "sections" ? `/teacher/courses/${courseId}/edit?returnTo=curriculum` : `/teacher/courses/${courseId}/curriculum?step=${step === "review" ? "subsections" : "sections"}`} className="rounded-lg border border-white/20 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10">Back</Link><div className="flex items-center gap-3"><Link href="/teacher/courses" className="text-sm text-white/60 hover:text-white">Save draft</Link>{step === "sections" ? <button disabled={!sections.length || busy} onClick={() => router.push(`/teacher/courses/${courseId}/curriculum?step=subsections`)} className="rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">Continue to subsections</button> : step === "subsections" ? <button disabled={!subsectionCount || busy || emptySectionCount > 0} onClick={() => router.push(`/teacher/courses/${courseId}/curriculum?step=review`)} className="rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">Review course</button> : <button disabled={publishing || busy || emptySectionCount > 0 || course.data?.status === "PUBLISHED"} onClick={() => void publish()} className="rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">{publishing ? "Publishing..." : course.data?.status === "PUBLISHED" ? "Published" : "Publish course"}</button>}</div></div>
  </main>;
}

export function SectionCard({ section, index, courseId, busy, run, stage = "subsections" }: { section: Section; index: number; courseId: string; busy: boolean; run: (task: () => Promise<unknown>) => Promise<boolean>; stage?: "sections" | "subsections" | "review" }) {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [addingSubsection, setAddingSubsection] = useState(false);
  return <section className="rounded-xl border border-white/10 bg-black/15">
    <div className="flex items-center gap-2 px-4 py-4"><button className="flex flex-1 items-center justify-between gap-3 text-left font-semibold text-white" onClick={() => setOpen(!open)}><span>Section {index + 1}: {section.title}</span>{open ? <ChevronUp className="h-4 w-4 text-white/50" /> : <ChevronDown className="h-4 w-4 text-white/50" />}</button>{stage !== "review" && <><button aria-label={`Edit ${section.title}`} onClick={() => { setEditing(!editing); setOpen(true); }} className="text-white/45 hover:text-cyan-300"><Pencil className="h-4 w-4" /></button><button aria-label={`Delete ${section.title}`} disabled={busy} onClick={() => { if (window.confirm("Delete this section and all its subsections and lessons?")) void run(() => removeSection(courseId, section.id)); }} className="text-white/45 hover:text-red-300"><Trash2 className="h-4 w-4" /></button></>}</div>
    {open && <div className="space-y-1 pb-3 pl-3 sm:pl-5">
      {editing && <SectionForm initial={{ title: section.title, description: section.description ?? "" }} busy={busy} onCancel={() => setEditing(false)} onSave={async data => { if (await run(() => editSection(courseId, section.id, data))) setEditing(false); }} />}
      {stage !== "sections" && section.subSections.map((subsection, subIndex) => <SubsectionCard key={subsection.id} subsection={subsection} index={subIndex} courseId={courseId} sectionId={section.id} busy={busy} run={run} readOnly={stage === "review"} />)}
      {stage === "subsections" && (addingSubsection ? <SubsectionForm busy={busy} onCancel={() => setAddingSubsection(false)} onSave={async data => { if (await run(() => addSubsection(courseId, section.id, data))) setAddingSubsection(false); }} /> : <button className="mt-2 inline-flex items-center gap-1 px-3 py-2 text-sm text-cyan-300 hover:text-cyan-200" onClick={() => setAddingSubsection(true)}><Plus className="h-4 w-4" />Add subsection</button>)}
    </div>}
  </section>;
}

export function SubsectionCard({ subsection, index, courseId, sectionId, busy, run, readOnly = false }: { subsection: Subsection; index: number; courseId: string; sectionId: string; busy: boolean; run: (task: () => Promise<unknown>) => Promise<boolean>; readOnly?: boolean }) {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [addingLesson, setAddingLesson] = useState(false);
  return <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3">
    <div className="flex items-center gap-2 py-3"><button className="flex flex-1 items-center gap-2 text-left text-sm font-semibold text-white/90" onClick={() => setOpen(!open)}><FolderClosed className="h-4 w-4 text-cyan-300/70" />Subsection {index + 1}: {subsection.title}{open ? <ChevronUp className="ml-auto h-4 w-4 text-white/45" /> : <ChevronDown className="ml-auto h-4 w-4 text-white/45" />}</button>{!readOnly && <><button aria-label={`Edit ${subsection.title}`} onClick={() => { setEditing(!editing); setOpen(true); }} className="text-white/45 hover:text-cyan-300"><Pencil className="h-3.5 w-3.5" /></button><button aria-label={`Delete ${subsection.title}`} disabled={busy} onClick={() => { if (window.confirm("Delete this subsection and its lessons?")) void run(() => removeSubsection(courseId, sectionId, subsection.id)); }} className="text-white/45 hover:text-red-300"><Trash2 className="h-3.5 w-3.5" /></button></>}</div>
    {open && <div className="space-y-1 pb-3 pl-3 sm:pl-6">
      {editing && <SubsectionForm initial={{ title: subsection.title, description: subsection.description, videoUrl: subsection.videoUrl, imageUrl: subsection.imageUrl, content: subsection.content }} busy={busy} onCancel={() => setEditing(false)} onSave={async data => { if (await run(() => editSubsection(courseId, sectionId, subsection.id, data))) setEditing(false); }} />}
      {subsection.description && <p className="text-xs text-white/60">{subsection.description}</p>}
      {subsection.videoUrl && <a href={subsection.videoUrl} target="_blank" rel="noopener noreferrer" className="block break-all text-xs text-cyan-300 hover:underline">Video: {subsection.videoUrl}</a>}
      <ImagePreview url={subsection.imageUrl} />
      {subsection.content && <p className="whitespace-pre-wrap text-xs text-white/75">{subsection.content}</p>}
      {subsection.lessons.map(lesson => <LessonRow key={lesson.id} lesson={lesson} courseId={courseId} sectionId={sectionId} subsectionId={subsection.id} busy={busy} run={run} readOnly={readOnly} />)}
      {!readOnly && (addingLesson ? <LessonForm busy={busy} onCancel={() => setAddingLesson(false)} onSave={async data => { if (await run(() => addLesson(courseId, sectionId, subsection.id, { ...data, position: Math.max(0, ...subsection.lessons.map(item => item.position)) + 1 }))) setAddingLesson(false); }} /> : <button className="inline-flex items-center gap-1 px-3 py-2 text-xs text-cyan-300 hover:text-cyan-200" onClick={() => setAddingLesson(true)}><Plus className="h-3.5 w-3.5" />Add lesson</button>)}
    </div>}
  </div>;
}

function LessonRow({ lesson, courseId, sectionId, subsectionId, busy, run, readOnly }: { lesson: Lesson; courseId: string; sectionId: string; subsectionId: string; busy: boolean; run: (task: () => Promise<unknown>) => Promise<boolean>; readOnly: boolean }) {
  const [editing, setEditing] = useState(false);
  const Icon = lesson.videoUrl ? CirclePlay : lesson.imageUrl ? ImageIcon : FileText;
  return <div className="rounded-lg"><div className="flex items-center gap-2 py-2 text-sm"><Icon className="h-4 w-4 shrink-0 text-white/45" /><span className="flex-1 text-white/85">{lesson.title}<span className="text-white/45"> — {lesson.videoUrl ? "Video URL" : lesson.imageUrl ? "Image + Text" : "Text"}</span></span>{!readOnly && <><button aria-label={`Edit lesson ${lesson.title}`} onClick={() => setEditing(!editing)} className="text-white/45 hover:text-cyan-300"><Pencil className="h-3.5 w-3.5" /></button><button aria-label={`Delete lesson ${lesson.title}`} disabled={busy} onClick={() => { if (window.confirm("Delete this lesson?")) void run(() => removeLesson(courseId, sectionId, subsectionId, lesson.id)); }} className="text-white/45 hover:text-red-300"><Trash2 className="h-3.5 w-3.5" /></button></>}</div>
    {editing && <LessonForm initial={lesson} busy={busy} onCancel={() => setEditing(false)} onSave={async data => { if (await run(() => editLesson(courseId, sectionId, subsectionId, lesson.id, data))) setEditing(false); }} />}
  </div>;
}

function LessonForm({ initial, busy, onSave, onCancel }: { initial?: Lesson; busy: boolean; onSave: (data: Omit<LessonInput, "position">) => Promise<void>; onCancel: () => void }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [isPreview, setIsPreview] = useState(initial?.isPreview ?? false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!videoUrl.trim() && !imageUrl.trim() && !content.trim()) return;
    void onSave({ title: title.trim(), videoUrl: videoUrl.trim() || undefined, imageUrl: imageUrl.trim() || undefined, content: content.trim() || undefined, isPreview });
  }
  return <form className="space-y-3 rounded-xl border border-white/10 bg-white/[0.04] p-4" onSubmit={submit}>
    <input aria-label="Lesson title" className={field} placeholder="Lesson title" value={title} onChange={event => setTitle(event.target.value)} minLength={3} maxLength={150} required />
    <input aria-label="Video URL" className={field} type="url" placeholder="HTTPS video URL (YouTube, Vimeo, or direct video)" value={videoUrl} onChange={event => setVideoUrl(event.target.value)} />
    <input aria-label="Image URL" className={field} type="url" placeholder="HTTPS image URL" value={imageUrl} onChange={event => setImageUrl(event.target.value)} />
    <textarea aria-label="Lesson text" className={field} placeholder="Lesson text (plain text)" rows={3} value={content} onChange={event => setContent(event.target.value)} />
    <label className="flex items-center gap-2 text-xs text-white/65"><input type="checkbox" checked={isPreview} onChange={event => setIsPreview(event.target.checked)} />Free preview</label>
    <div className="flex gap-2"><button className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50" disabled={busy}>Save lesson</button><button type="button" className={action} onClick={onCancel}>Cancel</button></div>
  </form>;
}
