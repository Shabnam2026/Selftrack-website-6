import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HighRiskBannerProps {
  show: boolean;
}

export function HighRiskBanner({ show }: HighRiskBannerProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex items-start gap-3 p-4 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-sm">
            <AlertTriangle className="shrink-0 text-amber-500 mt-0.5" size={20} />
            <p>
              <strong>⚠ This is a high-risk vehicle.</strong> A backup tracker is required for insurance purposes.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
