import React from 'react';
import { Check, CheckCircle2 } from 'lucide-react';

export interface Plan {
  id: string;
  name: string;
  price: number;
  popular?: boolean;
  tagline?: string;
  features: string[];
}

export const VEHICLE_PLANS: Plan[] = [
  { 
    id: 'insure', 
    name: 'INSURE', 
    price: 149, 
    popular: false,
    tagline: 'Essential Recovery',
    features: ['Insurance Coverage', 'Vehicle Recovery', 'Daily Health Check', '24/7 Control Room'] 
  },
  { 
    id: 'recovery', 
    name: 'RECOVERY', 
    price: 199, 
    popular: false,
    tagline: 'Full Protection',
    features: ['Insurance Coverage', 'Vehicle Recovery', 'Realtime Tracking', 'Web & Mobile App', 'Battery Tamper Alert'] 
  },
  { 
    id: 'advanced', 
    name: 'ADVANCED', 
    price: 249, 
    popular: true,
    tagline: 'Live Tracking',
    features: ['Insurance Coverage', 'Vehicle Recovery', 'Realtime Tracking', 'Web & Mobile App', 'Emergency Notifications', 'Alerts & Geofences'] 
  },
  { 
    id: 'premium', 
    name: 'PREMIUM', 
    price: 349, 
    popular: false,
    tagline: 'Total Control',
    features: ['Insurance Coverage', 'Vehicle Recovery', 'Realtime Tracking', 'Web & Mobile App', 'Emergency Notifications', 'Reporting & Logs', 'Asset Management'] 
  },
];

interface SubscriptionCardProps {
  plan: Plan;
  isSelected?: boolean;
  onSelect?: (planId: string) => void;
  subModel?: 'monthly' | 'annual';
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ 
  plan, 
  isSelected, 
  onSelect,
  subModel = 'monthly'
}) => {
  const displayPrice = Math.round(plan.price * (subModel === 'annual' ? 0.85 : 1));

  return (
    <div 
      onClick={() => onSelect?.(plan.id)}
      className={`relative bg-white rounded-2xl flex flex-col p-6 cursor-pointer transition-all border-2 h-full ${
        isSelected 
          ? 'border-[#9ACA3C] shadow-xl ring-4 ring-[#9ACA3C]/10 scale-[1.02] z-10' 
          : 'border-transparent shadow-sm hover:shadow-md hover:border-[#9ACA3C]/30'
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-[#555759] text-white text-[10px] font-black uppercase px-3 py-1 pb-1.5 rounded-full shadow-lg z-20">
          Recommended
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-black text-xl tracking-tight text-[#555759] uppercase">{plan.name}</h4>
          {plan.tagline && <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">{plan.tagline}</p>}
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-[#9ACA3C] bg-[#9ACA3C] text-white' : 'border-surface-container-highest'}`}>
          {isSelected && <Check size={14} strokeWidth={3} />}
        </div>
      </div>
      
      <div className="mb-6 pb-6 border-b border-surface-container mt-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-[#555759]">R{displayPrice}</span>
          <span className="text-on-surface-variant text-sm font-bold">/mo</span>
        </div>
        {subModel === 'annual' && <p className="text-[10px] text-[#9ACA3C] font-black uppercase mt-1">Billed annually</p>}
      </div>

      <ul className="space-y-3 flex-grow mb-8">
        {plan.features.map(feat => (
          <li key={feat} className="flex items-start gap-3 text-xs font-bold text-[#555759]/80">
            <CheckCircle2 size={16} className="text-[#9ACA3C] shrink-0" strokeWidth={2.5} />
            {feat}
          </li>
        ))}
      </ul>

      <button 
        className={`w-full py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
          isSelected 
            ? 'bg-[#9ACA3C] text-white shadow-lg shadow-[#9ACA3C]/20' 
            : 'bg-surface-container-highest text-[#555759] hover:bg-[#9ACA3C] hover:text-white'
        }`}
      >
        {isSelected ? 'Selected' : 'Choose Plan'}
      </button>
    </div>
  );
};
