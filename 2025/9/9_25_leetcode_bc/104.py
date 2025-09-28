# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        def findDepth(node, h):
            if not node:
                return h -1

            if not node.left and not node.right:
                return h


            left = findDepth(node.left, h+1)
            right = findDepth(node.right, h+1)

            return max(left, right)

        if not root:
            return 0
        return findDepth(root, 1)