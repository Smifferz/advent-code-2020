const fs = require('fs');
const { exit } = require('process');
const common = require('../../common/common');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var splitInput = data.split('\n');
    var ids = [];
    splitInput.forEach(function(entry) {
        var row = findRow(entry);
        var column = findColumn(entry);
        var id = getID(row, column);
        ids.push(id);
    });
    var sortedIDs = ids.sort(function(a, b) {return a - b;});
    var seat = findMissingSeat(sortedIDs);
    common.logMessage("Found seat : " + seat);
})

function findRow(input) {
    var minRows = 0;
    var maxRows = 127;
    var row;
    for(var i = 0; i < 7; i++) {
        switch(input[i]) {
            case 'F':
                if (maxRows - minRows == 1) {
                    row = minRows;
                    break;
                }
                maxRows -= Math.ceil(((maxRows - minRows) / 2));
                break;
            case 'B':
                if (maxRows - minRows == 1) {
                    row = maxRows;
                    break;
                }
                minRows += Math.ceil(((maxRows - minRows) / 2));
                break;
            default:
                break;
        }
    }
    return row;
}

function findColumn(input) {
    var minCol = 0;
    var maxCol = 7;
    var col;
    for(var i = 7; i < input.length; i++) {
        switch(input[i]) {
            case 'L':
                if (maxCol - minCol == 1) {
                    col = minCol;
                    break;
                }
                maxCol -= Math.ceil(((maxCol - minCol) / 2));
                break;
            case 'R':
                if (maxCol - minCol == 1) {
                    col = maxCol;
                    break;
                }
                minCol += Math.ceil(((maxCol - minCol) / 2));
                break;
            default:
                break;
        }
    }
    return col;
}

function getID(row, column) {
    return (row * 8) + column;
}

// The missing seat should be in the middle of 2 which are +2 apart
function findMissingSeat(seats) {
    var seat;
    for(var i = 0; i < seats.length -1; i++) {
        if (seats[i + 1] - seats[i] == 2) {
            seat = parseInt(seats[i]) + 1;
        }
    }
    return seat;
}