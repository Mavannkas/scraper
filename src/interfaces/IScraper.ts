import { HTMLElement } from 'node-html-parser';

export interface IScraper {
	start(): void;
	getPage(url: string): Promise<HTMLElement>;
}
