class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """

        n = len(nums)
        k %= n
        if k == 0:
            return

        moved = 0
        start = 0
        while moved < n:
            cur = start
            carry = nums[cur]
            while True:
                nxt = (cur + k) % n
                nums[nxt], carry = carry, nums[nxt]
                cur = nxt
                moved += 1
                if cur == start:
                    break
            start += 1


