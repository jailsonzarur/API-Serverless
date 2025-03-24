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
exports.handler = handler;
const bestseller_repository_1 = require("../database/repositories/bestseller-repository");
const repository = new bestseller_repository_1.BestSellerRepository();
function handler(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield repository.get_all_top3_bestsellers();
        return {
            statusCode: 200,
            body: JSON.stringify({ "data": data })
        };
    });
}
