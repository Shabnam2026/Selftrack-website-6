import React from 'react';
import { useLeadFunnelStore } from '../../store/useLeadFunnelStore';
import { useNavigate } from 'react-router-dom';

export function FunnelNavigation() {
  const navigate = useNavigate();
  const { currentStep, assetTypes, customAssetDescription, assetDetails, contactInfo, nextStep, prevStep, submitLead, leadId } = useLeadFunnelStore();

  const isStep1Valid = () => {
    if (assetTypes.length === 0) return false;
    if (assetTypes.includes('other') && customAssetDescription.trim().length < 3) return false;
    return true;
  };

  const isStep2Valid = () => {
    return (
      assetDetails.quantity !== "" &&
      assetDetails.useType !== "" &&
      assetDetails.approximateValue !== "" &&
      assetDetails.hasExistingTracking !== null &&
      assetDetails.requiresRecovery !== null &&
      assetDetails.mainLocation !== "" &&
      assetDetails.requiresPower !== null
    );
  };

  const isStep3Valid = () => {
    const isValidEmail = contactInfo.email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email);
    const isValidPhone = contactInfo.phone.trim().length >= 9; // very basic validation
    
    return (
      contactInfo.name.trim().length >= 2 &&
      isValidPhone &&
      isValidEmail &&
      contactInfo.cityProvince.trim().length >= 2 &&
      contactInfo.preferredContact !== "" &&
      contactInfo.urgency !== ""
    );
  };

  const handleNext = () => {
    if (currentStep === 1 && isStep1Valid()) nextStep();
    if (currentStep === 2 && isStep2Valid()) nextStep();
    if (currentStep === 3 && isStep3Valid()) {
      submitLead();
      // Need to retrieve lead ID that was just set.
      const state = useLeadFunnelStore.getState();
      navigate(`/asset-tracking/thank-you?leadId=${state.leadId}`);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
      <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        {currentStep > 1 ? (
          <button 
            onClick={prevStep}
            className="w-full sm:w-auto text-neutral-500 font-bold hover:text-neutral-800 transition-colors py-3 px-6 text-center"
          >
            ← Previous Step
          </button>
        ) : (
          <div className="hidden sm:block opacity-0 px-6 py-3">← Previous Step</div> // placeholder layout space
        )}

        <button
          onClick={handleNext}
          disabled={
            (currentStep === 1 && !isStep1Valid()) ||
            (currentStep === 2 && !isStep2Valid()) ||
            (currentStep === 3 && !isStep3Valid())
          }
          className="w-full sm:w-auto bg-emerald-500 text-white px-8 py-3.5 rounded-lg font-black uppercase tracking-widest outline-none shadow-md shadow-emerald-500/20 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-500 flex items-center justify-center gap-2"
        >
          {currentStep === 3 ? "Get My Recommended Solution →" : "Next Step →"}
        </button>
      </div>
    </div>
  );
}
