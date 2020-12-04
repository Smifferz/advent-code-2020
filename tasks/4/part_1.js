const fs = require('fs');
const common = require('../../common/common');

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var splitInput = data.split('\n');
    var passports = getPasssports(splitInput);
    var numValid = 0;
    passports.forEach(function (entry) {
        numValid += isPassportValid(entry);
    })
    common.logMessage('Number of valid passports: ' + numValid);
})

function getPasssports(input) {
    var passports = [];
    var nextPassport = 1;
    for (var i = 0; i < input.length; i++) {
        if (nextPassport) {
            passports.push(input[i]);
            nextPassport = 0;
        } else {
            if (input[i] == '') {
                nextPassport = 1;
                continue;
            }
            passports[passports.length - 1] += " " + input[i];
        }
    }
    var mappedPassports = new Array(passports.length);
    for (var i = 0; i < passports.length; i++) {
        const pairs = passports[i].split(' ').map(pair => pair.split(':'));
        const jsonPairs = {};
        pairs.forEach(([key, value]) => jsonPairs[key] = value);
        mappedPassports[i] = jsonPairs;
    }
    return mappedPassports;
}

function isPassportValid(passport) {
    for (var i = 0; i < requiredFields.length; i++) {
        if (passport[requiredFields[i]] == undefined) {
            return 0;
        }
    }
    return 1;
}