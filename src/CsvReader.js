const fs = require('fs');
const moment = require('moment');
const Transaction = require('./Transaction');

const defaultFilePath = "./Transactions2014.csv";

exports.checkAccess = function (filePath) {
    if (filePath === undefined)
        filePath = defaultFilePath;
    try {
        fs.accessSync(filePath);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

exports.readFile = function(filePath) {
    if (filePath === undefined)
        filePath = defaultFilePath;
    try {
        var buffer = fs.readFileSync(filePath);
        var lines = buffer.toString().split('\n');
        var transactions = [];
        var headerRow = true;
        lines.forEach(line => {
            if (headerRow) {
                headerRow = false;
                return;
            }
            var parts = line.split(',');
            var transaction = new Transaction(
                moment(parts[0], "DD-MM-YYYY"),
                parts[1],
                parts[2],
                parts[3],
                parseFloat(parts[4].trim()));
            transactions.push(transaction);
        });
        return transactions;
    } catch (err) {
        console.error(err);
    }
}