const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var sortedData = sortInputs(data);
    var result = get2ValuesThatAddTo2020(sortedData);
    console.log("The 2 numbers that add to 2020 are " + result['1'] + " and " + result['2']);
    var multiply = parseInt(result['1']) * parseInt(result['2']);
    console.log("The multiplied answer for 2 values is " + multiply);
    var resultThree = get3ValuesThatAddTo2020(sortedData);
    console.log("The 3 numbers that add to 2020 are " + resultThree['1'] + " and " + resultThree['2'] + " and " + resultThree['3']);
    var multiplyThree = parseInt(resultThree['1']) * parseInt(resultThree['2']) * parseInt(resultThree['3']);
    console.log("The multiplied answer for 3 values is " + multiplyThree);
})

function sortInputs(inputData) {
    var inputArray = inputData.split("\n");
    var sortedArray = inputArray.sort(function (a, b) { return b - a });
    return sortedArray;
}

// Check with 2 values
function get2ValuesThatAddTo2020(inputData) {
    var i;
    for (i = 0; i < inputData.length; i++) {
        var j;
        var result = new Object();
        for (j = inputData.length - 1; j > i; j--) {
            result['1'] = inputData[i];
            result['2'] = inputData[j];
            if ((parseInt(inputData[i]) + parseInt(inputData[j])) > 2020) {
                break;
            } else if ((parseInt(inputData[i]) + parseInt(inputData[j])) == 2020) {
                return result;
            } else {
                continue;
            }
        }
    }
    console.log("ERROR::Could not find matching 2 values");
    return null;
}

// Check with a third value
function get3ValuesThatAddTo2020(inputData) {
    var i;
    for (i = 0; i < inputData.length; i++) {
        var j;
        var result = new Object();
        for (j = inputData.length - 1; j > i; j--) {
            var firstItem = inputData[i];
            var secondItem = inputData[j];
            if ((parseInt(inputData[i]) + parseInt(inputData[j])) > 2020) {
                break;
            } else {
                var k;
                for (k = inputData.length; k > i; k--) {
                    result['1'] = firstItem;
                    result['2'] = secondItem;
                    result['3'] = inputData[k];
                    if (parseInt(firstItem) + parseInt(secondItem) + parseInt(inputData[k]) > 2020) {
                        break;
                    } else if (parseInt(firstItem) + parseInt(secondItem) + parseInt(inputData[k]) == 2020) {
                        return result;
                    } else {
                        continue;
                    }
                }
            }
        }
    }
    console.log("ERROR::Could not find matching 3 values");
    return null;
}