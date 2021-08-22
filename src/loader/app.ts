import { Scraper } from './Scraper';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Product } from './entity/Product.entity';
import { DataBaseMannager } from './DataBaseManagaer';

const main = async () => {
	const scraper = new Scraper('https://www.deichmann.com/PL/pl/shop/meskie/meskie-buty-meskie.cat', ['s']);
	await scraper.start();
	
	const dataBaseMannager = new DataBaseMannager();
	await dataBaseMannager.init();

	const products = scraper.products;

	for (const product of products) {
		await dataBaseMannager.addNewProduct(product);
	}
};

main().then(() => console.log('Ready!'));
