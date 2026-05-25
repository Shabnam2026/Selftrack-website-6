import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="pt-0 mt-0">
        <section className="h-auto md:h-[calc(100vh-64px)] flex flex-col md:flex-row w-full overflow-hidden">
          <Link to="/family" className="block relative w-full md:w-1/2 h-[512px] md:h-full group cursor-pointer overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAu6gS1jArdHuAzLe2te7o7Zry7YpkTUp43yrtN3MM3Q6BOPrHjsLS09xdreMl467xLlLkIRZT45Xu-dO9d2PKpzuWAEwIJPwKVi35rE8dxhxsG4BViEHy3HuzI_CYKKxyg_OoEVk3HdEMPSzoi7SR4UJLiiesZv9_E5-hU7Op16VwfUnbYdUkKkqxJEgnnv25D_WHRk00rZqruNS5b5GPQCFnZXMeTYTK9sJPNXe_gx6BT8guYbHVQtSX5_T6UryHFEUPZwUDTT3xX')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:bg-black/40"></div>
            <div className="relative h-full flex flex-col justify-between p-8 md:p-16 z-10">
              <div>
                <span className="text-white text-[12px] font-regular tracking-[0.2em] uppercase mb-4 block">
                  FOR FAMILIES &amp; PERSONAL VEHICLES
                </span>
                <h1 className="text-white font-black text-4xl md:text-[48px] leading-[1.1] max-w-xl mb-6">
                  Protect Your Vehicle and Loved Ones
                </h1>
                <p className="text-white/70 text-lg md:text-[18px] font-regular max-w-md">
                  Realtime GPS Tracking. Stolen Vehicle Recovery. Automated Notifications. — starting from R99/month.
                </p>
              </div>
              <div className="flex justify-center w-full md:hidden">
                <button className="bg-[#9ACA3C] text-white font-black text-[16px] px-10 py-5 rounded-[8px] hover:bg-surface-tint transition-all duration-300 shadow-xl active:scale-95">
                  TRACK MY VEHICLE
                </button>
              </div>
            </div>
          </Link>

          <div className="relative w-full md:w-1/2 h-[512px] md:h-full group cursor-pointer overflow-hidden bg-zinc-900" onClick={() => navigate('/business')}>
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA24OWzGeyAvuo_SjGW3ZIwiTbKO6E0UA7GeGLdakiecQgaX2VJx7VTG6VT2IojJvnYaY5rC7wvwC9SLx8E-wjsAUw4hgsKaT8_yrFOp_u9ztV62c38A4xc02z2nv_8YB3J4MqYL4Z3LxDVCwlUxaO-bLTUWVHQ-YkHCZ2g6P_kQaR-2aH07G9VfTTqMI36QyrBoDnfjizJB5IVIQpMvcpZjNz_-aK8nApTZdePaYElfNzOzMoqlXdolB12mkF342k2JtEd8wtmTCC8')" }}
            ></div>
            <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>
            <div className="relative h-full flex flex-col justify-between p-8 md:p-16 z-10">
              <div>
                <span className="text-[#9ACA3C] text-[12px] font-regular tracking-[0.2em] uppercase mb-4 block">
                  FOR BUSINESSES &amp; FLEET MANAGERS
                </span>
                <h1 className="text-white font-black text-4xl md:text-[48px] leading-[1.1] max-w-xl mb-6">
                  Total Fleet Visibility and Control
                </h1>
                <p className="text-white/70 text-lg md:text-[18px] font-regular max-w-md">
                  Asset & Driver Monitoring. Fleet Analytics & Optimisation.
                </p>
              </div>
              <div className="flex justify-center w-full md:hidden">
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate('/business'); }} 
                  className="bg-gradient-to-r from-[#496800] to-[#9ACA3C] text-white font-black text-[16px] px-10 py-5 rounded-lg hover:from-[#364d00] hover:to-[#86b134] transition-all duration-300 shadow-xl active:scale-95"
                >
                  OPTIMISE MY FLEET
                </button>
              </div>
            </div>
          </div>
          
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center pointer-events-none w-max">
          <div className="flex flex-row items-center justify-center gap-8 w-full max-w-6xl">
            <button 
              onClick={() => navigate('/family')}
              className="pointer-events-auto bg-[#9ACA3C] text-white font-black text-[15px] px-10 py-5 rounded-[8px] hover:bg-surface-tint transition-all duration-300 shadow-xl active:scale-95 whitespace-nowrap"
            >
              TRACK MY VEHICLE
            </button>

            <div id="hero-contact-overlay" className="flex flex-col items-center gap-0.5 text-white pointer-events-auto px-6 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl">
              <div id="hero-recovery-number" className="text-sm font-black tracking-widest text-[#9ACA3C]">
                RECOVERY: <span className="text-white">0861 742 778 | 021 834 9750</span>
              </div>
              <div id="hero-contact-details" className="flex gap-4 mt-0.5 text-[11px] font-semibold">
                <span id="hero-head-office"><span className="text-white/50 font-medium tracking-wide">Head Office:</span> 012 460 1495</span>
                <span className="text-white/10">|</span>
                <span id="hero-customer-care"><span className="text-white/50 font-medium tracking-wide">Customer Care:</span> 066 480 5375</span>
                <span className="text-white/10">|</span>
                <span id="hero-sales"><span className="text-white/50 font-medium tracking-wide">Sales:</span> 071 604 6133</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/business')}
              className="pointer-events-auto bg-gradient-to-r from-[#496800] to-[#9ACA3C] text-white font-black text-[15px] px-10 py-5 rounded-lg hover:from-[#364d00] hover:to-[#86b134] transition-all duration-300 shadow-xl active:scale-95 whitespace-nowrap"
            >
              OPTIMISE MY FLEET
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Contact Block */}
      <div className="md:hidden bg-[#111] w-full p-8 flex flex-col items-center gap-4 text-center border-t border-white/5 text-white">
        <div className="text-base font-black tracking-widest text-[#9ACA3C]">
          RECOVERY: <span className="text-white block mt-1">0861 742 778 | 021 834 9750</span>
        </div>
        <div className="flex flex-col gap-3 mt-2 text-sm font-semibold">
          <span><span className="text-white/60 font-medium tracking-wide">Head Office:</span> 012 460 1495</span>
          <span><span className="text-white/60 font-medium tracking-wide">Customer Care:</span> 066 480 5375</span>
          <span><span className="text-white/60 font-medium tracking-wide">Sales:</span> 071 604 6133</span>
        </div>
      </div>
    </main>

      <Footer />
    </>
  );
}
