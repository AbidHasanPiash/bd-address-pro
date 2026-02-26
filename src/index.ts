/**
 * bd-address-pro - Complete Bangladesh Address Data Package
 * Includes all divisions, districts, and upazilas with Bengali names
 *
 * @packageDocumentation
 */

// ============================================================
// Data Imports
// ============================================================
import divisions from './data/divisions.json';
import districts from './data/districts.json';
import upazilas from './data/upazilas.json';

// ============================================================
// Type Imports & Exports
// ============================================================
import type {
  Division,
  District,
  Upazila,
  FullAddress,
  Coordinates,
  BaseLocation,
  SearchResult,
  LocationSearchResult,
  LocationType,
  AnyLocation,
  LocationStats,
} from './types/location.types';

export {
  BangladeshDivision,
  BangladeshDistrict,
  BangladeshUpazila,
} from './types/location.types';

export type {
  Division,
  District,
  Upazila,
  FullAddress,
  Coordinates,
  BaseLocation,
  SearchResult,
  LocationSearchResult,
  LocationType,
  AnyLocation,
  LocationStats,
};

// ============================================================
// Search Imports & Exports
// ============================================================
export {
  search,
  quickSearch,
  searchDivisions,
  searchDistricts,
  searchUpazilas,
  autocomplete,
  fuzzySearch,
  searchBengali,
  searchEnglish,
} from './utils/search';

export type { SearchOptions } from './utils/search';

// Type assertions
const divisionsData = divisions as Division[];
const districtsData = districts as District[];
const upazilasData = upazilas as Upazila[];

// ============================================================
// Data Access Functions
// ============================================================

/**
 * Get all divisions
 * @returns Array of all 8 divisions of Bangladesh
 */
export function getAllDivisions(): Division[] {
  return [...divisionsData];
}

/**
 * Get all districts
 * @returns Array of all 64 districts of Bangladesh
 */
export function getAllDistricts(): District[] {
  return [...districtsData];
}

/**
 * Get all upazilas
 * @returns Array of all 495 upazilas of Bangladesh
 */
export function getAllUpazilas(): Upazila[] {
  return [...upazilasData];
}

// ============================================================
// Division Functions
// ============================================================

/**
 * Get a division by ID
 * @param id - Division ID (1-8)
 * @returns Division or undefined
 */
export function getDivisionById(id: number): Division | undefined {
  return divisionsData.find((d) => d.id === id);
}

/**
 * Get a division by slug
 * @param slug - Division slug (e.g., 'dhaka', 'chattogram')
 * @returns Division or undefined
 */
export function getDivisionBySlug(slug: string): Division | undefined {
  return divisionsData.find((d) => d.slug === slug.toLowerCase());
}

/**
 * Get a division by name (English or Bengali)
 * @param name - Division name
 * @returns Division or undefined
 */
export function getDivisionByName(name: string): Division | undefined {
  const lowerName = name.toLowerCase();
  return divisionsData.find(
    (d) => d.name.toLowerCase() === lowerName || d.bnName === name
  );
}

// ============================================================
// District Functions
// ============================================================

/**
 * Get a district by ID
 * @param id - District ID (1-64)
 * @returns District or undefined
 */
export function getDistrictById(id: number): District | undefined {
  return districtsData.find((d) => d.id === id);
}

/**
 * Get a district by slug
 * @param slug - District slug (e.g., 'dhaka', 'sylhet')
 * @returns District or undefined
 */
export function getDistrictBySlug(slug: string): District | undefined {
  return districtsData.find((d) => d.slug === slug.toLowerCase());
}

/**
 * Get a district by name (English or Bengali)
 * @param name - District name
 * @returns District or undefined
 */
export function getDistrictByName(name: string): District | undefined {
  const lowerName = name.toLowerCase();
  return districtsData.find(
    (d) => d.name.toLowerCase() === lowerName || d.bnName === name
  );
}

/**
 * Get all districts in a division
 * @param divisionId - Division ID
 * @returns Array of districts
 */
export function getDistrictsByDivision(divisionId: number): District[] {
  return districtsData.filter((d) => d.divisionId === divisionId);
}

