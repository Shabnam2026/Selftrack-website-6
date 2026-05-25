import React, { useState } from 'react';

/**
 * Tooltip component that shows on hover.
 * Wraps children and displays description above them.
 * 
 * Props:
 *   - content: string  // tooltip text
 *   - children: ReactNode  // element to wrap
 *   - disabled?: boolean  // skip rendering if no content
 */
export function Tooltip({ content, children, disabled = false }: { content?: string, children: React.ReactNode, disabled?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  
  // If no content, just render children without tooltip
  if (disabled || !content || content.trim() === '') {
    return <>{children}</>;
  }
  
  return (
    <div 
      className="relative inline-block w-full"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <div 
        className={`absolute z-50 bottom-full left-1/2 -translate-x-1/2 
                    mb-2 w-64 max-w-[280px] pointer-events-none transition-opacity duration-200
                    ${isVisible ? 'opacity-100' : 'opacity-0 invisible'}`}
        role="tooltip"
      >
        <div className="bg-gray-900 text-white text-xs rounded-lg 
                        shadow-lg px-3 py-2 leading-relaxed">
          {content}
        </div>
        {/* Arrow pointing down to the hovered element */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 
                        border-4 border-transparent border-t-gray-900">
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
