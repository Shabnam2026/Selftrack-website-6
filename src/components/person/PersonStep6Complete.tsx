import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, Wrench, Phone, Clock, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import usePersonCheckoutStore from '../../store/usePersonCheckoutStore';

function PersonStep6Complete() {
  const orderNumber = usePersonCheckoutStore(s => s.orderNumber);
  const lead = usePersonCheckoutStore(s => s.lead);
  const subscription = usePersonCheckoutStore(s => s.subscription);
  const onceOffTotal = usePersonCheckoutStore(s => s.getOnceOffTotal());
  const monthlyTotal = usePersonCheckoutStore(s => s.getMonthlyTotal());
  const freshStart = usePersonCheckoutStore(s => s.freshStart);
  const navigate = useNavigate();
  
  // Guard: if no order number, this is stale state — restart
  useEffect(() => {
    if (!orderNumber) {
      console.log("[PersonStep6] No order number — restarting checkout");
      freshStart();
    }
  }, []);
  
  // Early return AFTER hooks
  if (!orderNumber) {
    return (
      <div className="text-center p-8">
        <p>Loading...</p>
      </div>
    );
  }
  
  useEffect(() => {
    console.log("[PersonStep6] Order complete:", { orderNumber, lead, subscription });
  }, [orderNumber, lead, subscription]);
  
  const is36M = subscription.billingModel === "36M";
  const customerName = lead?.firstName || "there";
  const customerEmail = lead?.email || "your registered email";
  const customerPhone = lead?.phone ? `+27 ${lead.phone}` : "your registered number";
  
  const handleStartNew = () => {
    console.log("[PersonStep6] Starting new order — resetting state");
    freshStart();
    navigate('/checkout/person');
  };
  
  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 mx-auto bg-emerald-500 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle className="w-12 h-12 text-white" />
      </motion.div>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Order #{orderNumber || 'SLF-P-XXXXXX'} — Thank you, {customerName}!
        </p>
      </div>
      
      {/* Order summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Order Summary</h2>
          <div className="text-emerald-600 font-bold">
            Paid Today: R{onceOffTotal.toLocaleString()}
          </div>
        </div>
        
        {monthlyTotal > 0 && (
          <p className="text-sm text-gray-600">
            Ongoing: R{monthlyTotal.toLocaleString()}/mo (starts after installation)
          </p>
        )}
        
        {is36M && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-700">
            ⏳ Your 36-Month Contract is pending application review. 
            We'll email you a secure payment link within 1-2 business days.
          </div>
        )}
      </div>
      
      {/* What's next cards */}
      <div className={`grid gap-4 mb-8 ${is36M ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
        <InfoCard
          icon={Mail}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          title="Confirmation Email Sent"
          body={`We've sent your receipt and login details to ${customerEmail}.`}
        />
        <InfoCard
          icon={Wrench}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          title="Installation Within 24h"
          body={`Our team will contact you on ${customerPhone} within 24 hours to schedule installation.`}
        />
        <InfoCard
          icon={Phone}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          title="30-Day Check-In"
          body="A Selftrack agent will follow up in 30 days to ensure everything is working perfectly."
        />
        {is36M && (
          <InfoCard
            icon={Clock}
            iconBg="bg-amber-100"
            iconColor="text-amber-600"
            title="Application Pending"
            body="Your 36-Month Contract will be activated after credit approval (1-2 business days)."
            accent
          />
        )}
      </div>

      {/* Subscription Timing Banner */}
      <div
        role="note"
        aria-label="Subscription timing notice"
        className="mb-8 mx-auto w-full rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 flex items-start gap-3"
      >
        <Clock 
          className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" 
          aria-hidden="true"
          strokeWidth={2}
        />
        <p className="text-sm text-emerald-900 leading-relaxed text-left">
          <span className="font-semibold">Good news</span> — your 
          subscription only starts once your device is installed and 
          activated. You won't be charged for subscription time before 
          your installation is complete.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={handleStartNew}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-sm"
        >
          Start a New Order
        </button>
      </div>
      
      {/* Footer help */}
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>
          Need help? Contact us at{" "}
          <a href="mailto:support@selftrack.co.za" className="text-emerald-600 hover:underline">
            support@selftrack.co.za
          </a>{" "}
          or call{" "}
          <a href="tel:+27716046133" className="text-emerald-600 hover:underline">
            +27 71 604 6133
          </a>
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Order placed on {new Date().toLocaleDateString('en-ZA', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          })} · Selftrack © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, iconBg, iconColor, title, body, accent }: { icon: LucideIcon, iconBg: string, iconColor: string, title: string, body: string, accent?: boolean }) {
  return (
    <div className={`rounded-lg p-5 border
      ${accent 
        ? 'bg-amber-50 border-amber-200' 
        : 'bg-white border-gray-200'}`}>
      <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center mb-3`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{body}</p>
    </div>
  );
}

export default PersonStep6Complete;
