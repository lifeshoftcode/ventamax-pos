/**
 * Utility functions for ensuring tax receipt sequences never go backwards
 */

/**
 * Gets the highest sequence number currently in use across all tax receipts
 * @param {Array} existingReceipts - Array of existing tax receipts
 * @returns {number} The highest sequence number found
 */
export function getHighestSequence(existingReceipts) {
  if (!existingReceipts || existingReceipts.length === 0) {
    return 0;
  }
  
  let highest = 0;
  existingReceipts.forEach(receipt => {
    if (receipt && receipt.data && receipt.data.sequence) {
      const sequenceNum = typeof receipt.data.sequence === 'number' 
        ? receipt.data.sequence 
        : parseInt(receipt.data.sequence, 10) || 0;
      
      if (sequenceNum > highest) {
        highest = sequenceNum;
      }
    }
  });
  
  return highest;
}

/**
 * Ensures a sequence is never lower than existing sequences
 * @param {string|number} proposedSequence - The proposed sequence value
 * @param {Array} existingReceipts - Array of existing tax receipts
 * @returns {number} A safe sequence number that won't cause backtracking
 */
export function ensureSequenceNeverGoesBackward(proposedSequence, existingReceipts) {
  const proposedNum = typeof proposedSequence === 'number' 
    ? proposedSequence 
    : parseInt(proposedSequence, 10) || 0;
  
  const highestExisting = getHighestSequence(existingReceipts);
  
  // If proposed sequence is 0 (default), start from highest + 1
  if (proposedNum === 0) {
    return highestExisting + 1;
  }
  
  // If proposed sequence is lower than highest existing, use highest + 1
  if (proposedNum <= highestExisting) {
    return highestExisting + 1;
  }
  
  // Otherwise, proposed sequence is safe to use
  return proposedNum;
}

/**
 * Formats a sequence number as a zero-padded string
 * @param {number} sequenceNum - The sequence number
 * @param {number} length - The desired string length (default 10)
 * @returns {string} Zero-padded sequence string
 */
export function formatSequence(sequenceNum, length = 10) {
  return String(sequenceNum).padStart(length, '0');
}

/**
 * Creates a new tax receipt with a safe sequence number
 * @param {Array} existingReceipts - Array of existing tax receipts
 * @param {Object} receiptData - The new receipt data (without sequence)
 * @returns {Object} New receipt with safe sequence
 */
export function createTaxReceiptWithSafeSequence(existingReceipts, receiptData) {
  const safeSequence = ensureSequenceNeverGoesBackward(0, existingReceipts);
  
  return {
    data: {
      ...receiptData,
      sequence: safeSequence, // Store as number for consistency
    }
  };
}