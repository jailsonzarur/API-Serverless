import { Product } from "./product";

export interface BestSeller {
    bestSellerId: string;
    extraction_date: string; 
    top3: Product[];
}
