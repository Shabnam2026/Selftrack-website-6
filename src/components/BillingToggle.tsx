import React from 'react';
import { motion } from 'motion/react';

interface BillingToggleProps {
  value: 'annual' | 'monthly' | '36M';
  onChange: (val: 'annual' | 'monthly' | '36M') => void;
}

export function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-gray-100 rounded-full p-1">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${value === 'annual' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          onClick={() => onChange('annual')}
        >
          Annual (Save 15%)
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${value === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          onClick={() => onChange('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${value === '36M' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          onClick={() => onChange('36M')}
        >
          36-Month · R0 to Start
        </button>
      </div>
    </div>
  );
}
