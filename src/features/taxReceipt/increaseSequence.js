export const increaseSequence = (sequence, increase, maxCharacters) => {
    let result = Number(sequence) + Number(increase)
    result = result.toString()
    
    // Prevent wraparound by limiting to max possible value for the given length
    // If result exceeds max digits, cap it at 999...999 instead of wrapping to 000...000
    if (result.length > maxCharacters) {
        result = '9'.repeat(maxCharacters);
    }
    
    result = result.padStart(maxCharacters, "0")
    return result
}