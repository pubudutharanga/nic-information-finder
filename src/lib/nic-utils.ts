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
 * Special Rule for Non-Leap Years:
 * - Day 60 is skipped to maintain consistency with leap years
 * - Feb 28 = Day 59, Mar 1 = Day 61 (day 60 is skipped)
 * - This keeps day numbers consistent from March onwards
 * 
 * All calculations are performed client-side for privacy.
 */

// ============================================================================
// Type Definitions
// ============================================================================

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

// ============================================================================
// Constants
// ============================================================================

/** Regular expression for old NIC format (9 digits + V/X) */
const OLD_NIC_REGEX = /^[0-9]{9}[VvXx]$/;

/** Regular expression for new NIC format (12 digits) */
const NEW_NIC_REGEX = /^[0-9]{12}$/;

/** Gender offset added to day of year for females */
const FEMALE_DAY_OFFSET = 500;

/** 
 * Cumulative days at end of each month for LEAP years (1-indexed)
 * Index 0 = 0 (before January), Index 1 = 31 (end of Jan), etc.
 */
const CUMULATIVE_DAYS_LEAP = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

/** 
 * Cumulative days at end of each month for NON-LEAP years (1-indexed)
 * Note: Uses same values as leap year from March onwards (day 60 is skipped)
 * This matches the Sri Lankan NIC system's day numbering convention
 */
const CUMULATIVE_DAYS_NON_LEAP = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

/** Days in each month (1-indexed, index 0 unused) */
const DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** Days in each month for leap year (1-indexed, index 0 unused) */
const DAYS_IN_MONTH_LEAP = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// ============================================================================
// Validation Functions
// ============================================================================

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

    // Determine specific error for better user feedback
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
 * 
 * @param dayOfYear - The day of year value from NIC
 * @param year - Optional birth year for stricter leap year validation
 * @returns True if the day of year is valid
 * 
 * Valid ranges:
 * - Males (leap year): 1-366
 * - Males (non-leap year): 1-365
 * - Females (leap year): 501-866
 * - Females (non-leap year): 501-865
 */
function isValidDayOfYear(dayOfYear: number, year?: number): boolean {
    // Extract base day (remove female offset if present)
    const baseDay = dayOfYear > FEMALE_DAY_OFFSET ? dayOfYear - FEMALE_DAY_OFFSET : dayOfYear;

    // Must be at least 1
    if (baseDay < 1) return false;

    // If year not provided, use permissive validation (leap year max)
    const maxDay = year !== undefined && !isLeapYear(year) ? 365 : 366;

    return baseDay <= maxDay;
}

// ============================================================================
// Date Calculation Functions
// ============================================================================

/**
 * Checks if a year is a leap year
 * 
 * @param year - The year to check
 * @returns True if the year is a leap year
 */
function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Converts NIC day of year to actual date (month and day)
 * 
 * Handles the Sri Lankan NIC special rule for non-leap years:
 * - Day 60 is skipped in non-leap years
 * - This keeps day numbers consistent from March onwards
 * 
 * @param nicDayOfYear - Raw day of year from NIC (may include female offset)
 * @param year - Birth year
 * @returns Object with month (1-12) and day (1-31), or null if invalid
 */
function nicDayToDate(nicDayOfYear: number, year: number): { month: number; day: number } | null {
    // Remove female offset if present
    let dayOfYear = nicDayOfYear > FEMALE_DAY_OFFSET
        ? nicDayOfYear - FEMALE_DAY_OFFSET
        : nicDayOfYear;

    const leap = isLeapYear(year);
    const maxDay = leap ? 366 : 365;

    // Validate day range
    if (dayOfYear < 1 || dayOfYear > maxDay) {
        return null;
    }

    // For non-leap years, adjust for the skipped day 60
    // NIC day 61+ in non-leap year corresponds to actual day 60+
    if (!leap && dayOfYear >= 60) {
        dayOfYear -= 1;
    }

    // Use cumulative days array to find the month
    const cumDays = leap ? CUMULATIVE_DAYS_LEAP : CUMULATIVE_DAYS_NON_LEAP;

    // Find the month (1-12)
    let month = 1;
    while (month <= 12 && dayOfYear > cumDays[month]) {
        month++;
    }

    // Calculate day of month
    const day = dayOfYear - cumDays[month - 1];

    return { month, day };
}

/**
 * Determines gender from NIC day of year
 * 
 * @param nicDayOfYear - Raw day of year from NIC
 * @param year - Birth year (for leap year validation)
 * @returns Gender ('male' or 'female'), or null if invalid
 */
function getGenderFromDay(nicDayOfYear: number, year: number): Gender | null {
    const leap = isLeapYear(year);
    const maxMaleDay = leap ? 366 : 365;
    const maxFemaleDay = FEMALE_DAY_OFFSET + maxMaleDay;

    if (nicDayOfYear >= 1 && nicDayOfYear <= maxMaleDay) {
        return 'male';
    }

    if (nicDayOfYear >= FEMALE_DAY_OFFSET + 1 && nicDayOfYear <= maxFemaleDay) {
        return 'female';
    }

    return null;
}

