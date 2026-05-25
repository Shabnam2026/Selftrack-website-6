import { Subscription } from '../store/useCheckoutStore';

/**
 * Compute smart allocation of add-ons to subscriptions.
 * 
 * Panic Button now has per-device-type allocation:
 *   - Vehicle Panic Buttons allocated to Vehicle subs (in plan order)
 *   - Person Panic Buttons allocated to Person subs (in plan order)
 * 
 * Immobilizer still uses global allocation across all subs.
 */
export function computeAddOnAllocation(subscriptions: Subscription[], addOns: any) {
  if (!subscriptions || !Array.isArray(subscriptions)) {
    return { 
      panicButtonVehicle: [], 
      panicButtonPerson: [], 
      immobilizer: [] 
    };
  }
  
  // Helper: sort subs Advanced/Premium first
  const sortByPriority = (subs: Subscription[]) => {
    return [...subs].sort((a, b) => {
      const aPriority = (a.plan === "ADVANCED" || a.plan === "PREMIUM") ? 0 : 1;
      const bPriority = (b.plan === "ADVANCED" || b.plan === "PREMIUM") ? 0 : 1;
      return aPriority - bPriority;
    });
  };
  
  // Helper: allocate add-ons to a filtered list of subs
  // For Vehicle Panic: hardwarePrice = 195
  // For Person Panic: hardwarePrice = 0
  function allocate(addOnQty: number, eligibleSubs: Subscription[], hardwarePrice: number) {
    const allocation = [];
    let remaining = addOnQty || 0;
    const sortedSubs = sortByPriority(eligibleSubs);
    
    for (const sub of sortedSubs) {
      if (remaining <= 0) break;
      const isFree = sub.plan === "ADVANCED" || sub.plan === "PREMIUM";
      allocation.push({
        deviceType: sub.deviceType,
        deviceIndex: sub.deviceIndex,
        plan: sub.plan,
        isFree,
        monthly: isFree ? 0 : 16,
        hardware: hardwarePrice,
      });
      remaining--;
    }
    
    // Any extra (shouldn't happen with Max enforcement, but defensive)
    while (remaining > 0) {
      allocation.push({
        deviceType: null,
        deviceIndex: null,
        plan: null,
        isFree: false,
        monthly: 16,
        hardware: hardwarePrice,
      });
      remaining--;
    }
    
    return allocation;
  }
  
  // Filter subs by device type
  const vehicleSubs = subscriptions.filter(s => 
    s.deviceType === 'vehicle' || s.deviceType === 'motorbike'
  );
  const personSubs = subscriptions.filter(s => s.deviceType === 'person');
  
  // Get panicButton qty values (handle old format defensively)
  const panicVehicleQty = (typeof addOns?.panicButton === 'object' && addOns.panicButton !== null)
    ? (addOns.panicButton.vehicle || 0)
    : (typeof addOns?.panicButton === 'number' && !isNaN(addOns.panicButton) ? addOns.panicButton : 0);
  
  const panicPersonQty = (typeof addOns?.panicButton === 'object' && addOns.panicButton !== null)
    ? (addOns.panicButton.person || 0)
    : 0;
  
  return {
    panicButtonVehicle: allocate(panicVehicleQty, vehicleSubs, 195),
    panicButtonPerson: allocate(panicPersonQty, personSubs, 0),
    immobilizer: allocate(addOns?.immobilizer || 0, subscriptions, 80),
  };
}
