//INDEX AND SIGNATURES AND KEYOF ASSERTIONS
console.log("Lesson 07: Index Signatures & keyof Assertions");
const todayTransaction = {
    pizza: 10,
    burger: 5,
    sandwich: 2,
};
console.log("Today's Transaction: ", todayTransaction.pizza); // 10
console.log("Today's Transaction: ", todayTransaction['burger']);
const prop = "pizza";
console.log(todayTransaction[prop]); // 10
const dayNetTransaction = (transactions) => {
    let total = 0;
    for (const transaction in transactions) {
        if (typeof transactions[transaction] !== 'number') {
            throw new Error(`Invalid transaction value for ${transaction}: ${transactions[transaction]}`);
        }
        total += transactions[transaction];
    }
    return total;
};
dayNetTransaction(todayTransaction); // 17
export {};
//# sourceMappingURL=main.js.map