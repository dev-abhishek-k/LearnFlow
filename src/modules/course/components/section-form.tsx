"use client";

import { useState, type FormEvent } from "react";

export interface SectionFormData { title: string; description?: string }

export default function SectionForm({ initial, busy, onSave, onCancel }: { initial?: SectionFormData; busy: boolean; onSave: (data: SectionFormData) => Promise<void>; onCancel: () => void }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSave({ title: title.trim(), description: description.trim() });
  }
  return <form className="space-y-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5" onSubmit={submit}>
    <label className="block text-sm font-medium text-white/75">Section title<input className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-white outline-none focus:border-cyan-400/60" placeholder="e.g. Getting started" value={title} onChange={event => setTitle(event.target.value)} minLength={3} maxLength={50} required /></label>
    <label className="block text-sm font-medium text-white/75">Description (optional)<textarea className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-white outline-none focus:border-cyan-400/60" rows={2} value={description} onChange={event => setDescription(event.target.value)} /></label>
    <div className="flex gap-2"><button disabled={busy} className="rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-50">Save section</button><button type="button" onClick={onCancel} className="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/75 hover:bg-white/10">Cancel</button></div>
  </form>;
}
