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
var maxPathSum = function(root) {
    let best = -Infinity;

    const getSum = (node) => {
        if (!node) return 0;

        let left = Math.max(0, getSum(node.left));
        let right = Math.max(0, getSum(node.right));
        let curMax = node.val + left + right;
        best = Math.max(best, curMax);

        return node.val + Math.max(left, right);
    }

    getSum(root);

    return best
};