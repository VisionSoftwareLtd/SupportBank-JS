class Transaction {
    constructor(date, from, to, narrative, amount) {
        this.date = date;
        this.from = from;
        this.to = to;
        this.narrative = narrative;
        this.amountBasisPoints = amount * 100;
    }

    get amount() {
        return this.amountBasisPoints / 100;
    }
}

module.exports = Transaction;