import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import "dotenv/config";

const client = new DynamoDBClient({
  region: "us-east-1",
});

const BEST_SELLERS_TABLE = "bestsellers-table-dev";

const dynamoDB = DynamoDBDocumentClient.from(client);

export { dynamoDB, BEST_SELLERS_TABLE };
