import { BestSellerRepository } from "../database/repositories/bestseller-repository"

const repository = new BestSellerRepository()

export async function handler(event: any) {

    const data = await repository.get_last_top3_bestsellers();

    return {
        statusCode: 200,
        body: JSON.stringify({"data": data})
    }
}