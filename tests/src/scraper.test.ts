import { IScraper } from '../../src/interfaces/IScraper';
import { Scraper } from '../../src/Scraper';
import { HTMLElement } from 'node-html-parser';
import { ProductInfo } from '../../src/interfaces/ProductInfo.interface';

const basicUrl = 'https://www.deichmann.com/PL/pl/shop/meskie/meskie-buty-meskie.cat?s=1';
let scraper: IScraper;

beforeEach(() => {
	scraper = new Scraper('https://www.deichmann.com/PL/pl/shop/meskie/meskie-buty-meskie.cat', ['s']);
});

describe('GetPage', () => {
	it('Should be defined', async () => {
		expect(await scraper.getPage(basicUrl)).toBeDefined();
	});

	it('With good url should return HTMLElement', async () => {
		expect(await scraper.getPage(basicUrl)).toBeInstanceOf(HTMLElement);
	});

	it('With bad url should return Error', async () => {
		expect(scraper.getPage('https://asdasdfascx')).rejects.toEqual(new Error('Not Found'));
	});
});

describe('getAllProductLinksFromPage', () => {
	it('Should be defined', async () => {
		expect(await scraper.getAllProductLinksFromPage(1)).toBeDefined();
	});

	it('Return array with product link', async () => {
		expect((await scraper.getAllProductLinksFromPage(1))[0].length).toBeGreaterThan(26);
	});
});

describe('createUrl', () => {
	it('Should be defined', async () => {
		expect(scraper.createUrl([1])).toBeDefined();
	});

	it('Should return created url', async () => {
		expect(scraper.createUrl([1])).toBe('https://www.deichmann.com/PL/pl/shop/meskie/meskie-buty-meskie.cat?s=1');
	});
});

describe('getAllProductLinks', () => {
	jest.setTimeout(100000);
	it('Should be defined', async () => {
		expect(scraper.getAllProductLinks()).toBeDefined();
	});

	it.skip('Should append few links to this.productLinks', async () => {
		await scraper.getAllProductLinks();
		expect(scraper.productLinks.length).toBeGreaterThan(0);
	});
});

describe('getProductsInfo', () => {
	jest.setTimeout(10000000);

	it('Should be defined', async () => {
		expect(scraper.getProductsInfo()).toBeDefined();
	});

	it('Should append few links to this.product', async () => {
		await scraper.getAllProductLinks();
		await scraper.getProductsInfo();
		expect(scraper.products.length).toBeGreaterThan(0);
	});
});
// it('Return array with product info', async () => {
// 	const output: ProductInfo = {
// 		id: 1,
// 		added: new Date(),
// 		color: 'red',
// 		material: 'sds',
// 		model: 'sds',
// 		name: 'asdasd',
// 		photoUrl: 'asdasd',
// 		price: 121,
// 	};

// 	jest.spyOn(scraper, 'extractData').mockRejectedValue(
// 		//@ts-ignore
// 		output
// 	);

// 	expect((await scraper.getAllProductsFromPage(1))[0]).toEqual(output);
// });
