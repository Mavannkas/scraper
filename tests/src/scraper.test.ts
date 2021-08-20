import { IScraper } from '../../src/interfaces/IScraper';
import { Scraper } from '../../src/Scraper';
import { HTMLElement } from 'node-html-parser';

describe('GetPage', () => {
	const basicUrl = 'https://www.deichmann.com/PL/pl/shop/meskie/meskie-buty-meskie.cat?s=1';
	let scraper: IScraper;

	beforeEach(() => {
		scraper = new Scraper('https://www.deichmann.com/PL/pl/shop/meskie/meskie-buty-meskie.cat', ['s']);
	});

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
