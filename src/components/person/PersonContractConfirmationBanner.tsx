import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import usePersonCheckoutStore from '../../store/usePersonCheckoutStore';

function PersonContractConfirmationBanner() {
  const subscription = usePersonCheckoutStore(s => s.subscription);
  const addOns = usePersonCheckoutStore(s => s.addOns);
  const getMonthlyTotal = usePersonCheckoutStore(s => s.getMonthlyTotal);
  
  const [showComparison, setShowComparison] = useState(false);
  
  const totalMonthlyDebit = getMonthlyTotal();
  const totalContract = totalMonthlyDebit * 35;
  
  return (
    <div className="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-6">
      <div className="flex items-start gap-3 mb-4">
        <Shield className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            36-Month Contract Selected
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Your contract benefits:
          </p>
        </div>
      </div>
      
      <ul className="space-y-2 text-sm mb-4 ml-9">
        <li>✓ R0 to pay today</li>
        <li>✓ First month FREE — billed from month 2</li>
        <li>
          ✓ Total contract: R{totalContract.toLocaleString()}
          <span className="text-xs opacity-80 ml-1">
            (35 months × R{totalMonthlyDebit.toLocaleString()}/mo, First Month FREE)
          </span>
        </li>
        <li>✓ All hardware included</li>
      </ul>
      
      <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-700 mb-4 ml-9">
        ⓘ Subject to credit approval. We'll review your application and 
        email next steps within 1-2 business days.
      </div>
      
      <button
        type="button"
        onClick={() => setShowComparison(!showComparison)}
        className="ml-9 inline-flex items-center gap-1 text-sm text-emerald-700 hover:underline"
      >
        {showComparison ? '▲ Hide comparison' : '▼ Change payment plan'}
      </button>
      
      {showComparison && (
        <div className="mt-4 ml-9 text-sm text-gray-600">
          <p className="mb-2">Want to change to Annual or Monthly?</p>
          <button
            type="button"
            onClick={() => {
              usePersonCheckoutStore.getState().setStep(2);
            }}
            className="text-emerald-600 hover:underline"
          >
            ← Go back to Step 2
          </button>
        </div>
      )}
    </div>
  );
}

export default PersonContractConfirmationBanner;
