function findMaximumNumber(arr) {
    // Edge case 1: Check if input is an array
    if (!Array.isArray(arr)) {
        return "Error: Input must be an array";
    }
    
    // Edge case 2: Check if array is empty
    if (arr.length === 0) {
        return "Error: Array is empty";
    }
    
    // Edge case 3: Handle arrays with null, undefined, or non-numeric values
    // Filter out non-numeric values and check if any valid numbers exist
    const numericArray = arr.filter(item => typeof item === 'number' && !isNaN(item));
    
    if (numericArray.length === 0) {
        return "Error: No valid numeric values found in array";
    }
    
    // Find maximum using the filtered numeric array
    let max = numericArray[0];
    for (let i = 1; i < numericArray.length; i++) {
        if (numericArray[i] > max) {
            max = numericArray[i];
        }
    }
    
    return max;
}

// Test cases with edge and corner cases
console.log('Test 1 - Normal case:', findMaximumNumber([50, 5, 26, 12, 98, 15])); 
// Output: 98

console.log('Test 2 - Single element:', findMaximumNumber([42])); 
// Output: 42

console.log('Test 3 - Negative numbers:', findMaximumNumber([-5, -2, -10, -1])); 
// Output: -1

console.log('Test 4 - Mixed positive and negative:', findMaximumNumber([-5, 10, -2, 8, 0])); 
// Output: 10

console.log('Test 5 - All zeros:', findMaximumNumber([0, 0, 0])); 
// Output: 0

console.log('Test 6 - Decimal numbers:', findMaximumNumber([1.5, 2.7, 0.8, 3.2])); 
// Output: 3.2

console.log('Test 7 - Empty array:', findMaximumNumber([])); 
// Output: Error: Array is empty

console.log('Test 8 - Null input:', findMaximumNumber(null)); 
// Output: Error: Input must be an array

console.log('Test 9 - Non-array input:', findMaximumNumber("not an array")); 
// Output: Error: Input must be an array

console.log('Test 10 - Array with null values:', findMaximumNumber([5, null, 10, undefined, 3])); 
// Output: 10 (ignores null and undefined)

console.log('Test 11 - Array with string numbers:', findMaximumNumber([5, "10", 3, "7"])); 
// Output: 5 (ignores string numbers)

console.log('Test 12 - Array with NaN:', findMaximumNumber([5, NaN, 10, 3])); 
// Output: 10 (ignores NaN)

console.log('Test 13 - Large numbers:', findMaximumNumber([Number.MAX_SAFE_INTEGER, 100, 200])); 
// Output: 9007199254740991

console.log('Test 14 - Very large array:', findMaximumNumber(Array.from({length: 10000}, (_, i) => i))); 
// Output: 9999

console.log('Test 15 - All identical numbers:', findMaximumNumber([7, 7, 7, 7])); 
// Output: 7

