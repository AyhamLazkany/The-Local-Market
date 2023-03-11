import { Product } from './product';

export class Favorite {
    _id!: string;
    user!: any;
    dishes!: Product[];
    createdAt!: string;
    updatedAt!: string;
}