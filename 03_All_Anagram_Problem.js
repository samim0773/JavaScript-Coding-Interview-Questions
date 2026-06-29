/**
 * ============================================
 * TYPE 1: TWO-STRING ANAGRAM CHECKER
 * ============================================
 * Checks if two strings are anagrams of each other
 * Time: O(n) | Space: O(1)
 * ============================================
 */

function isAnagram(str1, str2) {
    // Edge cases
    if (str1 === undefined || str2 === undefined) {
        throw new Error('Both parameters are required');
    }
    
    // Clean strings: remove non-alphanumeric, convert to lowercase
    const clean = (str) => {
        if (typeof str !== 'string') return '';
        return str.toLowerCase().replace(/[^a-z0-9]/g, '');
    };
    
    const a = clean(str1);
    const b = clean(str2);
    
    // If lengths differ, they can't be anagrams
    if (a.length !== b.length) return false;
    
    // Handle empty strings
    if (a.length === 0 && b.length === 0) return true;
    
    // Frequency counter using object
    const charCount = {};
    
    // Count characters in first string
    for (let char of a) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract counts using second string
    for (let char of b) {
        if (!charCount[char]) return false; // char missing or count already 0
        charCount[char]--;
    }
    
    return true;
}

/**
 * ============================================
 * TYPE 2: GROUP ANAGRAMS (SORTING APPROACH)
 * ============================================
 * Groups all anagrams together from an array of strings
 * Time: O(n * k log k) | Space: O(n * k)
 * where n = number of strings, k = max string length
 * ============================================
 */

