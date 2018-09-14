'use strict';
// Wi-Fi Setup
const serialNumber = process.env.SERIAL_NUMBER
const mac1Address = process.env.MAC1_ADDRESS

const artik = require('artik-sdk');
const settings = require('../../settings')
var wifi = artik.wifi;
var wifi_station,
    wifi_ap;
var cachedWifiNetworks = {};

var actions_button = settings.button, 
	actions_led = settings.led;
var button = new artik.gpio(actions_button, 'button', 'in', 'rising', 0);
var led  = new artik.gpio(actions_led, 'led', 'out', 'none', 0);

var ledState = 1;
function startAP () {
	led.request();
	led.write(ledState);
	led.release();
	
	console.log('setLED( ' + actions_led + ') value: ' + ledState);
    ledState ^= 1;
    
    wifi_ap = wifi.wifi_ap();
    wifi_ap.on('started', function() {
        var ssid = 'ARTIK_' + mac1Address;
        var pwd = '';
        var channel = 1;
        var openmode = true;

        console.log("Starting Wi-Fi Access Point");
        console.log("SSID : '" + ssid + "'");
        console.log("Pass : '" + pwd + "'");
        console.log("Channel : '" + channel + "'");
        console.log("OpenMode : '" + openmode + "'");
        var res = wifi_ap.start_ap(ssid, pwd, channel, openmode ?
                wifi_ap.WIFI_ENCRYPTION_OPEN : wifi_ap.WIFI_ENCRYPTION_WPA2);
        console.log("Result => '" + res + "'");
    });
}

function startStation() {
    wifi_station = wifi.wifi_station();
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
}

button.on('changed', function (value) {
	console.log("button pressed");
	startAP();
});
button.request();


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