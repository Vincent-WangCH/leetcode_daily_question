/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    let zero = false;
    let total_product = 1;
    let output = [];

    for (const val of nums) {
        if (val === 0) {
            if (zero) {
                total_product = 0;
                break;
            }
            else {
                zero = true;
            }
        } else {
            total_product *= val;
        }
    }

    for (const val of nums) {
        if (val === 0) {
            output.push(total_product);
        } else if (zero) {
            output.push(0);
        } else {
            output.push(Math.floor(total_product / val))
        }
    }

    return output
};