function groupAnagramsSort(strs) {
    // Edge cases
    if (!strs || !Array.isArray(strs)) {
        throw new Error('Input must be an array');
    }
    
    if (strs.length === 0) return [];
    
    const map = new Map();
    
    for (let str of strs) {
        // Skip non-string values
        if (typeof str !== 'string') continue;
        
        // Sort characters to create key
        const key = str.split('').sort().join('');
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}

/**
 * ============================================
 * TYPE 2: GROUP ANAGRAMS (FREQUENCY APPROACH - FASTER)
 * ============================================
 * Groups all anagrams using frequency array (no sorting)
 * Time: O(n * k) | Space: O(n * k)
 * This is faster than sorting approach for large strings
 * ============================================
 */

function groupAnagramsFrequency(strs) {
    // Edge cases
    if (!strs || !Array.isArray(strs)) {
        throw new Error('Input must be an array');
    }
    
    if (strs.length === 0) return [];
    
    const map = new Map();
    
    for (let str of strs) {
        if (typeof str !== 'string') continue;
        
        // Create frequency array for 26 letters (a-z)
        const count = new Array(26).fill(0);
        
        // Count characters (only a-z, case-insensitive)
        for (let char of str.toLowerCase()) {
            const code = char.charCodeAt(0) - 97;
            if (code >= 0 && code <= 25) {
                count[code]++;
            }
        }
        
        // Create unique key from count array
        const key = count.join('#');
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}

/**
 * ============================================
 * BONUS: FIND ALL ANAGRAM INDICES IN A STRING
 * ============================================
 * Find all starting indices where anagram of pattern exists
 * Time: O(n) | Space: O(1)
 * ============================================
 */

function findAnagramIndices(s, p) {
    // Edge cases
    if (!s || !p || s.length < p.length) return [];
    
    const result = [];
    const pCount = new Array(26).fill(0);
    const sCount = new Array(26).fill(0);
    
    // Count characters in pattern
    for (let char of p) {
        const code = char.charCodeAt(0) - 97;
        if (code >= 0 && code <= 25) {
            pCount[code]++;
        }
    }
    
    // Sliding window
    for (let i = 0; i < s.length; i++) {
        const code = s[i].charCodeAt(0) - 97;
        if (code >= 0 && code <= 25) {
            sCount[code]++;
        }
        
        // Remove leftmost character of window
        if (i >= p.length) {
            const leftCode = s[i - p.length].charCodeAt(0) - 97;
            if (leftCode >= 0 && leftCode <= 25) {
                sCount[leftCode]--;
            }
        }
        
        // Check if current window is an anagram
        if (i >= p.length - 1) {
            let isAnagram = true;
            for (let j = 0; j < 26; j++) {
                if (sCount[j] !== pCount[j]) {
                    isAnagram = false;
                    break;
                }
            }
            if (isAnagram) {
                result.push(i - p.length + 1);
            }
        }
    }
    
    return result;
}

/**
 * ============================================
 * BONUS: CHECK IF TWO STRINGS ARE ANAGRAMS 
 * (WITHOUT ANY BUILT-IN METHODS)
 * ============================================
 * Pure manual implementation for interview
 * ============================================
 */

function isAnagramManual(str1, str2) {
    // Clean and sort string manually
    function cleanAndSort(str) {
        // Store valid characters
        let chars = [];
        let len = 0;
        
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            
            // Convert uppercase to lowercase (ASCII: A=65, Z=90, a=97)
            if (code >= 65 && code <= 90) {
                code += 32;
            }
            
            // Keep only alphanumeric (0-9: 48-57, a-z: 97-122)
            if ((code >= 48 && code <= 57) || (code >= 97 && code <= 122)) {
                chars[len] = String.fromCharCode(code);
                len++;
            }
        }
        
        // Manual selection sort
        for (let i = 0; i < len - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < len; j++) {
                if (chars[j] < chars[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                let temp = chars[i];
                chars[i] = chars[minIdx];
                chars[minIdx] = temp;
            }
        }
        
        // Manual join
        let result = '';
        for (let i = 0; i < len; i++) {
            result += chars[i];
        }
        return result;
    }
    
    return cleanAndSort(str1) === cleanAndSort(str2);
}

/**
 * ============================================
 * BONUS: GROUP ANAGRAMS WITHOUT SORTING 
 * (PURE MANUAL IMPLEMENTATION)
 * ============================================
 */

function groupAnagramsManual(strs) {
    const map = new Map();
    
    function getKey(str) {
        const count = new Array(26).fill(0);
        
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code >= 65 && code <= 90) {
                code += 32; // Convert to lowercase
            }
            if (code >= 97 && code <= 122) {
                count[code - 97]++;
            }
        }
        
        // Create key manually
        let key = '';
        for (let i = 0; i < 26; i++) {
            key += count[i] + '#';
        }
        return key;
    }
    
    for (let str of strs) {
        const key = getKey(str);
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}

// ============================================
// ============ TESTING SECTION ==============
// ============================================

console.log('========== TYPE 1: TWO-STRING ANAGRAM ==========');
console.log('isAnagram("anagram", "nagaram"):', isAnagram("anagram", "nagaram")); // true
console.log('isAnagram("rat", "car"):', isAnagram("rat", "car")); // false
console.log('isAnagram("Listen", "Silent"):', isAnagram("Listen", "Silent")); // true
console.log('isAnagram("hello", "world"):', isAnagram("hello", "world")); // false
console.log('isAnagram("A gentleman", "Elegant man"):', isAnagram("A gentleman", "Elegant man")); // true
console.log('isAnagram("", ""):', isAnagram("", "")); // true
console.log('isAnagram("abc", ""):', isAnagram("abc", "")); // false

console.log('\n========== TYPE 2: GROUP ANAGRAMS (SORT) ==========');
const testArray1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log('Input:', testArray1);
console.log('Grouped (Sort):', groupAnagramsSort(testArray1));
// Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]

console.log('\n========== TYPE 2: GROUP ANAGRAMS (FREQUENCY) ==========');
console.log('Input:', testArray1);
console.log('Grouped (Frequency):', groupAnagramsFrequency(testArray1));
// Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]

console.log('\n========== BONUS: FIND ANAGRAM INDICES ==========');
console.log('findAnagramIndices("cbaebabacd", "abc"):', findAnagramIndices("cbaebabacd", "abc"));
// Output: [0, 6]
console.log('findAnagramIndices("abab", "ab"):', findAnagramIndices("abab", "ab"));
// Output: [0, 1, 2]
console.log('findAnagramIndices("aaaaaaaaaa", "aa"):', findAnagramIndices("aaaaaaaaaa", "aa"));
// Output: [0,1,2,3,4,5,6,7,8]

console.log('\n========== BONUS: MANUAL IMPLEMENTATION ==========');
console.log('isAnagramManual("anagram", "nagaram"):', isAnagramManual("anagram", "nagaram")); // true
console.log('isAnagramManual("rat", "car"):', isAnagramManual("rat", "car")); // false
console.log('isAnagramManual("Listen", "Silent"):', isAnagramManual("Listen", "Silent")); // true

console.log('\n========== BONUS: GROUP ANAGRAMS MANUAL ==========');
const testArray2 = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log('Input:', testArray2);
console.log('Grouped (Manual):', groupAnagramsManual(testArray2));

// ============================================
// ============ PERFORMANCE TEST ==============
// ============================================

console.log('\n========== PERFORMANCE COMPARISON ==========');

// Generate large test data
function generateLargeArray(size) {
    const words = ['abc', 'bca', 'cab', 'xyz', 'yzx', 'zyx', 'def', 'efd', 'fde'];
    const result = [];
    for (let i = 0; i < size; i++) {
        result.push(words[i % words.length] + (i < words.length ? '' : ''));
    }
    return result;
}

const largeArray = generateLargeArray(1000);
console.log('Testing with 1000 strings...');

console.time('groupAnagramsSort');
groupAnagramsSort(largeArray);
console.timeEnd('groupAnagramsSort');

console.time('groupAnagramsFrequency');
groupAnagramsFrequency(largeArray);
console.timeEnd('groupAnagramsFrequency');

console.time('groupAnagramsManual');
groupAnagramsManual(largeArray);
console.timeEnd('groupAnagramsManual');

// ============================================
// ============ ERROR HANDLING TEST ===========
// ============================================

console.log('\n========== ERROR HANDLING ==========');
try {
    console.log(isAnagram(undefined, "test"));
} catch (e) {
    console.log('Caught error:', e.message);
}

try {
    console.log(groupAnagramsSort(null));
} catch (e) {
    console.log('Caught error:', e.message);
}

console.log('\n========== EDGE CASES ==========');
console.log('Numbers:', isAnagram("123", "321")); // true
console.log('Special chars:', isAnagram("he!llo", "olleh!")); // true
console.log('Case sensitive:', isAnagram("Hello", "hello")); // true
console.log('Mixed:', isAnagram("a1b2c3", "3c2b1a")); // true
console.log('Different lengths:', isAnagram("abc", "abcd")); // false