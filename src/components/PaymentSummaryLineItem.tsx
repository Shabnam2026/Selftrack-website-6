import React from 'react';

interface Props {
  key?: React.Key;
  label: React.ReactNode;
  price?: number;
  onEdit?: () => void;
  subtext?: React.ReactNode;
}

export function PaymentSummaryLineItem({ label, price, onEdit, subtext }: Props) {
  return (
    <div className="flex justify-between items-start py-2.5 text-sm group">
      <div className="flex items-start gap-3 flex-1">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0 mt-2"></div>
        <div className="flex flex-col flex-1">
          <span className="text-neutral-700 leading-tight">
            {label}
            {onEdit && (
              <button 
                onClick={onEdit} 
                className="ml-3 text-xs font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity underline focus:opacity-100 cursor-pointer"
              >
                Edit
              </button>
            )}
          </span>
          {subtext && (
            <div className="mt-1 text-xs text-emerald-700/80 font-medium whitespace-pre-wrap leading-relaxed">
              {subtext}
            </div>
          )}
        </div>
      </div>
      {price !== undefined && (
        <span className="font-semibold text-neutral-800 shrink-0 pl-4 whitespace-nowrap">R{(price).toLocaleString()}</span>
      )}
    </div>
  );
}
