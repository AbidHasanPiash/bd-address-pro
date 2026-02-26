# bd-address-pro

Complete Bangladesh address data package with all 8 divisions, 64 districts, and 495 upazilas. Includes Bengali (বাংলা) names, coordinates, and powerful search functionality.

[![npm version](https://badge.fury.io/js/bd-address-pro.svg)](https://www.npmjs.com/package/bd-address-pro)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Features

- ✅ Complete data for all **8 Divisions**, **64 Districts**, and **495 Upazilas**
- ✅ **Bengali (বাংলা) names** for all locations
- ✅ **TypeScript** support with full type definitions
- ✅ **Powerful search** with fuzzy matching and autocomplete
- ✅ **Geo-coordinates** for divisions and districts
- ✅ **Zero dependencies** - lightweight and fast
- ✅ Type-safe **enums** for all locations
- ✅ **Tree-shakeable** - import only what you need

## Installation

```bash
# npm
npm install bd-address-pro

# yarn
yarn add bd-address-pro

# pnpm
pnpm add bd-address-pro

# bun
bun add bd-address-pro
```

## Quick Start

```typescript
import {
  getAllDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  search,
} from 'bd-address-pro';

// Get all divisions
const divisions = getAllDivisions();
console.log(divisions);
// [{ id: 1, name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', ... }, ...]

// Get districts in Dhaka division
const dhakaDistricts = getDistrictsByDivision(1);
console.log(dhakaDistricts);
// [{ id: 18, name: 'Dhaka', bnName: 'ঢাকা', divisionId: 1, ... }, ...]

// Search for locations
const results = search('সিলেট');
console.log(results.divisions); // Sylhet division
console.log(results.districts); // Sylhet district
```

## API Reference

### Data Access Functions

#### `getAllDivisions()`
Returns all 8 divisions of Bangladesh.

```typescript
import { getAllDivisions } from 'bd-address-pro';

const divisions = getAllDivisions();
// Returns: Division[]
```

#### `getAllDistricts()`
Returns all 64 districts of Bangladesh.

```typescript
import { getAllDistricts } from 'bd-address-pro';

const districts = getAllDistricts();
// Returns: District[]
```

#### `getAllUpazilas()`
Returns all 495 upazilas of Bangladesh.

```typescript
import { getAllUpazilas } from 'bd-address-pro';

const upazilas = getAllUpazilas();
// Returns: Upazila[]
```

---

### Division Functions

#### `getDivisionById(id: number)`
Get a division by its ID.

```typescript
import { getDivisionById } from 'bd-address-pro';

const dhaka = getDivisionById(1);
// { id: 1, name: 'Dhaka', bnName: 'ঢাকা', slug: 'dhaka', ... }
```

#### `getDivisionBySlug(slug: string)`
Get a division by its URL-friendly slug.

```typescript
import { getDivisionBySlug } from 'bd-address-pro';

const sylhet = getDivisionBySlug('sylhet');
// { id: 6, name: 'Sylhet', bnName: 'সিলেট', slug: 'sylhet', ... }
```

#### `getDivisionByName(name: string)`
Get a division by English or Bengali name.

```typescript
import { getDivisionByName } from 'bd-address-pro';

// English name
const chattogram = getDivisionByName('Chattogram');

// Bengali name
const rajshahi = getDivisionByName('রাজশাহী');
```

---

### District Functions

#### `getDistrictById(id: number)`
Get a district by its ID.

```typescript
import { getDistrictById } from 'bd-address-pro';

const cox = getDistrictById(12);
// { id: 12, name: "Cox's Bazar", bnName: 'কক্সবাজার', divisionId: 2, ... }
```

#### `getDistrictBySlug(slug: string)`
Get a district by its slug.

```typescript
import { getDistrictBySlug } from 'bd-address-pro';

const gazipur = getDistrictBySlug('gazipur');
// { id: 20, name: 'Gazipur', bnName: 'গাজীপুর', divisionId: 1, ... }
```

#### `getDistrictByName(name: string)`
Get a district by English or Bengali name.

```typescript
import { getDistrictByName } from 'bd-address-pro';

const cumilla = getDistrictByName('কুমিল্লা');
// { id: 11, name: 'Cumilla', bnName: 'কুমিল্লা', ... }
```

#### `getDistrictsByDivision(divisionId: number)`
Get all districts in a division.

```typescript
import { getDistrictsByDivision } from 'bd-address-pro';

const khulnaDistricts = getDistrictsByDivision(4);
// Returns all 10 districts in Khulna division
```

#### `getDistrictsByDivisionSlug(divisionSlug: string)`
Get all districts by division slug.

```typescript
import { getDistrictsByDivisionSlug } from 'bd-address-pro';

const rangpurDistricts = getDistrictsByDivisionSlug('rangpur');
// Returns all 8 districts in Rangpur division
```

---

### Upazila Functions

#### `getUpazilaById(id: number)`
Get an upazila by its ID.

```typescript
import { getUpazilaById } from 'bd-address-pro';

const savar = getUpazilaById(151);
// { id: 151, name: 'Savar', bnName: 'সাভার', districtId: 18, ... }
```

#### `getUpazilaBySlug(slug: string)`
Get an upazila by its slug.

```typescript
import { getUpazilaBySlug } from 'bd-address-pro';

const sreemangal = getUpazilaBySlug('sreemangal');
// { id: 470, name: 'Sreemangal', bnName: 'শ্রীমঙ্গল', districtId: 62, ... }
```

#### `getUpazilaByName(name: string)`
Get an upazila by English or Bengali name.

```typescript
import { getUpazilaByName } from 'bd-address-pro';

const teknaf = getUpazilaByName('টেকনাফ');
// { id: 106, name: 'Teknaf', bnName: 'টেকনাফ', districtId: 12, ... }
```

#### `getUpazilasByDistrict(districtId: number)`
Get all upazilas in a district.

```typescript
import { getUpazilasByDistrict } from 'bd-address-pro';

const dhakaUpazilas = getUpazilasByDistrict(18);
// Returns: Dhamrai, Dohar, Keraniganj, Nawabganj, Savar
```

#### `getUpazilasByDistrictSlug(districtSlug: string)`
Get all upazilas by district slug.

```typescript
import { getUpazilasByDistrictSlug } from 'bd-address-pro';

const sylhetUpazilas = getUpazilasByDistrictSlug('sylhet');
// Returns all 13 upazilas in Sylhet district
```

#### `getUpazilasByDivision(divisionId: number)`
Get all upazilas in a division.

```typescript
import { getUpazilasByDivision } from 'bd-address-pro';

const barishalUpazilas = getUpazilasByDivision(5);
// Returns all upazilas in Barishal division
```

---

### Relationship Functions

#### `getDivisionOfDistrict(districtId: number)`
Get the parent division of a district.

```typescript
import { getDivisionOfDistrict } from 'bd-address-pro';

const division = getDivisionOfDistrict(10); // Chattogram district
// { id: 2, name: 'Chattogram', bnName: 'চট্টগ্রাম', ... }
```

#### `getDistrictOfUpazila(upazilaId: number)`
Get the parent district of an upazila.

```typescript
import { getDistrictOfUpazila } from 'bd-address-pro';

const district = getDistrictOfUpazila(151); // Savar upazila
// { id: 18, name: 'Dhaka', bnName: 'ঢাকা', ... }
```

#### `getFullAddress(upazilaId: number)`
Get complete address hierarchy for an upazila.

```typescript
import { getFullAddress } from 'bd-address-pro';

const address = getFullAddress(151); // Savar
// {
//   division: { id: 1, name: 'Dhaka', bnName: 'ঢাকা', ... },
//   district: { id: 18, name: 'Dhaka', bnName: 'ঢাকা', ... },
//   upazila: { id: 151, name: 'Savar', bnName: 'সাভার', ... }
// }
```

#### `getFullAddressBySlug(upazilaSlug: string)`
Get full address by upazila slug.

```typescript
import { getFullAddressBySlug } from 'bd-address-pro';

const address = getFullAddressBySlug('sreemangal');
// Returns full address hierarchy for Sreemangal
```

---

### Formatting Functions

#### `formatAddress(address, options?)`
Format a full address as a string.

```typescript
import { getFullAddress, formatAddress } from 'bd-address-pro';

const address = getFullAddress(151);

// English (default)
formatAddress(address);
// "Savar, Dhaka, Dhaka"

// Bengali
formatAddress(address, { language: 'bn' });
// "সাভার, ঢাকা, ঢাকা"

// Custom separator
formatAddress(address, { separator: ' > ' });
// "Savar > Dhaka > Dhaka"

// Partial address
formatAddress(address, { includeUpazila: false });
// "Dhaka, Dhaka"
```

#### `formatAddressBengali(address)`
Format address in Bengali.

```typescript
import { getFullAddress, formatAddressBengali } from 'bd-address-pro';

const address = getFullAddress(470); // Sreemangal
formatAddressBengali(address);
// "শ্রীমঙ্গল, মৌলভীবাজার, সিলেট"
```

#### `formatAddressEnglish(address)`
Format address in English.

```typescript
import { getFullAddress, formatAddressEnglish } from 'bd-address-pro';

const address = getFullAddress(470);
formatAddressEnglish(address);
// "Sreemangal, Moulvibazar, Sylhet"
```

---

### Search Functions

#### `search(query, options?)`
Search across all locations with fuzzy matching.

```typescript
import { search } from 'bd-address-pro';

// Basic search
const results = search('dhaka');
console.log(results.divisions); // Dhaka division
console.log(results.districts); // Dhaka district
console.log(results.upazilas);  // Related upazilas

// Bengali search
const bnResults = search('সিলেট');

// With options
const filtered = search('dhaka', {
  types: ['district'],        // Only search districts
  limit: 5,                   // Max 5 results
  threshold: 0.5,             // Minimum match score (0-1)
  includeEnglish: true,       // Search English names
  includeBengali: true,       // Search Bengali names
  includeSlug: true,          // Search slugs
});
```

#### `quickSearch(query, options?)`
Returns first matching item of any type.

```typescript
import { quickSearch } from 'bd-address-pro';

const result = quickSearch('sylhet');
// { id: 6, name: 'Sylhet', bnName: 'সিলেট', ... }
```

#### `searchDivisions(query, options?)`
Search only in divisions.

```typescript
import { searchDivisions } from 'bd-address-pro';

const results = searchDivisions('চট্টগ্রাম');
// [{ item: { name: 'Chattogram', ... }, score: 1, matchedField: 'bnName' }]
```

#### `searchDistricts(query, options?)`
Search only in districts.

```typescript
import { searchDistricts } from 'bd-address-pro';

const results = searchDistricts('bogura');
// [{ item: { name: 'Bogura', ... }, score: 1, matchedField: 'slug' }]
```

#### `searchUpazilas(query, options?)`
Search only in upazilas.

```typescript
import { searchUpazilas } from 'bd-address-pro';

const results = searchUpazilas('savar');
// [{ item: { name: 'Savar', ... }, score: 1, matchedField: 'name' }]
```

#### `autocomplete(query, options?)`
Get autocomplete suggestions (prefix matching).

```typescript
import { autocomplete } from 'bd-address-pro';

const suggestions = autocomplete('Dha');
// [
//   { name: 'Dhaka', bnName: 'ঢাকা', type: 'division', item: {...} },
//   { name: 'Dhaka', bnName: 'ঢাকা', type: 'district', item: {...} },
//   { name: 'Dhamrai', bnName: 'ধামরাই', type: 'upazila', item: {...} },
//   ...
// ]
```

#### `fuzzySearch(query, options?)`
Search with higher typo tolerance.

```typescript
import { fuzzySearch } from 'bd-address-pro';

// Handles typos
const results = fuzzySearch('Dahka'); // typo for 'Dhaka'
// Still returns Dhaka division and district
```

#### `searchBengali(query, options?)`
Search only in Bengali names.

```typescript
import { searchBengali } from 'bd-address-pro';

const results = searchBengali('ময়মনসিংহ');
// Returns Mymensingh division and district
```

#### `searchEnglish(query, options?)`
Search only in English names.

```typescript
import { searchEnglish } from 'bd-address-pro';

const results = searchEnglish('Rajshahi');
// Returns Rajshahi division and district
```

---

### Statistics Functions

#### `getStats()`
Get statistics about the location data.

```typescript
import { getStats } from 'bd-address-pro';

const stats = getStats();
// {
//   totalDivisions: 8,
//   totalDistricts: 64,
//   totalUpazilas: 495,
//   divisionDistrictMap: { 1: 13, 2: 11, ... },
//   districtUpazilaMap: { 1: 6, 2: 10, ... }
// }
```

#### `getDistrictCount(divisionId: number)`
Get number of districts in a division.

```typescript
import { getDistrictCount } from 'bd-address-pro';

const count = getDistrictCount(1); // Dhaka division
// 13
```

#### `getUpazilaCount(districtId: number)`
Get number of upazilas in a district.

```typescript
import { getUpazilaCount } from 'bd-address-pro';

const count = getUpazilaCount(10); // Chattogram district
// 15
```

#### `getUpazilaCountByDivision(divisionId: number)`
Get total upazilas in a division.

```typescript
import { getUpazilaCountByDivision } from 'bd-address-pro';

const count = getUpazilaCountByDivision(6); // Sylhet division
// 40
```

---

### Validation Functions

#### `isValidDivision(id: number)`
Check if a division ID is valid.

```typescript
import { isValidDivision } from 'bd-address-pro';

isValidDivision(1);  // true
isValidDivision(99); // false
```

#### `isValidDistrict(id: number)`
Check if a district ID is valid.

```typescript
import { isValidDistrict } from 'bd-address-pro';

isValidDistrict(18); // true
isValidDistrict(99); // false
```

#### `isValidUpazila(id: number)`
Check if an upazila ID is valid.

```typescript
import { isValidUpazila } from 'bd-address-pro';

isValidUpazila(151); // true
isValidUpazila(999); // false
```

#### `isDistrictInDivision(districtId, divisionId)`
Check if a district belongs to a division.

```typescript
import { isDistrictInDivision } from 'bd-address-pro';

isDistrictInDivision(18, 1); // true (Dhaka district in Dhaka division)
isDistrictInDivision(18, 2); // false
```

#### `isUpazilaInDistrict(upazilaId, districtId)`
Check if an upazila belongs to a district.

```typescript
import { isUpazilaInDistrict } from 'bd-address-pro';

isUpazilaInDistrict(151, 18); // true (Savar in Dhaka district)
isUpazilaInDistrict(151, 20); // false
```

#### `isUpazilaInDivision(upazilaId, divisionId)`
Check if an upazila belongs to a division.

```typescript
import { isUpazilaInDivision } from 'bd-address-pro';

isUpazilaInDivision(151, 1); // true (Savar in Dhaka division)
isUpazilaInDivision(151, 2); // false
```

---

### List Helpers

#### `getDivisionNames(language?)`
Get list of division names.

```typescript
import { getDivisionNames } from 'bd-address-pro';

getDivisionNames('en');
// ['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh']

getDivisionNames('bn');
// ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ']
```

#### `getDistrictNames(language?)`
Get list of district names.

```typescript
import { getDistrictNames } from 'bd-address-pro';

getDistrictNames('en'); // All 64 English district names
getDistrictNames('bn'); // All 64 Bengali district names
```

#### `getUpazilaNames(language?)`
Get list of upazila names.

```typescript
import { getUpazilaNames } from 'bd-address-pro';

getUpazilaNames('en'); // All 495 English upazila names
getUpazilaNames('bn'); // All 495 Bengali upazila names
```

#### `getDivisionOptions()`
Get dropdown options for divisions.

```typescript
import { getDivisionOptions } from 'bd-address-pro';

const options = getDivisionOptions();
// [
//   { value: 'dhaka', label: 'Dhaka', labelBn: 'ঢাকা' },
//   { value: 'chattogram', label: 'Chattogram', labelBn: 'চট্টগ্রাম' },
//   ...
// ]
```

#### `getDistrictOptions(divisionId?)`
Get dropdown options for districts.

```typescript
import { getDistrictOptions } from 'bd-address-pro';

// All districts
const allOptions = getDistrictOptions();

// Filtered by division
const dhakaDistrictOptions = getDistrictOptions(1);
// [
//   { value: 'dhaka', label: 'Dhaka', labelBn: 'ঢাকা' },
//   { value: 'gazipur', label: 'Gazipur', labelBn: 'গাজীপুর' },
//   ...
// ]
```

#### `getUpazilaOptions(districtId?)`
Get dropdown options for upazilas.

```typescript
import { getUpazilaOptions } from 'bd-address-pro';

// All upazilas
const allOptions = getUpazilaOptions();

// Filtered by district
const dhakaUpazilaOptions = getUpazilaOptions(18);
// [
//   { value: 'dhamrai', label: 'Dhamrai', labelBn: 'ধামরাই' },
//   { value: 'savar', label: 'Savar', labelBn: 'সাভার' },
//   ...
// ]
```

---

### Type-Safe Enums

Use enums for type-safe location access.

```typescript
import {
  BangladeshDivision,
  BangladeshDistrict,
  BangladeshUpazila,
  getDivisionBySlug,
  getDistrictBySlug,
  getUpazilaBySlug,
} from 'bd-address-pro';

// Division enum
const dhaka = getDivisionBySlug(BangladeshDivision.DHAKA);
const sylhet = getDivisionBySlug(BangladeshDivision.SYLHET);

// District enum
const coxsBazar = getDistrictBySlug(BangladeshDistrict.COXS_BAZAR);
const brahmanbaria = getDistrictBySlug(BangladeshDistrict.BRAHMANBARIA);

// Upazila enum
const savar = getUpazilaBySlug(BangladeshUpazila.SAVAR);
const teknaf = getUpazilaBySlug(BangladeshUpazila.TEKNAF);
```

---

### Raw Data Access

For advanced usage, access raw data arrays via getter functions (lazy-loaded).

```typescript
import { getRawDivisions, getRawDistricts, getRawUpazilas } from 'bd-address-pro';

console.log(getRawDivisions().length);  // 8
console.log(getRawDistricts().length);  // 64
console.log(getRawUpazilas().length);   // 495
```

---

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  Division,
  District,
  Upazila,
  FullAddress,
  Coordinates,
  SearchResult,
  LocationSearchResult,
  LocationType,
  AnyLocation,
  LocationStats,
  SearchOptions,
} from 'bd-address-pro';
```

### Type Definitions

```typescript
interface Division {
  id: number;
  name: string;
  bnName: string;
  slug: string;
  coordinates?: Coordinates;
  area?: number;
  population?: number;
  literacy?: number;
}

interface District {
  id: number;
  name: string;
  bnName: string;
  slug: string;
  divisionId: number;
  coordinates?: Coordinates;
}

interface Upazila {
  id: number;
  name: string;
  bnName: string;
  slug: string;
  districtId: number;
}

interface FullAddress {
  division: Division;
  district: District;
  upazila: Upazila;
}

type LocationType = 'division' | 'district' | 'upazila';
```

---

## Use Cases

### Building a Cascading Dropdown (React Example)

```tsx
import { useState } from 'react';
import {
  getDivisionOptions,
  getDistrictOptions,
  getUpazilaOptions,
  getDivisionBySlug,
  getDistrictBySlug,
} from 'bd-address-pro';

function AddressSelector() {
  const [divisionSlug, setDivisionSlug] = useState('');
  const [districtSlug, setDistrictSlug] = useState('');
  const [upazilaSlug, setUpazilaSlug] = useState('');

  const divisions = getDivisionOptions();
  const division = divisionSlug ? getDivisionBySlug(divisionSlug) : null;
  const districts = division ? getDistrictOptions(division.id) : [];
  const district = districtSlug ? getDistrictBySlug(districtSlug) : null;
  const upazilas = district ? getUpazilaOptions(district.id) : [];

  return (
    <div>
      <select
        value={divisionSlug}
        onChange={(e) => {
          setDivisionSlug(e.target.value);
          setDistrictSlug('');
          setUpazilaSlug('');
        }}
      >
        <option value="">Select Division</option>
        {divisions.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label} ({d.labelBn})
          </option>
        ))}
      </select>

      <select
        value={districtSlug}
        onChange={(e) => {
          setDistrictSlug(e.target.value);
          setUpazilaSlug('');
        }}
        disabled={!divisionSlug}
      >
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label} ({d.labelBn})
          </option>
        ))}
      </select>

      <select
        value={upazilaSlug}
        onChange={(e) => setUpazilaSlug(e.target.value)}
        disabled={!districtSlug}
      >
        <option value="">Select Upazila</option>
        {upazilas.map((u) => (
          <option key={u.value} value={u.value}>
            {u.label} ({u.labelBn})
          </option>
        ))}
      </select>
    </div>
  );
}
```

### Search with Autocomplete

```typescript
import { autocomplete, getFullAddressBySlug } from 'bd-address-pro';

