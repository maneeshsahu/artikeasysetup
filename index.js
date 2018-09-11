var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;



// Express Middleware
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
var routes = require('./api/routes/easySetupRoutes');
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

routes(app); // register the easy setup routes       
app.listen(port, () => {
    console.log("ARTIK Easy Setup Server Running on port " + port);
});

process.on('SIGINT', function() {
    process.exit(0);
})