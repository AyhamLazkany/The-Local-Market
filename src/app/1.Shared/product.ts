import { comment } from "./comment"

export class product {
   id!: number;
   img!: string;
   type!: string;
   title!: string;
   description!: string;
   quantity!: number;
   price!: number;
   comments!: comment[] | string[];
} 