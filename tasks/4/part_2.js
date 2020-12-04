const { booleanLiteral } = require('babel-types');
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
    // isPassportValid(passports[0]);
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

// Part 2 needs a more rigorous validation check
function isPassportValid(passport) {
    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (passport[field] == undefined) {
            return 0;
        }
        switch (field) {
            case 'byr':
                if (passport[field] < 1920 || passport[field] > 2002 || passport[field].length != 4) {
                    return 0;
                }
                break;
            case 'iyr':
                if (passport[field] < 2010 || passport[field] > 2020 || passport[field].length != 4) {
                    return 0;
                }
                break;
            case 'eyr':
                if (passport[field] < 2020 || passport[field] > 2030 || passport[field].length != 4) {
                    return 0;
                }
                break;
            case 'hgt':
                // Do some regex to check it match the correct pattern
                var regex = /^([0-9]+)(cm|in)$/g;
                var match = regex.exec(passport[field]);
                if (match != null) {
                    var height = match[1];
                    if (match[2] == 'cm') {
                        if (height < 150 || height > 193) {
                            return 0;
                        }
                    } else {
                        if (height < 59 || height > 76) {
                            return 0;
                        }
                    }
                } else {
                    return 0;
                }
                break;
            case 'hcl':
                var regex = /^\#[a-f|0-9]{6}$/;
                var match = regex.exec(passport[field]);
                if (match == null) {
                    return 0;
                }
                break;
            case 'ecl':
                var options = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
                var valid = 0;
                options.forEach(function (entry) { if (passport[field] == entry) { valid = 1; } });
                if (!valid) {
                    return 0;
                }
                break;
            case 'pid':
                var regex = /^[0-9]{9}$/;
                var match = regex.exec(passport[field]);
                if (match == null) {
                    return 0;
                }
                break;
            default:
                break;
        }
    }
    return 1;
}