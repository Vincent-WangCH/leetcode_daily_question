/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    const s_map = new Map();
    const t_map = new Map();

    if (s.length !== t.length) return false

    for (let ch of s) {
        s_map.set(ch, (s_map.get(ch) || 0 ) + 1);
    }

    for (let ch of t) {
        t_map.set(ch, (t_map.get(ch) || 0 ) + 1);
    }


    for (let [key, value] of s_map) {
        if (value !== t_map.get(key)) return false
    }

    return true
};