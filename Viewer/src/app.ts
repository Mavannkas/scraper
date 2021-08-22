import { Request, Response } from 'express';
import express = require('express');
import showRouter from './routes/show';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Product } from './entity/Product.entity';
import path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', showRouter);

app.all('*', (req: Request, res: Response) => {
	res.status(404).render('error', {
		error: 'Strona nie została odnaleziona',
		code: '404',
	});
});

app.listen(5000, () => console.log('Start on 5000...'));
