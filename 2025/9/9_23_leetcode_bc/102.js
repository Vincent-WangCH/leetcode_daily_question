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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];

    let currentNodes = [root];
    let nextNodes = [];
    let output = [];
    let level_vals = [];

    while (currentNodes.length > 0 ) {
        let node = currentNodes.shift();
        level_vals.push(node.val);

        if (node.left) nextNodes.push(node.left);
        if (node.right) nextNodes.push(node.right);

        if (currentNodes.length === 0) {
            output.push(level_vals);
            level_vals = [];
            currentNodes = nextNodes;
            nextNodes = [];
        }
    }

    return output;
};