/**
 * Search utilities for Bangladesh address data
 * Supports both English and Bengali (বাংলা) search
 */

import type {
  Division,
  District,
  Upazila,
  SearchResult,
  LocationSearchResult,
  AnyLocation,
  LocationType,
} from '../types/location.types';

// Static data imports (bundled for compatibility)
import divisionsJson from '../data/divisions.json';
import districtsJson from '../data/districts.json';
import upazilasJson from '../data/upazilas.json';

const divisionsData = divisionsJson as Division[];
const districtsData = districtsJson as District[];
const upazilasData = upazilasJson as Upazila[];

/**
 * Search options interface
 */
export interface SearchOptions {
  /** Search in English names */
  includeEnglish?: boolean;
  /** Search in Bengali names */
  includeBengali?: boolean;
  /** Search in slugs */
  includeSlug?: boolean;
  /** Maximum number of results per category */
  limit?: number;
  /** Minimum score threshold (0-1) */
  threshold?: number;
  /** Case sensitive search */
  caseSensitive?: boolean;
  /** Location types to search */
  types?: LocationType[];
}

const defaultSearchOptions: Required<SearchOptions> = {
  includeEnglish: true,
  includeBengali: true,
  includeSlug: true,
  limit: 10,
  threshold: 0.3,
  caseSensitive: false,
  types: ['division', 'district', 'upazila'],
};

/**
 * Calculate similarity score between two strings using Levenshtein distance
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;

  if (m === 0) return n;
  if (n === 0) return m;

  // Create a 2D array initialized with zeros
  const dp: number[][] = new Array(m + 1);
  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0) as number[];
  }

  // Initialize first column and first row
  for (let i = 0; i <= m; i++) {
    (dp[i] as number[])[0] = i;
  }
  for (let j = 0; j <= n; j++) {
    (dp[0] as number[])[j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const row = dp[i] as number[];
      const prevRow = dp[i - 1] as number[];
      if (str1[i - 1] === str2[j - 1]) {
        row[j] = prevRow[j - 1] as number;
      } else {
        row[j] = Math.min(
          (prevRow[j - 1] as number) + 1, // substitution
          (prevRow[j] as number) + 1, // deletion
          (row[j - 1] as number) + 1 // insertion
        );
      }
    }
  }

  return (dp[m] as number[])[n] as number;
}

/**
 * Calculate similarity score (0-1) between two strings
 */
function calculateSimilarity(query: string, target: string, caseSensitive: boolean): number {
  const q = caseSensitive ? query : query.toLowerCase();
  const t = caseSensitive ? target : target.toLowerCase();

  // Exact match
  if (q === t) return 1;

  // Contains match
  if (t.includes(q)) {
    return 0.8 + (q.length / t.length) * 0.2;
  }

  // Starts with match
  if (t.startsWith(q)) {
    return 0.9;
  }

  // Levenshtein-based similarity
  const distance = levenshteinDistance(q, t);
  const maxLen = Math.max(q.length, t.length);
  return Math.max(0, 1 - distance / maxLen);
}

/**
 * Search in a single location item
 */
function searchInItem<T extends AnyLocation>(
  item: T,
  query: string,
  options: Required<SearchOptions>
): SearchResult<T> | null {
  const scores: { score: number; field: 'name' | 'bnName' | 'slug' }[] = [];

  if (options.includeEnglish) {
    const score = calculateSimilarity(query, item.name, options.caseSensitive);
    scores.push({ score, field: 'name' });
  }

  if (options.includeBengali) {
    const score = calculateSimilarity(query, item.bnName, options.caseSensitive);
    scores.push({ score, field: 'bnName' });
  }

  if (options.includeSlug) {
    const score = calculateSimilarity(query, item.slug, options.caseSensitive);
    scores.push({ score, field: 'slug' });
  }

  // Find best match
  const bestMatch = scores.reduce((best, current) =>
    current.score > best.score ? current : best
  );

  if (bestMatch.score >= options.threshold) {
    return {
      item,
      score: bestMatch.score,
      matchedField: bestMatch.field,
    };
  }

  return null;
}

/**
 * Search across all locations
 */
