import React from 'react';
import { User, Package, Tag, CreditCard, ShoppingCart, CheckCircle, FileText } from 'lucide-react';

function PersonProgressBar({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: 'Hardware', icon: User },
    { num: 2, label: 'Subscription', icon: Package },
    { num: 3, label: 'Add-Ons', icon: Tag },
    { num: 4, label: 'Details', icon: FileText },
    { num: 5, label: 'Payment', icon: CreditCard },
    { num: 6, label: 'Review', icon: ShoppingCart },
    { num: 7, label: 'Complete', icon: CheckCircle },
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-4 hidden md:block">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex justify-between items-center relative">
          {/* Background Track */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-gray-200 -z-10" />
          
          {/* Active Track */}
          <div 
            className="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-10 transition-all duration-300"
            style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 4rem + ${currentStep === 1 ? '2rem' : '0rem'})` }}
          />

          {steps.map((step) => {
            const isActive = step.num === currentStep && currentStep !== 7;
            const isPast = step.num < currentStep || currentStep === 7;
            const Icon = step.icon;
            
            let circleOuter = "border-gray-200 bg-white";
            let circleInner = "bg-gray-100 text-gray-400";
            let labelStyle = "text-gray-400";
            
            if (isActive) {
              circleOuter = "border-emerald-500 bg-white shadow-sm shadow-emerald-100";
              circleInner = "bg-emerald-500 text-white";
              labelStyle = "text-emerald-600 font-bold";
            } else if (isPast) {
              circleOuter = "border-emerald-500 bg-emerald-50";
              circleInner = "bg-emerald-500 text-white";
              labelStyle = "text-emerald-600 font-medium";
            }

            return (
              <li key={step.num} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full border-[3px] flex items-center justify-center transition-all ${circleOuter}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${circleInner}`}>
                    {isPast ? <CheckCircle className="w-5 h-5 text-white" /> : <Icon className="w-5 h-5" />}
                  </div>
                </div>
                <div className={`mt-2 text-xs uppercase tracking-wide transition-all ${labelStyle}`}>
                  {step.label}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PersonProgressBar;
