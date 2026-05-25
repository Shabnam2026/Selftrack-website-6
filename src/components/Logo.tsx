import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = '', variant = 'dark' }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img 
        src="https://borneohalfmarathon.com/wp-content/uploads/2026/04/logo_white@2x.png" 
        alt="SelfTrack Logo" 
        className="h-10 w-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </Link>
  );
}
