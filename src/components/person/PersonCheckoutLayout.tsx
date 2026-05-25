import React, { useEffect } from 'react';
import usePersonCheckoutStore from '../../store/usePersonCheckoutStore';
import ErrorBoundary from '../ErrorBoundary';
import PersonProgressBar from './PersonProgressBar';
import PersonCartSidebar from './PersonCartSidebar';
import PersonStep1Hardware from './PersonStep1Hardware';
import PersonStep2Subscription from './PersonStep2Subscription';
import PersonStep3AddOns from './PersonStep3AddOns';
import PersonStep4ContactDetails from './PersonStep4ContactDetails';
import PersonStep4Payment from './PersonStep4Payment';
import PersonStep5Review from './PersonStep5Review';
import PersonStep6Complete from './PersonStep6Complete';
import PersonNavigationFooter from './PersonNavigationFooter';
import Navbar from '../Navbar';
import Footer from '../Footer';

function PersonCheckoutLayout() {
  const currentStep = usePersonCheckoutStore(s => s.currentStep);
  const orderNumber = usePersonCheckoutStore(s => s.orderNumber);
  const freshStart = usePersonCheckoutStore(s => s.freshStart);
  
  // Detect fresh entry — reset if user is returning after completed order
  useEffect(() => {
    const isReturningFromCompletedOrder = orderNumber !== null && currentStep === 7;
    const isStaleStep6 = currentStep === 7 && orderNumber === null;
    
    if (isReturningFromCompletedOrder || isStaleStep6) {
      console.log("[PersonCheckout] Detected returning user — fresh start");
      freshStart();
    }
  }, []);
  
  // Render the appropriate step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonStep1Hardware />;
      case 2:
        return <PersonStep2Subscription />;
      case 3:
        return <PersonStep3AddOns />;
      case 4:
        return <PersonStep4ContactDetails />;
      case 5:
        return <PersonStep4Payment />;
      case 6:
        return <PersonStep5Review />;
      case 7:
        return <PersonStep6Complete />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <PersonProgressBar currentStep={currentStep} />
      
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <ErrorBoundary>
              {renderStep()}
            </ErrorBoundary>
          </div>
          
          {currentStep !== 7 && (
            <aside className="hidden lg:block w-80 shrink-0">
              <PersonCartSidebar />
            </aside>
          )}
        </div>
      </div>
      
      <PersonNavigationFooter />
      <Footer />
    </div>
  );
}

export default PersonCheckoutLayout;
