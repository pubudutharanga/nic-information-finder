/**
 * Sri Lankan NIC Validation and Parsing Utilities
 * 
 * This module provides comprehensive functions for validating and extracting
 * information from Sri Lankan National Identity Card (NIC) numbers.
 * 
 * NIC Format Explanation:
 * =======================
 * 
 * OLD FORMAT (9 digits + letter):
 * - Format: YYDDDNNNNC
 * - YY: Last 2 digits of birth year (e.g., 94 for 1994)
 * - DDD: Day of year (001-366 for males, 501-866 for females)
 * - NNNN: Serial number
 * - C: Check character (V or X)
 * 
 * NEW FORMAT (12 digits):
 * - Format: YYYYDDDNNNNN
 * - YYYY: Full birth year (e.g., 1994)
 * - DDD: Day of year (001-366 for males, 501-866 for females)
 * - NNNNN: Serial number (5 digits)
 * 
 * Gender Detection:
 * - Day of year 001-366: Male
 * - Day of year 501-866: Female (500 is added to actual day)
 * 
 * All calculations are performed client-side for privacy.
 */

export type NICFormat = 'old' | 'new';
export type Gender = 'male' | 'female';

export interface NICValidationResult {
    isValid: boolean;
    format?: NICFormat;
    errorKey?: string;
}

export interface NICInfo {
    birthday: Date;
    gender: Gender;
    age: AgeInfo;
    format: NICFormat;
    year: number;
    dayOfYear: number;
}

export interface AgeInfo {
    years: number;
    months: number;
    days: number;
}

// Regular expressions for NIC validation
const OLD_NIC_REGEX = /^[0-9]{9}[VvXx]$/;
const NEW_NIC_REGEX = /^[0-9]{12}$/;

/**
 * Validates a Sri Lankan NIC number
 * 
 * @param nic - The NIC number to validate
 * @returns Validation result with format info or error key
 * 
 * @example
 * validateNIC('941234567V') // { isValid: true, format: 'old' }
 * validateNIC('199412345678') // { isValid: true, format: 'new' }
 * validateNIC('invalid') // { isValid: false, errorKey: 'validation.invalidFormat' }
 */
export function validateNIC(nic: string): NICValidationResult {
    const trimmedNIC = nic.trim();

    if (!trimmedNIC) {
        return { isValid: false, errorKey: 'validation.required' };
    }

    // Check old format (9 digits + V/X)
    if (OLD_NIC_REGEX.test(trimmedNIC)) {
        const dayOfYear = parseInt(trimmedNIC.substring(2, 5), 10);

        // Validate day of year range
        // Males: 1-366, Females: 501-866
        if (!isValidDayOfYear(dayOfYear)) {
            return { isValid: false, errorKey: 'validation.invalidDayOfYear' };
        }

        return { isValid: true, format: 'old' };
    }

    // Check new format (12 digits)
    if (NEW_NIC_REGEX.test(trimmedNIC)) {
        const dayOfYear = parseInt(trimmedNIC.substring(4, 7), 10);

        if (!isValidDayOfYear(dayOfYear)) {
            return { isValid: false, errorKey: 'validation.invalidDayOfYear' };
        }

        return { isValid: true, format: 'new' };
    }

    // Determine specific error
    if (trimmedNIC.length === 10 && /[VvXx]$/.test(trimmedNIC)) {
        return { isValid: false, errorKey: 'validation.invalidOldFormat' };
    }

    if (trimmedNIC.length === 12) {
        return { isValid: false, errorKey: 'validation.invalidNewFormat' };
    }

    return { isValid: false, errorKey: 'validation.invalidFormat' };
}

/**
 * Validates if a day of year value is valid for NIC
 * Males: 1-366, Females: 501-866
 */
function isValidDayOfYear(dayOfYear: number): boolean {
    return (dayOfYear >= 1 && dayOfYear <= 366) ||
        (dayOfYear >= 501 && dayOfYear <= 866);
}

/**
 * Checks if a year is a leap year
 */
