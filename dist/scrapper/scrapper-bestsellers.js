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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const bestseller_repository_1 = require("../database/repositories/bestseller-repository");
const repository = new bestseller_repository_1.BestSellerRepository();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto('https://www.amazon.com.br/bestsellers', { waitUntil: 'domcontentloaded' });
    yield page.waitForSelector(".has-ive-video", { timeout: 10000 });
    const products = yield page.evaluate(() => {
        return Array.from(document.querySelectorAll(".has-ive-video"))
            .slice(0, 3)
            .map((el) => {
            var _a, _b, _c;
            return ({
                name: ((_a = el.querySelector(".p13n-sc-truncate-desktop-type2.p13n-sc-truncated")) === null || _a === void 0 ? void 0 : _a.textContent) || "Nome não disponível",
                price: ((_b = el.querySelector("._cDEzb_p13n-sc-price_3mJ9Z")) === null || _b === void 0 ? void 0 : _b.textContent) || "Preço não disponível",
                rating: ((_c = el.querySelector(".a-size-small")) === null || _c === void 0 ? void 0 : _c.textContent) || "Preço não disponível",
            });
        });
    });
    const top3_products = [];
    if (products) {
        for (const product of products) {
            console.log(`Nome: ${product.name}, Preço: ${product.price}, Avaliações: ${product.rating}`);
            top3_products.push({
                name: product.name,
                price: product.price,
                rating: product.rating
            });
        }
        yield repository.add_top3_bestsellers(top3_products);
        console.log("Item inserido com sucesso!");
    }
    else {
        console.log('Elemento não encontrado.');
    }
    yield browser.close();
}))();
