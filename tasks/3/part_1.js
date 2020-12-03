const fs = require('fs');
common = require('../../common/common');
const treeLookup = [3, 1];

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var splitInput = data.split('\n');
    var treeArray = get2DArray(splitInput);
    var numTrees = getTreesInPath(treeArray);
    common.logMessage("Number of trees: " + numTrees);
})

function get2DArray(inputStrings) {
    var array2D = new Array(inputStrings.length);
    for (var i = 0; i < inputStrings.length; i++) {
        var newString = inputStrings[i];
        array2D[i] = new Array(newString.length);
        for (var j = 0; j < newString.length; j++) {
            array2D[i][j] = newString[j];
        }
    }
    return array2D;
}

function getTreesInPath(inputArray) {
    var currentX = 0;
    var currentY = 0;
    var numTrees = 0;
    while (currentY < inputArray.length) {
        if (currentX >= inputArray[0].length) {
            currentX = currentX - inputArray[0].length;
        }
        var position = inputArray[currentY][currentX];
        if (position == '#') {
            numTrees += 1;
        }
        currentX += treeLookup[0];
        currentY += treeLookup[1];
    }
    return numTrees;
}