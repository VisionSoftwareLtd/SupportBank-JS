const utils = require("./Utils");

class Banker {
    constructor(transactions) {
        this.transactions = transactions;
    }

    listAllTransactions() {
        var maxFrom = this.getMaxWidth((value) => value.from);
        var maxTo = this.getMaxWidth((value) => value.to);
        var maxNarrative = this.getMaxWidth((value) => value.narrative);
        for (var transaction of this.transactions) {
            var output = transaction.date.format("DD/MM/YYYY") + " | " +
                        utils.padWithSpaces(transaction.from, maxFrom) + " | " +
                        utils.padWithSpaces(transaction.to, maxTo) + " | " +
                        utils.padWithSpaces(transaction.narrative, maxNarrative) + " | " +
                        utils.getCurrencyDisplayString(transaction.amount);
            console.log(output);
        }
    }

    listAll() {
        var amountOwed = {};
        var maxFrom = this.getMaxWidth((value) => value.from);
        for (var transaction of this.transactions) {
            if (amountOwed[transaction.from] === undefined) {
                amountOwed[transaction.from] = 0;
            }
            if (amountOwed[transaction.to] === undefined) {
                amountOwed[transaction.to] = 0;
            }
            amountOwed[transaction.from] -= transaction.amountBasisPoints;
            amountOwed[transaction.to] += transaction.amountBasisPoints;
        }
        for (var person in amountOwed) {
            console.log(utils.padWithSpaces(person, maxFrom) + " balance is " + utils.convertBasisPointsToString(amountOwed[person]));
        }
    }

    listTransactionsForAccount(account) {
        var transactions = [];
        for (var transaction of this.transactions) {
            if (transaction.from == account || transaction.to == account) {
                transactions.push(transaction);
            }
        }
        if (transactions.length == 0) {
            console.log(`No transactions found for ${account}`);
            return;
        }
        var maxNarrative = this.getMaxWidth((value) => value.narrative, transactions);
        for (var transaction of transactions) {
            var amount = transaction.amountBasisPoints;
            if (transaction.from == account)
                amount = -amount;
            console.log(utils.padWithSpaces(transaction.narrative, maxNarrative) + " | " +
                utils.convertBasisPointsToString(amount));
        }
    }

    getMaxWidth(compareFunc, array) {
        if (array === undefined) {
            array = this.transactions;
        }
        var maxLength = 0;
        for (var transaction of array) {
            var length = compareFunc(transaction).length;
            if (length > maxLength)
                maxLength = length;
        }
        return maxLength;
    }
}

module.exports = Banker;