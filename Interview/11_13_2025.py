# 给定一个字符串 s ，检查是否能重新排布其中的字母，使得两相邻的字符不同。
# 返回 s 的任意可能的重新排列。若不可行，返回空字符串 "" 。

# 示例 1:
# 输入: s = "aab"
# 输出: "aba"
# 示例 2:
# 输入: s = "aaab"
# 输出: ""
# 提示:
# 1 <= s.length <= 500
# s 只包含小写字母

import heapq

class Solution(object):
    def reorganizeString(self, s):
        """
        :type s: str
        :rtype: str
        """
        freq = {}
        for c in s:
            freq[c] = freq.get(c, 0) + 1

        if max(freq.values()) > (len(s) + 1 // 2):
            return ""

        heap = []
        for value, cnt in enumerate(freq):
            heapq.heappush(heap, (-cnt, value))

        res = []
        while len(heap) > 1:
            cnt1, c1 = heapq.heappop(heap)
            cnt2, c2 = heapq.heappop(heap)

            res.append(c1)
            res.append(c2)

            if cnt1 + 1 < 0:
                cnt1+=1
                heapq.heappush(heap, (cnt1, c1))
            if cnt2 + 1 < 0:
                cnt2+=1
                heapq.heappush(heap, (cnt2, c2))

        if heap:
            res.append(heap[0][1])

        return res
