const fs = require('fs')
common = require('../../common/common');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var splitInput = data.split('\n');
    var validPasswords = 0;
    for (var idx = 0; idx < splitInput.length; idx++) {
        var result = getParametersFromInput(splitInput[idx]);
        // common.logMessage("minimum: " + result['minimum'] + " :: maximum: " + result['maximum'] + " :: char: " + result['char'], 'debug');
        var isValid = isPasswordValid(result['position1'], result['position2'], result['char'], splitInput[idx]);
        if (isValid == 1) {
            validPasswords += 1;
        }
    }
    common.logMessage("Valid passwords: " + validPasswords);
})

function getParametersFromInput(input) {
    var minimum = input.substring(0, input.indexOf('-'));
    var maximum = input.substring(input.indexOf('-') + 1, input.indexOf(' '));
    var char = input.substring(input.indexOf(' ') + 1, input.indexOf(':'));
    var result = new Object();
    result['position1'] = minimum;
    result['position2'] = maximum;
    result['char'] = char;
    return result;
}

function isPasswordValid(position1, position2, char, string) {
    // Get the usable part of the string
    var stringToTest = string.substring(string.lastIndexOf(' ') + 1, string.length);
    var positions = getPositionsOfChar(stringToTest, char);
    if (positions[position1] == 1 && positions[position2] == 1) {
        return 0;
    } else if (positions[position1] == 1 || positions[position2] == 1) {
        return 1;
    } else {
        return 0;
    }
}

function getPositionsOfChar(string, char) {
    var positions = {};
    for (var index = 0; index < string.length; index++) {
        var ch = string.charAt(index);
        if (ch == char) {
            positions[index + 1] = 1;
        }
    }
    return positions;
}