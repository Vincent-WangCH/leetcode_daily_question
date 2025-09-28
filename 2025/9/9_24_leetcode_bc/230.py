# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        self.k = k
        self.ans = None

        def inorder(node):
            if node is None or self.ans is not None:
                return
            inorder(node.left)
            if self.ans is not None:
                return
            self.k -= 1
            if self.k == 0:
                self.ans = node.val
                return
            inorder(node.right)

        inorder(root)
        return self.ans