exports.logMessage = function (message, infoLevel) {
    // Get the current timestamp
    var timestamp = new Date().toJSON();

    // Set the infoLevel if not set
    if (!infoLevel) {
        infoLevel = "info";
    }

    var msgObj = new Object();
    msgObj.timestamp = timestamp;
    msgObj.infoLevel = infoLevel;
    msgObj.message = message;
    var msgJson = JSON.stringify(msgObj);
    console.log(msgJson);
}