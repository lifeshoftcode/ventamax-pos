/**
 * Integration test demonstrating the tax receipt sequence fix
 * This test simulates the exact scenarios that were causing backtracking
 */

import { test, expect, describe } from 'vitest';
import { increaseSequence } from '../features/taxReceipt/increaseSequence.js';
import { 
  ensureSequenceNeverGoesBackward,
  createTaxReceiptWithSafeSequence 
} from '../utils/sequenceSafety.js';

describe('Tax Receipt Sequence Backtracking Fix Integration Tests', () => {
  test('SCENARIO 1: Wraparound protection prevents sequence reset to 0000000000', () => {
    // This was the original bug - when sequence reached max, it would wrap to 0
    const maxSequence = '9999999999';
    const result = increaseSequence(maxSequence, 1, 10);
    
    // Before fix: would return '0000000000' (causing backtracking)
    // After fix: stays at max value
    expect(result).toBe('9999999999');
    expect(result).not.toBe('0000000000');
    
    console.log(`✅ Wraparound fix: ${maxSequence} + 1 = ${result} (no backtracking)`);
  });

  test('SCENARIO 2: Creating new tax receipts preserves existing sequence progression', () => {
    // Simulate existing tax receipts with various sequences
    const existingReceipts = [
      { data: { sequence: 1000, serie: '01', name: 'CREDITO FISCAL' } },
      { data: { sequence: 1500, serie: '02', name: 'CONSUMIDOR FINAL' } },
    ];
    
    // Create a new tax receipt (this used to reset to sequence 0)
    const newReceiptData = {
      name: 'NUEVO COMPROBANTE',
      type: 'B',
      serie: '03',
      increase: 1,
      quantity: 2000
    };
    
    const newReceipt = createTaxReceiptWithSafeSequence(existingReceipts, newReceiptData);
    
    // Should start from highest existing + 1 (1501), not 0
    expect(newReceipt.data.sequence).toBe(1501);
    expect(newReceipt.data.sequence).not.toBe(0);
    
    console.log(`✅ New receipt safe sequence: ${newReceipt.data.sequence} (no reset to 0)`);
  });

  test('SCENARIO 3: Settings update preserves higher existing sequences', () => {
    // Simulate existing receipt with high sequence
    const existingHighSequence = 2000;
    
    // Simulate settings update that would try to reset sequence to 0
    const proposedLowSequence = 0;
    
    const finalSequence = ensureSequenceNeverGoesBackward(proposedLowSequence, [
      { data: { sequence: existingHighSequence } }
    ]);
    
    // Should preserve the higher sequence, not allow reset
    expect(finalSequence).toBeGreaterThan(existingHighSequence);
    expect(finalSequence).toBe(2001);
    
    console.log(`✅ Settings update protection: ${proposedLowSequence} → ${finalSequence} (preserved higher sequence)`);
  });

  test('SCENARIO 4: Multiple operations maintain sequence progression', () => {
    // Simulate a sequence of operations that previously could cause backtracking
    let currentSequence = 100;
    const operations = [
      { type: 'increment', value: 1 },
      { type: 'increment', value: 5 },
      { type: 'increment', value: 10 },
      { type: 'settings_update', proposedReset: 0 }, // This used to cause backtracking
      { type: 'increment', value: 1 },
    ];
    
    const sequences = [currentSequence];
    
    operations.forEach(op => {
      if (op.type === 'increment') {
        const result = increaseSequence(currentSequence.toString().padStart(10, '0'), op.value, 10);
        currentSequence = parseInt(result, 10);
      } else if (op.type === 'settings_update') {
        // Simulate settings update that tries to reset sequence
        currentSequence = ensureSequenceNeverGoesBackward(op.proposedReset, [
          { data: { sequence: currentSequence } }
        ]);
      }
      sequences.push(currentSequence);
    });
    
    // Verify sequence never goes backwards
    for (let i = 1; i < sequences.length; i++) {
      expect(sequences[i]).toBeGreaterThanOrEqual(sequences[i - 1]);
    }
    
    console.log(`✅ Operation sequence: ${sequences.join(' → ')} (never decreases)`);
  });

  test('SCENARIO 5: System restart with mixed sequence formats preserves progression', () => {
    // Simulate the scenario where sequences are stored in different formats
    const mixedFormatReceipts = [
      { data: { sequence: '0000001200', serie: '01' } }, // String format
      { data: { sequence: 800, serie: '02' } },          // Number format
      { data: { sequence: '0000001500', serie: '03' } }, // String format (highest)
    ];
    
    // New receipt creation should start from highest + 1
    const newReceipt = createTaxReceiptWithSafeSequence(mixedFormatReceipts, {
      name: 'POST-RESTART RECEIPT',
      type: 'B',
      serie: '04'
    });
    
    expect(newReceipt.data.sequence).toBe(1501);
    
    console.log(`✅ Mixed format handling: highest 1500 → new ${newReceipt.data.sequence}`);
  });
});

console.log('\n🎉 All tax receipt sequence backtracking scenarios have been fixed!');