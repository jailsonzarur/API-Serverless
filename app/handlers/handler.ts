import { httpResponse } from "../utils/HttpResponses";

export async function handler(event: any) {
    try {
        return httpResponse.success({
            message: 'API online',
            timestamp: new Date().toISOString(),
        })
    } catch(error) {
        return httpResponse.error("Internal Server Error")
    }
}