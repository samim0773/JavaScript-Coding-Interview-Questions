function reverseString(str) {
    // EDGE CASE 1: Check if input is provided
    if (str === undefined || str === null) {
        return "Error: Input is undefined or null";
    }

    // EDGE CASE 2: Check if input is a string
    if (typeof str !== 'string') {
        // Convert to string if possible
        if (str.toString) {
            str = str.toString();
        } else {
            return "Error: Input must be a string or convertible to string";
        }
    }

    // EDGE CASE 3: Empty string
    if (str.length === 0) {
        return "";
    }

    // EDGE CASE 4: Single character
    if (str.length === 1) {
        return str;
    }

    // EDGE CASE 5: String with only spaces
    if (str.trim().length === 0) {
        // Reverse spaces (same string)
        return str;
    }

    // EDGE CASE 6: Handle Unicode/emoji characters properly
    // Use Array.from() to handle surrogate pairs
    const chars = Array.from(str);
    let reversed = '';
    for (let i = chars.length - 1; i >= 0; i--) {
        reversed += chars[i];
    }
    return reversed;
}

console.log("revers strign is: ", reverseString(' '))