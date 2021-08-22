import { HTMLElement } from 'node-html-parser';
import { IScraper } from '../../src/interfaces/IScraper';
import { ProductInfo } from '../../src/interfaces/ProductInfo.interface';
import { Scraper } from '../../src/Scraper';

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

	it.skip('Should append few links to this.product', async () => {
		await scraper.getAllProductLinks();
		await scraper.getProductsInfo();
		expect(scraper.products.length).toBeGreaterThan(0);
	});
});
describe('extractData', () => {
	let page: HTMLElement;

	beforeEach(async () => {
		page = await scraper.getPage(
			'https://www.deichmann.com/PL/pl/shop/meskie/meskie-buty-meskie/buty-meskie-trampki/00006001731437/sneakersy*m%C4%99skie*adidas*Vs*Pace.prod'
		);
	});
	it('Should be defined', async () => {
		expect(scraper.extractData(page)).toBeDefined();
	});

	it('Should append return valid object', async () => {
		const output: ProductInfo = {
			id: '18401304',
			added: new Date(),
			color: 'popielaty',
			material: 'materiał syntetyczny',
			model: 'adidas vs Pace',
			name: 'sneakersy męskie adidas Vs Pace',
			photoUrl:
				'https://deichmann.scene7.com/asset/deichmann/product-with-gradient/p_pd_gradiant/Markowe+sneakersy+mskie+adidas+Vs+Pace+-++-+deichmanncom--1731437_P.jpg?defaultImage=default',
			price: 199.99,
			brand: 'adidas',
		};

		const result = scraper.extractData(page);
		result.added = output.added;
		expect(result).toEqual(output);
	});
});
