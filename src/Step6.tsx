import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Wrench, Mail, Clock, ArrowRight } from 'lucide-react';
import { useCheckoutStore } from './store/useCheckoutStore';

export default function Step6() {
  const { customer, subscriptions, reset } = useCheckoutStore();
  
  const has36MContract = subscriptions.some(s => 
    s.billingModel === '36M' || 
    s.billingModel === '36m' || 
    s.billingModel?.toLowerCase().includes('36')
  );

  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  const handleStartNew = () => {
    console.log("[Step6] Starting new order — resetting state");
    reset();
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto py-12 px-4 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 rounded-full" />
        <CheckCircle size={96} className="text-emerald-500 relative z-10" />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight"
      >
        Order Confirmed!
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-lg md:text-xl text-neutral-500 mb-12 font-medium"
      >
        Order #SLF-{orderNumber} &mdash; Thank you for choosing Selftrack.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12 text-left"
      >
        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm border-t-4 border-t-emerald-500">
          <CheckCircle size={32} className="text-emerald-500 mb-4" />
          <h3 className="text-lg font-bold text-neutral-900 mb-2">Order Confirmed</h3>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Your order has been received and confirmed. We're processing your request now.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm border-t-4 border-t-blue-500">
          <Wrench size={32} className="text-blue-500 mb-4" />
          <h3 className="text-lg font-bold text-neutral-900 mb-2">Installation</h3>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Our certified technician will contact you within 24 hours to schedule installation at a time that works for you.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm border-t-4 border-t-purple-500">
          <Mail size={32} className="text-purple-500 mb-4" />
          <h3 className="text-lg font-bold text-neutral-900 mb-2">Email Sent</h3>
          <p className="text-neutral-600 text-sm leading-relaxed">
            We've sent your receipt, user manual, platform login details, and installation certificate to <strong className="text-neutral-900">{customer.email || 'your email'}</strong>.
          </p>
        </div>
      </motion.div>

      {has36MContract && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-amber-50 p-6 rounded-2xl border border-amber-200 w-full text-left mb-12 flex flex-col md:flex-row gap-6 items-start"
        >
          <Clock size={40} className="text-amber-500 shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-2">Application Pending</h3>
            <p className="text-amber-800 text-sm leading-relaxed font-medium">
              Your 36-Month Contract item(s) are pending application review. We'll email you a secure payment link once approved (usually 1&ndash;2 business days).
            </p>
          </div>
        </motion.div>
      )}

      {/* Subscription Timing Banner */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        role="note"
        aria-label="Subscription timing notice"
        className="mb-12 mx-auto w-full rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 flex items-start gap-3 text-left"
      >
        <Clock 
          className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" 
          aria-hidden="true"
          strokeWidth={2}
        />
        <p className="text-sm text-emerald-900 leading-relaxed">
          <span className="font-semibold">Good news</span> — your 
          subscription only starts once your device is installed and 
          activated. You won't be charged for subscription time before 
          your installation is complete.
        </p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-center w-full max-w-sm mx-auto"
      >
        <button 
          onClick={handleStartNew}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-sm w-full"
        >
          Start a New Order
        </button>
      </motion.div>
    </div>
  );
}
