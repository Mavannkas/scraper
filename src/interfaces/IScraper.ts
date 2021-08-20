import { HTMLElement } from 'node-html-parser';
import { ProductInfo } from './ProductInfo.interface';

export interface IScraper {
	productLinks: string[];
	products: ProductInfo[];
	start(): Promise<void>;
	getPage(url: string): Promise<HTMLElement>;
	getAllProductLinksFromPage(page: number): Promise<string[]>;
	getAllProductLinks(): Promise<void>;
	extractData(element: HTMLElement): ProductInfo;
	createUrl(paramData: Array<string | number>): string;
	getProductsInfo(): Promise<void>;
}
