'use strict';
// Wi-Fi Setup
var wifi = require('artik-sdk').wifi;

var cachedWifiNetworks = {};

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