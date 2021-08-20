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

describe('getAllProductsFromPage', () => {
	it('Should be defined', async () => {
		expect(await scraper.getAllProductsFromPage(1)).toBeDefined();
	});

	it('Return array with product info', async () => {
		const output: ProductInfo = {
			id: 1,
			added: new Date(),
			color: 'red',
			material: 'sds',
			model: 'sds',
			name: 'asdasd',
			photoUrl: 'asdasd',
			price: 121,
		};

		jest.spyOn(scraper, 'extractData').mockRejectedValue(
			//@ts-ignore
			output
		);

		expect((await scraper.getAllProductsFromPage(1))[0]).toEqual(output);
	});
});
