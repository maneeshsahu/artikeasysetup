'use strict';
// Wi-Fi Setup
var connman = require('connman-simplified')();
var wifi;

function initConnman() {
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

initConnman();

exports.sayHello = function(req, res) {
    var response = {
        hello: 'world'
    };

    res.json(response);
};

exports.getAccessPoints = function(req, res) {
    wifi.getNetworksCache(function(err, list) {
        console.log("networks from cache: ", list);
        var err = {};
        if (err)
            res.send(err);
        else {
            res.json(list);  
        }
    });
};

exports.configureWifi = function(req, res) {
    var err = {};
    if (err)
        res.send(err);

    var response = {};    
    res.json(response);    
};