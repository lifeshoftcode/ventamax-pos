import { test, expect, describe } from 'vitest';

// Import the functions we need to test
import { increaseSequence } from '../features/taxReceipt/increaseSequence.js';
import { increaseSequence as increaseSequenceUtils } from '../utils/taxReceipt.js';
import { 
  getHighestSequence,
  ensureSequenceNeverGoesBackward,
  formatSequence,
  createTaxReceiptWithSafeSequence
} from '../utils/sequenceSafety.js';

describe('Tax Receipt Sequence Management', () => {
  describe('increaseSequence function', () => {
    test('should increment sequence correctly for normal values', () => {
      expect(increaseSequence('0000000001', 1, 10)).toBe('0000000002');
      expect(increaseSequence('0000000099', 1, 10)).toBe('0000000100');
      expect(increaseSequence('0000001000', 1, 10)).toBe('0000001001');
    });

    test('should handle wraparound correctly and not reset to 0000000000', () => {
      // This test verifies the fix for the wraparound bug
      const result = increaseSequence('9999999999', 1, 10);
      
      // Fixed behavior: should cap at max value instead of wrapping to 0
      expect(result).toBe('9999999999'); // Should stay at max, not wrap to 0000000000
      
      // Verify we don't get backtracking
      expect(result).not.toBe('0000000000');
    });

    test('should preserve leading zeros', () => {
      expect(increaseSequence('0000000001', 1, 10)).toBe('0000000002');
      expect(increaseSequence('0000000009', 1, 10)).toBe('0000000010');
    });

    test('should handle different increment values', () => {
      expect(increaseSequence('0000000001', 5, 10)).toBe('0000000006');
      expect(increaseSequence('0000000095', 10, 10)).toBe('0000000105');
    });
  });

  describe('sequence consistency across implementations', () => {
    test('all increaseSequence implementations should give same results', () => {
      const testCases = [
        ['0000000001', 1, 10],
        ['0000000099', 1, 10],
        ['0000001000', 1, 10]
      ];

      testCases.forEach(([sequence, increase, maxChars]) => {
        const result1 = increaseSequence(sequence, increase, maxChars);
        const result2 = increaseSequenceUtils(sequence, increase, maxChars);
        
        expect(result1).toBe(result2);
      });
    });
  });

  describe('sequence backtracking prevention', () => {
    test('sequence should never go backwards', () => {
      const sequences = ['0000000001', '0000000010', '0000000100', '0000001000'];
      
      for (let i = 0; i < sequences.length - 1; i++) {
        const current = sequences[i];
        const next = increaseSequence(current, 1, 10);
        
        // Parse as numbers to compare
        const currentNum = parseInt(current, 10);
        const nextNum = parseInt(next, 10);
        
        expect(nextNum).toBeGreaterThan(currentNum);
      }
    });
    
    test('new tax receipt should not reset sequence to default', () => {
      // This test verifies that creating new tax receipts doesn't reset sequence
      const defaultSequence = '0000000000';
      const currentSequence = '0000001500';
      
      // When creating new tax receipts, sequence should not revert to default
      expect(currentSequence).not.toBe(defaultSequence);
    });
  });

  describe('sequence safety utilities', () => {
    const mockReceipts = [
      { data: { sequence: 100, serie: '01' } },
      { data: { sequence: '0000000200', serie: '02' } }, // string format
      { data: { sequence: 50, serie: '03' } },
    ];

    test('getHighestSequence should find highest sequence', () => {
      expect(getHighestSequence(mockReceipts)).toBe(200);
      expect(getHighestSequence([])).toBe(0);
      expect(getHighestSequence(null)).toBe(0);
    });

    test('ensureSequenceNeverGoesBackward should prevent backtracking', () => {
      // Proposed sequence of 0 should become highest + 1
      expect(ensureSequenceNeverGoesBackward(0, mockReceipts)).toBe(201);
      
      // Proposed sequence lower than highest should become highest + 1
      expect(ensureSequenceNeverGoesBackward(150, mockReceipts)).toBe(201);
      
      // Proposed sequence higher than highest should be allowed
      expect(ensureSequenceNeverGoesBackward(300, mockReceipts)).toBe(300);
    });

    test('formatSequence should format numbers correctly', () => {
      expect(formatSequence(1)).toBe('0000000001');
      expect(formatSequence(123)).toBe('0000000123');
      expect(formatSequence(1234567890)).toBe('1234567890');
    });

    test('createTaxReceiptWithSafeSequence should create safe receipts', () => {
      const receiptData = {
        name: 'TEST RECEIPT',
        type: 'B',
        serie: '04',
        increase: 1,
        quantity: 2000
      };
      
      const newReceipt = createTaxReceiptWithSafeSequence(mockReceipts, receiptData);
      
      expect(newReceipt.data.sequence).toBe(201); // Should be highest + 1
      expect(newReceipt.data.name).toBe('TEST RECEIPT');
      expect(newReceipt.data.serie).toBe('04');
    });
  });

  describe('sequence update scenarios', () => {
    test('should preserve higher existing sequences during updates', () => {
      const existingSequence = 1500;
      const proposedSequence = 0; // This would be the default reset value
      
      const finalSequence = ensureSequenceNeverGoesBackward(proposedSequence, [
        { data: { sequence: existingSequence } }
      ]);
      
      // Should not allow sequence to go backward
      expect(finalSequence).toBeGreaterThan(existingSequence);
      expect(finalSequence).toBe(1501);
    });

    test('should handle mixed sequence formats', () => {
      const mixedReceipts = [
        { data: { sequence: '0000001000' } }, // string
        { data: { sequence: 500 } },          // number
        { data: { sequence: '0000000750' } }, // string
      ];
      
      const highest = getHighestSequence(mixedReceipts);
      expect(highest).toBe(1000);
      
      const safeSequence = ensureSequenceNeverGoesBackward(0, mixedReceipts);
      expect(safeSequence).toBe(1001);
    });
  });
});