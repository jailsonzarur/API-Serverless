import { BestSellerRepository } from "../database/repositories/bestseller-repository"
import { httpResponse } from "../utils/HttpResponses";

const repository = new BestSellerRepository()

export async function handler(event: any) {

    try {
        const data = await repository.get_all_top3_bestsellers();
        return httpResponse.success(data);
    } catch (error) {
        return httpResponse.error("Internal Server Error");
    }
}