import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Lock, ChevronDown } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const businessPaths = [
    '/business', 
    '/fleet-tracking', 
    '/fleet-telematics', 
    '/video-telematics', 
    '/route-optimisation', 
    '/industry-solutions',
    '/get-quote',
    '/solution-builder'
  ];
  
  const isBusiness = businessPaths.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const personalSolutions = [
    { label: 'VEHICLE TRACKING', path: '/vehicle' },
    { label: 'PERSONAL TRACKING', path: '/personal' },
    { label: 'ASSET TRACKING', path: '/asset' },
  ];

  const businessSolutions = [
    { label: 'SELFTRACK', path: '/fleet-tracking' },
    { label: 'SELFCAM', path: '/video-telematics' },
    { label: 'SELFFLEET', path: '/industry-solutions' },
  ];

  const memberLogins = [
    { label: 'SelfTRACK', url: 'https://tracking.selftrack.co.za/login' },
    { label: 'SelfCAM', url: 'https://vizionzone1.com/basic/register-login/default.html' },
    { label: 'SelfFLEET', url: 'https://fmis.fleetdomain.co.za/bureau/' },
  ];

  const DropdownItem = ({ label, path, isExternal = false }: { label: string, path?: string, isExternal?: boolean, key?: string | number }) => {
    const content = (
      <>
        <div className="flex items-center gap-2">
          {isExternal && <Lock size={14} className="text-[#9ACA3C]" />}
          <span>{label}</span>
        </div>
      </>
    );

    const className = "group flex items-center justify-between px-[20px] py-[12px] text-white text-[14px] font-sans hover:bg-[#4A4A4A] border-l-[3px] border-transparent hover:border-l-[#9ACA3C] transition-colors w-full text-left";

    if (isExternal && path) {
      return (
        <a href={path} target="_blank" rel="noopener noreferrer" className={className}>
          {content}
        </a>
      );
    }

    return (
      <Link to={path || '#'} className={className}>
        {content}
      </Link>
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`sticky top-0 w-full z-[100] bg-[#555759] h-[64px] transition-shadow duration-300 font-sans ${
        isScrolled ? 'shadow-[0_2px_8px_rgba(0,0,0,0.4)]' : ''
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto h-full pl-[24px] flex items-center">
        {/* LEFT SIDE - Logo and Slider */}
        <div className="flex-[0_0_auto] flex items-center h-full mr-8">
          <Logo />
          

        </div>

        {/* CENTRE - Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center flex-auto h-full gap-[40px]">
          {/* HOME */}
          <Link 
            to="/" 
            className={`flex items-center h-full text-white text-[14px] font-medium uppercase tracking-[0.08em] border-b-[2px] transition-colors ${
              isActive('/') ? 'border-[#9ACA3C]' : 'border-transparent hover:border-[#9ACA3C]'
            }`}
          >
            HOME
          </Link>

          {/* PERSONAL SOLUTIONS */}
          <div 
            className="relative flex items-center h-full group"
            onMouseEnter={() => setActiveDropdown('personal')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div 
              className={`cursor-pointer flex items-center gap-1 h-full text-white text-[14px] font-medium uppercase tracking-[0.08em] border-b-[2px] transition-colors ${
                activeDropdown === 'personal' || ['/vehicle', '/personal', '/asset'].includes(location.pathname) ? 'border-[#9ACA3C]' : 'border-transparent group-hover:border-[#9ACA3C]'
              }`}
            >
              PERSONAL SOLUTIONS <ChevronDown size={16} />
            </div>
            {activeDropdown === 'personal' && (
              <div className="absolute top-[64px] left-1/2 -translate-x-1/2 bg-[#3D3D3D] rounded-[8px] border-[0.5px] border-[#666666] py-[8px] min-w-[220px] shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                {personalSolutions.map((item) => (
                  <DropdownItem key={item.label} label={item.label} path={item.path} />
                ))}
              </div>
            )}
          </div>

          {/* BUSINESS SOLUTIONS */}
          <div 
            className="relative flex items-center h-full group"
            onMouseEnter={() => setActiveDropdown('business')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div 
              className={`cursor-pointer flex items-center gap-1 h-full text-white text-[14px] font-medium uppercase tracking-[0.08em] border-b-[2px] transition-colors ${
                activeDropdown === 'business' || ['/fleet-tracking', '/video-telematics', '/industry-solutions'].includes(location.pathname) ? 'border-[#9ACA3C]' : 'border-transparent group-hover:border-[#9ACA3C]'
              }`}
            >
              BUSINESS SOLUTIONS <ChevronDown size={16} />
            </div>
            {activeDropdown === 'business' && (
              <div className="absolute top-[64px] left-1/2 -translate-x-1/2 bg-[#3D3D3D] rounded-[8px] border-[0.5px] border-[#666666] py-[8px] min-w-[220px] shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                {businessSolutions.map((item) => (
                  <DropdownItem key={item.label} label={item.label} path={item.path} />
                ))}
              </div>
            )}
          </div>

          {/* ABOUT US */}
          <Link 
            to="/about" 
            className={`flex items-center h-full text-white text-[14px] font-medium uppercase tracking-[0.08em] border-b-[2px] transition-colors ${
              isActive('/about') ? 'border-[#9ACA3C]' : 'border-transparent hover:border-[#9ACA3C]'
            }`}
          >
            ABOUT US
          </Link>

          {/* CONTACT US */}
          <Link 
            to="/contact" 
            className={`flex items-center h-full text-white text-[14px] font-medium uppercase tracking-[0.08em] border-b-[2px] transition-colors ${
              isActive('/contact') ? 'border-[#9ACA3C]' : 'border-transparent hover:border-[#9ACA3C]'
            }`}
          >
            CONTACT US
          </Link>
          
          {/* MEMBER LOGIN */}
          <div 
            className="relative flex items-center h-full group"
            onMouseEnter={() => setActiveDropdown('login')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div 
              className={`cursor-pointer flex items-center gap-1 h-full text-white text-[14px] font-medium uppercase tracking-[0.08em] border-b-[2px] transition-colors ${
                activeDropdown === 'login' ? 'border-[#9ACA3C]' : 'border-transparent group-hover:border-[#9ACA3C]'
              }`}
            >
              MEMBER LOGIN <ChevronDown size={16} />
            </div>
            {activeDropdown === 'login' && (
              <div className="absolute top-[64px] left-1/2 -translate-x-1/2 bg-[#3D3D3D] rounded-[8px] border-[0.5px] border-[#666666] py-[8px] min-w-[220px] shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                {memberLogins.map((item) => (
                  <DropdownItem key={item.label} label={item.label} path={item.url} isExternal />
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT SIDE - Mobile Hamburger */}
        <div className="flex-1 flex justify-end items-center h-full pr-[24px]">

          {/* Mobile Hamburger Menu */}
          <div 
            className="lg:hidden flex items-center cursor-pointer ml-6"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-[280px] bg-[#3D3D3D] shadow-2xl flex flex-col pt-6 font-sans">
            <div className="flex justify-between items-center px-6 mb-8">
              <Logo />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>



            <nav className="flex flex-col">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-8 py-4 text-white text-[14px] font-bold uppercase tracking-wider border-l-4 ${isActive('/') ? 'bg-[#4A4A4A] border-[#9ACA3C]' : 'border-transparent'}`}
              >
                HOME
              </Link>
              
              <div className="px-8 py-4 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-4 mb-2">
                Personal Solutions
              </div>
              {personalSolutions.map(item => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-10 py-3 text-white text-[13px] font-medium transition-colors hover:text-[#9ACA3C] ${isActive(item.path) ? 'text-[#9ACA3C]' : ''}`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="px-8 py-4 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-4 mb-2">
                Business Solutions
              </div>
              {businessSolutions.map(item => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-10 py-3 text-white text-[13px] font-medium transition-colors hover:text-[#9ACA3C] ${isActive(item.path) ? 'text-[#9ACA3C]' : ''}`}
                >
                  {item.label}
                </Link>
              ))}

              <Link 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-8 py-4 text-white text-[14px] font-bold uppercase tracking-wider border-l-4 mt-6 ${isActive('/about') ? 'bg-[#4A4A4A] border-[#9ACA3C]' : 'border-transparent'}`}
              >
                ABOUT US
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-8 py-4 text-white text-[14px] font-bold uppercase tracking-wider border-l-4 ${isActive('/contact') ? 'bg-[#4A4A4A] border-[#9ACA3C]' : 'border-transparent'}`}
              >
                CONTACT US
              </Link>
            </nav>

            <div className="mt-auto p-6 bg-black/20 flex flex-col gap-4">
              <div className="text-[10px] font-black text-[#9ACA3C] uppercase tracking-wider">Member Support</div>
              <div className="text-white text-xs font-bold">RECOVERY: 0861 742 778</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
