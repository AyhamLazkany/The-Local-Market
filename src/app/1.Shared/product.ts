import { Comment } from "./comment"

export class Product {
   _id!: string;
   store!: string;
   storeId!: string;
   img!: string;
   category!: string;
   title!: string;
   description!: string;
   quantity!: number;
   sizes!: string[];
   price!: number;
   comments!: Comment[];
   createdAt!: string;
   updatedAt!: string;
} 