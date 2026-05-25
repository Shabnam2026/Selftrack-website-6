import React, { useState } from 'react';
import { ChevronLeft, FileText } from 'lucide-react';
import usePersonCheckoutStore from '../../store/usePersonCheckoutStore';
import { PERSON_HARDWARE_PRICE } from '../../config/personPricing';
import { EditSectionButton } from '../ReviewInvoice';
import IncludedCheckIcon from '../IncludedCheckIcon';
import { selectPayTodayTotal, selectMonthlyDebitTotal, selectFirstMonthFreeAmount, selectTotalContractValue } from '../../utils/totalsSelectors';

function PersonStep5Review() {
  const hardware = usePersonCheckoutStore(s => s.hardware);
  const subscription = usePersonCheckoutStore(s => s.subscription);
  const addOns = usePersonCheckoutStore(s => s.addOns);
  const lead = usePersonCheckoutStore(s => s.lead);
  const setPayment = usePersonCheckoutStore(s => s.setPayment);
  const generateOrderNumber = usePersonCheckoutStore(s => s.generateOrderNumber);
  const nextStep = usePersonCheckoutStore(s => s.nextStep);
  const setStep = usePersonCheckoutStore(s => s.setStep);
  const onceOffTotal = usePersonCheckoutStore(s => s.getOnceOffTotal());
  const monthlyTotal = usePersonCheckoutStore(s => s.getMonthlyTotal());

  function formatPrice(value: number) {
    if (typeof value !== 'number' || isNaN(value)) {
      console.warn('[PersonStep5] Invalid price value detected:', value);
      return 'R0';
    }
    return `R${value.toLocaleString()}`;
  }

  const pb = addOns?.panicButton as any;
  const pbQty = (typeof pb === 'object' && pb !== null)
    ? ((pb.person || 0) + (pb.vehicle || 0))
    : (typeof pb === 'number' ? pb : 0);
  
  const [view, setView] = useState<"review" | "checkout">("review");
  const compliance = usePersonCheckoutStore(s => s.compliance);

  const store = usePersonCheckoutStore();
  const safeSub: any = subscription || {};
  const is36M = safeSub.billingModel === "36M";
  const payToday = selectPayTodayTotal(store);
  const monthlyDebit = selectMonthlyDebitTotal(store);
  const firstMonthFree = selectFirstMonthFreeAmount(store);
  const totalContract = selectTotalContractValue(store);
  
  const ficaConsent = store.compliance?.ficaConsent || false;
  const contractTermsAccepted = store.compliance?.contractTermsAccepted || false;
  const setCompliance = store.setCompliance;
  const [showValidation, setShowValidation] = useState(false);
  
  const defaultValid = compliance?.acknowledgeAccuracy && compliance?.agreeTerms;
  const allAgreed = React.useMemo(() => {
    if (!defaultValid) return false;
    if (is36M) {
      if (!ficaConsent || !contractTermsAccepted) return false;
    }
    return true;
  }, [defaultValid, is36M, ficaConsent, contractTermsAccepted]);
  
  React.useEffect(() => {
    console.log("[PersonStep5] Mounted with:", {
      hasSubscription: !!safeSub.plan,
      billingModel: safeSub.billingModel,
    });
  }, [safeSub.plan, safeSub.billingModel]);
  
  if (!safeSub.plan) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-neutral-500 font-medium">No plan selected. Please go back to Step 2.</p>
        <button onClick={() => setStep(2)} className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-semibold cursor-pointer transition-colors block mx-auto">
          Return to Subscriptions
        </button>
      </div>
    );
  }
  
  const handleCompleteOrder = () => {
    if (is36M && (!ficaConsent || !contractTermsAccepted)) {
      setShowValidation(true);
      return;
    }
    if (!allAgreed) return;

    const orderNumber = generateOrderNumber();
    setPayment({
      method: is36M ? "36M_Contract" : safeSub.billingModel,
      agreedToTerms: true,
    });
    
    console.log("[Person Order Completed]", {
      orderNumber,
      hardware,
      subscription,
      addOns,
      lead,
      totals: { onceOffTotal, monthlyTotal },
    });
    
    nextStep();
  };
  
  if (view === "checkout") {
    return (
      <PersonCheckoutSubScreen
        onBack={() => setView("review")}
        allAgreed={allAgreed}
        onComplete={handleCompleteOrder}
        is36M={is36M}
        onceOffTotal={onceOffTotal}
        monthlyTotal={monthlyTotal}
        ficaConsent={ficaConsent}
        contractTermsAccepted={contractTermsAccepted}
        setCompliance={setCompliance}
        showValidation={showValidation}
        setShowValidation={setShowValidation}
      />
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Review Your Order</h1>
        <p className="text-gray-600 text-sm">
          Please check all details before proceeding to checkout.
        </p>
      </div>
      
      {/* Hardware section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold uppercase text-gray-500">
            Hardware (Once-off)
          </h2>
          <EditSectionButton onClick={() => setStep(1)} ariaLabel="Edit hardware selection" />
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Item</th>
                <th className="text-center px-4 py-2">Qty</th>
                <th className="text-right px-4 py-2">Unit</th>
                <th className="text-right px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-3">Person Tracker{is36M ? " (Financed)" : ""}</td>
                <td className="text-center">{hardware.quantity}</td>
                <td className="text-right">
                  {is36M ? (
                    <span className="line-through text-gray-400">
                      R{PERSON_HARDWARE_PRICE.toLocaleString()}
                    </span>
                  ) : (
                    `R${PERSON_HARDWARE_PRICE.toLocaleString()}`
                  )}
                </td>
                <td className="text-right font-semibold flex justify-end">
                  {is36M ? (
                    <IncludedCheckIcon label="Included" />
                  ) : (
                    `R${(hardware.quantity * PERSON_HARDWARE_PRICE).toLocaleString()}`
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="bg-gray-50 pt-2 pb-3 px-4 flex justify-between items-center border-t border-gray-200 font-bold">
            <span className="text-sm text-gray-600">Hardware Subtotal</span>
            {is36M ? (
              <span className="flex items-center gap-2">
                <span className="line-through text-gray-400 font-normal">
                  R{(hardware.quantity * PERSON_HARDWARE_PRICE).toLocaleString()}
                </span>
                <IncludedCheckIcon label="All Included" />
              </span>
            ) : (
              <span>R{(hardware.quantity * PERSON_HARDWARE_PRICE).toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Subscription section */}
      {safeSub.plan && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold uppercase text-gray-500">
              Subscription
            </h2>
            <EditSectionButton onClick={() => setStep(2)} ariaLabel="Edit subscription plans" />
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-sm">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{safeSub.plan} Plan</span>
              <span>R{safeSub.price || 0}/mo</span>
            </div>
            <div className="text-xs text-gray-500">
              Billed: {safeSub.billingModel}
            </div>
          </div>
        </div>
      )}
      
      {/* Add-ons section */}
      {(pbQty > 0 || addOns.extendedBattery > 0) && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold uppercase text-gray-500">
              Add-Ons
            </h2>
            <EditSectionButton onClick={() => setStep(3)} ariaLabel="Edit add-ons" />
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Add-on</th>
                  <th className="text-center px-4 py-2 w-[14%]">Qty</th>
                  <th className="text-right px-4 py-2 w-[24%] whitespace-nowrap">Once-off</th>
                  <th className="text-right px-4 py-2 w-[24%]">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {pbQty > 0 && (
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">Panic Button</td>
                    <td className="text-center whitespace-nowrap">{pbQty}</td>
                    <td className="text-right flex justify-end whitespace-nowrap pt-3">
                      {is36M ? (
                        <div className="flex items-center gap-2">
                          <span className="line-through text-gray-400 font-normal">
                            R0
                          </span>
                          <IncludedCheckIcon label="Included" />
                        </div>
                      ) : (
                        `R0`
                      )}
                    </td>
                    <td className="text-right">{formatPrice(pbQty * (safeSub.plan === "ADVANCED" ? 0 : 16))}/mo</td>
                  </tr>
                )}
                {addOns.extendedBattery > 0 && (
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">Extended Battery Life</td>
                    <td className="text-center whitespace-nowrap">{addOns.extendedBattery}</td>
                    <td className="text-right flex justify-end whitespace-nowrap pt-3">
                       {is36M ? (
                        <div className="flex items-center gap-2">
                          <span className="line-through text-gray-400 font-normal">
                            R{(addOns.extendedBattery * 399).toLocaleString()}
                          </span>
                          <IncludedCheckIcon label="Included" />
                        </div>
                      ) : (
                        `R${(addOns.extendedBattery * 399).toLocaleString()}`
                      )}
                    </td>
                    <td className="text-right">R{(addOns.extendedBattery * 59).toLocaleString()}/mo</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Contact Details section */}
      {lead?.firstName && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold uppercase text-gray-500">
              Contact Details
            </h2>
            <EditSectionButton onClick={() => setStep(4)} ariaLabel="Edit contact details" />
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-sm space-y-2">
            <div>
              <span className="text-gray-500 font-medium">Name: </span>
              <span className="font-semibold text-gray-900">
                {lead?.firstName} {lead?.surname}
              </span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Email: </span>
              <span className="font-semibold text-gray-900">{lead?.email}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Phone: </span>
              <span className="font-semibold text-gray-900">+27 {lead?.phone}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">ID/Passport: </span>
              <span className="font-semibold text-gray-900">{lead?.idNumber}</span>
            </div>
            {lead?.cityProvince && (
              <div>
                <span className="text-gray-500 font-medium">City/Province: </span>
                <span className="font-semibold text-gray-900">{lead.cityProvince}</span>
              </div>
            )}
            <div>
              <span className="text-gray-500 font-medium">Address: </span>
              <span className="font-semibold text-gray-900">{lead?.address}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Postal Code: </span>
              <span className="font-semibold text-gray-900">{lead?.postalCode}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Totals block */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mt-8">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Once-off Total</span>
            <span>R{(is36M ? 0 : hardware.quantity * PERSON_HARDWARE_PRICE + (addOns.extendedBattery * 399)).toLocaleString()}</span>
          </div>
          {safeSub.billingModel === "Annual" && (
            <div className="flex justify-between">
              <span>Annual Prepayment</span>
              <span>R{((safeSub.price || 0) * 12).toLocaleString()}</span>
            </div>
          )}
          {safeSub.billingModel === "Monthly" && (
            <div className="flex justify-between">
              <span>First Month Subscription</span>
              <span>R{(safeSub.price || 0).toLocaleString()}</span>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between font-bold text-lg">
          <span>DUE TODAY</span>
          <span className="text-emerald-600">R{(payToday || 0).toLocaleString()}</span>
        </div>
        
        {monthlyDebit > 0 && (
          <div className="text-sm text-gray-600 mt-2 text-right">
            Ongoing: R{monthlyDebit.toLocaleString()}/mo
            <div className="text-xs">(Starts after installation)</div>
          </div>
        )}

        {is36M && (
          <div className="mt-4 border-t border-[#9ACA3C]/20 pt-4">
             <div className="mb-2 pb-2 border-b border-[#9ACA3C]/20 flex justify-between text-sm">
                <span>Subtotal (36 months):</span>
                <span>{formatPrice((monthlyDebit || 0) * 36)}</span>
             </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 my-3">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎁</span>
                  <span className="font-bold text-emerald-700">
                    First Month FREE
                  </span>
                </div>
                <span className="font-bold text-emerald-700 text-lg">
                  -{formatPrice(firstMonthFree || 0)}
                </span>
              </div>
              <p className="text-xs text-emerald-600 mt-1 italic">
                Applies once across your whole order
              </p>
            </div>
             <div className="pt-2 flex justify-between font-bold text-gray-900 text-base">
                <span>Total Contract Value:</span>
                <span>{formatPrice(totalContract || 0)}</span>
             </div>
          </div>
        )}
      </div>
      
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="inline-flex items-center justify-center gap-1 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Edit
        </button>
        
        <button
          type="button"
          onClick={() => setView("checkout")}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}

// Checkout sub-screen
function PersonCheckoutSubScreen({ 
  onBack, allAgreed, onComplete, is36M, 
  onceOffTotal, monthlyTotal, ficaConsent, contractTermsAccepted, setCompliance, showValidation, setShowValidation 
}: { 
  onBack: () => void, 
  allAgreed: boolean, 
  onComplete: () => void, 
  is36M: boolean, 
  onceOffTotal: number, 
  monthlyTotal: number,
  ficaConsent?: boolean,
  contractTermsAccepted?: boolean,
  setCompliance?: (key: any, value: boolean) => void,
  showValidation?: boolean,
  setShowValidation?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Checkout</h1>
        <p className="text-gray-600 text-sm">
          Confirm and complete your order.
        </p>
      </div>
      
      {/* Payment summary */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
        {is36M ? (
          <div className="text-sm">
            <p className="font-semibold mb-1">36-Month Contract</p>
            <p>R0 today · R{monthlyTotal.toLocaleString()}/mo from month 2 (35 months)</p>
            <p className="text-xs text-gray-600 mt-2">
              Payment link will be emailed after credit approval.
            </p>
          </div>
        ) : (
          <div className="text-sm">
            <p className="font-semibold mb-1">Payment Today: R{onceOffTotal.toLocaleString()}</p>
            {monthlyTotal > 0 && (
              <p>Ongoing: R{monthlyTotal.toLocaleString()}/mo</p>
            )}
            <p className="text-xs text-gray-600 mt-2">
              Credit/Debit card payment processed at confirmation.
            </p>
          </div>
        )}
      </div>
      
      {/* 36M docs reminder */}
      {is36M && (
        <>
          <div className="bg-amber-50 border border-amber-200 rounded p-4 text-xs text-amber-700 mb-6">
            <p className="font-semibold mb-2">Documents Required (sent via email):</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>ID / Passport</li>
              <li>Proof of Physical Address</li>
              <li>Bank Account Details</li>
              <li>Debit Order Form</li>
            </ul>
          </div>
          
          <section
            aria-labelledby="person-compliance-heading"
            className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
          >
            <header className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h3
                id="person-compliance-heading"
                className="font-semibold text-emerald-700"
              >
                Compliance &amp; Agreements
              </h3>
            </header>
        
            {showValidation && (!ficaConsent || !contractTermsAccepted) && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
                Please complete all required agreements below to continue.
              </div>
            )}

            <label className="flex items-start gap-3 mb-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={ficaConsent}
                onChange={(e) => {
                  setCompliance?.('ficaConsent', e.target.checked);
                  if (e.target.checked && contractTermsAccepted) setShowValidation?.(false);
                }}
                className={[
                  'mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600',
                  'focus:ring-emerald-500 cursor-pointer',
                  showValidation && !ficaConsent ? 'ring-2 ring-red-400' : ''
                ].join(' ')}
                aria-invalid={showValidation && !ficaConsent}
              />
              <span className="text-sm text-gray-800 select-none">
                I consent to FICA compliance verification checks
              </span>
            </label>
        
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={contractTermsAccepted}
                onChange={(e) => {
                  setCompliance?.('contractTermsAccepted', e.target.checked);
                  if (ficaConsent && e.target.checked) setShowValidation?.(false);
                }}
                className={[
                  'mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600',
                  'focus:ring-emerald-500 cursor-pointer',
                  showValidation && !contractTermsAccepted ? 'ring-2 ring-red-400' : ''
                ].join(' ')}
                aria-invalid={showValidation && !contractTermsAccepted}
              />
              <span className="text-sm text-gray-800 select-none">
                I understand and agree to the terms of my 36-Month Contract
              </span>
            </label>
          </section>
        </>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-1 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Review
        </button>
        
        <button
          type="button"
          onClick={onComplete}
          className={`font-semibold px-6 py-3 rounded-lg transition-colors
            ${allAgreed
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          Complete Order →
        </button>
      </div>
    </div>
  );
}

export default PersonStep5Review;
