import express = require('express');
import { index, paginatorIndex } from '../controllers/ShowController';

const Router = express.Router();

Router.get('/', index);
Router.get('/:page', paginatorIndex);

export default Router;
