class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        zero = False
        total_product = 1
        output = []

        for i in nums:
            if i == 0:
                if zero:
                    total_product = 0
                    break
                zero = True
                continue
            total_product *= i

        for i in nums:
            if i == 0:
                output.append(total_product)
            elif zero:
                output.append(0)
            else:
                output.append(total_product // i)

        return output



