import { HTMLElement, parse } from 'node-html-parser';
import { IScraper } from './interfaces/IScraper';
import axios from 'axios';
import { ProductInfo } from './interfaces/ProductInfo.interface';

export class Scraper implements IScraper {
	productLinks: string[] = [];

	constructor(private url: string, private params: string[]) {}

	async getAllProductLinks(): Promise<void> {
		const maxPage = +(await this.getPage(this.url)).querySelector('div.PAGINGUP_DOWN > ul > li:nth-child(8) > a')
			.innerText;

		for (let i = 1; i <= maxPage; i++) {
			const products = await this.getAllProductLinksFromPage(i);
			this.productLinks.push(...products);
		}
	}

	async getAllProductLinksFromPage(page: number): Promise<string[]> {
		const createdUrl = this.createUrl([page]);
		const pageBody = await this.getPage(createdUrl);
		const urlElements = [...pageBody.querySelectorAll('div.product-overlay > a')];
		return urlElements.map(item => `https://www.deichmann.com/` + (item.getAttribute('href') ?? ''));
	}

	createUrl(paramData: (string | number)[]): string {
		let result = this.url + '?';
		for (let i = 0; i < this.params.length; i++) {
			result += `${this.params[i]}=${paramData[i]}&`;
		}
		return result.slice(0, -1);
	}

	extractData(body: HTMLElement): ProductInfo {
		throw new Error('Method not implemented.');
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
