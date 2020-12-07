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
    currentGroup.people = 0;
    input.forEach(function (entry) {
        entry = entry.replace(/(\r\n|\n|\r)/gm,"");
        if (entry.length == 0) {
            groups.push(currentGroup);
            currentGroup = new Object();
            currentGroup.people = 0;
        } else {
            for (var i = 0; i < entry.length; i++) {
                if (!currentGroup[entry[i]]) {
                    currentGroup[entry[i]] = 1;
                } else {
                 currentGroup[entry[i]] += 1;
                }
            }
            currentGroup.people += 1;
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
        for (var key in entry) {
            if (key == "people") {
                continue;
            } else {
                if (entry[key] == entry.people) {
                    count += 1;
                }
            }
        }
    });
    return count;
}