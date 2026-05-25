import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLeadFunnelStore } from '../store/useLeadFunnelStore';
import { Step1AssetType } from '../components/leadFunnel/Step1AssetType';
import { Step2AssetDetails } from '../components/leadFunnel/Step2AssetDetails';
import { Step3Contact } from '../components/leadFunnel/Step3Contact';
import { FunnelProgressIndicator } from '../components/leadFunnel/FunnelProgressIndicator';
import { FunnelNavigation } from '../components/leadFunnel/FunnelNavigation';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function AssetQuoteFunnel() {
  const { currentStep, assetTypes, reset } = useLeadFunnelStore();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (assetTypes.length > 0 || currentStep > 1) {
      setShowConfirmModal(true);
    } else {
      navigate('/asset');
    }
  };

  const confirmLeave = () => {
    reset(); // clear progress
    navigate('/asset');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] pb-24">
      {/* Top Navbar from main site */}
      <Navbar />

      {/* Slim Funnel Header */}
      <div className="bg-white border-b border-neutral-100 pt-24 pb-4 px-6 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/asset" onClick={handleBackClick} className="text-sm font-bold text-neutral-500 hover:text-emerald-600 flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 
            Back to Asset Tracking
          </a>
          <div className="text-xs font-black uppercase tracking-widest text-emerald-500">
            Selftrack Solutions
          </div>
        </div>
      </div>

      <FunnelProgressIndicator />

      {/* Main Form Content Area */}
      <div className="flex-1 w-full bg-white relative z-20 pointer-events-auto overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep === 1 && <Step1AssetType key="step1" />}
          {currentStep === 2 && <Step2AssetDetails key="step2" />}
          {currentStep === 3 && <Step3Contact key="step3" />}
        </AnimatePresence>
      </div>

      <FunnelNavigation />

      {/* Main site footer */}
      <Footer />

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-black text-neutral-800 mb-2">Leave Page?</h3>
            <p className="text-neutral-500 mb-6">You'll lose your progress. Are you sure you want to leave?</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="px-6 py-2.5 rounded-lg font-bold text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmLeave}
                className="px-6 py-2.5 rounded-lg font-bold text-white bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/20 transition-all"
              >
                Yes, Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