/**
 * Get all districts in a division by division slug
 * @param divisionSlug - Division slug (e.g., 'dhaka')
 * @returns Array of districts
 */
export function getDistrictsByDivisionSlug(divisionSlug: string): District[] {
  const division = getDivisionBySlug(divisionSlug);
  if (!division) return [];
  return getDistrictsByDivision(division.id);
}

// ============================================================
// Upazila Functions
// ============================================================

/**
 * Get an upazila by ID
 * @param id - Upazila ID
 * @returns Upazila or undefined
 */
export function getUpazilaById(id: number): Upazila | undefined {
  return upazilasData.find((u) => u.id === id);
}

/**
 * Get an upazila by slug
 * @param slug - Upazila slug
 * @returns Upazila or undefined
 */
export function getUpazilaBySlug(slug: string): Upazila | undefined {
  return upazilasData.find((u) => u.slug === slug.toLowerCase());
}

/**
 * Get an upazila by name (English or Bengali)
 * @param name - Upazila name
 * @returns Upazila or undefined
 */
export function getUpazilaByName(name: string): Upazila | undefined {
  const lowerName = name.toLowerCase();
  return upazilasData.find(
    (u) => u.name.toLowerCase() === lowerName || u.bnName === name
  );
}

/**
 * Get all upazilas in a district
 * @param districtId - District ID
 * @returns Array of upazilas
 */
export function getUpazilasByDistrict(districtId: number): Upazila[] {
  return upazilasData.filter((u) => u.districtId === districtId);
}

/**
 * Get all upazilas in a district by district slug
 * @param districtSlug - District slug
 * @returns Array of upazilas
 */
export function getUpazilasByDistrictSlug(districtSlug: string): Upazila[] {
  const district = getDistrictBySlug(districtSlug);
  if (!district) return [];
  return getUpazilasByDistrict(district.id);
}

/**
 * Get all upazilas in a division
 * @param divisionId - Division ID
 * @returns Array of upazilas
 */
export function getUpazilasByDivision(divisionId: number): Upazila[] {
  const divisionDistricts = getDistrictsByDivision(divisionId);
  const districtIds = new Set(divisionDistricts.map((d) => d.id));
  return upazilasData.filter((u) => districtIds.has(u.districtId));
}

// ============================================================
// Relationship Functions
// ============================================================

/**
 * Get the parent division of a district
 * @param districtId - District ID
 * @returns Division or undefined
 */
export function getDivisionOfDistrict(districtId: number): Division | undefined {
  const district = getDistrictById(districtId);
  if (!district) return undefined;
  return getDivisionById(district.divisionId);
}

/**
 * Get the parent district of an upazila
 * @param upazilaId - Upazila ID
 * @returns District or undefined
 */
export function getDistrictOfUpazila(upazilaId: number): District | undefined {
  const upazila = getUpazilaById(upazilaId);
  if (!upazila) return undefined;
  return getDistrictById(upazila.districtId);
}

/**
 * Get the full address hierarchy for an upazila
 * @param upazilaId - Upazila ID
 * @returns FullAddress or undefined
 */
export function getFullAddress(upazilaId: number): FullAddress | undefined {
  const upazila = getUpazilaById(upazilaId);
  if (!upazila) return undefined;

  const district = getDistrictById(upazila.districtId);
  if (!district) return undefined;

  const division = getDivisionById(district.divisionId);
  if (!division) return undefined;

  return { division, district, upazila };
}

/**
 * Get full address by upazila slug
 * @param upazilaSlug - Upazila slug
 * @returns FullAddress or undefined
 */
export function getFullAddressBySlug(upazilaSlug: string): FullAddress | undefined {
  const upazila = getUpazilaBySlug(upazilaSlug);
  if (!upazila) return undefined;
  return getFullAddress(upazila.id);
}

// ============================================================
// Formatting Functions
// ============================================================

/**
 * Format a full address as a string
 * @param address - FullAddress object
 * @param options - Formatting options
 * @returns Formatted address string
 */
