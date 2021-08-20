import { HTMLElement, parse } from 'node-html-parser';
import { IScraper } from './interfaces/IScraper';
import axios from 'axios';
import { ProductInfo } from './interfaces/ProductInfo.interface';

export class Scraper implements IScraper {
	constructor(private url: string, private params: string[]) {}

	async getAllProductsFromPage(page: number): Promise<ProductInfo[]> {
		const createdUrl = this.createUrl([page]);
	}

	createUrl(paramData: (string | number)[]): string {
		throw new Error('Method not implemented.');
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
