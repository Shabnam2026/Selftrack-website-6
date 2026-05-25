import React from 'react';
import { CreditCard, Calendar, SquarePen } from 'lucide-react';
import { PaymentSummaryLineItem } from './PaymentSummaryLineItem';
import { useCheckoutStore } from '../store/useCheckoutStore';

interface Section {
  title: string;
  lines: { label: React.ReactNode; price?: number; onEdit?: () => void; subtext?: React.ReactNode }[];
}

interface Props {
  upfrontSections: Section[];
  totalDueToday: number;
  monthlySections: Section[];
  totalMonthlyDebit: number;
  is36M?: boolean;
  hardwareItems?: { name: string; quantity: number; unitPrice: number; }[];
  addOnHardwareItems?: { name: string; quantity: number; unitPrice: number; }[];
  totalHardwareValue?: number;
  hideMonthly?: boolean;
}

function EditSubscriptionButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-semibold 
                 text-emerald-600 hover:text-emerald-700 normal-case 
                 transition-colors px-2 py-1 rounded hover:bg-emerald-50 cursor-pointer"
      title="Change your plan"
      aria-label="Edit subscription"
    >
      <SquarePen className="w-3.5 h-3.5" strokeWidth={2.25} />
      Edit
    </button>
  );
}

export function PaymentSummaryCard({ upfrontSections, totalDueToday, monthlySections, totalMonthlyDebit, is36M = false, hardwareItems = [], addOnHardwareItems = [], totalHardwareValue = 0, hideMonthly = false }: Props) {
  const setStep = useCheckoutStore(s => s.setStep);

  const handleEditSubscription = () => {
    console.log("[PaymentSummaryCard] Edit subscription — navigating to Step 2");
    setStep(2);
  };

  const hardwareValueWithAddOns = totalHardwareValue + addOnHardwareItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

  return (
    <div className={`grid grid-cols-1 ${!hideMonthly ? 'lg:grid-cols-2' : ''} gap-6 items-start`}>
      {/* PAY UPFRONT CARD */}
      <div className="bg-white rounded-2xl border-2 border-emerald-500 shadow-md overflow-hidden flex flex-col h-full">
        <div className="bg-emerald-500 text-white p-4 flex items-center gap-3">
          <CreditCard size={24} />
          <h3 className="font-bold text-lg tracking-wide uppercase">Pay Upfront Today</h3>
        </div>

        {is36M ? (
          <div className="p-6 flex-1 flex flex-col space-y-4">
            <div className="text-center pb-3">
              <div className="text-4xl mb-2">🎁</div>
              <h3 className="text-lg font-bold text-emerald-700">
                Nothing to pay today!
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Your 36-Month Contract includes everything below
              </p>
            </div>
            
            <div>
              <div className="text-xs text-neutral-500 uppercase font-semibold mb-3">
                Hardware (Included with 36M)
              </div>
              
              <div className="space-y-2">
                {hardwareItems.map((item, idx) => (
                  <div key={idx} 
                       className="flex items-center justify-between bg-emerald-50 
                                  rounded p-2.5">
                    <div className="text-sm">
                      <span className="font-medium text-neutral-800">
                        {item.quantity}× {item.name}
                      </span>
                      <span className="text-neutral-500 ml-2">
                        <span className="line-through opacity-70">
                          R{(item.quantity * item.unitPrice).toLocaleString()}
                        </span>
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 bg-emerald-500 
                                     text-white text-[10px] font-bold px-2 py-1 
                                     rounded-full whitespace-nowrap uppercase tracking-wider">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Included
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {addOnHardwareItems && addOnHardwareItems.length > 0 && (
              <div>
                <div className="text-xs text-neutral-500 uppercase font-semibold mb-3">
                  Add-On Hardware (Included with 36M)
                </div>
                <div className="space-y-2">
                  {addOnHardwareItems.map((item, idx) => (
                    <div key={idx} 
                         className="flex items-center justify-between bg-emerald-50 
                                    rounded p-2.5">
                      <div className="text-sm">
                        <span className="font-medium text-neutral-800">
                          {item.quantity}× {item.name}
                        </span>
                        {item.unitPrice > 0 && (
                          <span className="text-neutral-500 ml-2">
                            <span className="line-through opacity-70">
                              R{(item.quantity * item.unitPrice).toLocaleString()}
                            </span>
                          </span>
                        )}
                        {item.unitPrice === 0 && (
                          <span className="text-neutral-500 ml-2">
                            R0
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 bg-emerald-500 
                                       text-white text-[10px] font-bold px-2 py-1 
                                       rounded-full whitespace-nowrap uppercase tracking-wider">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        {item.unitPrice === 0 ? "BUILT-IN" : "INCLUDED"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="border-t border-neutral-200 pt-3 flex items-center justify-between">
              <div className="text-sm">
                <span className="text-neutral-600">Hardware Value: </span>
                <span className="font-bold text-neutral-800">R{hardwareValueWithAddOns.toLocaleString()}</span>
              </div>
              <span className="inline-flex items-center gap-1 bg-emerald-500 
                               text-white text-[10px] font-bold px-2 py-1 
                               rounded-full whitespace-nowrap uppercase tracking-wider">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                All Included
              </span>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-3 space-y-2 mt-auto">
              <div className="flex items-center gap-2 text-sm text-emerald-800">
                <svg width="16" height="16" className="text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span className="font-medium">First Month FREE</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-800">
                <svg width="16" height="16" className="text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span className="font-medium">No Installation Fee</span>
              </div>
            </div>
            
            <div className="pt-3 border-t border-neutral-200 mt-4">
              <div className="flex justify-between items-center text-base">
                <span className="font-bold text-neutral-800 uppercase tracking-widest text-sm">Total Due Today</span>
                <span className="text-3xl font-bold text-emerald-600 tracking-tight">R0</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 flex-1 flex flex-col space-y-6">
            {upfrontSections.map((section, idx) => {
              if (section.lines.length === 0) return null;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-1">
                    <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider">
                      {section.title}
                    </h4>
                    {section.title.toLowerCase().includes('subscription') && (
                      <EditSubscriptionButton onClick={handleEditSubscription} />
                    )}
                  </div>
                  <div className="space-y-1">
                    {section.lines.map((l, i) => (
                      <PaymentSummaryLineItem key={i} label={l.label} price={l.price} onEdit={l.onEdit} />
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="pt-6 border-t border-neutral-200 mt-auto">
              <div className="flex justify-between items-end">
                <span className="font-bold text-lg text-neutral-800 uppercase tracking-widest">Total Due Today</span>
                <span className="text-3xl font-bold text-emerald-600 tracking-tight">R{totalDueToday.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MONTHLY PAYMENTS CARD */}
      {!hideMonthly && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="bg-neutral-50 border-b border-neutral-200 p-4 flex items-center gap-3">
            <Calendar size={22} className="text-neutral-500" />
            <h3 className="font-bold text-lg text-neutral-800 tracking-wide uppercase">Ongoing Monthly Payments</h3>
          </div>
          
          <div className="p-6 flex-1 flex flex-col space-y-6">
            {monthlySections.some(s => s.lines.length > 0) ? (
              monthlySections.map((section, idx) => {
                if (section.lines.length === 0) return null;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-1">
                      <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider">
                        {section.title}
                      </h4>
                      {section.title.toLowerCase().includes('subscription') && (
                        <EditSubscriptionButton onClick={handleEditSubscription} />
                      )}
                    </div>
                    <div className="space-y-1">
                      {section.lines.map((l, i) => (
                        <PaymentSummaryLineItem key={i} label={l.label} price={l.price} onEdit={l.onEdit} />
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
               <div className="text-neutral-500 text-sm flex-1">
                 No ongoing monthly payments selected.
               </div>
            )}

            <div className="pt-6 border-t border-neutral-200 mt-auto">
              <div className="flex justify-between items-end">
                <span className="font-bold text-lg text-neutral-800 uppercase tracking-widest">Total Monthly Debit Order</span>
                <span className="text-2xl font-bold text-neutral-800 tracking-tight">R{totalMonthlyDebit.toLocaleString()}/mo</span>
              </div>
              {totalMonthlyDebit > 0 && <p className="text-sm font-medium text-emerald-600 mt-2">Starts after installation</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
