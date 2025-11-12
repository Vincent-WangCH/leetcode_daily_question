from math import gcd

class Solution:
    def minOperations(self, nums: List[int]) -> int:
        n = len(nums)
        G = 0

        for x in nums:
            G = gcd(x, G)
        if G > 1:
            return -1

        ones = sum(1 for x in nums if x == 1)

        if ones:
            return n-ones

        Lmin = float("inf")
        for i in range(n):
            g = 0
            for j in range(i, n):
                g = gcd(g, nums[j])
                if g == 1:
                    Lmin = min(Lmin, j-i+1)
                    break

        return n+Lmin-2