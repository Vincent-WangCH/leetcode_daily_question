class Solution:
    def minOperations(self, nums: List[int]) -> int:
        ans = 0
        stack = []

        for x in nums:
            if x == 0:
                ans += len(stack)
                stack.clear()
                continue

            while stack and stack[-1] > x:
                ans += 1
                stack.pop()

            if not stack or stack[-1] < x:
                stack.append(x)

        ans += len(stack)
        return ans