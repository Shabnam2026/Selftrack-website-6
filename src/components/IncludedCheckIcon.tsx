import React from 'react';
import { Check } from 'lucide-react';

/**
 * Compact green checkmark used in tight table cells to indicate
 * "Included" on 36-Month plan. Replaces the chunkier INCLUDED pill
 * badge used elsewhere (e.g. Step 5 Pay Upfront) which is too wide
 * for narrow table columns.
 *
 * Includes aria-label for screen readers and a native tooltip via
 * the title attribute for hover discoverability on desktop.
 */
export default function IncludedCheckIcon({ label = 'Included' }: { label?: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 mx-auto sm:mx-0 shrink-0"
    >
      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
    </span>
  );
}
