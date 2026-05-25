import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Business from './Business';
import Contact from './Contact';
import Family from './Family';
import CheckoutWizard from './CheckoutWizard';
import FleetTelematics from './FleetTelematics';
import AssetTracking from './AssetTracking';
import FleetTracking from './FleetTracking';
import GetQuote from './GetQuote';
import IndustrySolutions from './IndustrySolutions';
import PersonalTracking from './PersonalTracking';
import Recommendation from './Recommendation';
import RouteOptimisation from './RouteOptimisation';
import SolutionBuilder from './SolutionBuilder';
import Support from './Support';
import VehicleTracking from './VehicleTracking';
import VideoTelematics from './VideoTelematics';
import Blog from './Blog';
import AssetQuoteFunnel from './pages/AssetQuoteFunnel';
import AssetTrackingThankYou from './pages/AssetTrackingThankYou';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import PersonCheckoutLayout from './components/person/PersonCheckoutLayout';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/business" element={<Business />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/family" element={<Family />} />
        <Route path="/pricing" element={<CheckoutWizard />} />
        <Route path="/checkout/person" element={<PersonCheckoutLayout />} />
        <Route path="/fleet-telematics" element={<FleetTelematics />} />
        <Route path="/asset" element={<AssetTracking />} />
        <Route path="/asset-tracking/quote" element={<AssetQuoteFunnel />} />
        <Route path="/asset-tracking/thank-you" element={<AssetTrackingThankYou />} />
        <Route path="/fleet-tracking" element={<FleetTracking />} />
        <Route path="/get-quote" element={<GetQuote />} />
        <Route path="/industry-solutions" element={<IndustrySolutions />} />
        <Route path="/personal" element={<PersonalTracking />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/route-optimisation" element={<RouteOptimisation />} />
        <Route path="/solution-builder" element={<SolutionBuilder />} />
        <Route path="/support" element={<Support />} />
        <Route path="/vehicle" element={<VehicleTracking />} />
        <Route path="/video-telematics" element={<VideoTelematics />} />
        <Route path="/blogs" element={<Blog />} />
      </Routes>
    </>
  );
}
