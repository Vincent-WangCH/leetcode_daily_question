# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        cur_node = root

        while(cur_node):
            if p.val < cur_node.val and q.val < cur_node.val:
                cur_node = cur_node.left
            elif p.val > cur_node.val and q.val > cur_node.val:
                cur_node = cur_node.right
            else:
                return cur_node

        return None