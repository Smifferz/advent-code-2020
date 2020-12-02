const fs = require('fs')
common = require('../../common/common');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var splitInput = data.split('\n');
    var validPasswords = 0;
    for (var idx = 0; idx < splitInput.length; idx++) {
        var result = getParametersFromInput(splitInput[idx]);
        // common.logMessage("minimum: " + result['minimum'] + " :: maximum: " + result['maximum'] + " :: char: " + result['char'], 'debug');
        var isValid = isPasswordValid(result['minimum'], result['maximum'], result['char'], splitInput[idx]);
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
    result['minimum'] = minimum;
    result['maximum'] = maximum;
    result['char'] = char;
    return result;
}

function isPasswordValid(minimum, maximum, char, string) {
    // Get the usable part of the string
    var stringToTest = string.substring(string.lastIndexOf(' ') + 1, string.length);
    var occurences = getOccurences(stringToTest, char);
    // console.log("Occurences of " + char + " in string: " + stringToTest + " = " + occurences);
    if (occurences >= parseInt(minimum) && occurences <= parseInt(maximum)) {
        return 1;
    } else {
        return 0;
    }
}

function getOccurences(string, char) {
    var occurences = {};
    for (var index = 0; index < string.length; index++) {
        var ch = string.charAt(index);
        if (ch == char) {
            var amount = occurences[ch];
            occurences[ch] = amount ? amount + 1 : 1
        }
    }
    return occurences[char];
}