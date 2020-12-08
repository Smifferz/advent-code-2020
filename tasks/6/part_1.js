const fs = require('fs');
const common = require('../../common/common');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var splitInput = data.split('\n');
    var groups = getGroups(splitInput);
    var counts = sumCounts(groups);
    common.logMessage("Count is " + counts);
})

function getGroups(input) {
    var groups = [];
    var currentGroup = new Object();
    input.forEach(function (entry) {
        entry = entry.replace(/(\r\n|\n|\r)/gm,"");
        if (entry.length == 0) {
            groups.push(currentGroup);
            currentGroup = new Object();
        } else {
            for (var i = 0; i < entry.length; i++) {
                currentGroup[entry[i]] = 1;
            }
        }
    });
    if (Object.keys(currentGroup).length > 0) {
        groups.push(currentGroup);
        currentGroup = new Object();
    }
    return groups;
}

function sumCounts(input) {
    var count = 0;
    input.forEach(function (entry) {
        var groupLength = Object.keys(entry).length;
        count  += groupLength;
    });
    return count;
}