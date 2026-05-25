import React from 'react';
import { Minus, Plus, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface DeviceCardProps {
  title: string;
  icon: React.ElementType;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export function DeviceCard({ title, icon: Icon, quantity, onQuantityChange }: DeviceCardProps) {
  const isSelected = quantity > 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`relative flex flex-col items-center p-6 bg-white rounded-xl border-2 transition-all overflow-hidden ${
        isSelected ? 'border-emerald-500 shadow-emerald-100 shadow-lg' : 'border-neutral-200 hover:border-emerald-300 shadow-sm'
      }`}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1 z-10">
          <Check size={10} /> SELECTED
        </div>
      )}
      
      <div className={`p-4 rounded-full mb-4 transition-colors ${isSelected ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-100 text-neutral-500'}`}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className="font-bold text-lg text-neutral-800 mb-6">{title}</h3>
      
      <div className="mt-auto flex items-center gap-4 bg-neutral-50 rounded-full p-1 border border-neutral-100">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm border border-neutral-200 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          onClick={() => onQuantityChange(quantity - 1)}
          disabled={quantity <= 0}
        >
          <Minus size={16} />
        </button>
        <div className="w-6 text-center font-bold text-neutral-800">
          {quantity}
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm border border-neutral-200 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          onClick={() => onQuantityChange(quantity + 1)}
          disabled={quantity >= 10}
        >
          <Plus size={16} />
        </button>
      </div>
    </motion.div>
  );
}
