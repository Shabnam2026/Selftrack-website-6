import React from 'react';
import { AlertTriangle, FileText } from 'lucide-react';
import { Subscription } from '../store/useCheckoutStore';

interface Props {
  contractLines: { label: string; sub: Subscription }[];
  totalMonthlyDebit?: number;
}

export function ApplicationRequiredCard({ contractLines, totalMonthlyDebit = 0 }: Props) {
  if (contractLines.length === 0) return null;

  const FIRST_MONTH_FREE = true;
  const billableMonths = FIRST_MONTH_FREE ? 35 : 36;
  const totalContract = totalMonthlyDebit * billableMonths;
  const totalSavings = totalMonthlyDebit; // one month

  return (
    <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 shadow-sm overflow-hidden mb-8">
      <div className="bg-amber-100/50 border-b border-amber-200 p-4 flex items-center gap-3 text-amber-900">
        <AlertTriangle size={22} className="text-amber-600 shrink-0" />
        <h3 className="font-bold text-lg leading-tight tracking-wide uppercase">📋 APPLICATION REQUIRED</h3>
      </div>
      <div className="p-6 text-sm text-neutral-700">
        <p className="mb-4 text-base font-medium text-amber-900 border-b border-amber-200/50 pb-4">
          You have items on your order on a 36-Month Contract:
        </p>
        
        <div className="bg-[#9ACA3C]/15 border border-[#9ACA3C]/30 p-4 rounded-xl mb-6">
          <p className="font-bold text-[#4a6b10] mb-2 text-base">Your contract benefits:</p>
          <ul className="space-y-1.5 text-[#5e851c] font-medium">
            <li className="flex items-center gap-2">✓ First month FREE (saves R{totalSavings.toLocaleString()})</li>
            <li className="flex items-center gap-2">✓ R0 today</li>
            <li className="flex items-center gap-2">✓ Hardware included</li>
            <li className="flex items-center gap-2">
              ✓ Total contract: R{totalContract.toLocaleString()}
              <span className="text-sm opacity-80 ml-1">
                ({billableMonths} months × R{totalMonthlyDebit.toLocaleString()}/mo, First Month FREE)
              </span>
            </li>
          </ul>
        </div>

        <p className="mb-4 text-base font-medium">
          You'll need to complete an application form and provide the following documents:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-1.5 font-medium text-neutral-600">
          <li>ID / Passport</li>
          <li>Physical Address</li>
          <li>Bank Account Details</li>
          <li>Vehicle Registration Documentation</li>
          <li>Debit Order Form</li>
        </ul>
        <div className="bg-white p-4 rounded-xl border border-amber-200 text-amber-900 font-medium text-sm mb-4">
          We'll review your application and email you a payment link for this portion after approval. The rest of your order will process normally today.
        </div>
        
        <p className="text-[10px] text-neutral-500 font-medium italic mt-2 leading-relaxed">
           *36-Month Contract: R0 today. Monthly fee billed from month 2 for 35 months. Total contract value: R{totalContract.toLocaleString()}. Subject to credit approval and signed agreement. Early termination fees apply.
        </p>
      </div>
    </div>
  );
}
