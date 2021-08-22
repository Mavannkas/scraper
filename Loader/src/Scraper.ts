import { HTMLElement, parse } from 'node-html-parser';
import { IScraper } from './interfaces/IScraper';
import axios from 'axios';
import { ProductInfo } from './interfaces/ProductInfo.interface';
import { throws } from 'assert';

export class Scraper implements IScraper {
	productLinks: string[] = [];
	products: ProductInfo[] = [];

	constructor(private url: string, private params: string[]) {}

	async start(): Promise<void> {
		await this.getAllProductLinks();
		await this.getProductsInfo();
	}

	async getAllProductLinks(): Promise<void> {
		const maxPage = +(await this.getPage(this.url)).querySelector('div.PAGINGUP_DOWN > ul > li:nth-child(8) > a')
			.innerText;

		for (let i = 1; i <= maxPage; i++) {
			console.clear();
			console.log('Step 1 getAllProductLinks');
			console.log(`${i}/${maxPage}`);

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

	async getPage(url: string): Promise<HTMLElement> {
		try {
			const response = await axios.get(url);

			return parse(response.data as string);
		} catch (err) {
			throw new Error('Not Found');
		}
	}

	async getProductsInfo(): Promise<void> {
		const promises: Promise<any>[] = [];
		for (const url of this.productLinks) {
			try {
				console.clear();
				console.log('Step 2 getProductsInfo');
				console.log(`${this.productLinks.findIndex(item => item === url)}/${this.productLinks.length}`);

				const result = await this.getPage(url);
				const extractedProductData = this.extractData(result);

				this.products.push(extractedProductData);
			} catch (err) {}
		}
	}

	extractData(body: HTMLElement): ProductInfo {
		const id = body.querySelector('#product-description div').innerText.split(';')[1];
		const brand = body.querySelector('.features > h1 a').innerText;
		const name = body.querySelector('.features .product-name').innerText;
		const price = +body.querySelector('div.priceWrapper div div span.val').innerText.replace(',', '.');
		const photoUrl = body.querySelector('.product-image img').getAttribute('src') ?? '';

		const description = body
			.querySelector('#product-description')
			.innerText.split('\n')
			.map(item => item.split(': '))
			.filter(item => item.length === 2);

		return {
			id,
			brand,
			name,
			price,
			added: new Date(),
			material: this.getProductProp(description, 'material').trim().replace('&nbsp;', ''),
			color: this.getProductProp(description, 'color').trim().replace('&nbsp;', ''),
			model: this.getProductProp(description, 'model').trim().replace('&nbsp;', ''),
			photoUrl,
		};
	}

	getProductProp(descriptions: string[][], prop: string): string {
		for (let i = 0; i < descriptions.length; i++) {
			switch (descriptions[i][0].trim()) {
				case 'kolor':
					if ('color' === prop) {
						return this.normaliseReturedString(descriptions[i][1]);
					}
					break;
				case 'materiał wierzchni':
					if ('material' === prop) {
						return this.normaliseReturedString(descriptions[i][1]);
					}
					break;
				case 'model':
					if ('model' === prop) {
						return this.normaliseReturedString(descriptions[i][1]);
					}
					break;
			}
		}
		return '';
	}

	normaliseReturedString(str: string): string {
		return str.trim().replace('&nbsp;', '').replace('&oacute;', '');
	}
}
