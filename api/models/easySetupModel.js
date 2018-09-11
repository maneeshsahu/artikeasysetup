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
                wifiL.getNetworks(function(err, list) {
                    console.log("networks: ", wifi.getServicesString(list));
                });
            });
        });
    }
}


module.exports = initConnman();