"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERS_TABLE = exports.dynamoDB = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
require("dotenv/config");
const client = new client_dynamodb_1.DynamoDBClient({
    region: "us-east-1",
});
const USERS_TABLE = process.env.USERS_TABLE;
exports.USERS_TABLE = USERS_TABLE;
const dynamoDB = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
exports.dynamoDB = dynamoDB;
