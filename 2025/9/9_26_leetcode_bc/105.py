# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not preorder:
            return None

        pos = {v: i for i, v in enumerate(inorder)}

        def build(l:int, h:int, pre_index:int):
            if l > h or pre_index >= len(preorder):
                return None, pre_index

            cur_val = preorder[pre_index]
            cur_root = TreeNode(cur_val)
            mid_index = pos[cur_val]

            cur_root.left, next_pre_index = build(l, mid_index-1, pre_index+1)
            cur_root.right, next_pre_index = build(mid_index+1, h, next_pre_index)

            return cur_root, next_pre_index

        root, _ = build(0, len(preorder), 0)
        return root
