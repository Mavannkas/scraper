import { ProductInfo } from './ProductInfo.interface';

export interface ProductPageResponse {
	products: ProductInfo[];
	lastPage: number;
	page: number;
}
