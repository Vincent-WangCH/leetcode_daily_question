import heapq

class DSU:
    def __init__(self, n:int):
        self.p = list(range(n+1))
        self.r = [0] * (n+1)

    def find(self, x:int) -> int:
        while self.p[x] != x:
            self.p[x] = self.p[self.p[x]]
            x = self.p[x]
        return x

    def union(self, a:int, b:int) -> None:
        pa, pb = self.find(a), self.find(b)
        if pa == pb:
            return
        if self.r[pa] < self.r[pb]:
            pa, pb = pb, pa
        self.p[pb] = pa

        if self.r[pa] == self.r[pb]:
            self.r[pa] += 1

class Solution:
    def processQueries(self, c: int, connections: List[List[int]], queries: List[List[int]]) -> List[int]:
        online = [True] * (c+1)
        dsu = DSU(c)

        for u, v in connections:
            dsu.union(u, v)

        heaps = {}
        for node in range(1, c+1):
            p = dsu.find(node)
            if p not in heaps:
                heaps[p] = []
            heaps[p].append(node)

        for r in heaps:
            heapq.heapify(heaps[r])

        ans = []
        for t, x in queries:
            if t == 2:
                if online[x]:
                    online[x] = False
            else:
                if online[x]:
                    ans.append(x)
                    continue

                r = dsu.find(x)
                h = heaps[r]
                while h and not online[h[0]]:
                    heapq.heappop(h)
                ans.append(h[0] if h else -1)

        return ans