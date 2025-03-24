import { Product } from "./product";

export interface BestSeller {
    bestSellerId: string;
    scraping_date: string; 
    top3: Product[];
}
