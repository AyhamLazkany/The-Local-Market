import { Product } from './product';
import { User } from './user';

export class BayRec {
    _id!: string;
    user!: User;
    dishes!: Product[];
    createdAt!: string;
    updatedAt!: string;
}