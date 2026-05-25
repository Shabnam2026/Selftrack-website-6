import React from 'react';

interface SubtotalChipProps {
  label: string;
  value: number;
}

export function SubtotalChip({ label, value }: SubtotalChipProps) {
  return (
    <div className="flex items-center gap-3 bg-white px-4 py-2 border border-neutral-100 rounded-full shadow-sm">
      <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
        {label}
      </span>
      <span className="font-bold text-emerald-600 tracking-tight leading-none text-base">
        R{value}
      </span>
    </div>
  );
}
