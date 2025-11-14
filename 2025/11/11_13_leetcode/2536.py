class Solution:
    def rangeAddQueries(self, n: int, queries: List[List[int]]) -> List[List[int]]:
        diff = [[0] * (n+1) for _ in range(n)]

        def addone(row1, col1, row2, col2):
            for x in range(row1, row2+1):
                for y in range(col1, col2+1):
                    matrix[x][y] += 1


        for r1, c1, r2, c2 in queries:
            for r in range(r1, r2+1):
                diff[r][c1] += 1
                if c2 + 1 < n:
                    diff[r][c2+1] -= 1

        res = [[0] * n for _ in range(n)]
        for r in range(n):
            cur = 0
            for c in range(n):
                cur += diff[r][c]
                res[r][c] = cur



        return res