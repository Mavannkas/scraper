import { HTMLElement, parse } from 'node-html-parser';
import { IScraper } from './interfaces/IScraper';
import axios from 'axios';
import { ProductInfo } from './interfaces/ProductInfo.interface';

export class Scraper implements IScraper {
	constructor(private url: string, private params: string[]) {}

	//@ts-ignore
	async getAllProductsFromPage(page: number): Promise<ProductInfo[]> {
		const createdUrl = this.createUrl([page]);
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
