class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float("inf")
        ans = 0
        max_profit = 0

        for x in prices:
            if x < min_price:
                min_price = x
            else:
                max_profit = max(max_profit, x - min_price)
                ans += max_profit
                max_profit = 0
                min_price = x

        return ans

