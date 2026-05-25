import React, { useState } from 'react';
import { useCheckoutStore } from '../store/useCheckoutStore';
import { AlertCircle } from 'lucide-react';
import { 
  validateFirstName, 
  validateSurname, 
  validateEmail, 
  validatePostalCode, 
  validatePhone, 
  validateIdNumber, 
  validateAddress 
} from '../utils/formValidation';

export function CustomerInfoForm() {
  const { customer, setCustomer, lead } = useCheckoutStore();
  const [visited, setVisited] = useState<Record<string, boolean>>({});

  // Pre-fill form from lead if valid
  React.useEffect(() => {
    if (lead?.capturedAt && !lead?.skipped) {
      setCustomer({
         firstName: lead.firstName || customer.firstName,
         email: lead.email || customer.email,
         phone: lead.phone || customer.phone
      });
    }
  }, [lead?.capturedAt, lead?.skipped]);

  React.useEffect(() => {
    const handleAttempt = () => {
      setVisited({
        firstName: true,
        surname: true,
        email: true,
        phone: true,
        idNumber: true,
        postalCode: true,
        address: true,
      });
    };
    window.addEventListener('checkout-validation-failed', handleAttempt);
    return () => {
      window.removeEventListener('checkout-validation-failed', handleAttempt);
    };
  }, []);

  const handleBlur = (field: string) => {
    setVisited(prev => ({ ...prev, [field]: true }));
  };

  const getFieldError = (field: string) => {
    const value = customer[field as keyof typeof customer] || '';
    if (field === 'firstName') return validateFirstName(value).error;
    if (field === 'surname') return validateSurname(value).error;
    if (field === 'email') return validateEmail(value).error;
    if (field === 'phone') return validatePhone(value).error;
    if (field === 'idNumber') return validateIdNumber(value).error;
    if (field === 'postalCode') return validatePostalCode(value).error;
    if (field === 'address') return validateAddress(value).error;
    return null;
  };

  const getInputClassName = (field: string) => {
    const baseClasses = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors";
    const value = customer[field as keyof typeof customer] || '';
    
    if (field === 'cityProvince') {
      return `${baseClasses} border-gray-300 focus:ring-emerald-500`;
    }

    const hasVisited = visited[field];
    const errorMsg = getFieldError(field);

    if (hasVisited) {
      if (errorMsg) {
        return `${baseClasses} border-red-500 focus:ring-red-500 bg-red-50 text-red-950`;
      } else if (value) {
        return `${baseClasses} border-emerald-500 focus:ring-emerald-500`;
      }
    }
    return `${baseClasses} border-gray-300 focus:ring-emerald-500`;
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm mt-8">
      <h3 className="text-xl font-bold text-neutral-800 mb-6">Your Details</h3>
      
      {lead?.capturedAt && !lead?.skipped && (
        <div className="bg-[#9ACA3C]/10 border border-[#9ACA3C]/30 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium flex items-start sm:items-center gap-3 mb-6">
           <span className="shrink-0 mt-0.5 sm:mt-0 text-[#9ACA3C] font-bold">INFO:</span>
           <span>Pre-filled from your quote details &mdash; please verify and add your ID to complete.</span>
        </div>
      )}

      <div className="space-y-4">
        {/* ROW 1: First Name | Surname */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={customer.firstName || ''}
              onChange={(e) => setCustomer({ firstName: e.target.value })}
              onBlur={() => handleBlur('firstName')}
              className={getInputClassName('firstName')}
              required
            />
            {visited.firstName && getFieldError('firstName') && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getFieldError('firstName')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Surname <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="surname"
              value={customer.surname || ''}
              onChange={(e) => setCustomer({ surname: e.target.value })}
              onBlur={() => handleBlur('surname')}
              className={getInputClassName('surname')}
              required
            />
            {visited.surname && getFieldError('surname') && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getFieldError('surname')}
              </p>
            )}
          </div>
        </div>
        
        {/* ROW 2: Email | Postal Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={customer.email || ''}
              onChange={(e) => setCustomer({ email: e.target.value })}
              onBlur={() => handleBlur('email')}
              className={getInputClassName('email')}
              required
            />
            {visited.email && getFieldError('email') && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getFieldError('email')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={customer.postalCode || ''}
              onChange={(e) => setCustomer({ postalCode: e.target.value })}
              onBlur={() => handleBlur('postalCode')}
              placeholder="e.g. 7700"
              maxLength={4}
              className={getInputClassName('postalCode')}
              required
            />
            {visited.postalCode && getFieldError('postalCode') && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getFieldError('postalCode')}
              </p>
            )}
          </div>
        </div>
        
        {/* ROW 3: City/Province | Phone | ID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              City/Province
            </label>
            <input
              type="text"
              name="cityProvince"
              value={customer.cityProvince || ''}
              onChange={(e) => setCustomer({ cityProvince: e.target.value })}
              placeholder="e.g. Cape Town, WC"
              className={getInputClassName('cityProvince')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <span className="inline-flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700">
                +27
              </span>
              <input
                type="tel"
                name="phone"
                value={customer.phone || ''}
                onChange={(e) => setCustomer({ phone: e.target.value.replace(/\D/g, '').slice(0, 9) })}
                onBlur={() => handleBlur('phone')}
                placeholder="712345678"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            {visited.phone && getFieldError('phone') && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getFieldError('phone')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              ID / Passport Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="idNumber"
              value={customer.idNumber || ''}
              onChange={(e) => setCustomer({ idNumber: e.target.value })}
              onBlur={() => handleBlur('idNumber')}
              className={getInputClassName('idNumber')}
              required
            />
            {visited.idNumber && getFieldError('idNumber') && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {getFieldError('idNumber')}
              </p>
            )}
          </div>
        </div>
        
        {/* ROW 4: Address (full width) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={customer.address || ''}
            onChange={(e) => setCustomer({ address: e.target.value })}
            onBlur={() => handleBlur('address')}
            placeholder="Street address (e.g. 12 Main Road, Sea Point)"
            rows={2}
            className={`${getInputClassName('address')} resize-none`}
            required
          />
          {visited.address && getFieldError('address') && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {getFieldError('address')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
