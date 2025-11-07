class Solution:
    def maxPower(self, stations: List[int], r: int, k: int) -> int:
        n = len(stations)

        pref = [0] * (n+1)
        for i, v in enumerate(stations):
            pref[i+1] = pref[i] + v

        def window_sum(L: int, R: int) -> int:
            L = max(L, 0)
            R = min(R, n-1)
            if L > R:
                return 0
            return pref[R+1] - pref[L]

        base = [0] * n
        for i in range(n):
            base[i] = window_sum(i-r, i+r)

        cur_min = min(base)
        cur_max = max(base)

        def can(target:int) -> bool:
            diff = [0] * (n+1)
            extra = 0
            left_k = k

            for i in range(n):
                extra += diff[i]
                curr = base[i] + extra

                if curr < target:
                    need = target - curr
                    if need > left_k:
                        return False
                    left_k -= need

                    stop = min(n-1, i+2*r)

                    extra += need
                    diff[stop+1] -= need

            return True

        lo, hi = cur_min, cur_max+k
        ans = cur_min
        while lo <= hi:
            mid = (lo + hi) // 2
            if can(mid):
                ans = mid
                lo = mid + 1
            else:
                hi = mid - 1
        return ans