/**
 * Extracts the birth year from NIC
 * 
 * @param nic - The NIC string
 * @param format - The NIC format ('old' or 'new')
 * @returns The full 4-digit birth year
 * 
 * Old format: Uses 2-digit year, always assumes 1900s (e.g., 94 → 1994)
 * New format: Uses full 4-digit year directly
 */
function extractBirthYear(nic: string, format: NICFormat): number {
    if (format === 'old') {
        const yearPart = parseInt(nic.substring(0, 2), 10);
        return 1900 + yearPart;
    }
    return parseInt(nic.substring(0, 4), 10);
}

/**
 * Extracts the raw day of year from NIC (includes female offset if applicable)
 * 
 * @param nic - The NIC string
 * @param format - The NIC format ('old' or 'new')
 * @returns The raw day of year value
 */
function extractRawDayOfYear(nic: string, format: NICFormat): number {
    const startIndex = format === 'old' ? 2 : 4;
    return parseInt(nic.substring(startIndex, startIndex + 3), 10);
}

// ============================================================================
// Age Calculation Functions
// ============================================================================

/**
 * Calculates precise age from birth date to current date
 * 
 * Handles edge cases including:
 * - Month boundaries
 * - Leap year February
 * - Year boundaries
 * 
 * @param birthYear - Birth year
 * @param birthMonth - Birth month (1-12)
 * @param birthDay - Birth day (1-31)
 * @param currentYear - Current year
 * @param currentMonth - Current month (1-12)
 * @param currentDay - Current day (1-31)
 * @returns Age broken down into years, months, and days
 */
function calculatePreciseAge(
    birthYear: number,
    birthMonth: number,
    birthDay: number,
    currentYear: number,
    currentMonth: number,
    currentDay: number
): AgeInfo {
    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = currentDay - birthDay;

    // Adjust if days are negative (borrow from previous month)
    if (days < 0) {
        months--;

        // Get days in the previous month
        let prevMonth = currentMonth - 1;
        let prevMonthYear = currentYear;

        if (prevMonth === 0) {
            prevMonth = 12;
            prevMonthYear--;
        }

        // Use leap year aware days in month
        const daysInPrevMonth = prevMonth === 2 && isLeapYear(prevMonthYear)
            ? 29
            : DAYS_IN_MONTH[prevMonth];

        days += daysInPrevMonth;
    }

    // Adjust if months are negative (borrow from previous year)
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

/**
 * Calculates age from birthday to current date
 * 
 * @param birthday - Birth date as Date object
 * @param currentDate - Current date (defaults to now)
 * @returns Age in years, months, and days
 * 
 * @example
 * const age = calculateAge(new Date(1994, 4, 3));
 * // { years: 31, months: 8, days: 16 }
 */
export function calculateAge(birthday: Date, currentDate: Date = new Date()): AgeInfo {
    return calculatePreciseAge(
        birthday.getFullYear(),
        birthday.getMonth() + 1,
        birthday.getDate(),
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
    );
}

// ============================================================================
// Main Parsing Function
// ============================================================================

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
 * //   age: { years: 31, months: 8, days: 16 },
 * //   format: 'old',
 * //   year: 1994,
 * //   dayOfYear: 123
 * // }
 */
export function parseNIC(nic: string): NICInfo {
    const validation = validateNIC(nic);

    if (!validation.isValid || !validation.format) {
        throw new Error(`Invalid NIC: ${validation.errorKey}`);
    }

    const format = validation.format;
    const trimmedNIC = nic.trim();
    const year = extractBirthYear(trimmedNIC, format);
    const rawDayOfYear = extractRawDayOfYear(trimmedNIC, format);

    // Get gender from raw day
    const gender = getGenderFromDay(rawDayOfYear, year);
    if (gender === null) {
        throw new Error('Invalid NIC: Unable to determine gender');
    }

    // Convert NIC day to actual date
    const dateInfo = nicDayToDate(rawDayOfYear, year);
    if (dateInfo === null) {
        throw new Error('Invalid NIC: Unable to determine birth date');
    }

    const { month, day } = dateInfo;

    // Calculate the normalized day of year (without gender offset)
    const dayOfYear = rawDayOfYear > FEMALE_DAY_OFFSET
        ? rawDayOfYear - FEMALE_DAY_OFFSET
        : rawDayOfYear;

    // Create birthday Date object (month is 0-indexed in JavaScript)
    const birthday = new Date(year, month - 1, day);

    // Calculate current age
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

// ============================================================================
// Formatting Utilities
// ============================================================================

/**
 * Formats a date according to the specified locale
 * 
 * @param date - Date to format
 * @param locale - Locale string (e.g., 'en', 'si', 'ta')
 * @returns Localized date string
 * 
 * @example
 * formatDate(new Date(1994, 4, 3), 'en') // "May 3, 1994"
 */
export function formatDate(date: Date, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

/**
 * Extracts age components for formatting
 * Note: Actual pluralization should be handled by the i18n library (e.g., react-intl)
 * 
 * @param age - Age info object
 * @returns Age components for formatting
 */
export function formatAge(age: AgeInfo): { years: number; months: number; days: number } {
    return {
        years: age.years,
        months: age.months,
        days: age.days,
    };
}
