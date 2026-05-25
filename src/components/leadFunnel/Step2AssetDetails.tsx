import React from 'react';
import { useLeadFunnelStore } from '../../store/useLeadFunnelStore';
import { motion } from 'motion/react';
import { User, Building2 } from 'lucide-react';

export function Step2AssetDetails() {
  const { assetDetails, setAssetDetail } = useLeadFunnelStore();

  const handleToggle = (field: 'hasExistingTracking' | 'requiresRecovery' | 'requiresPower', value: boolean | null) => {
    setAssetDetail(field, value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto py-12 px-6 relative z-10 pointer-events-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-neutral-800 mb-3 tracking-tight">Tell Us About Your Asset</h2>
        <p className="text-neutral-500 font-medium text-lg">A few quick questions to help us recommend the perfect tracking solution.</p>
      </div>

      <div className="space-y-10">
        {/* Quantity */}
        <div className="pb-8 border-b border-neutral-100">
          <label className="block text-lg font-bold text-neutral-800 mb-4">How many assets do you need to track?</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Just 1', '2-5', '6-10', 'More than 10'].map(qty => (
              <button
                key={qty}
                onClick={() => setAssetDetail('quantity', qty)}
                className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all outline-none ${
                   assetDetails.quantity === qty 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20' 
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200 hover:bg-neutral-50'
                }`}
              >
                {qty}
              </button>
            ))}
          </div>
        </div>

        {/* Use Type */}
        <div className="pb-8 border-b border-neutral-100">
          <label className="block text-lg font-bold text-neutral-800 mb-4">Is this for personal or business use?</label>
          <div className="grid grid-cols-2 gap-4">
            <button
               onClick={() => setAssetDetail('useType', 'Personal')}
               className={`py-8 px-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all outline-none ${
                  assetDetails.useType === 'Personal'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md shadow-emerald-500/10'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200 hover:bg-neutral-50'
               }`}
            >
              <User className={`w-10 h-10 ${assetDetails.useType === 'Personal' ? 'text-emerald-500' : 'text-neutral-400'}`} />
              <span className="font-bold text-lg">Personal Use</span>
            </button>
            <button
               onClick={() => setAssetDetail('useType', 'Business')}
               className={`py-8 px-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all outline-none ${
                  assetDetails.useType === 'Business'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md shadow-emerald-500/10'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200 hover:bg-neutral-50'
               }`}
            >
              <Building2 className={`w-10 h-10 ${assetDetails.useType === 'Business' ? 'text-emerald-500' : 'text-neutral-400'}`} />
              <span className="font-bold text-lg">Business Use</span>
            </button>
          </div>
        </div>

        {/* Value */}
        <div className="pb-8 border-b border-neutral-100">
          <h3 className="block text-lg font-bold text-neutral-800 mb-1">What is the approximate value of the asset(s)?</h3>
          <p className="text-sm text-neutral-500 mb-4 font-medium">This helps us recommend the right protection level. Your answer is confidential.</p>
          <div className="flex flex-col gap-3">
            {[
              { value: 'under-10k', label: 'Under R10,000' },
              { value: '10k-50k', label: 'R10,000 – R50,000' },
              { value: '50k-200k', label: 'R50,000 – R200,000' },
              { value: '200k-1m', label: 'R200,000 – R1,000,000' },
              { value: 'over-1m', label: 'Over R1,000,000' }
            ].map(opt => (
               <button 
                 key={opt.value} 
                 type="button"
                 onClick={() => setAssetDetail('approximateValue', opt.value)}
                 className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all text-left outline-none ${
                   assetDetails.approximateValue === opt.value 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-neutral-200 bg-white hover:border-emerald-200'
                 }`}
               >
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                   assetDetails.approximateValue === opt.value ? 'border-emerald-500' : 'border-neutral-300'
                 }`}>
                    {assetDetails.approximateValue === opt.value && <div className="w-3 h-3 rounded-full bg-emerald-500"></div>}
                 </div>
                 <span className={`font-bold ${assetDetails.approximateValue === opt.value ? 'text-emerald-900' : 'text-neutral-700'}`}>
                   {opt.label}
                 </span>
               </button>
            ))}
          </div>
        </div>

        {/* Existing Tracking */}
        <div className="pb-8 border-b border-neutral-100">
           <label className="block text-lg font-bold text-neutral-800 mb-4">Do you currently have tracking installed?</label>
           <div className="flex gap-4">
             <button
                onClick={() => handleToggle('hasExistingTracking', true)}
                className={`flex-1 py-3 px-6 rounded-xl border-2 font-bold transition-all outline-none ${
                   assetDetails.hasExistingTracking === true 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200'
                }`}
             >
                Yes
             </button>
             <button
                onClick={() => handleToggle('hasExistingTracking', false)}
                className={`flex-1 py-3 px-6 rounded-xl border-2 font-bold transition-all outline-none ${
                   assetDetails.hasExistingTracking === false 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200'
                }`}
             >
                No
             </button>
           </div>
        </div>

        {/* Recovery */}
        <div className="pb-8 border-b border-neutral-100">
           <label className="block text-lg font-bold text-neutral-800 mb-1">Do you require recovery services?</label>
           <p className="text-sm text-neutral-500 mb-4 font-medium">Recovery services include nationwide response teams to recover stolen or lost assets.</p>
           <div className="flex gap-3 max-w-lg">
             <button
                onClick={() => handleToggle('requiresRecovery', true)}
                className={`flex-1 py-3 px-2 rounded-xl border-2 font-bold text-sm transition-all outline-none ${
                   assetDetails.requiresRecovery === true 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200'
                }`}
             >
                Yes
             </button>
             <button
                onClick={() => handleToggle('requiresRecovery', false)}
                className={`flex-1 py-3 px-2 rounded-xl border-2 font-bold text-sm transition-all outline-none ${
                   assetDetails.requiresRecovery === false 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200'
                }`}
             >
                No
             </button>
             <button
                onClick={() => setAssetDetail('requiresRecovery', 'not-sure')}
                className={`flex-1 py-3 px-2 rounded-xl border-2 font-bold text-sm transition-all outline-none ${
                   assetDetails.requiresRecovery === 'not-sure'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200'
                }`}
             >
                Not sure
             </button>
           </div>
        </div>

        {/* Location */}
        <div className="pb-8 border-b border-neutral-100">
           <label className="block text-lg font-bold text-neutral-800 mb-4">Where is the asset mainly located?</label>
           <select 
             className="w-full px-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-bold text-neutral-700 bg-white appearance-none"
             value={assetDetails.mainLocation}
             onChange={(e) => setAssetDetail('mainLocation', e.target.value)}
           >
             <option value="" disabled>Select province...</option>
             <option value="Gauteng">Gauteng</option>
             <option value="Western Cape">Western Cape</option>
             <option value="KwaZulu-Natal">KwaZulu-Natal</option>
             <option value="Eastern Cape">Eastern Cape</option>
             <option value="Free State">Free State</option>
             <option value="Limpopo">Limpopo</option>
             <option value="Mpumalanga">Mpumalanga</option>
             <option value="North West">North West</option>
             <option value="Northern Cape">Northern Cape</option>
             <option value="Multiple Provinces">Multiple Provinces</option>
             <option value="Outside South Africa">Outside South Africa</option>
           </select>
        </div>

        {/* Power */}
        <div className="pb-8">
           <h3 className="block text-lg font-bold text-neutral-800 mb-1">Does the asset work with power (electrical / mains)?</h3>
           <p className="text-sm text-neutral-500 mb-4 font-medium">Battery-powered trackers work for assets without power. Wired trackers work for assets with mains.</p>
           <div className="flex flex-col gap-3">
             <button type="button" onClick={() => handleToggle('requiresPower', true)} className={`w-full text-left outline-none flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                 assetDetails.requiresPower === true 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-neutral-200 bg-white hover:border-emerald-200'
               }`}>
                 <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${assetDetails.requiresPower === true ? 'border-emerald-500' : 'border-neutral-300'}`}>
                    {assetDetails.requiresPower === true && <div className="w-3 h-3 rounded-full bg-emerald-500"></div>}
                 </div>
                 <span className={`font-bold ${assetDetails.requiresPower === true ? 'text-emerald-900' : 'text-neutral-700'}`}>Yes — connected to power</span>
             </button>
             <button type="button" onClick={() => handleToggle('requiresPower', false)} className={`w-full text-left outline-none flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                 assetDetails.requiresPower === false 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-neutral-200 bg-white hover:border-emerald-200'
               }`}>
                 <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${assetDetails.requiresPower === false ? 'border-emerald-500' : 'border-neutral-300'}`}>
                    {assetDetails.requiresPower === false && <div className="w-3 h-3 rounded-full bg-emerald-500"></div>}
                 </div>
                 <span className={`font-bold ${assetDetails.requiresPower === false ? 'text-emerald-900' : 'text-neutral-700'}`}>No — battery only</span>
             </button>
             <button type="button" onClick={() => handleToggle('requiresPower', 'n-a' as any)} className={`w-full text-left outline-none flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                 assetDetails.requiresPower === 'n-a'
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-neutral-200 bg-white hover:border-emerald-200'
               }`}>
                 <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${assetDetails.requiresPower === 'n-a' ? 'border-emerald-500' : 'border-neutral-300'}`}>
                    {assetDetails.requiresPower === 'n-a' && <div className="w-3 h-3 rounded-full bg-emerald-500"></div>}
                 </div>
                 <span className={`font-bold ${assetDetails.requiresPower === 'n-a' ? 'text-emerald-900' : 'text-neutral-700'}`}>Not applicable</span>
             </button>
           </div>
        </div>

      </div>
    </motion.div>
  );
}
