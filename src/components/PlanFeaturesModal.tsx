import React from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getFeatureByName } from '../config/features';

interface PlanFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: number;
  features: string[];
  allPlans: any[];
  onSelect: () => void;
  isSelected?: boolean;
}

export function PlanFeaturesModal({ isOpen, onClose, planName, price, features, allPlans, onSelect, isSelected }: PlanFeaturesModalProps) {
  if (!isOpen) return null;
  
  const currentIndex = allPlans.findIndex(p => p.name === planName);
  const isFirstTier = currentIndex <= 0;
  const previousPlan = isFirstTier ? null : allPlans[currentIndex - 1];
  const previousFeatures = previousPlan 
    ? new Set(previousPlan.features) 
    : new Set();
  
  const newInThisPlan = features.filter(f => !previousFeatures.has(f));
  const inheritedFeatures = features.filter(f => previousFeatures.has(f));

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/40 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg bg-white rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50 shrink-0">
              <div>
                <h3 className="font-bold text-xl text-neutral-800">{planName}</h3>
                <div className="mt-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-500">From</span>
                    <span className="text-3xl font-bold">R{price}</span>
                    <span className="text-sm text-gray-500">/mo</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Choose your billing on the next step
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-white border border-neutral-200 text-neutral-500 rounded-full hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              <div className="space-y-6">
                {!isFirstTier && (
                  <React.Fragment>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                        Inherited from {previousPlan.name}:
                      </h3>
                      <ul className="space-y-4">
                        {inheritedFeatures.map((feature, idx) => {
                          const featureData = getFeatureByName(feature);
                          return (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-neutral-100 text-neutral-400">
                                <Check size={12} strokeWidth={3} />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm text-gray-600 mb-0.5">
                                  {feature}
                                </h4>
                                {featureData?.description && (
                                  <p className="text-xs leading-relaxed text-gray-400">
                                    {featureData.description}
                                  </p>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="border-t border-gray-100"></div>
                  </React.Fragment>
                )}
                
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-3">
                    {isFirstTier ? "What's included:" : `New in ${planName}:`}
                  </h3>
                  <ul className="space-y-4">
                    {newInThisPlan.map((feature, idx) => {
                      const featureData = getFeatureByName(feature);
                      return (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-600">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-neutral-800 mb-0.5">
                              {feature}
                            </h4>
                            {featureData?.description && (
                              <p className="text-xs leading-relaxed text-neutral-500">
                                {featureData.description}
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 shrink-0">
              <button
                onClick={() => {
                  onSelect();
                  onClose();
                }}
                className={`w-full py-3 rounded-xl font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                {isSelected ? 'SELECTED' : 'Choose This Plan →'}
              </button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
