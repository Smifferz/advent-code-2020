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
    Object.keys(bags).forEach(function (key) {
        shinyGoldBags += parseInt(isShinyGoldBag(bags, key));
    });
    common.logMessage("Shiny Gold Bags : " + shinyGoldBags);
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

function isShinyGoldBag(bags, bagKey) {
    if (bags[bagKey] == undefined) {
        return 0;
    }
    if ("shiny gold bag" in bags[bagKey]) {
        return 1;
    } else {
        var contains = 0;
        Object.keys(bags[bagKey]).forEach(function (key) {
            contains += parseInt(isShinyGoldBag(bags, key));
        });
        if (contains >= 1) {
            return 1;
        }
    }
    return 0;
}