import React, { useEffect } from 'react';
import { useLeadFunnelStore } from '../../store/useLeadFunnelStore';
import { useSearchParams } from 'react-router-dom';
import { Container, Home, Ship, Zap, HardHat, Tractor, Box, Truck, HelpCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const ASSET_TYPES = [
  { slug: 'trailers', label: 'Trailer', icon: Container },
  { slug: 'caravans', label: 'Caravan', icon: Home },
  { slug: 'boats', label: 'Boat / Jet Ski', icon: Ship },
  { slug: 'generators', label: 'Generator', icon: Zap },
  { slug: 'construction', label: 'Constr. Equipt.', icon: HardHat },
  { slug: 'agricultural', label: 'Agric. Equipt.', icon: Tractor },
  { slug: 'containers', label: 'Container', icon: Box },
  { slug: 'fleet', label: 'Fleet Asset', icon: Truck },
  { slug: 'other', label: 'Other', icon: HelpCircle },
];

export function Step1AssetType() {
  const [searchParams] = useSearchParams();
  const { assetTypes, toggleAssetType, setAssetTypes, customAssetDescription, setCustomDescription } = useLeadFunnelStore();

  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && assetTypes.length === 0) {
      const types = typeParam.split(',').map(t => t.trim().toLowerCase());
      const validSlugs = ASSET_TYPES.map(a => a.slug);
      const matchedTypes = types.filter(t => validSlugs.includes(t) || (t === 'jetski' && validSlugs.includes('boats')));
      
      const toSet = matchedTypes.map(t => t === 'jetski' ? 'boats' : t);
      
      if (toSet.length > 0) {
        setAssetTypes(toSet);
      }
    }
  }, [searchParams]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto py-12 px-6 relative z-10 pointer-events-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-neutral-800 mb-3 tracking-tight">What Do You Want to Track?</h2>
        <p className="text-neutral-500 font-medium text-lg">Select one or more asset types. We'll match you with the right solution.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ASSET_TYPES.map((type) => {
          const isSelected = assetTypes.includes(type.slug);
          const Icon = type.icon;
          return (
            <button
              key={type.slug}
              onClick={() => toggleAssetType(type.slug)}
              className={`relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all duration-200 outline-none hover:shadow-lg ${
                isSelected 
                  ? 'border-emerald-500 bg-emerald-50 scale-[1.02] shadow-emerald-500/10' 
                  : 'border-neutral-200 bg-white hover:border-emerald-200 hover:scale-[1.02]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100" />
                </div>
              )}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors ${isSelected ? 'bg-emerald-100' : 'bg-neutral-100 group-hover:bg-emerald-50'}`}>
                 <Icon className={`w-10 h-10 ${isSelected ? 'text-emerald-600' : 'text-neutral-500'}`} />
              </div>
              <span className={`font-bold text-lg ${isSelected ? 'text-emerald-900' : 'text-neutral-700'}`}>{type.label}</span>
            </button>
          );
        })}
      </div>

      {assetTypes.includes('other') && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-8 bg-neutral-50 p-6 rounded-xl border border-neutral-200"
        >
          <label className="block text-sm font-bold text-neutral-700 mb-2">Please specify the type of asset you want to track:</label>
          <input 
            type="text" 
            autoFocus
            value={customAssetDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            placeholder="e.g. Mobile fridge, Drone, etc."
            className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-medium text-neutral-800" 
          />
        </motion.div>
      )}
    </motion.div>
  );
}
