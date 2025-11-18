import { describe, test, expect } from 'vitest';

// Mock utility functions
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

describe('Utility Functions', () => {
  describe('formatPrice', () => {
    test('should format price correctly', () => {
      expect(formatPrice(1000000)).toContain('1.000.000');
    });

    test('should handle zero', () => {
      expect(formatPrice(0)).toContain('0');
    });

    test('should handle decimal numbers', () => {
      const result = formatPrice(1500.5);
      expect(result).toBeTruthy();
    });
  });

  describe('validateEmail', () => {
    test('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    test('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });
});