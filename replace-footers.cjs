const fs = require('fs');
const path = require('path');

const files = [
  'AssetTracking.tsx',
  'Business.tsx',
  'Family.tsx',
  'FleetTelematics.tsx',
  'FleetTracking.tsx',
  'GetQuote.tsx',
  'Home.tsx',
  'IndustrySolutions.tsx',
  'PersonalTracking.tsx',
  'Pricing.tsx',
  'RouteOptimisation.tsx',
  'Shop.tsx',
  'SolutionBuilder.tsx',
  'Support.tsx',
  'VehicleTracking.tsx',
  'VideoTelematics.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, 'src', file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace footer block
  // We need to match <footer... > ... </footer>
  // since regex matches across multiple lines, we can use [\s\S]*?
  content = content.replace(/<footer[\s\S]*?<\/footer>/, '<Footer />');
  
  // Now add import Footer from './components/Footer';
  if (!content.includes('import Footer')) {
    // add it after the imports
    content = content.replace(/(import .*;\n)(?!import)/, '$1import Footer from "./components/Footer";\n');
  }

  fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Done');
