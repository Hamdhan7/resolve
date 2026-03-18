"use client";

import { cn } from "@/lib/utils";

function hashString(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const PALETTES = [
  { bg: "bg-blue-100", fg: "text-blue-800" },
  { bg: "bg-emerald-100", fg: "text-emerald-800" },
  { bg: "bg-amber-100", fg: "text-amber-900" },
  { bg: "bg-rose-100", fg: "text-rose-800" },
  { bg: "bg-violet-100", fg: "text-violet-800" },
  { bg: "bg-slate-200", fg: "text-slate-800" },
] as const;

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 1).toUpperCase();
  return (parts[0]!.slice(0, 1) + parts[parts.length - 1]!.slice(0, 1)).toUpperCase();
}

export default function CustomerAvatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const idx = hashString(name) % PALETTES.length;
  const palette = PALETTES[idx]!;
  const dims = size === "sm" ? "size-7 rounded-xl text-[11px]" : "size-11 rounded-2xl text-sm";

  return (
    <div
      aria-label={name}
      title={name}
      className={cn(
        "inline-flex items-center justify-center font-semibold",
        palette.bg,
        palette.fg,
        dims,
        className
      )}
    >
      {initials(name)}
    </div>
  );
}

