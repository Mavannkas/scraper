import { HTMLElement } from 'node-html-parser';
import { ProductInfo } from './ProductInfo.interface';

export interface IScraper {
	start(): void;
	getPage(url: string): Promise<HTMLElement>;
	getAllProductsFromPage(page: number): Promise<ProductInfo[]>;
	extractData(element: HTMLElement): ProductInfo;
}
