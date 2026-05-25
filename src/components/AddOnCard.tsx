import React from 'react';
import { Minus, Plus, Lock, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AddOnCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  onceOff: number;
  monthly: number | string;
  quantity: number;
  maxQuantity: number;
  minQuantity?: number;
  onQuantityChange: (qty: number) => void;
  requiredTooltip?: string;
  isIncluded?: boolean;
  monthlyInfo?: string;
  isLocked?: boolean;
  lockedSubtitle?: string;
  isFreeMonthly?: boolean;
  planContext?: string;
  advPremCount?: number;
  iconTheme?: 'emerald' | 'amber' | 'blue' | 'purple' | 'red' | 'slate';
}

export function AddOnCard({
  title,
  description,
  icon: Icon,
  onceOff,
  monthly,
  quantity,
  maxQuantity,
  minQuantity = 0,
  onQuantityChange,
  requiredTooltip,
  isIncluded = false,
  monthlyInfo,
  isLocked = false,
  lockedSubtitle,
  isFreeMonthly = false,
  planContext,
  advPremCount,
  iconTheme = 'emerald'
}: AddOnCardProps) {
  const isSelected = quantity > 0 || isIncluded;

  const bgClasses: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    slate: 'bg-slate-50 text-slate-600',
  };

  const currentIconBg = isLocked ? 'bg-amber-100 text-amber-600' : bgClasses[iconTheme];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`relative flex flex-col p-6 rounded-xl border-2 transition-all w-full min-h-[320px] bg-white overflow-hidden min-w-0 ${
        isLocked
          ? 'border-amber-400 shadow-amber-100 shadow-md bg-amber-50/10'
          : isSelected 
            ? 'border-emerald-500 shadow-emerald-100 shadow-md bg-emerald-50/20' 
            : 'border-neutral-200 hover:border-emerald-300 shadow-sm'
      }`}
    >
      <div 
        className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors ${currentIconBg}`}
      >
        <Icon size={28} strokeWidth={2.25} />
      </div>

      <h3 className="font-bold text-lg text-neutral-800 mt-4 mb-2 leading-tight">{title}</h3>
      <p className="text-neutral-500 text-sm flex-1 break-words">
        {description}
      </p>

      {isLocked && lockedSubtitle && (
        <p className="text-amber-700 text-xs font-semibold mt-2 mb-4 bg-amber-100/50 p-2 rounded-lg border border-amber-200">
          {lockedSubtitle}
        </p>
      )}
      {!isLocked && <div className="mb-4"></div>}

      {isIncluded ? (
        <div className="mb-6 flex justify-center shrink-0">
          <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-sm border border-emerald-200">
            INCLUDED IN YOUR PLAN
          </span>
        </div>
      ) : (
        <div className="mb-6 space-y-1 shrink-0">
           <div className="flex gap-2 justify-between items-center text-sm">
              <span className="text-neutral-500 whitespace-nowrap">Once off:</span>
              <span className="font-bold text-neutral-700 whitespace-nowrap">R{onceOff}</span>
           </div>
           <div className="flex flex-col gap-2 w-full text-sm">
              <span className="text-neutral-500 whitespace-nowrap inline-flex items-center gap-1">
                Monthly: 
                {monthlyInfo && (
                  <span title={monthlyInfo} className="text-neutral-400 hover:text-neutral-600 cursor-help">
                    <HelpCircle size={14} />
                  </span>
                )}
              </span>
              
              {(advPremCount && advPremCount > 0 && quantity > 0 && isFreeMonthly) ? (
                <div className="pl-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">• First {advPremCount}:</span>
                    <span className="font-semibold text-emerald-600 inline-flex items-center gap-1">
                      R0 
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">
                        FREE
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">• Additional:</span>
                    <span className="font-semibold text-neutral-700">R16/mo each</span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end w-full">
                  <span className="font-bold text-neutral-700 whitespace-nowrap">
                    {isFreeMonthly ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                        R0
                        {planContext && (
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">
                            FREE with {planContext}
                          </span>
                        )}
                      </span>
                    ) : (
                      typeof monthly === 'number' ? `R${monthly}/mo` : monthly
                    )}
                  </span>
                </div>
              )}
           </div>
        </div>
      )}

      {isIncluded ? (
        <div className="flex flex-col gap-1 items-center shrink-0 w-full mt-auto">
          <p className="text-xs text-neutral-500 font-medium text-center">
            Already included in your selected plan.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 items-center shrink-0 w-full mt-auto">
          <div className="flex items-center justify-between bg-neutral-50 rounded-full p-1 border border-neutral-200 w-full shadow-sm">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm border border-neutral-200 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= minQuantity}
            >
              <Minus size={18} />
            </button>
            
            <motion.div 
              key={quantity}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`flex-1 text-center font-bold flex items-center justify-center text-lg ${isLocked ? 'text-amber-700' : 'text-neutral-800'}`}
            >
              {quantity}
            </motion.div>
            
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm border border-neutral-200 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              onClick={() => onQuantityChange(quantity + 1)}
              disabled={quantity >= maxQuantity}
            >
              <Plus size={18} />
            </button>
          </div>
          {isSelected ? (
            <span className="text-xs text-neutral-400 font-medium">Max: {maxQuantity}</span>
          ) : (
            <span className="text-xs text-transparent font-medium select-none">Max: {maxQuantity}</span>
          )}
        </div>
      )}
      
      {isLocked && requiredTooltip && (
          <div className="absolute top-4 right-4 text-amber-600 flex items-center justify-center gap-1 font-medium bg-amber-50 p-2 rounded-full shadow-sm border border-amber-200 tooltip z-10" title={requiredTooltip}>
             <Lock size={16} /> <span className="text-xs uppercase tracking-wider font-bold hidden sm:inline-block ml-1 pr-1">Required</span>
          </div>
      )}
    </motion.div>
  );
}
