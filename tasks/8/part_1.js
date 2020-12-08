const fs = require('fs');
const common = require('../../common/common');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var splitInput = data.split('\n');
    var acc = processInstructions(splitInput);
    common.logMessage("Accumulator = " + acc);
});

function processInstructions(instructions) {
    var acc = 0;
    var i = 0;
    var knownIs = new Object();
    while(i <= instructions.length) {
        if (knownIs[i] != undefined) {
            break;
        }
        knownIs[i] = 1;
        var instruction = instructions[i].split(' ');
        var operation = instruction[0];
        var argument = instruction[1];
        if (operation == 'nop') {
            i++;
            continue;
        }
        var regex = /(\+|\-)([0-9]*)/;
        var match = regex.exec(argument);
        switch(operation) {
            case 'acc':
                if (match[1] == '-') {
                    acc += (parseInt(match[2]) * -1);
                } else {
                    acc += parseInt(match[2]);
                }
                i++;
                break;
            case 'jmp':
                if (match[1] == '-') {
                    i += (parseInt(match[2]) * -1);
                } else {
                    i += parseInt(match[2]);
                }
                break;
            default:
                break;
        }
    }
    return acc;
}