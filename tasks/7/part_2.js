const fs = require('fs');
const common = require('../../common/common');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var splitInput = data.split('\n');
    var bags = new Object();
    var shinyGoldBags = 0;
    splitInput.forEach(function (entry) {
        entry = entry.slice(0, -1);
        var newBag = getInsideBags(entry);
        Object.keys(newBag).forEach(function (key) {
            bags[key] = newBag[key];
        });
    });
    var numberBagsNeeded = getNumberOfBagsWithin(bags, "shiny gold bag");
    common.logMessage("No. of bags required : " + numberBagsNeeded);
});


function getInsideBags(input) {
    var regex = /^(.*) contain (.*)/;
    var match = regex.exec(input);
    var bagJSON = new Object();
    if (match != null) {
        var bag = match[1].replace(/bags/g, "bag");
        var options = match[2];
        var containJSON = new Object();
        if (options == "no other bags") {
            containJSON.none = 1;
        } else {
            var bagContains;
            bagContains = match[2].split(', ');
            bagContains.forEach(function (entry) {
                var bagContents = getBagContents(entry);
                Object.keys(bagContents).forEach(function (key) {
                    containJSON[key] = bagContents[key];
                });
            })
        }
        bagJSON[bag] = containJSON;
    }
    return bagJSON;
}

function getBagContents(bag) {
    regex = /^([0-9]+) (.*)/;
    match = regex.exec(bag);
    var bagJSON = new Object();
    if (match != null) {
        var numberOfBags = match[1];
        var insideBag = match[2].replace(/bags/g, "bag");
        bagJSON[insideBag] = numberOfBags;
    }
    return bagJSON;
}

function getNumberOfBagsWithin(bags, bagKey) {
    if (bags[bagKey] == undefined) {
        return 0;
    }
    var totalBags = 0;
    Object.keys(bags[bagKey]).forEach(function (key) {
        if (key == 'none') {
            return 0;
        }
        var numBags = bags[bagKey][key];
        totalBags += parseInt(numBags);
        var bagContents = getNumberOfBagsWithin(bags, key)
        totalBags += parseInt(numBags) * parseInt(bagContents);
    });
    return totalBags;
}