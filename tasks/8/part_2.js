const fs = require('fs');
const common = require('../../common/common');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var splitInput = data.split('\n');
    var acc = getAcc(splitInput);
    common.logMessage("Accumulator = " + acc);
});

function getAcc(instructions) {
    var stop = 0;
    var switchedInstructions = new Object();
    var acc = 0;
    while (stop == 0) {
        var processed = processInstructions(instructions, switchedInstructions);
        acc = processed[0];
        switchedInstructions[processed[1]] = 1;
        if (processed[2] == 0) {
            stop = 1;
        }
    }
   
    return acc;
}


function processInstructions(inputInstructions, switchedInstructions) {
    var i = 0;
    var isInfinite = 0;
    var switchedIndex = null;
    var acc = 0;
    var knownIs = new Object();
    var numSwaps = 0;
    var instructions = [...inputInstructions];
    var earlyExit = 0;
    while(i < instructions.length) {
        if (knownIs[i] != undefined) {
            earlyExit = 1;
            break;
        }
        knownIs[i] = 1;
        preInfiteIndex = i;
        var instruction = instructions[i].split(' ');
        var operation = instruction[0];
        var argument = instruction[1];
        if (operation == 'nop') {
            if (switchedInstructions[i] == undefined && numSwaps == 0) {
                instructions[i] = 'jmp ' + argument;
                switchedIndex = i;
                numSwaps = 1;
                knownIs[i] = undefined;
                continue;
            }
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
                if (switchedInstructions[i] == undefined && numSwaps == 0) {
                    instructions[i] = 'nop ' + argument;
                    switchedIndex = i;
                    numSwaps = 1;
                    knownIs[i] = undefined;
                    continue;
                }
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
    return [acc, switchedIndex, earlyExit];
}