import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import usePersonCheckoutStore from '../../store/usePersonCheckoutStore';
import { validateAllFields, FIELD_LABELS } from '../../utils/formValidation';

function PersonNavigationFooter() {
  const currentStep = usePersonCheckoutStore(s => s.currentStep);
  const subscription = usePersonCheckoutStore(s => s.subscription);
  const nextStep = usePersonCheckoutStore(s => s.nextStep);
  const prevStep = usePersonCheckoutStore(s => s.prevStep);
  const lead = usePersonCheckoutStore(s => s.lead);
  const isBillingSet = usePersonCheckoutStore(s => s.isBillingSet());
  const compliance = usePersonCheckoutStore(s => s.compliance);
  
  const navigate = useNavigate();
  
  // Track if user tried to continue (for showing banner)
  const [showValidationBanner, setShowValidationBanner] = useState(false);

  // Validation for Step 4
  const formValidation = useMemo(() => validateAllFields(lead), [lead]);
  const complianceValid = compliance?.acknowledgeAccuracy && compliance?.agreeTerms;
  const isStep4Valid = formValidation.valid && complianceValid;
  const isStep5Valid = isBillingSet;

  // Compile list of issues for banner/tooltip
  const issueList = useMemo(() => {
    const issues: string[] = [];
    if (currentStep !== 4 && currentStep !== 5) return issues;
    
    if (currentStep === 5 && !isBillingSet) {
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
  }, [currentStep, isBillingSet, formValidation, compliance]);

  const isCurrentStepValid = () => {
    if (currentStep === 2) return subscription.plan !== null;
    if (currentStep === 4) return isStep4Valid;
    if (currentStep === 5) return isStep5Valid;
    return true;  // Other steps always allow continue
  };

  // General evaluation for disabled Continue button (outside step 4 and 5)
  const canContinue = useMemo(() => {
    return isCurrentStepValid();
  }, [currentStep, subscription.plan, isStep4Valid, isStep5Valid]);

  // Hide on Step 6 and 7 (Review & Complete)
  if (currentStep >= 6) return null;

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/personal');
    } else {
      prevStep();
    }
  };
  
  const handleContinueClick = () => {
    const stepValid = isCurrentStepValid();
    if ((currentStep === 4 || currentStep === 5) && !stepValid) {
      setShowValidationBanner(true);
      if (currentStep === 4) {
        // Dispatch the custom event to highlight red borders on untouched invalid fields
        window.dispatchEvent(new CustomEvent('checkout-validation-failed'));
        
        // Auto-scroll to first error field
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
  };

  return (
    <>
      {/* Validation Summary Banner — shows when user tries to continue invalid */}
      {showValidationBanner && (currentStep === 4 || currentStep === 5) && !isCurrentStepValid() && issueList.length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-4 mx-4 max-w-3xl md:mx-auto">
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
      )}

      <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 px-4 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1 px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-4 h-4" />
            {currentStep === 1 ? 'Back to Personal Tracking' : 'Back'}
          </button>
          
          <div className="relative group">
            <button
              type="button"
              onClick={handleContinueClick}
              className={`inline-flex items-center gap-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors ${
                ((currentStep === 4 || currentStep === 5) && !isCurrentStepValid())
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed hover:bg-neutral-200 shadow-none'
                  : (!canContinue ? 'opacity-50 cursor-not-allowed' : '')
              }`}
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Tooltip shown on hover when disabled */}
            {(currentStep === 4 || currentStep === 5) && !isCurrentStepValid() && (
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block 
                              w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-20">
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
        </div>
      </div>
    </>
  );
}

export default PersonNavigationFooter;
