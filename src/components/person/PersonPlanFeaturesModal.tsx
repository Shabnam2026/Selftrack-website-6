import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFeatureByName } from '../../config/features';

function PersonPlanFeaturesModal({ 
  plan, 
  allPlans,
  billingModel = 'Annual', 
  isOpen, 
  onClose, 
  onSelect 
}: { 
  plan: any,
  allPlans: any[],
  billingModel?: string, 
  isOpen: boolean, 
  onClose: () => void, 
  onSelect: () => void 
}) {
  useEffect(() => {
    // Close on Esc key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen || !plan || !allPlans) return null;
  
  const price = plan.prices[billingModel];
  const is36M = billingModel === "36M";
  
  const currentIndex = allPlans.findIndex(p => p.id === plan.id);
  const isFirstTier = currentIndex <= 0;
  const previousPlan = isFirstTier ? null : allPlans[currentIndex - 1];
  const previousFeatures = previousPlan 
    ? new Set(previousPlan.features) 
    : new Set();
  
  const newInThisPlan = plan.features.filter((f: string) => !previousFeatures.has(f));
  const inheritedFeatures = plan.features.filter((f: string) => previousFeatures.has(f));
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col pointer-events-auto">
              
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-gray-200 flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <p className="text-sm text-gray-500">{plan.tagline}</p>
                  
                  {is36M ? (
                    <div className="mt-3">
                      <div className="text-2xl font-bold text-emerald-600">R0 to start</div>
                      <div className="text-sm text-gray-600">
                        Then R{price}/mo for 35 months
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold mt-3">
                      R{price}<span className="text-sm font-normal text-gray-500">/mo</span>
                    </div>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Features list - scrollable */}
              <div className="overflow-y-auto p-6 flex-1">
                <div className="space-y-6">
                  {!isFirstTier && (
                    <React.Fragment>
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                          Inherited from {previousPlan.name}:
                        </h3>
                        <div className="space-y-4">
                          {inheritedFeatures.map((feature: string, idx: number) => {
                            const featureData = getFeatureByName(feature);
                            return (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
                                  <Check className="w-3 h-3 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-gray-600 mb-0.5">
                                    {feature}
                                  </div>
                                  {featureData?.description && (
                                    <div className="text-xs leading-relaxed text-gray-400">
                                      {featureData.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="border-t border-gray-100"></div>
                    </React.Fragment>
                  )}
                  
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-3">
                      {isFirstTier ? "What's included" : `New in ${plan.name}:`}
                    </h3>
                    
                    <div className="space-y-4">
                      {newInThisPlan.map((feature: string, idx: number) => {
                        const featureData = getFeatureByName(feature);
                        return (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-100">
                              <Check className="w-3 h-3 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-sm text-neutral-800 mb-0.5">
                                {feature}
                              </div>
                              {featureData?.description && (
                                <div className="text-xs leading-relaxed text-gray-500">
                                  {featureData.description}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer with Choose Plan button */}
              <div className="border-t border-gray-200 p-6 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    onSelect();
                    onClose();
                  }}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {is36M ? 'Get Started — R0 →' : 'Choose This Plan →'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PersonPlanFeaturesModal;
