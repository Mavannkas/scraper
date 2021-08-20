import { HTMLElement, parse } from 'node-html-parser';
import { IScraper } from './interfaces/IScraper';
import axios from 'axios';

export class Scraper implements IScraper {
	constructor(url: string, params: string[]) {
		this.getPage('https://www.deichmann.com/PL/pl/shop/meskie/meskie-buty-meskie.cat?s=1');
	}
	start(): void {
		throw new Error('Method not implemented.');
	}
	async getPage(url: string): Promise<HTMLElement> {
		try {
			const response = await axios.get(url);
			return parse(response.data as string);
		} catch (err) {
			throw new Error('Not Found');
		}
	}
}
