// Daya genrator to simulate sensor data
// It would be better to have separate files for each sensor 

var mqtt = require('mqtt');
//var client = mqtt.connect('mqtt://localhost', {username:"yourUser", password: "yourPassword"});
var client = mqtt.connect('mqtt://localhost');

// add delay so that presence can be sensed
var delay1 = 500;
var delay2 = 2000;

const noOfSensors = 5;

// int topics
var intTopics = [];
for (var i = 0; i < noOfSensors; i++) {
    intTopics.push(`store/1/device/energy/${i}`);
}

// floating topics
var floatTopics = [];
for (var i = 0; i < noOfSensors; i++) {
    floatTopics.push(`store/1/device/temperature/${i}`);
}

client.on('connect', function () {
    console.log('Connected to MQTT');

    var success = function() {
        console.log(`Registered presence ${intTopics[i]}`);
    };

    for(var i = 0; i < intTopics.length; i++) {
        client.publish('presence', intTopics[i], {}, success);
    }

    var success = function() {
        console.log(`Registered presence ${floatTopics[i]}`);
    };
    for(i = 0; i < floatTopics.length; i++) {
        client.publish('presence', floatTopics[i], {}, success);
    }

});

// this should wait until connect success and presence is registered

// int Data
setInterval(function() {
    var data;
    var options = {
        qos: 0,
        retain: true
    };
    var callback = function() {
        console.log(`Sent ${data} to ${intTopics[i]}`);
    };

    for(var i = 0; i < intTopics.length; i++) {
        data = Math.floor(Math.random() * 255);
        client.publish(intTopics[i], data.toString(), options, callback);
    }

}, delay1);

// float data
setInterval(function() {
    var data;
    var options = {
        qos: 0,
        retain: true
    };

    var callback = function() {
        console.log(`Sent ${data} to ${floatTopics[i]}`);
    };

    for(var i = 0; i < floatTopics.length; i++) {
        data = ((60 - 40 * i) + Math.random() * 8).toFixed(1);
        client.publish(floatTopics[i], data.toString(), options, callback);
    }
}, delay2);

