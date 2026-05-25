import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCheckoutStore } from './store/useCheckoutStore';
import { Car, CreditCard, CheckCircle, PackageSearch, PackagePlus, ShoppingCart, ChevronLeft, ChevronRight, X, AlertCircle, User } from 'lucide-react';
import { CartSidebar } from './components/CartSidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { validateAllFields, FIELD_LABELS } from './utils/formValidation';

const stepsConfig = [
  { id: 1, title: 'Hardware', icon: Car },
  { id: 2, title: 'Subscription', icon: PackageSearch },
  { id: 3, title: 'Add-Ons', icon: PackagePlus },
  { id: 4, title: 'Details', icon: User },
  { id: 5, title: 'Payment', icon: CreditCard },
  { id: 6, title: 'Review', icon: ShoppingCart },
  { id: 7, title: 'Complete', icon: CheckCircle },
];

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4ContactDetails from './Step4ContactDetails';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import ErrorBoundary from './components/ErrorBoundary';

export default function CheckoutWizard() {
  const { currentStep, setStep, nextStep, prevStep, hardware, subscriptions } = useCheckoutStore();
  const customer = useCheckoutStore(s => s.customer);
  const compliance = useCheckoutStore(s => s.compliance);
  const billingSet = useCheckoutStore(s => s.isBillingSet());
  
  const [showValidationBanner, setShowValidationBanner] = useState(false);

  const CurrentStepComponent = [Step1, Step2, Step3, Step4ContactDetails, Step4, Step5, Step6][currentStep - 1] || Step1;

  // Validation for Step 4
  const formValidation = useMemo(() => validateAllFields(customer), [customer]);
  const complianceValid = compliance?.acknowledgeAccuracy && compliance?.agreeTerms;
  const isStep4Valid = formValidation.valid && complianceValid;
  const isStep5Valid = billingSet;

  // Compile list of issues for banner/tooltip
  const issueList = useMemo(() => {
    const issues: string[] = [];
    if (currentStep !== 4 && currentStep !== 5) return issues;
    
    if (currentStep === 5 && !billingSet) {
      issues.push("Select a billing option (Annual, Monthly, or 36M)");
    }
    
    if (currentStep === 4) {
      Object.entries(formValidation.errors).forEach(([fieldKey, errorMsg]) => {
        const label = FIELD_LABELS[fieldKey] || fieldKey;
        issues.push(`${label}: ${errorMsg}`);
      });
      
      if (!compliance?.acknowledgeAccuracy) {
        issues.push("Confirm information accuracy");
      }
      if (!compliance?.agreeTerms) {
        issues.push("Agree to Terms & Privacy Policy");
      }
    }
    
    return issues;
  }, [currentStep, billingSet, formValidation, compliance]);

  const isCurrentStepValid = () => {
    if (currentStep === 1) {
      const hasDevice = hardware.vehicle.quantity > 0 || hardware.motorbike.quantity > 0 || hardware.person.quantity > 0;
      const allVehiclesValid = hardware.vehicle.details.every(v => v.brand && v.model && v.year && v.colour);
      return hasDevice && allVehiclesValid;
    }
    if (currentStep === 2) {
      const totalDevices = hardware.vehicle.quantity + hardware.motorbike.quantity + hardware.person.quantity;
      return subscriptions.length === totalDevices;
    }
    if (currentStep === 3) {
      return true;
    }
    if (currentStep === 4) {
      return isStep4Valid;
    }
    if (currentStep === 5) {
      return isStep5Valid;
    }
    return true;
  };

  const canContinue = currentStep < 7 && isCurrentStepValid();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex flex-col">
      <Navbar />

      {/* Progress Bar Area */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-neutral-100 z-0 hidden sm:block rounded-full"></div>
            {stepsConfig.map((step) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div 
                  key={step.id} 
                  className={`relative z-10 flex flex-col items-center flex-1 sm:flex-none ${isCompleted ? 'cursor-pointer hover:opacity-80' : ''} ${!isCurrent && !isCompleted ? 'hidden sm:flex' : 'flex'}`}
                  onClick={() => { if (isCompleted) setStep(step.id); }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                    isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 
                    isCurrent ? 'bg-white border-emerald-500 text-emerald-600' : 
                    'bg-white border-neutral-200 text-neutral-400'
                  }`}>
                    <Icon size={18} strokeWidth={isCurrent || isCompleted ? 2.5 : 2} />
                  </div>
                  <span className={`text-xs font-semibold mt-2 sm:block whitespace-nowrap ${
                    isCurrent ? 'text-emerald-700 block' : 
                    isCompleted ? 'text-neutral-700 hidden' : 'text-neutral-400 hidden'
                  }`}>
                    {step.title}
                  </span>
                  {isCurrent && <span className="sm:hidden text-[10px] text-neutral-400 font-medium">Step {step.id} of 7</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Step Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="flex-1 flex flex-col min-h-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorBoundary>
                <CurrentStepComponent />
              </ErrorBoundary>
            </motion.div>
          </AnimatePresence>
        </div>

        <CartSidebar />
      </div>

      {/* Footer Nav Controls */}
      {currentStep !== 3 && currentStep !== 6 && currentStep !== 7 && currentStep !== 100 && (
        <div className="bg-white border-t border-neutral-200 mt-auto sticky bottom-0 z-30 pb-safe shadow-md">
          
          {/* Validation Summary Banner — shows when user tries to continue invalid in Step 4 or 5 */}
          {showValidationBanner && (currentStep === 4 || currentStep === 5) && !isCurrentStepValid() && issueList.length > 0 && (
            <div className="max-w-3xl mx-auto mt-4 px-4">
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-900 mb-2">
                       Please fix the following before continuing:
                    </h4>
                    <ul className="space-y-1 text-sm text-red-800 list-disc list-inside">
                      {issueList.map((issue, idx) => (
                        <li key={idx} className="text-red-700">
                          <span className="font-medium">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => setShowValidationBanner(false)}
                    className="text-red-600 hover:text-red-800 font-bold px-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => {
                if (currentStep === 2 && useCheckoutStore.getState().currentDeviceIdx > 0) {
                  useCheckoutStore.getState().setCurrentDeviceIdx(useCheckoutStore.getState().currentDeviceIdx - 1);
                } else {
                  prevStep();
                }
              }}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg font-medium transition-colors cursor-pointer ${
                currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            {currentStep === 2 ? (
              <span className="text-sm text-gray-500 italic hidden sm:block">
                Choose a plan above to continue →
              </span>
            ) : (
              <div className="relative group">
                <button
                  onClick={() => {
                    const stepValid = isCurrentStepValid();
                    if ((currentStep === 4 || currentStep === 5) && !stepValid) {
                      setShowValidationBanner(true);
                      if (currentStep === 4) {
                        // Dispatch the event to highlight all form fields
                        window.dispatchEvent(new CustomEvent('checkout-validation-failed'));
                        // Scroll to first error field
                        const firstErrorField = Object.keys(formValidation.errors)[0];
                        if (firstErrorField) {
                          const el = document.getElementsByName(firstErrorField)[0];
                          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }
                    } else {
                      if (currentStep === 4 || currentStep === 5) setShowValidationBanner(false);
                      nextStep();
                    }
                  }}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium shadow-md transition-all cursor-pointer ${
                    ((currentStep === 4 || currentStep === 5) && !isCurrentStepValid())
                      ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed hover:bg-neutral-200 shadow-none'
                      : (!canContinue ? 'bg-neutral-200 text-neutral-400 shadow-none cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg')
                  }`}
                >
                  Continue <ChevronRight size={20} />
                </button>

                {/* Tooltip shown on hover when disabled */}
                {(currentStep === 4 || currentStep === 5) && !isCurrentStepValid() && (
                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block 
                                  w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-30">
                    {issueList.length === 1 ? (
                      <p>{issueList[0]}</p>
                    ) : (
                      <p>
                        <strong>{issueList.length} items need attention</strong>
                        <br />
                        <span className="opacity-75">Click Continue to see details</span>
                      </p>
                    )}
                    <div className="absolute top-full right-4 border-4 border-transparent 
                                    border-t-gray-900"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
