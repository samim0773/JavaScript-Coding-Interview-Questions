function checkAnagram(str1, str2) {

    if (str1 === undefined || str2 === undefined) {
        throw new Error('Both parameters are required');
    }

    const cleanData = (str) => {
        if (typeof str !== 'string') return '';
        return str.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    const a = cleanData(str1);
    const b = cleanData(str2);

    if (a.length !== b.length) return false;

    const charCount = {}

    for (let char of a) {
        charCount[char] = (charCount[char] || 0) + 1
    }

    for (let char of b) {
        if (!charCount[char]) return false
        charCount[char]--
    }

    return true;
}
console.log('========== TYPE 1: TWO-STRING ANAGRAM ==========');
console.log('checkAnagram:', checkAnagram("anagram", "nagaram")); // true
console.log('checkAnagram:', checkAnagram("rat", "car")); // false