export function formatAddress(
  address: FullAddress,
  options?: {
    language?: 'en' | 'bn';
    separator?: string;
    includeUpazila?: boolean;
    includeDistrict?: boolean;
    includeDivision?: boolean;
  }
): string {
  const {
    language = 'en',
    separator = ', ',
    includeUpazila = true,
    includeDistrict = true,
    includeDivision = true,
  } = options || {};

  const getName = (item: { name: string; bnName: string }) =>
    language === 'bn' ? item.bnName : item.name;

  const parts: string[] = [];

  if (includeUpazila) parts.push(getName(address.upazila));
  if (includeDistrict) parts.push(getName(address.district));
  if (includeDivision) parts.push(getName(address.division));

  return parts.join(separator);
}

/**
 * Format address for display with Bengali names
 * @param address - FullAddress object
 * @returns Formatted Bengali address string
 */
export function formatAddressBengali(address: FullAddress): string {
  return formatAddress(address, { language: 'bn' });
}

/**
 * Format address for display with English names
 * @param address - FullAddress object
 * @returns Formatted English address string
 */
export function formatAddressEnglish(address: FullAddress): string {
  return formatAddress(address, { language: 'en' });
}

// ============================================================
// Statistics Functions
// ============================================================

/**
 * Get statistics about the location data
 * @returns LocationStats object
 */
export function getStats(): LocationStats {
  const divisionDistrictMap: Record<number, number> = {};
  const districtUpazilaMap: Record<number, number> = {};

  for (const district of districtsData) {
    divisionDistrictMap[district.divisionId] =
      (divisionDistrictMap[district.divisionId] || 0) + 1;
  }

  for (const upazila of upazilasData) {
    districtUpazilaMap[upazila.districtId] =
      (districtUpazilaMap[upazila.districtId] || 0) + 1;
  }

  return {
    totalDivisions: divisionsData.length,
    totalDistricts: districtsData.length,
    totalUpazilas: upazilasData.length,
    divisionDistrictMap,
    districtUpazilaMap,
  };
}

/**
 * Get district count for a division
 * @param divisionId - Division ID
 * @returns Number of districts
 */
export function getDistrictCount(divisionId: number): number {
  return getDistrictsByDivision(divisionId).length;
}

/**
 * Get upazila count for a district
 * @param districtId - District ID
 * @returns Number of upazilas
 */
export function getUpazilaCount(districtId: number): number {
  return getUpazilasByDistrict(districtId).length;
}

/**
 * Get upazila count for a division
 * @param divisionId - Division ID
 * @returns Number of upazilas
 */
export function getUpazilaCountByDivision(divisionId: number): number {
  return getUpazilasByDivision(divisionId).length;
}

// ============================================================
// Validation Functions
// ============================================================

/**
 * Check if a division ID is valid
 * @param id - Division ID to check
 * @returns boolean
 */
export function isValidDivision(id: number): boolean {
  return getDivisionById(id) !== undefined;
}

/**
 * Check if a district ID is valid
 * @param id - District ID to check
 * @returns boolean
 */
export function isValidDistrict(id: number): boolean {
  return getDistrictById(id) !== undefined;
}

/**
 * Check if an upazila ID is valid
 * @param id - Upazila ID to check
 * @returns boolean
 */
export function isValidUpazila(id: number): boolean {
  return getUpazilaById(id) !== undefined;
}

/**
 * Check if a district belongs to a division
 * @param districtId - District ID
 * @param divisionId - Division ID
 * @returns boolean
 */
export function isDistrictInDivision(districtId: number, divisionId: number): boolean {
  const district = getDistrictById(districtId);
  return district !== undefined && district.divisionId === divisionId;
}

/**
 * Check if an upazila belongs to a district
 * @param upazilaId - Upazila ID
 * @param districtId - District ID
 * @returns boolean
 */
export function isUpazilaInDistrict(upazilaId: number, districtId: number): boolean {
  const upazila = getUpazilaById(upazilaId);
  return upazila !== undefined && upazila.districtId === districtId;
}

/**
 * Check if an upazila belongs to a division
 * @param upazilaId - Upazila ID
 * @param divisionId - Division ID
 * @returns boolean
 */
