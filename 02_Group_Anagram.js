function isGroupAnagram(strs) {

    if (!strs || !Array.isArray(strs)) {
        throw new Error('Input must be an array');
    }

    if (strs.length === 0) return [];

    const map = new Map()

    for (let str of strs) {
        if (typeof str !== 'string') continue;

        const key = str.split('').sort().join('');

        if (!map.has(key)) {
            map.set(key, [])
        }

        map.get(key).push(str)


    }

    return Array.from(map.values());
}

console.log(isGroupAnagram(["eat", "tea", "tan", "ate", "nat", "bat"]));