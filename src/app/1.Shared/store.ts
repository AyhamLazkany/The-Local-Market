import { product } from "./product"

export class store {
   id!: string;
   img!: string;
   name!: string;
   owner!: string;
   category!: string;
   title!: string;
   description!: string;
   products!: product[] | string[];
}