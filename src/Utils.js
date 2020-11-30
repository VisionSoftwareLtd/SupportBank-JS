exports.padWithSpaces = function(value, width) {
    var padding = "                                                                                  ";
    return (padding + value).slice(-width);
}

exports.getCurrencyDisplayString = function(value) {
    value = "£" + value;
    if (value.indexOf('.') == value.length - 2)
        value = value + "0";
    return exports.padWithSpaces(value, 6);
}

exports.convertBasisPointsToString = function(basisPoints) {
    var amount = (basisPoints / 100).toString();
    if (amount.startsWith('-')) {
        amount = "-£" + -amount;
    } else {
        amount = "£" + amount;
    }
    return amount;
}