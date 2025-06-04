/**
 * Utility functions for cleaning and validating data
 */

/**
 * Cleans a required string field, returning an empty string if the input is invalid
 */
export function cleanRequiredString(value: string | undefined | null): string {
  if (!value) return '';
  const trimmed = value.trim();
  return trimmed === '' ? '' : trimmed;
}

/**
 * Cleans an optional string field, returning null if the input is invalid
 */
export function cleanOptionalString(value: string | undefined | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

/**
 * Cleans a number field, returning null if the input is invalid
 */
export function cleanNumber(value: string | number | undefined | null): number | null {
  if (value === undefined || value === null) return null;
  if (typeof value === 'number') return isNaN(value) ? null : value;
  const trimmed = value.trim();
  if (trimmed === '') return null;
  const num = parseFloat(trimmed);
  return isNaN(num) ? null : num;
}

/**
 * Cleans a date field, returning null if the input is invalid
 */
export function cleanDate(value: string | Date | undefined | null): Date | null {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  const trimmed = value.trim();
  if (trimmed === '') return null;
  const date = new Date(trimmed);
  return isNaN(date.getTime()) ? null : date;
} 