export function search(query: string, options?: SearchOptions): LocationSearchResult {
  const opts = { ...defaultSearchOptions, ...options };
  const result: LocationSearchResult = {
    divisions: [],
    districts: [],
    upazilas: [],
  };

  if (!query || query.trim().length === 0) {
    return result;
  }

  const trimmedQuery = query.trim();

  // Search divisions
  if (opts.types.includes('division')) {
    for (const division of divisionsData) {
      const searchResult = searchInItem(division, trimmedQuery, opts);
      if (searchResult) {
        result.divisions.push(searchResult);
      }
    }
    result.divisions.sort((a, b) => b.score - a.score);
    result.divisions = result.divisions.slice(0, opts.limit);
  }

  // Search districts
  if (opts.types.includes('district')) {
    for (const district of districtsData) {
      const searchResult = searchInItem(district, trimmedQuery, opts);
      if (searchResult) {
        result.districts.push(searchResult);
      }
    }
    result.districts.sort((a, b) => b.score - a.score);
    result.districts = result.districts.slice(0, opts.limit);
  }

  // Search upazilas
  if (opts.types.includes('upazila')) {
    for (const upazila of upazilasData) {
      const searchResult = searchInItem(upazila, trimmedQuery, opts);
      if (searchResult) {
        result.upazilas.push(searchResult);
      }
    }
    result.upazilas.sort((a, b) => b.score - a.score);
    result.upazilas = result.upazilas.slice(0, opts.limit);
  }

  return result;
}

/**
 * Quick search - returns first matching item of any type
 */
export function quickSearch(query: string, options?: SearchOptions): AnyLocation | null {
  const result = search(query, { ...options, limit: 1 });

  const allResults: SearchResult<AnyLocation>[] = [
    ...result.divisions,
    ...result.districts,
    ...result.upazilas,
  ];

  if (allResults.length === 0) return null;

  allResults.sort((a, b) => b.score - a.score);
  const first = allResults[0];
  return first ? first.item : null;
}

/**
 * Search only divisions
 */
export function searchDivisions(
  query: string,
  options?: Omit<SearchOptions, 'types'>
): SearchResult<Division>[] {
  const result = search(query, { ...options, types: ['division'] });
  return result.divisions;
}

/**
 * Search only districts
 */
export function searchDistricts(
  query: string,
  options?: Omit<SearchOptions, 'types'>
): SearchResult<District>[] {
  const result = search(query, { ...options, types: ['district'] });
  return result.districts;
}

/**
 * Search only upazilas
 */
export function searchUpazilas(
  query: string,
  options?: Omit<SearchOptions, 'types'>
): SearchResult<Upazila>[] {
  const result = search(query, { ...options, types: ['upazila'] });
  return result.upazilas;
}

/**
 * Autocomplete search - returns names that start with query
 */
export function autocomplete(
  query: string,
  options?: SearchOptions
): { name: string; bnName: string; type: LocationType; item: AnyLocation }[] {
  if (!query || query.trim().length === 0) return [];

  const opts = { ...defaultSearchOptions, ...options };
  const q = opts.caseSensitive ? query.trim() : query.trim().toLowerCase();
  const results: { name: string; bnName: string; type: LocationType; item: AnyLocation; priority: number }[] = [];

  const checkStartsWith = (name: string, bnName: string, type: LocationType, item: AnyLocation) => {
    const nameToCheck = opts.caseSensitive ? name : name.toLowerCase();
    const bnNameToCheck = bnName;

    if (opts.includeEnglish && nameToCheck.startsWith(q)) {
      results.push({ name, bnName, type, item, priority: 1 });
    } else if (opts.includeBengali && bnNameToCheck.startsWith(q)) {
      results.push({ name, bnName, type, item, priority: 2 });
    }
  };

  if (opts.types.includes('division')) {
    for (const div of divisionsData) {
      checkStartsWith(div.name, div.bnName, 'division', div);
    }
  }

  if (opts.types.includes('district')) {
    for (const dist of districtsData) {
      checkStartsWith(dist.name, dist.bnName, 'district', dist);
    }
  }

  if (opts.types.includes('upazila')) {
    for (const upz of upazilasData) {
      checkStartsWith(upz.name, upz.bnName, 'upazila', upz);
    }
  }

  // Sort by priority and limit
  results.sort((a, b) => a.priority - b.priority);
  return results.slice(0, opts.limit).map(({ name, bnName, type, item }) => ({ name, bnName, type, item }));
}

/**
 * Fuzzy search with typo tolerance
 */
export function fuzzySearch(query: string, options?: SearchOptions): LocationSearchResult {
  return search(query, { ...options, threshold: 0.4 });
}

/**
 * Search by Bengali name only
 */
export function searchBengali(query: string, options?: Omit<SearchOptions, 'includeEnglish' | 'includeSlug'>): LocationSearchResult {
  return search(query, {
    ...options,
    includeEnglish: false,
    includeBengali: true,
    includeSlug: false,
  });
}

/**
 * Search by English name only
 */
export function searchEnglish(query: string, options?: Omit<SearchOptions, 'includeBengali' | 'includeSlug'>): LocationSearchResult {
  return search(query, {
    ...options,
    includeEnglish: true,
    includeBengali: false,
    includeSlug: false,
  });
}

export default {
  search,
  quickSearch,
  searchDivisions,
  searchDistricts,
  searchUpazilas,
  autocomplete,
  fuzzySearch,
  searchBengali,
  searchEnglish,
};
