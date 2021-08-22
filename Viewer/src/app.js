"use strict";
exports.__esModule = true;
var express = require("express");
var show_1 = require("./routes/show");
require("reflect-metadata");
var path = require("path");
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/', show_1["default"]);
app.all('*', function (req, res) {
    res.status(404).render('error', {
        error: 'Strona nie została odnaleziona',
        code: '404'
    });
});
app.listen(5000, function () { return console.log('Start on 5000...'); });
