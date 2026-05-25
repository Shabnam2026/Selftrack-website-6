import React, { useState } from 'react';
import { Check } from 'lucide-react';
import usePersonCheckoutStore from '../../store/usePersonCheckoutStore';
import { PERSON_PLANS } from '../../config/personPricing';
import PersonPlanFeaturesModal from './PersonPlanFeaturesModal';
import Tooltip from '../Tooltip';
import { getFeatureByName } from '../../config/features';

function PersonStep2Subscription() {
  const [modalPlan, setModalPlan] = useState(null);
  
  const setSubscription = usePersonCheckoutStore(s => s.setSubscription);
  const nextStep = usePersonCheckoutStore(s => s.nextStep);
  
  const handleSelectPlan = (plan: any) => {
    const defaultPrice = plan.prices.Annual;
    setSubscription({
      plan: plan.id,
      billingModel: "Annual",
      price: defaultPrice,
    });
    console.log("[PersonStep2] Plan selected (billing TBD on Step 4):", {
      plan: plan.id,
    });
    nextStep();
  };
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-gray-600">
            Pick a tracking plan tailored to your needs.
          </p>
        </div>
        
        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PERSON_PLANS.map(plan => (
            <PersonPlanCard
              key={plan.id}
              plan={plan}
              allPlans={PERSON_PLANS}
              onSelect={() => handleSelectPlan(plan)}
              onSeeMore={() => setModalPlan(plan as any)}
            />
          ))}
        </div>
      </div>
      
      <PersonPlanFeaturesModal
        plan={modalPlan}
        allPlans={PERSON_PLANS}
        isOpen={modalPlan !== null}
        onClose={() => setModalPlan(null)}
        onSelect={() => modalPlan && handleSelectPlan(modalPlan)}
      />
    </>
  );
}

function getNewFeatures(currentPlan: any, allPlans: any[]) {
  const currentIndex = allPlans.findIndex(p => p.id === currentPlan.id);
  
  if (currentIndex <= 0) {
    return {
      isFirstTier: true,
      previousTierName: null,
      newFeatures: currentPlan.features,
    };
  }
  
  const previousPlan = allPlans[currentIndex - 1];
  const previousFeatures = new Set(previousPlan.features);
  const newFeatures = currentPlan.features.filter((f: string) => !previousFeatures.has(f));
  
  return {
    isFirstTier: false,
    previousTierName: previousPlan.name,
    newFeatures,
  };
}

const PersonPlanCard: React.FC<{ plan: any, allPlans: any[], onSelect: () => void, onSeeMore: () => void }> = ({ plan, allPlans, onSelect, onSeeMore }) => {
  const { isFirstTier, previousTierName, newFeatures } = getNewFeatures(plan, allPlans);

  return (
    <div className={`relative border-2 rounded-lg p-6 transition-all flex flex-col
      ${plan.recommended 
        ? 'border-emerald-500 shadow-lg' 
        : 'border-gray-200 hover:border-gray-300'}`}>
      
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
          Recommended
        </div>
      )}
      
      <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
      <p className="text-sm text-gray-500 mb-6">{plan.tagline}</p>
      
      {/* Price display */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-gray-500">From</span>
          <span className="text-3xl font-bold">R{plan.prices.Annual}</span>
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
          {newFeatures.map((feature: string, idx: number) => {
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
      
      {/* See more link */}
      <button
        type="button"
        onClick={onSeeMore}
        className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 hover:underline mb-3 transition-colors cursor-pointer"
      >
        See more →
      </button>

      <button
        type="button"
        onClick={onSelect}
        className={`w-full py-3 mt-auto rounded-lg font-semibold transition-colors cursor-pointer
          ${plan.recommended
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
      >
        Choose Plan
      </button>
    </div>
  );
}

export default PersonStep2Subscription;
