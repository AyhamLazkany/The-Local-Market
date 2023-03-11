import { Product } from './product';

export class SaleRec {
    _id!: string;
    user!: any;
    dishes!: Product[];
    createdAt!: string;
    updatedAt!: string;
}