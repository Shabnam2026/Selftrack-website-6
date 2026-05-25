import { pricingData } from '../config/pricing';

export function is36Month(state: any) {
  const plan = state?.subscription?.billingModel || state?.subscriptions?.[0]?.billingModel || 'Annual';
  const planStr = String(plan).toLowerCase();
  return planStr === '36m' || planStr === '36-month' || planStr === '36month' || planStr.includes('36');
}

export function selectPayTodayTotal(state: any) {
  if (is36Month(state)) return 0;
  if (state?.getOnceOffTotal) return state.getOnceOffTotal();
  return 0;
}

export function selectMonthlyDebitTotal(state: any) {
  if (state?.getMonthlyTotal) return state.getMonthlyTotal();
  return 0;
}

export function selectFirstMonthFreeAmount(state: any) {
  if (!is36Month(state)) return 0;
  return selectMonthlyDebitTotal(state);
}

export function selectTotalContractValue(state: any) {
  if (!is36Month(state)) return 0;
  // 35 months billed (first month free)
  return (selectMonthlyDebitTotal(state) || 0) * 35;
}
