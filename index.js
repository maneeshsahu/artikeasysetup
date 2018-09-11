var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    router = express.Router();

// Middleware
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
//app.set('base','/v1.0');
//app.use('/v1.0', routes);
//app.use('/', routes);

var routes = require('./api/routes/easySetupRoutes');
routes(app); // register the easy setup routes

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(port, () => {
    console.log("ARTIK Easy Setup Server Running on port " + port);
});

process.on('SIGINT', function() {
    process.exit(0);
})