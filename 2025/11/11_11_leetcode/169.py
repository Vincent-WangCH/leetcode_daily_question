from collections import defaultdict

class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        count = defaultdict(int)
        thresh = len(nums) // 2

        for x in nums:
            count[x] += 1
            if count[x] > thresh:
                return x
