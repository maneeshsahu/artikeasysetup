'use strict';
// Wi-Fi Setup
var wifi = require('artik-sdk').wifi;

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
	console.log(results);
	var ap = results.filter(function(item) {
		return item.name == ssid;
	});

	if (ap.length > 0) {
		console.log('Found SSID ' + ssid + ', connecting...');
		wifi_station.disconnect();
		wifi_station.connect(ssid, pwd, false);
	}
});


//var connman = require('connman-simplified')();
//var wifi;

/*function initConnman() {
    if (!wifi) {
        connman.init(function(err) {
            if (err) {
                console.error('Error initializing connman ' + JSON.stringify(err));
            }
            connman.initWiFi(function(err, wifiL, properties) {
                if (err) {
                    console.error("Error initializing WiFI " + JSON.stringify(err));
                }
                wifi = wifiL;
                // Cache the WiFi Networks
                wifi.getNetworks(function(err, list) {
                    console.log("networks: ", wifi.getServicesString(list));
                });
            }); 
        });
    }
}

initConnman();*/


exports.sayHello = function(req, res) {
    var response = {
        hello: 'world'
    };

    res.json(response);
};

exports.getAccessPoints = function(req, res) {
    res.json({});
    /*
    wifi.getNetworksCache(function(err, list) {
        console.log("networks from cache: ", list);
        var err = {};
        if (err)
            res.send(err);
        else {
            res.json(list);  
        }
    });*/
};

exports.configureWifi = function(req, res) {
    var err = {};
    if (err)
        res.send(err);

    var response = {};    
    res.json(response);    
};