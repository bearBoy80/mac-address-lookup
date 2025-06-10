const macLookup = require('./index.js');

console.log('=== MAC Address Lookup Example ===\n');

// Test different MAC address formats
const testMacs = [
  '10:00:20:11:3A:B7',  // Apple
  '10-00-20-11-3A-B7',  // Apple (different separator)
  '100020113AB7',       // Apple (no separator)
  '08:00:27:12:34:56',  // Oracle
  '00:50:56:AA:BB:CC',  // VMware
  'AA:BB:CC:DD:EE:FF',  // Unknown vendor
];

console.log('1. Basic lookup functionality:');
testMacs.forEach(mac => {
  try {
    const result = macLookup.lookup(mac);
    if (result) {
      console.log(`${mac} -> ${result.vendor}`);
      if (result.address) {
        console.log(`   Address: ${result.address.split('\n')[0]}`);
      }
    } else {
      console.log(`${mac} -> Vendor not found`);
    }
  } catch (error) {
    console.log(`${mac} -> Error: ${error.message}`);
  }
});

console.log('\n2. Simple vendor name lookup:');
testMacs.slice(0, 3).forEach(mac => {
  const vendor = macLookup.getVendor(mac);
  console.log(`${mac} -> ${vendor || 'Unknown'}`);
});

console.log('\n3. MAC address validation:');
const validationTests = [
  '10:00:20:11:3A:B7',
  '100020113AB7',
  'GG:HH:II:JJ:KK:LL',
  '12:34',
  '',
];

validationTests.forEach(mac => {
  console.log(`${mac || '(empty string)'} -> ${macLookup.isValid(mac) ? 'Valid' : 'Invalid'}`);
});

console.log('\n4. MAC address formatting:');
const formatTests = [
  { mac: '100020113AB7', separator: ':' },
  { mac: '100020113AB7', separator: '-' },
  { mac: '10:00:20:11:3A:B7', separator: '.' },
];

formatTests.forEach(test => {
  try {
    const formatted = macLookup.format(test.mac, test.separator);
    console.log(`${test.mac} (${test.separator}) -> ${formatted}`);
  } catch (error) {
    console.log(`${test.mac} -> Error: ${error.message}`);
  }
});

console.log('\n5. Database statistics:');
const stats = macLookup.stats();
console.log(`Total OUI entries: ${stats.totalOUIs.toLocaleString()}`);
console.log(`Unique vendors: ${stats.uniqueVendors.toLocaleString()}`);
console.log(`Data version: ${stats.lastUpdated}`);

console.log('\n6. Detailed information lookup:');
const detailMac = '10:00:20:11:3A:B7';
const detail = macLookup.lookup(detailMac);
if (detail) {
  console.log(`MAC: ${detailMac}`);
  console.log(`OUI: ${detail.oui}`);
  console.log(`Vendor: ${detail.vendor}`);
  console.log(`Address: ${detail.address}`);
} 