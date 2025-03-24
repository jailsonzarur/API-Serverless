var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import puppeteer from "puppeteer";
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto('https://www.amazon.com.br/bestsellers', { waitUntil: 'domcontentloaded' });
    yield page.waitForSelector(".p13n-sc-truncate-desktop-type2.p13n-sc-truncated", { timeout: 10000 });
    const products = yield page.evaluate(() => {
        return Array.from(document.querySelectorAll(".p13n-sc-truncate-desktop-type2.p13n-sc-truncated"))
            .slice(0, 3)
            .map((el) => { var _a; return (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim(); });
    });
    if (products) {
        for (const product of products) {
            console.log(product);
        }
    }
    else {
        console.log('Elemento não encontrado.');
    }
    yield browser.close();
}))();
