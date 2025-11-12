class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        k = 1
        val = nums[0]

        for x in nums[1:]:
            if x != val:
                nums[k] = x
                k += 1
                val = x

        return k
