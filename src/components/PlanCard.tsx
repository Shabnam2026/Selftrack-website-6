import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { PlanFeaturesModal } from './PlanFeaturesModal';
import Tooltip from './Tooltip';
import { getFeatureByName } from '../config/features';

interface PlanCardProps {
  key?: React.Key;
  name: string;
  tagline: string;
  price: number;
  features: string[];
  allPlans: any[];
  isRecommended?: boolean;
  onSelect: () => void;
  selected?: boolean;
}

function getNewFeatures(currentPlanName: string, features: string[], allPlans: any[]) {
  const currentIndex = allPlans.findIndex(p => p.name === currentPlanName);
  
  if (currentIndex <= 0) {
    return {
      isFirstTier: true,
      previousTierName: null,
      newFeatures: features,
    };
  }
  
  const previousPlan = allPlans[currentIndex - 1];
  const previousFeatures = new Set(previousPlan.features);
  const newFeatures = features.filter(f => !previousFeatures.has(f));
  
  return {
    isFirstTier: false,
    previousTierName: previousPlan.name,
    newFeatures,
  };
}

export function PlanCard({ name, tagline, price, features, allPlans, isRecommended, onSelect, selected }: PlanCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isFirstTier, previousTierName, newFeatures } = getNewFeatures(name, features, allPlans);

  return (
    <React.Fragment>
      <motion.div
        whileHover={{ y: -4 }}
        className={`relative h-full flex flex-col p-4 md:p-5 xl:p-6 bg-white rounded-lg border-2 transition-all hover:shadow-md ${
          selected ? 'border-emerald-500 shadow-md' :
          isRecommended ? 'border-emerald-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        {isRecommended && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md whitespace-nowrap">
            Recommended
          </div>
        )}

        <div className={`mb-6 ${isRecommended ? 'pt-2' : ''}`}>
          <h3 className="font-bold text-xl text-neutral-800 mb-1">{name}</h3>
          <p className="text-neutral-500 text-sm h-5">{tagline}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-gray-500">From</span>
            <span className="text-3xl font-bold">R{price}</span>
            <span className="text-sm text-gray-500">/mo</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Final pricing on next step
          </p>
        </div>

        <div className="my-6 flex-1">
        {isFirstTier ? (
          <div className="py-2 mb-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Essentials Included
            </span>
          </div>
        ) : (
          <div className="py-2 mb-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Everything In {previousTierName} +
            </span>
          </div>
        )}
          
          <ul className="space-y-2">
            {newFeatures.map((feature, idx) => {
              const featureData = getFeatureByName(feature);
              const hasDescription = !!featureData?.description;
              return (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <Tooltip content={featureData?.description}>
                    <span 
                      className={`text-gray-700 ${
                        hasDescription ? 'cursor-help hover:text-emerald-700 transition-colors' : ''
                      }`}
                    >
                      {feature}
                    </span>
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 hover:underline mb-3 transition-colors cursor-pointer"
        >
          See more →
        </button>

        <button
          onClick={onSelect}
          className={`w-full py-3 px-3 rounded-lg font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
            selected 
              ? 'bg-emerald-500 text-white shadow-md' 
              : isRecommended
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}
        >
          {selected ? 'SELECTED' : 'Choose Plan'}
        </button>
      </motion.div>

      <PlanFeaturesModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planName={name}
        price={price}
        features={features}
        allPlans={allPlans}
        onSelect={onSelect}
        isSelected={selected}
      />
    </React.Fragment>
  );
}

