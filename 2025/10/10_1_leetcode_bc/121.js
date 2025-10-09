/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let min_price = Infinity;
    let profit = 0;

    for (let p of prices) {
        if (p < min_price) min_price = p;
        else profit = Math.max(profit, p - min_price);
    }

    return profit
};