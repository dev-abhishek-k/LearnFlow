"use client";

export default function VideoUrlInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="block text-sm font-medium text-white/75">Video URL (optional)<input type="url" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-white outline-none placeholder:text-white/25 focus:border-cyan-400/60" placeholder="https://www.youtube.com/watch?v=..." value={value} onChange={event => onChange(event.target.value)} /></label>;
}
