import { ProductInfo } from '../../loader/interfaces/ProductInfo.interface';

export interface ProductPageResponse {
	products: ProductInfo[];
	lastPage: number;
	page: number;
}
