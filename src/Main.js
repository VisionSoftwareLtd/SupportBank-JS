var readlineSync = require('readline-sync');
var csvReader = require('./CsvReader');
var Banker = require('./Banker');

// var userName = readlineSync.question('May I have your name? ');

if (csvReader.checkAccess()) {
    console.log("File exists!")
}
var transactions = csvReader.readFile();
banker = new Banker(transactions);
banker.listAll();
console.log("-------------------");
banker.listTransactionsForAccount("Laura B");