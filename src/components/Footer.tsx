import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#4a4a4a] pt-[40px] px-[48px] pb-[24px] font-sans">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[220px_1fr_1fr_1fr_1fr] gap-[32px] items-start">
        
        {/* Column 1: Logo + Copyright + Social + VSS */}
        <div className="flex flex-col items-start">
          <Link to="/" className="flex items-center mb-2">
            <img src="https://borneohalfmarathon.com/wp-content/uploads/2026/04/logo_white@2x-1.png" alt="Selftrack Logo" className="h-[40px] w-auto object-contain" />
          </Link>
          
          <p className="text-[14px] text-[#909090] mb-8">© 2026 Selftrack.</p>

          <h4 className="text-[13px] uppercase tracking-[1.2px] text-[#b8b8b8] mb-4">GET SOCIAL</h4>
          <div className="flex items-center gap-[10px] mb-8">
            <a href="https://www.facebook.com/selftrackheadoffice/" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full border border-white/25 flex items-center justify-center text-[#b8b8b8] hover:text-[#C8E64A] hover:border-[#C8E64A] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.397,20.997v-8.196h2.765l0.411-3.209h-3.176V7.548c0-0.926,0.258-1.56,1.587-1.56h1.684V3.127 C15.849,3.039,15.025,2.997,14.201,3c-2.444,0-4.122,1.492-4.122,4.231v2.355H7.332v3.209h2.753v8.202H13.397z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/selftrack-vehicle-tracking/" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full border border-white/25 flex items-center justify-center text-[#b8b8b8] hover:text-[#C8E64A] hover:border-[#C8E64A] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/selftrackheadoffice/" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full border border-white/25 flex items-center justify-center text-[#b8b8b8] hover:text-[#C8E64A] hover:border-[#C8E64A] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://x.com/Selftrack1" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full border border-white/25 flex items-center justify-center text-[#b8b8b8] hover:text-[#C8E64A] hover:border-[#C8E64A] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/UC084WS1OPOFeqxZRHGRb29w" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full border border-white/25 flex items-center justify-center text-[#b8b8b8] hover:text-[#C8E64A] hover:border-[#C8E64A] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>

          <a href="https://vssadmin.co.za/" target="_blank" rel="noopener noreferrer" className="inline-block bg-white p-2 rounded-lg hover:opacity-80 transition-opacity mt-2">
            <img src="https://borneohalfmarathon.com/wp-content/uploads/2026/04/Logo.jpg" alt="VSS Accredited" className="h-[40px] w-auto object-contain" />
          </a>
        </div>

        {/* Column 2: Documents */}
        <div className="flex flex-col items-start lg:pl-4">
          <h4 className="text-[13px] uppercase tracking-[1.2px] text-[#b8b8b8] mb-[16px]">DOCUMENTS</h4>
          <div className="flex flex-col w-full">
            <a href="#" className="block text-[16px] text-[#e0e0e0] leading-[1.5] mb-[10px] hover:text-[#C8E64A] transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="block text-[16px] text-[#e0e0e0] leading-[1.5] mb-[10px] hover:text-[#C8E64A] transition-colors">Privacy Policy</a>
            <a href="#" className="block text-[16px] text-[#e0e0e0] leading-[1.5] mb-[10px] hover:text-[#C8E64A] transition-colors">POPI Compliance Manual</a>
            <a href="#" className="block text-[16px] text-[#e0e0e0] leading-[1.5] hover:text-[#C8E64A] transition-colors">PAIA Manual</a>
          </div>
        </div>

        {/* Column 3: Support */}
        <div className="flex flex-col items-start lg:pl-4">
          <h4 className="text-[13px] uppercase tracking-[1.2px] text-[#b8b8b8] mb-[16px]">SUPPORT</h4>
          <div className="flex flex-col w-full">
            <Link to="/support" className="block text-[16px] text-[#e0e0e0] leading-[1.5] mb-[10px] hover:text-[#C8E64A] transition-colors">Help Center &amp; FAQ</Link>
            <Link to="/blogs" className="block text-[16px] text-[#e0e0e0] leading-[1.5] hover:text-[#C8E64A] transition-colors">Blogs</Link>
          </div>
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col items-start lg:pl-4">
          <h4 className="text-[13px] uppercase tracking-[1.2px] text-[#b8b8b8] mb-[16px]">CONTACT</h4>
          <div className="text-[16px] text-[#e0e0e0] leading-[1.6] flex flex-col">
            <p><span className="text-[#ffffff] font-bold">Head Office:</span> 012 460 1495</p>
            <p><span className="text-[#ffffff] font-bold">Customer Care:</span> 066 480 5375</p>
            <p><span className="text-[#ffffff] font-bold">Sales:</span> 071 604 6133</p>
          </div>
        </div>

        {/* Column 5: Find Us */}
        <div className="flex flex-col items-start lg:pl-4">
          <h4 className="text-[13px] uppercase tracking-[1.2px] text-[#b8b8b8] mb-[16px]">FIND US</h4>
          <div className="text-[16px] text-[#e0e0e0] leading-[1.6] mb-2 flex flex-col">
            <span>Kings Corner</span>
            <span>475 Kings Highway (cnr Rodericks Road)</span>
            <span>Lynnwood 0081</span>
            <span>PRETORIA, Gauteng, SA</span>
          </div>
          <a href="#" className="block text-[16px] text-[#C8E64A] hover:underline hover:text-[#C8E64A] transition-colors">View on Map</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
