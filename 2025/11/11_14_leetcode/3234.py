import math

class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        n = len(s)
        ans = 0

        i = 0
        while i < n:
            if s[i] == "1":
                j = i
                while j < n and s[j] == "1":
                    j += 1
                length = j - i
                ans += length * (length + 1) // 2
                i = j
            else:
                i += 1

        # Any valid substring must satisfy z^2 <= length <= n,
        # so z <= sqrt(n). That's our max possible zeros.
        max_zero = int(math.isqrt(n))

        # Try all possible counts of zeros: z = 0, 1, ..., max_zero
        for z in range(1, max_zero+1):
            zeros = 0
            ones = 0
            l = 0
            last_bad = -1  # last index that cannot start a valid substring

            for r, ch in enumerate(s):
                # Expand window to the right
                if ch == "0":
                    zeros += 1
                else:
                    ones += 1

                # Step B: enforce at most z zeros
                while zeros > z:
                    if s[l] == "0":
                        zeros -= 1
                        last_bad = l
                    else:
                        ones -= 1
                    l += 1

                # Step C: shrink leading ones if we can keep dominance
                # and keep exactly z zeros.
                while (
                    l <= r and zeros == z and
                    s[l] == "1" and ones - 1 >= z * z
                ):
                    ones -= 1
                    l += 1

                # Step D: if window [l, r] is valid, count possible starts
                if zeros == z and ones >= z * z:
                    ans += (l - last_bad)

        return ans