# MAC Address Lookup

[![npm version](https://badge.fury.io/js/mac-address-lookup.svg)](https://badge.fury.io/js/mac-address-lookup)
[![Downloads](https://img.shields.io/npm/dm/mac-address-lookup.svg)](https://www.npmjs.com/package/mac-address-lookup)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fast and lightweight Node.js library for MAC address vendor lookup using the IEEE OUI database.

## Features

- 🚀 **Fast Query** - Memory-based lookup with millisecond response time
- 📦 **Lightweight** - Zero dependencies (except oui-data package)
- 🔄 **Multiple Format Support** - Supports various MAC address formats
- 📊 **Complete Information** - Provides vendor name, address and other details
- ✅ **TypeScript** - Type definitions support (planned)
- 🌐 **Offline Support** - Works without internet connection

## Installation

```bash
npm install mac-address-lookup
```

## Quick Start

```javascript
const macLookup = require('mac-address-lookup');

// Basic lookup
const result = macLookup.lookup('10:00:20:11:3A:B7');
console.log(result.vendor); // "Apple, Inc."

// Simple vendor lookup
const vendor = macLookup.getVendor('10:00:20:11:3A:B7');
console.log(vendor); // "Apple, Inc."
```

## API Documentation

### `lookup(mac)`

Query detailed vendor information for a MAC address.

**Parameters:**
- `mac` (string): MAC address in various formats

**Returns:**
- Success: Object containing vendor information
- Not found: `null`

**Example:**
```javascript
const result = macLookup.lookup('10:00:20:11:3A:B7');
// {
//   oui: '100020',
//   vendor: 'Apple, Inc.',
//   address: '1 Infinite Loop\nCupertino CA 95014\nUnited States',
//   raw: 'Apple, Inc.\n1 Infinite Loop\nCupertino CA 95014\nUnited States'
// }
```

### `getVendor(mac)`

Get the vendor name of a MAC address (simplified version).

**Parameters:**
- `mac` (string): MAC address

**Returns:**
- Success: Vendor name string
- Not found: `null`

**Example:**
```javascript
const vendor = macLookup.getVendor('00:50:56:AA:BB:CC');
console.log(vendor); // "VMware, Inc."
```

### `isValid(mac)`

Validate MAC address format.

**Parameters:**
- `mac` (string): MAC address to validate

**Returns:**
- `boolean`: Whether the format is valid

**Example:**
```javascript
console.log(macLookup.isValid('10:00:20:11:3A:B7')); // true
console.log(macLookup.isValid('invalid')); // false
```

### `format(mac, separator)`

Format a MAC address.

**Parameters:**
- `mac` (string): MAC address
- `separator` (string, optional): Separator character, defaults to `:`

**Returns:**
- `string`: Formatted MAC address

**Example:**
```javascript
console.log(macLookup.format('001b44113ab7')); // "00:1B:44:11:3A:B7"
console.log(macLookup.format('001b44113ab7', '-')); // "00-1B-44-11-3A-B7"
```

### `stats()`

Get database statistics.

**Returns:**
- `object`: Object containing statistics

**Example:**
```javascript
const stats = macLookup.stats();
// {
//   totalOUIs: 37496,
//   uniqueVendors: 25637,
//   lastUpdated: "^1.1.362"
// }
```

## Supported MAC Address Formats

The library supports the following MAC address formats:

- `00:1B:44:11:3A:B7` (colon-separated)
- `00-1B-44-11-3A-B7` (hyphen-separated)
- `001B44113AB7` (no separators)
- `001b44113ab7` (lowercase)

## Usage Examples

### Batch Lookup

```javascript
const macs = [
  '10:00:20:11:3A:B7',  // Apple
  '08:00:27:12:34:56',  // Oracle (VirtualBox)
  '00:50:56:AA:BB:CC',  // VMware
];

macs.forEach(mac => {
  const vendor = macLookup.getVendor(mac);
  console.log(`${mac} -> ${vendor || 'Unknown vendor'}`);
});
```

### Error Handling

```javascript
try {
  const result = macLookup.lookup('invalid-mac');
} catch (error) {
  console.error('Lookup failed:', error.message);
}
```

### Integration with Other Libraries

```javascript
const macLookup = require('mac-address-lookup');

// Process network packets
function processPacket(packetData) {
  const srcMac = packetData.sourceMac;
  const vendor = macLookup.getVendor(srcMac);
  
  return {
    ...packetData,
    sourceVendor: vendor
  };
}
```

## Alias Functions

For convenience, the library also provides these aliases:

- `find()` - Alias for `lookup()`
- `vendor()` - Alias for `getVendor()`  
- `validate()` - Alias for `isValid()`

## Data Source

This library uses the [oui-data](https://www.npmjs.com/package/oui-data) package which provides the IEEE OUI database. The database is regularly updated to include the latest vendor registration information.

## Performance

- Query time: < 1ms
- Memory usage: ~4MB (depending on database size)
- Database entries: 37,000+ OUI records

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Issues and Pull Requests are welcome!

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Changelog

### 1.0.0
- Initial release
- Basic MAC address lookup functionality
- Multiple MAC address format support
- Complete API interface 