const assert = require('assert');
const macLookup = require('./index.js');

console.log('Running tests...\n');

// Test 1: Basic lookup functionality
console.log('Test 1: Basic lookup');
const appleResult = macLookup.lookup('10:00:20:11:3A:B7');
assert.strictEqual(appleResult.vendor, 'Apple, Inc.');
assert.strictEqual(appleResult.oui, '100020');
console.log('✓ Basic lookup works');

// Test 2: Different MAC address format support
console.log('\nTest 2: Different MAC formats');
const formats = [
  '10:00:20:11:3A:B7',
  '10-00-20-11-3A-B7',
  '100020113AB7'
];
formats.forEach(format => {
  const result = macLookup.lookup(format);
  assert.strictEqual(result.vendor, 'Apple, Inc.');
});
console.log('✓ Different formats supported');

// Test 3: getVendor simplified function
console.log('\nTest 3: getVendor function');
const vendor = macLookup.getVendor('10:00:20:11:3A:B7');
assert.strictEqual(vendor, 'Apple, Inc.');
console.log('✓ getVendor works');

// Test 4: Unknown MAC address
console.log('\nTest 4: Unknown MAC');
const unknown = macLookup.lookup('FF:FF:FF:AA:BB:CC');
assert.strictEqual(unknown, null);
console.log('✓ Unknown MAC returns null');

// Test 5: MAC address validation
console.log('\nTest 5: MAC validation');
assert.strictEqual(macLookup.isValid('10:00:20:11:3A:B7'), true);
assert.strictEqual(macLookup.isValid('100020113AB7'), true);
assert.strictEqual(macLookup.isValid('GG:HH:II:JJ:KK:LL'), false);
assert.strictEqual(macLookup.isValid('12:34'), false);
assert.strictEqual(macLookup.isValid(''), false);
console.log('✓ MAC validation works');

// Test 6: MAC address formatting
console.log('\nTest 6: MAC formatting');
assert.strictEqual(macLookup.format('001b44113ab7'), '00:1B:44:11:3A:B7');
assert.strictEqual(macLookup.format('001b44113ab7', '-'), '00-1B-44-11-3A-B7');
console.log('✓ MAC formatting works');

// Test 7: Error handling
console.log('\nTest 7: Error handling');
try {
  macLookup.lookup(null);
  assert.fail('Should throw error for null input');
} catch (error) {
  assert.strictEqual(error.message, 'MAC address must be a string');
}

try {
  macLookup.lookup('123');
  assert.fail('Should throw error for short input');
} catch (error) {
  assert.strictEqual(error.message, 'MAC address must contain at least 6 hex digits');
}
console.log('✓ Error handling works');

// Test 8: Statistics information
console.log('\nTest 8: Statistics');
const stats = macLookup.stats();
assert(stats.totalOUIs > 0);
assert(stats.uniqueVendors > 0);
assert(typeof stats.lastUpdated === 'string');
console.log('✓ Statistics work');

// Test 9: Alias functions
console.log('\nTest 9: Alias functions');
assert.strictEqual(typeof macLookup.find, 'function');
assert.strictEqual(typeof macLookup.vendor, 'function');
assert.strictEqual(typeof macLookup.validate, 'function');
console.log('✓ Alias functions exist');

console.log('\n🎉 All tests passed!');
console.log(`Total OUIs in database: ${macLookup.stats().totalOUIs.toLocaleString()}`); 