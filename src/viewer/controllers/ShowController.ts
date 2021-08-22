import { Request, Response } from 'express';
import { DataBaseMannager } from '../manager/DataBaseManagaer';

export async function index(req: Request, res: Response): Promise<void> {
	// res.json(await getProductPage(1));
	res.render('index', await getProductPage(1));
}

export async function paginatorIndex(req: Request, res: Response): Promise<void> {
	const page = +req.params.page;
	res.render('index', await getProductPage(Number.isNaN(page) ? 1 : page));
}

async function getProductPage(page: number) {
	const dataBaseMannager = new DataBaseMannager();
	await dataBaseMannager.init();
	return await dataBaseMannager.getOneProductPage(page);
}
