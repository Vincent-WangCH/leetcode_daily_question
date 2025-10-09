class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        from collections import defaultdict, Counter

        Counter(s)
        Counter(t)

        char_dict = {}
        char_dict_t = defaultdict(int)
        for i in s:
            if i in char_dict:
                char_dict[i] += 1
            else:
                char_dict[i] = 1

        for i in t:
            char_dict_t[i] += 1

        if len(char_dict) != len(char_dict_t):
             return False

        for k in char_dict:
            if char_dict[k] != char_dict_t[k]:
                return False

        return True
