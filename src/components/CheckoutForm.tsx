import React from 'react';
import { CreditCard, Lock } from 'lucide-react';

export function CheckoutForm() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
           <CreditCard size={20} />
        </div>
        <h3 className="text-xl font-bold text-neutral-800">Secure Payment</h3>
      </div>
      
      <p className="text-sm text-neutral-500 mb-6">Enter your card details for the "Due Today" amount.</p>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-neutral-600">Card Number *</label>
          <input 
            type="text" 
            placeholder="0000 0000 0000 0000" 
            className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
            maxLength={19}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1.5">
             <label className="text-sm font-semibold text-neutral-600">Expiry (MM/YY) *</label>
             <input 
               type="text" 
               placeholder="MM/YY" 
               className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
               maxLength={5}
             />
           </div>
           <div className="space-y-1.5">
             <label className="text-sm font-semibold text-neutral-600">CVV *</label>
             <input 
               type="text" 
               placeholder="123" 
               className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
               maxLength={4}
             />
           </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-neutral-600">Cardholder Name *</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400 font-medium bg-neutral-50 py-3 rounded-lg border border-neutral-100">
         <Lock size={14} /> Payments are secure and encrypted
      </div>
    </div>
  );
}
