import React from 'react';
import { useLeadFunnelStore } from '../../store/useLeadFunnelStore';
import { motion } from 'motion/react';

export function FunnelProgressIndicator() {
  const { currentStep } = useLeadFunnelStore();

  return (
    <div className="w-full bg-white border-b border-neutral-100 py-6 px-4">
      <div className="max-w-xl mx-auto">
        <div className="relative flex items-center justify-between mb-2">
          {/* Connecting line background */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-neutral-200 -z-10"></div>
          
          {/* Connecting line active */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-emerald-500 transition-all duration-500 -z-10"
            style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
          ></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center justify-center relative bg-white px-2">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
               currentStep > 1 
                ? 'bg-emerald-500 text-white' 
                : currentStep === 1 
                  ? 'border-2 border-emerald-500 text-emerald-600 bg-white' 
                  : 'border-2 border-neutral-300 text-neutral-400 bg-white'
             }`}>
                {currentStep > 1 ? <span className="text-sm font-bold">✓</span> : <span className="text-sm font-bold">1</span>}
             </div>
             <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2 absolute top-full whitespace-nowrap ${currentStep >= 1 ? 'text-emerald-700' : 'text-neutral-400'}`}>Asset</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center justify-center relative bg-white px-2">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
               currentStep > 2 
                ? 'bg-emerald-500 text-white' 
                : currentStep === 2 
                  ? 'border-2 border-emerald-500 text-emerald-600 bg-white' 
                  : 'border-2 border-neutral-300 text-neutral-400 bg-white'
             }`}>
                {currentStep > 2 ? <span className="text-sm font-bold">✓</span> : <span className="text-sm font-bold">2</span>}
             </div>
             <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2 absolute top-full whitespace-nowrap ${currentStep >= 2 ? 'text-emerald-700' : 'text-neutral-400'}`}>Details</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center justify-center relative bg-white px-2">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
               currentStep > 3 
                ? 'bg-emerald-500 text-white' 
                : currentStep === 3 
                  ? 'border-2 border-emerald-500 text-emerald-600 bg-white' 
                  : 'border-2 border-neutral-300 text-neutral-400 bg-white'
             }`}>
                {currentStep > 3 ? <span className="text-sm font-bold">✓</span> : <span className="text-sm font-bold">3</span>}
             </div>
             <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2 absolute top-full whitespace-nowrap ${currentStep >= 3 ? 'text-emerald-700' : 'text-neutral-400'}`}>Contact</span>
          </div>
        </div>
        <div className="text-center mt-8">
            <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">Step {currentStep} of 3</span>
        </div>
      </div>
    </div>
  );
}
