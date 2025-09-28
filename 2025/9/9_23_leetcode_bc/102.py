# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        from collections import deque

        if not root:
            return []

        current_nodes = deque([root])
        next_nodes = deque()
        output = []
        level_vals = []

        while current_nodes:
            cur_node = current_nodes.popleft()
            level_vals.append(cur_node.val)

            if cur_node.left:
                next_nodes.append(cur_node.left)
            if cur_node.right:
                next_nodes.append(cur_node.right)

            if not current_nodes:
                output.append(level_vals)
                level_vals = []
                current_nodes, next_nodes = next_nodes, deque()

        return output


