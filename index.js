const ouiData = require('oui-data');

/**
 * Normalize MAC address format
 * @param {string} mac - MAC address
 * @returns {string} Normalized MAC address prefix (6 digits)
 */
function normalizeMac(mac) {
  if (!mac || typeof mac !== 'string') {
    throw new Error('MAC address must be a string');
  }

  // Remove all non-hexadecimal characters
  const cleaned = mac.replace(/[^0-9a-fA-F]/g, '');
  
  if (cleaned.length < 6) {
    throw new Error('MAC address must contain at least 6 hex digits');
  }

  // Return first 6 digits and convert to uppercase
  return cleaned.slice(0, 6).toUpperCase();
}

/**
 * Query vendor information for a MAC address
 * @param {string} mac - MAC address, supports multiple formats: "00:1B:44:11:3A:B7", "00-1B-44-11-3A-B7", "001B44113AB7"
 * @returns {object|null} Vendor information object, returns null if not found
 */
function lookup(mac) {
  try {
    const oui = normalizeMac(mac);
    const vendorInfo = ouiData[oui];
    
    if (!vendorInfo) {
      return null;
    }

    // Parse vendor information
    const lines = vendorInfo.split('\n');
    const vendor = lines[0] || 'Unknown';
    const address = lines.slice(1).join('\n').trim() || '';

    return {
      oui: oui,
      vendor: vendor,
      address: address,
      raw: vendorInfo
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Get simplified vendor name
 * @param {string} mac - MAC address
 * @returns {string|null} Vendor name, returns null if not found
 */
function getVendor(mac) {
  const result = lookup(mac);
  return result ? result.vendor : null;
}

/**
 * Check if MAC address is valid
 * @param {string} mac - MAC address
 * @returns {boolean} Whether it's valid
 */
function isValid(mac) {
  try {
    normalizeMac(mac);
    return true;
  } catch {
    return false;
  }
}

/**
 * Format MAC address
 * @param {string} mac - MAC address
 * @param {string} separator - Separator, defaults to ':'
 * @returns {string} Formatted MAC address
 */
function format(mac, separator = ':') {
  const cleaned = mac.replace(/[^0-9a-fA-F]/g, '');
  
  if (cleaned.length !== 12) {
    throw new Error('MAC address must contain exactly 12 hex digits');
  }

  return cleaned.match(/.{2}/g).join(separator).toUpperCase();
}

/**
 * Get database statistics
 * @returns {object} Object containing vendor count and other statistics
 */
function stats() {
  const totalEntries = Object.keys(ouiData).length;
  const vendors = new Set();
  
  Object.values(ouiData).forEach(info => {
    const vendor = info.split('\n')[0];
    vendors.add(vendor);
  });

  return {
    totalOUIs: totalEntries,
    uniqueVendors: vendors.size,
    lastUpdated: require('./package.json').dependencies['oui-data']
  };
}

module.exports = {
  lookup,
  getVendor,
  isValid,
  format,
  stats,
  // Aliases
  find: lookup,
  vendor: getVendor,
  validate: isValid
}; 