export function isUpazilaInDivision(upazilaId: number, divisionId: number): boolean {
  const district = getDistrictOfUpazila(upazilaId);
  return district !== undefined && district.divisionId === divisionId;
}

// ============================================================
// List Helpers
// ============================================================

/**
 * Get list of division names
 * @param language - 'en' for English, 'bn' for Bengali
 * @returns Array of division names
 */
export function getDivisionNames(language: 'en' | 'bn' = 'en'): string[] {
  return divisionsData.map((d) => (language === 'bn' ? d.bnName : d.name));
}

/**
 * Get list of district names
 * @param language - 'en' for English, 'bn' for Bengali
 * @returns Array of district names
 */
export function getDistrictNames(language: 'en' | 'bn' = 'en'): string[] {
  return districtsData.map((d) => (language === 'bn' ? d.bnName : d.name));
}

/**
 * Get list of upazila names
 * @param language - 'en' for English, 'bn' for Bengali
 * @returns Array of upazila names
 */
export function getUpazilaNames(language: 'en' | 'bn' = 'en'): string[] {
  return upazilasData.map((u) => (language === 'bn' ? u.bnName : u.name));
}

/**
 * Get dropdown options for divisions
 * @returns Array of { value, label, labelBn } objects
 */
export function getDivisionOptions(): { value: string; label: string; labelBn: string }[] {
  return divisionsData.map((d) => ({
    value: d.slug,
    label: d.name,
    labelBn: d.bnName,
  }));
}

/**
 * Get dropdown options for districts
 * @param divisionId - Optional division ID to filter by
 * @returns Array of { value, label, labelBn } objects
 */
export function getDistrictOptions(
  divisionId?: number
): { value: string; label: string; labelBn: string }[] {
  const data = divisionId
    ? getDistrictsByDivision(divisionId)
    : districtsData;
  return data.map((d) => ({
    value: d.slug,
    label: d.name,
    labelBn: d.bnName,
  }));
}

/**
 * Get dropdown options for upazilas
 * @param districtId - Optional district ID to filter by
 * @returns Array of { value, label, labelBn } objects
 */
export function getUpazilaOptions(
  districtId?: number
): { value: string; label: string; labelBn: string }[] {
  const data = districtId
    ? getUpazilasByDistrict(districtId)
    : upazilasData;
  return data.map((u) => ({
    value: u.slug,
    label: u.name,
    labelBn: u.bnName,
  }));
}

// ============================================================
// Raw Data Exports (for advanced usage)
// ============================================================

/** Raw divisions data */
export const rawDivisions = divisionsData;

/** Raw districts data */
export const rawDistricts = districtsData;

/** Raw upazilas data */
export const rawUpazilas = upazilasData;

// ============================================================
// Default Export
// ============================================================

export default {
  // Data access
  getAllDivisions,
  getAllDistricts,
  getAllUpazilas,

  // Division functions
  getDivisionById,
  getDivisionBySlug,
  getDivisionByName,

  // District functions
  getDistrictById,
  getDistrictBySlug,
  getDistrictByName,
  getDistrictsByDivision,
  getDistrictsByDivisionSlug,

  // Upazila functions
  getUpazilaById,
  getUpazilaBySlug,
  getUpazilaByName,
  getUpazilasByDistrict,
  getUpazilasByDistrictSlug,
  getUpazilasByDivision,

  // Relationship functions
  getDivisionOfDistrict,
  getDistrictOfUpazila,
  getFullAddress,
  getFullAddressBySlug,

  // Formatting functions
  formatAddress,
  formatAddressBengali,
  formatAddressEnglish,

  // Statistics
  getStats,
  getDistrictCount,
  getUpazilaCount,
  getUpazilaCountByDivision,

  // Validation
  isValidDivision,
  isValidDistrict,
  isValidUpazila,
  isDistrictInDivision,
  isUpazilaInDistrict,
  isUpazilaInDivision,

  // List helpers
  getDivisionNames,
  getDistrictNames,
  getUpazilaNames,
  getDivisionOptions,
  getDistrictOptions,
  getUpazilaOptions,

  // Raw data
  rawDivisions,
  rawDistricts,
  rawUpazilas,
};