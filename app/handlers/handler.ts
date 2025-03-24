import { httpResponse } from "../utils/HttpResponses";

export async function handler(event: any) {
    try {
        return httpResponse.success(null)
    } catch(error) {
        return httpResponse.error("Internal Server Error")
    }
}