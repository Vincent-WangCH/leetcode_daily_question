# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        best = float("-inf")

        def getSum(root):
            nonlocal best

            if not root:
                return 0

            left = max(0, getSum(root.left))
            right = max(0, getSum(root.right))
            best = max(best, root.val + left + right)
            return root.val + max(left, right)

        getSum(root)
        return best


