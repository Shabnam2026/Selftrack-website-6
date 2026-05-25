import React from 'react';
import { useLeadFunnelStore } from '../../store/useLeadFunnelStore';
import { motion } from 'motion/react';
import { Phone, Mail, MessageSquare } from 'lucide-react';

export function Step3Contact() {
  const { contactInfo, setContactInfo } = useLeadFunnelStore();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto py-12 px-6 relative z-10 pointer-events-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-neutral-800 mb-3 tracking-tight">Almost Done — How Can We Reach You?</h2>
        <p className="text-neutral-500 font-medium text-lg max-w-xl mx-auto">Our asset tracking specialist will contact you within 48 hours with your personalised solution.</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-200/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-700">Name *</label>
            <input 
              type="text" 
              value={contactInfo.name}
              onChange={(e) => setContactInfo('name', e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-medium text-neutral-800" 
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-700">Company Name <span className="text-neutral-400 font-normal">(Optional)</span></label>
            <input 
              type="text" 
              value={contactInfo.companyName}
              onChange={(e) => setContactInfo('companyName', e.target.value)}
              placeholder="Your company"
              className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-medium text-neutral-800" 
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-700">Phone Number *</label>
            <div className="flex relative">
              <div className="absolute left-0 top-0 bottom-0 flex items-center px-4 bg-neutral-50 border-y-2 border-l-2 border-neutral-200 rounded-l-lg select-none text-neutral-600 font-bold border-r-0">
                🇿🇦 +27
              </div>
              <input 
                type="tel" 
                value={contactInfo.phone}
                onChange={(e) => setContactInfo('phone', e.target.value.replace(/\D/g, ''))}
                placeholder="Enter your number"
                className="w-full pl-24 pr-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-medium text-neutral-800" 
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-neutral-700">Email Address *</label>
            <input 
              type="email" 
              value={contactInfo.email}
              onChange={(e) => setContactInfo('email', e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-medium text-neutral-800" 
            />
          </div>

          {/* City */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-bold text-neutral-700">City / Province *</label>
            <input 
              type="text" 
              value={contactInfo.cityProvince}
              onChange={(e) => setContactInfo('cityProvince', e.target.value)}
              placeholder="Your city or province"
              className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-medium text-neutral-800" 
            />
          </div>

          {/* Contact Method */}
          <div className="space-y-3 pt-4 border-t border-neutral-100 md:col-span-2">
            <label className="block text-sm font-bold text-neutral-700">Preferred Contact Method *</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => setContactInfo('preferredContact', 'Phone Call')}
                className={`py-3 px-4 rounded-xl border-2 flex items-center gap-3 transition-all outline-none ${
                    contactInfo.preferredContact === 'Phone Call' 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200 hover:bg-neutral-50'
                }`}
              >
                <Phone className={`w-5 h-5 ${contactInfo.preferredContact === 'Phone Call' ? 'text-emerald-600' : 'text-neutral-400'}`} />
                <span className="font-bold text-sm">Phone Call</span>
              </button>

              <button 
                onClick={() => setContactInfo('preferredContact', 'Email')}
                className={`py-3 px-4 rounded-xl border-2 flex items-center gap-3 transition-all outline-none ${
                    contactInfo.preferredContact === 'Email' 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200 hover:bg-neutral-50'
                }`}
              >
                <Mail className={`w-5 h-5 ${contactInfo.preferredContact === 'Email' ? 'text-emerald-600' : 'text-neutral-400'}`} />
                <span className="font-bold text-sm">Email</span>
              </button>

              <button 
                onClick={() => setContactInfo('preferredContact', 'WhatsApp')}
                className={`py-3 px-4 rounded-xl border-2 flex items-center gap-3 transition-all outline-none ${
                    contactInfo.preferredContact === 'WhatsApp' 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200 hover:bg-neutral-50'
                }`}
              >
                <MessageSquare className={`w-5 h-5 ${contactInfo.preferredContact === 'WhatsApp' ? 'text-emerald-600' : 'text-neutral-400'}`} />
                <span className="font-bold text-sm">WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Urgency */}
          <div className="space-y-3 pt-4 border-t border-neutral-100 md:col-span-2">
            <label className="block text-sm font-bold text-neutral-700">How Soon Do You Need a Solution? *</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Immediately', 'Within 30 days', 'Just researching options'].map(urg => (
                <button 
                  key={urg}
                  onClick={() => setContactInfo('urgency', urg)}
                  className={`py-3 px-4 rounded-xl border-2 font-bold text-sm text-center transition-all outline-none ${
                      contactInfo.urgency === urg 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-200 hover:bg-neutral-50'
                  }`}
                >
                  {urg}
                </button>
              ))}
            </div>
          </div>

        </div>

        <p className="mt-8 text-xs text-neutral-400 text-center flex items-center justify-center gap-1.5 font-medium">
          <span className="text-sm">🔒</span> Your information is secure. We respect your privacy and will only contact you about your asset tracking enquiry. POPIA compliant.
        </p>

      </div>
    </motion.div>
  );
}
