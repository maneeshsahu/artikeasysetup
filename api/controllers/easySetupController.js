'use strict';
// Wi-Fi Setup
const serialNumber = process.env.SERIAL_NUMBER
const mac1Address = process.env.MAC1_ADDRESS

const artik = require('artik-sdk');
const settings = require('../../settings')
var wifi = artik.wifi;
var cachedWifiNetworks = {};

var actions_button = settings.button, 
	actions_led = settings.led;

var button = new artik.gpio(actions_button, 'button', 'in', 'rising', 0);
var led  = new artik.gpio(actions_led, 'led', 'out', 'none', 0);

var ledState = 1;
function toggleLED () {
	led.request();
	led.write(ledState);
	led.release();
	
	console.log('setLED( ' + actions_led + ') value: ' + ledState);
	ledState ^= 1;
}

button.on('changed', function (value) {
	console.log("button pressed");
	toggleLED();
});
button.request();


var wifi_station = new wifi.wifi_station();
wifi_station.on('started', function() {
	console.log(wifi_station.get_info());
	wifi_station.scan_request();
});

wifi_station.on('connected', function() {
	console.log('connected');
});

wifi_station.on('scan', function(list) {
	var results = JSON.parse(list);
	console.log("Scanned WiFi Networks: " + list);
    cachedWifiNetworks = results;
});

exports.sayHello = function(req, res) {
    var response = {
        hello: 'world'
    };

    res.json(response);
};

exports.getAccessPoints = function(req, res) {
    res.json(cachedWifiNetworks);
};

exports.configureWifi = function(req, res) {
    var err = {};
    if (err)
        res.send(err);

    var response = {};    
    res.json(response);    
};

process.on('SIGINT', function () {
	console.log('exiting');
	button.release();
	
	process.exit(0);
});