'use strict';

module.exports = function(app) {
    var easySetup = require('../controllers/easySetupController');
    app.route('/v1.0/hello')
        .get(easySetup.sayHello);

    app.route('/v1.0/wifi/accesspoints')
        .get(easySetup.getAccessPoints);
   
    app.route('/v1.0/wifi/config')
        .post(easySetup.configureWifi);
};