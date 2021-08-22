"use strict";
exports.__esModule = true;
var express = require("express");
var ShowController_1 = require("../controllers/ShowController");
var Router = express.Router();
Router.get('/', ShowController_1.index);
Router.get('/:page', ShowController_1.paginatorIndex);
exports["default"] = Router;