function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Days in each month (non-leap year)
 */
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Finds the month and day from day of year
 * 
 * @param dayOfYear - Day of year (1-366)
 * @param year - Full birth year
 * @returns Object with month (1-12) and day (1-31)
 */
function getMonthAndDay(dayOfYear: number, year: number): { month: number; day: number } {
    const daysInMonth = [...DAYS_IN_MONTH];

    // Adjust February for leap years
    if (isLeapYear(year)) {
        daysInMonth[1] = 29;
    }

    let remainingDays = dayOfYear;
    let month = 0;

    while (remainingDays > daysInMonth[month]) {
        remainingDays -= daysInMonth[month];
        month++;
    }

    return {
        month: month + 1, // Convert to 1-indexed
        day: remainingDays,
    };
}

/**
 * Extracts the birth year from NIC
 * 
 * Old format: Uses 2-digit year, assumes 1900s for >= 50, 2000s for < 50
 * New format: Uses full 4-digit year
 */
function extractBirthYear(nic: string, format: NICFormat): number {
    if (format === 'old') {
        const yearPart = parseInt(nic.substring(0, 2), 10);
        // If year >= 50, assume 1900s (e.g., 94 -> 1994)
        // If year < 50, assume 2000s (e.g., 24 -> 2024)
        return yearPart >= 50 ? 1900 + yearPart : 2000 + yearPart;
    }

    // New format has full 4-digit year
    return parseInt(nic.substring(0, 4), 10);
}

/**
 * Extracts day of year from NIC
 * Adjusts for female NIC (subtracts 500)
 */
function extractDayOfYear(nic: string, format: NICFormat): { dayOfYear: number; gender: Gender } {
    const startIndex = format === 'old' ? 2 : 4;
    let dayOfYear = parseInt(nic.substring(startIndex, startIndex + 3), 10);

    let gender: Gender = 'male';

    // If day > 500, it's a female (500 is added to actual day)
    if (dayOfYear > 500) {
        dayOfYear -= 500;
        gender = 'female';
    }

    return { dayOfYear, gender };
}

/**
 * Calculates age from birthday to current date
 * 
 * @param birthday - Birth date
 * @param currentDate - Current date (defaults to now)
 * @returns Age in years, months, and days
 */
export function calculateAge(birthday: Date, currentDate: Date = new Date()): AgeInfo {
    let years = currentDate.getFullYear() - birthday.getFullYear();
    let months = currentDate.getMonth() - birthday.getMonth();
    let days = currentDate.getDate() - birthday.getDate();

    // Adjust for negative days
    if (days < 0) {
        months--;
        // Get days in previous month
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

/**
 * Parses a valid NIC and extracts all information
 * 
 * @param nic - A valid NIC number
 * @returns NIC information including birthday, gender, and age
 * @throws Error if NIC is invalid
 * 
 * @example
 * const info = parseNIC('941234567V');
 * // {
 * //   birthday: Date('1994-05-03'),
 * //   gender: 'male',
 * //   age: { years: 31, months: 8, days: 15 },
 * //   format: 'old'
 * // }
 */
export function parseNIC(nic: string): NICInfo {
    const validation = validateNIC(nic);

    if (!validation.isValid || !validation.format) {
        throw new Error(`Invalid NIC: ${validation.errorKey}`);
    }

    const format = validation.format;
    const year = extractBirthYear(nic.trim(), format);
    const { dayOfYear, gender } = extractDayOfYear(nic.trim(), format);
    const { month, day } = getMonthAndDay(dayOfYear, year);

    const birthday = new Date(year, month - 1, day); // Month is 0-indexed in JS
    const age = calculateAge(birthday);

    return {
        birthday,
        gender,
        age,
        format,
        year,
        dayOfYear,
    };
}

/**
 * Formats a date according to the specified locale
 */
export function formatDate(date: Date, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

/**
 * Formats age with proper pluralization
 * Note: Actual pluralization should be handled by react-intl
 */
export function formatAge(age: AgeInfo): { years: number; months: number; days: number } {
    return {
        years: age.years,
        months: age.months,
        days: age.days,
    };
}
