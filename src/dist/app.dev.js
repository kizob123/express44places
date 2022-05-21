"use strict";

var bodyParser = require('body-parser');

var express = require('express');

var _require = require('mongoose'),
    connect = _require.connect;

var app = express();
var routes = express.Router();

var login = require('./db/login_db/connect_to_db');

app.use(bodyParser.urlencoded({
  extended: false
}));
var num = 0;
app.use(bodyParser.json());
routes.post('/login', function (req, res) {
  login.login(req.body.email, req.body.password, res);
});
routes.post('/register', function (req, res) {
  console.log(req.url);
  login.register(req.body.fname, req.body.lname, req.body.location, req.body.email, req.body.password, req.body.business, req.body.phone, req.body.routes, res);
});
app.use('/login', routes);
var PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server started at ".concat(PORT))).on('connection', function () {
  console.log("conn", num++);
});