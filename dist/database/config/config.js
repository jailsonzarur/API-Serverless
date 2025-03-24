"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BEST_SELLERS_TABLE = exports.dynamoDB = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
require("dotenv/config");
const client = new client_dynamodb_1.DynamoDBClient({
    region: "us-east-1",
});
const BEST_SELLERS_TABLE = "bestsellers-table-dev";
exports.BEST_SELLERS_TABLE = BEST_SELLERS_TABLE;
const dynamoDB = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
exports.dynamoDB = dynamoDB;
