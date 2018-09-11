'use strict';
var wifi = require('../models/easySetupModel')

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