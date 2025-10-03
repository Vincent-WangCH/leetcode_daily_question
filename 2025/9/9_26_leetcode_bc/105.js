/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if (preorder.length === 0) return null;

    const root = new TreeNode(preorder[0]);

    const stack = [root];
    let i = 0;

    for (const val of preorder.slice(1)) {
        let node = stack[stack.length - 1];

        if (node.val !== inorder[i]) {
            node.left = new TreeNode(val);
            stack.push(node.left)
        } else {
            while (stack.length && stack[stack.length - 1].val === inorder[i]) {
                node = stack.pop();
                i += 1;
            }
            node.right = new TreeNode(val);
            stack.push(node.right);
        }
    }

    return root;
};