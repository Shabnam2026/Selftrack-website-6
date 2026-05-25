const fs = require('fs');
let file = fs.readFileSync('src/Pricing.tsx', 'utf-8');
const subStart = file.indexOf('      {/* Subscription Plans Section */}');
const hwStart = file.indexOf('      {/* Hardware Pricing Section */}');
const hwEnd = file.indexOf('      {/* Price Calculator Widget */}');

if (subStart !== -1 && hwStart !== -1 && hwEnd !== -1) {
    const preSub = file.substring(0, subStart);
    const subHTML = file.substring(subStart, hwStart);
    const hwHTML = file.substring(hwStart, hwEnd);
    const postHw = file.substring(hwEnd);

    const newFile = preSub + hwHTML + subHTML + postHw;
    fs.writeFileSync('src/Pricing.tsx', newFile);
    console.log("Successfully swapped");
} else {
    console.log("Could not find sections");
}
