import { userInfo } from 'os';
import { Connection, createConnection } from 'typeorm';
import { Product } from './entity/Product.entity';
import { ProductInfo } from './interfaces/ProductInfo.interface';

export class DataBaseMannager {
	connection: Connection;

	async init() {
		try {
			this.connection = await createConnection();
		} catch (err) {
			throw Error('Błąd połączenia z bazą danych');
		}
	}
	async addNewProduct(product: ProductInfo): Promise<void> {
		try {
			if (
				(
					await Product.find({
						id: product.id,
					})
				).length === 0
			) {
				const newProduct = new Product();
				this.copyProductToEntity(product, newProduct);
				await this.connection.manager.save(newProduct);
			}
		} catch (err) {
			console.log('Nie udało się dodać elementu');
		}
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
