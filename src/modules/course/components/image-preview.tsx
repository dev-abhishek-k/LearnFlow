"use client";

export default function ImagePreview({ url }: { url?: string | null }) {
  if (!url || !url.startsWith("https://")) return null;
  return <div className="mt-2 overflow-hidden rounded-lg border border-white/10 bg-black/20 p-2">
    {/* Teacher supplied image hosts are dynamic. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={url} alt="Subsection preview" className="max-h-40 max-w-full rounded object-contain" />
  </div>;
}
