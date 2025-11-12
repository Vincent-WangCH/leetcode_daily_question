class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        k = 1
        val = nums[0]
        time = 1

        for x in nums[1:]:
            if x != val:
                nums[k] = x
                k += 1
                time = 1
                val = x
            elif time < 2:
                nums[k] = x
                k += 1
                time += 1

        return k

