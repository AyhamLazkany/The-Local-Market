import { Product } from './product';
import { User } from './user';

export class SaleRec {
    _id!: string;
    user!: User;
    dishes!: Product[];
    createdAt!: string;
    updatedAt!: string;
}