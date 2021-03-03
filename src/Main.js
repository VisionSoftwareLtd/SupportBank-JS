var readlineSync = require('readline-sync');
var csvReader = require('./CsvReader');
var Banker = require('./Banker');
var banker;

function displayMenu() {
    console.log('===================================================================');
    console.log('Menu options')
    console.log('List All - List each person along with how much they should receive');
    console.log('List [Account] - List every transaction for an account');
    console.log('Quit - Exit the program')
    console.log('===================================================================');
}

function getValidCommand() {
    var command;
    do {
        command = readlineSync.question('Please enter a command: ');
    } while (command != 'Quit' && !command.startsWith('List '));
    return command;
}

function readTransactions() {
    console.log('Reading transactions');
    if (!csvReader.checkAccess()) {
        console.log("ERROR - Transaction file not found");
        return;
    }
    var transactions = csvReader.readFile();
    banker = new Banker(transactions);
    console.log('Transactions read successfully');
}

function extractCommand(argv) {
    if (argv.length == 3) {
        return argv[2];
    }
    return argv.slice(2).join(' ');
}

function processCommand(command) {
    if (command == 'List All') {
        banker.listAll();
    } else {
        banker.listTransactionsForAccount(command.slice(5));
    }
}

function main() {
    do {
        displayMenu();
        var command = getValidCommand();
        processCommand(command);
    } while (command != 'Quit');
}

readTransactions();
if (process.argv.length <= 2) {
    main();
} else {
    processCommand(extractCommand(process.argv));
}