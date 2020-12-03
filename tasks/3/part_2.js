const fs = require('fs');
common = require('../../common/common');
const treeLookup = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var splitInput = data.split('\n');
    var treeArray = get2DArray(splitInput);
    var numTreesMultiply = 1;
    for (var i = 0; i < treeLookup.length; i++) {
        var numTrees = getTreesInPath(treeArray, treeLookup[i])
        common.logMessage("Number of trees: " + numTrees);
        numTreesMultiply *= numTrees;
    }
    common.logMessage("Number of trees multiplied: " + numTreesMultiply);
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

function getTreesInPath(inputArray, traversal) {
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
        currentX += traversal[0];
        currentY += traversal[1];
    }
    return numTrees;
}