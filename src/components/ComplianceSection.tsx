import React from 'react';
import { useCheckoutStore } from '../store/useCheckoutStore';
import { FileCheck } from 'lucide-react';

export function ComplianceSection() {
  const compliance = useCheckoutStore(s => s.compliance);
  const setCompliance = useCheckoutStore(s => s.setCompliance);
  
  return (
    <div className="border border-neutral-200 bg-white rounded-lg p-6 mt-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <FileCheck className="w-5 h-5 text-emerald-600" />
        <h3 className="font-semibold text-lg">Compliance & Agreements</h3>
      </div>
      
      <div className="space-y-3">
        {/* Checkbox 1: Accuracy confirmation */}
        <label className="flex items-start gap-3 cursor-pointer hover:bg-neutral-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
          <input
            type="checkbox"
            checked={compliance?.acknowledgeAccuracy || false}
            onChange={(e) => setCompliance('acknowledgeAccuracy', e.target.checked)}
            className="w-5 h-5 mt-0.5 rounded border-neutral-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-neutral-700 leading-relaxed">
            I confirm the information provided is accurate
          </span>
        </label>
        
        {/* Checkbox 2: Terms & Privacy with hyperlinks */}
        <label className="flex items-start gap-3 cursor-pointer hover:bg-neutral-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
          <input
            type="checkbox"
            checked={compliance?.agreeTerms || false}
            onChange={(e) => setCompliance('agreeTerms', e.target.checked)}
            className="w-5 h-5 mt-0.5 rounded border-neutral-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-neutral-700 leading-relaxed">
            I agree to the{' '}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-emerald-600 hover:text-emerald-700 underline font-medium"
            >
              Terms & Conditions
            </a>
            {' '}and{' '}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-emerald-600 hover:text-emerald-700 underline font-medium"
            >
              Privacy Policy
            </a>
          </span>
        </label>
      </div>
    </div>
  );
}