function handleSearch(query: string) {
  const suggestions = autocomplete(query, { limit: 10 });

  suggestions.forEach((suggestion) => {
    console.log(`${suggestion.name} (${suggestion.bnName}) - ${suggestion.type}`);
  });
}

// User types "Mir"
handleSearch('Mir');
// Output:
// Mirzapur (মির্জাপুর) - upazila
// Mirsharai (মীরসরাই) - upazila
// Mirpur (মিরপুর) - upazila
// ...
```

### Validation in Forms

```typescript
import {
  isValidDivision,
  isValidDistrict,
  isValidUpazila,
  isDistrictInDivision,
  isUpazilaInDistrict,
} from 'bd-address-pro';

function validateAddress(divisionId: number, districtId: number, upazilaId: number): boolean {
  // Check if IDs are valid
  if (!isValidDivision(divisionId)) return false;
  if (!isValidDistrict(districtId)) return false;
  if (!isValidUpazila(upazilaId)) return false;

  // Check hierarchical relationships
  if (!isDistrictInDivision(districtId, divisionId)) return false;
  if (!isUpazilaInDistrict(upazilaId, districtId)) return false;

  return true;
}
```

---

## Data Structure

### Divisions
| ID | Name | Bengali | Districts |
|----|------|---------|-----------|
| 1 | Dhaka | ঢাকা | 13 |
| 2 | Chattogram | চট্টগ্রাম | 11 |
| 3 | Rajshahi | রাজশাহী | 8 |
| 4 | Khulna | খুলনা | 10 |
| 5 | Barishal | বরিশাল | 6 |
| 6 | Sylhet | সিলেট | 4 |
| 7 | Rangpur | রংপুর | 8 |
| 8 | Mymensingh | ময়মনসিংহ | 4 |

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Abid Hasan](https://github.com/abidhasan)

---

## Support

If you find this package helpful, please consider giving it a ⭐ on GitHub!
