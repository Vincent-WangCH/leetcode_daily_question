class Solution:
    def getSum(self, a: int, b: int) -> int:
        import numpy as np

        a, b = np.int32(a), np.int32(b)
        while (b != 0):
            carry = np.int32((a & b) << 1)
            a = np.int32(a^b)
            b = carry

        return int(a)