import { Connection, createConnection, getConnection, getConnectionManager } from 'typeorm';
import { Product } from '../entity/Product.entity';
import { ProductInfo } from '../interfaces/ProductInfo.interface';
import { ProductPageResponse } from '../interfaces/ProductPageResponse.interface';

export class DataBaseMannager {
	connection: Connection;

	async init() {
		try {
			this.connection = getConnectionManager().get('default');
		} catch (err) {
			try {
				this.connection = await createConnection();
			} catch (err) {
				console.log(err);
				throw Error('Błąd połączenia z bazą danych');
			}
		}
	}

	async getOneProductPage(page: number): Promise<ProductPageResponse> {
		const maxOnOnePage = 20;

		const [products, productCount] = await Product.findAndCount({
			take: maxOnOnePage,
			skip: maxOnOnePage * (page - 1),
			order: {
				added: 'DESC',
			},
		});

		const lastPage = Math.ceil(productCount / maxOnOnePage);
		return {
			products,
			page,
			lastPage,
		};
	}

	copyProductToEntity(source: ProductInfo, destination: Product) {
		destination.id = source.id;
		destination.material = source.material;
		destination.model = source.model;
		destination.name = source.name;
		destination.photoUrl = source.photoUrl;
		destination.price = source.price;
		destination.added = source.added;
		destination.brand = source.brand;
		destination.color = source.color;
	}
}
