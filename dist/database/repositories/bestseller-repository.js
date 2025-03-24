"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestSellerRepository = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const config_1 = require("../config/config");
const uuid_1 = require("uuid");
class BestSellerRepository {
    constructor() {
        this.tableName = config_1.BEST_SELLERS_TABLE;
    }
    add_top3_bestsellers(top3) {
        return __awaiter(this, void 0, void 0, function* () {
            const best_seller_record = {
                bestSellerId: (0, uuid_1.v4)(),
                scraping_date: new Date().toISOString(),
                top3: top3
            };
            yield config_1.dynamoDB.send(new lib_dynamodb_1.PutCommand({
                TableName: this.tableName,
                Item: best_seller_record,
            }));
        });
    }
    get_last_top3_bestsellers() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield config_1.dynamoDB.send(new lib_dynamodb_1.ScanCommand({
                TableName: this.tableName,
                ProjectionExpression: "bestSellerId, scraping_date, top3",
            }));
            if (!data.Items || data.Items.length === 0) {
                return null;
            }
            const ordered_date = data.Items.sort((a, b) => {
                const dateA = new Date(a.scraping_date);
                const dateB = new Date(b.scraping_date);
                return dateB.getTime() - dateA.getTime();
            });
            return {
                scraping_date: ordered_date[0].scraping_date,
                top3: ordered_date[0].top3
            };
        });
    }
    get_all_top3_bestsellers() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield config_1.dynamoDB.send(new lib_dynamodb_1.ScanCommand({
                TableName: this.tableName,
                ProjectionExpression: "bestSellerId, scraping_date, top3",
            }));
            if (!data.Items || data.Items.length === 0) {
                return null;
            }
            const all_best_sellers = data.Items.map((item) => {
                return {
                    scraping_date: item.scraping_date,
                    top3: item.top3
                };
            });
            return all_best_sellers;
        });
    }
}
exports.BestSellerRepository = BestSellerRepository;
