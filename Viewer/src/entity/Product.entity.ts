import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ProductInfo } from '../interfaces/ProductInfo.interface';

@Entity()
export class Product extends BaseEntity implements ProductInfo {
	@PrimaryColumn()
	id!: string;

	@Column()
	brand!: string;

	@Column()
	name!: string;

	@Column()
	color!: string;

	@Column()
	price!: number;

	@Column()
	model!: string;

	@Column()
	material!: string;

	@Column()
	added!: Date;

	@Column()
	photoUrl!: string;
}
