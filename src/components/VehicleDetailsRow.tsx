import React, { useEffect, useMemo } from 'react';
import { pricingData } from '../config/pricing';
import { VehicleDetails } from '../store/useCheckoutStore';
import { HighRiskBanner } from './HighRiskBanner';

interface VehicleDetailsRowProps {
  index: number;
  details: VehicleDetails;
  onChange: (details: Partial<VehicleDetails>) => void;
}

const COLORS = ["White", "Black", "Silver", "Grey", "Red", "Blue", "Green", "Other"];
const YEARS = Array.from({ length: 2026 - 2010 + 1 }, (_, i) => (2026 - i).toString());

export function VehicleDetailsRow({ index, details, onChange }: VehicleDetailsRowProps) {
  const brands = pricingData.vehicleBrandsAndModels.map(b => b.brand).sort();
  
  const models = useMemo(() => {
    if (!details.brand) return [];
    const brandData = pricingData.vehicleBrandsAndModels.find(b => b.brand === details.brand);
    return brandData ? [...brandData.models].sort() : [];
  }, [details.brand]);

  // Handle high-risk detection
  useEffect(() => {
    if (details.brand && details.model) {
      const combo = `${details.brand} ${details.model}`;
      const isHighRisk = pricingData.highRiskVehicles.some(hr => combo === hr);
      if (details.requiresBackupTracker !== isHighRisk) {
        onChange({ requiresBackupTracker: isHighRisk });
      }
    } else if (details.requiresBackupTracker) {
      onChange({ requiresBackupTracker: false });
    }
  }, [details.brand, details.model, details.requiresBackupTracker, onChange]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ brand: e.target.value, model: '' });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm mb-4 transition-all">
      <h4 className="font-bold text-neutral-800 mb-4">Add details for Vehicle {index + 1}</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-500 mb-1">Make / Brand</label>
          <select 
            className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all cursor-pointer"
            value={details.brand}
            onChange={handleBrandChange}
          >
            <option value="">Select Brand</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-neutral-500 mb-1">Model</label>
          <select 
            className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all disabled:opacity-50 disabled:bg-neutral-100 disabled:cursor-not-allowed cursor-pointer"
            value={details.model}
            onChange={e => onChange({ model: e.target.value })}
            disabled={!details.brand}
          >
            <option value="">Select Model</option>
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-500 mb-1">Year</label>
          <select 
            className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all cursor-pointer"
            value={details.year}
            onChange={e => onChange({ year: e.target.value })}
          >
            <option value="">Select Year</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-500 mb-1">Colour</label>
          <select 
            className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all cursor-pointer"
            value={details.colour}
            onChange={e => onChange({ colour: e.target.value })}
          >
            <option value="">Select Colour</option>
            {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      
      <HighRiskBanner show={details.requiresBackupTracker} />
    </div>
  );
}
