/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    const findDepth = (node, h) => {
        if (!node) return h - 1;

        if (!node.left && !node.right) return h;

        let left = findDepth(node.left, h+1);
        let right = findDepth(node.right, h+1);

        return Math.max(left, right);
    }

    if (!root) return 0;
    return findDepth(root, 1);
};