"use client";

import { memo } from "react";

export const BackgroundBlobs = memo(function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* Indigo Blob */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]" />
      {/* Slate Blob */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-slate-500/10 rounded-full blur-[120px]" />
    </div>
  );
});