import puppeteer from "puppeteer";
import { dynamoDB, BEST_SELLERS_TABLE } from "../database/config";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

(async () => {
    const browser = await puppeteer.launch({ headless: false }); 
    const page = await browser.newPage();

    await page.goto('https://www.amazon.com.br/bestsellers', { waitUntil: 'domcontentloaded' });

    await page.waitForSelector(".has-ive-video", { timeout: 10000 });

    const products = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".has-ive-video"))
        .slice(0, 3)
        .map((el) => ( 
            {
                name: el.querySelector(".p13n-sc-truncate-desktop-type2.p13n-sc-truncated")?.textContent || "Nome não disponível",
                price: el.querySelector("._cDEzb_p13n-sc-price_3mJ9Z")?.textContent || "Preço não disponível",
                rating: el.querySelector(".a-size-small")?.textContent || "Preço não disponível",
            }
        ));
    });

    if (products) {
        let num = 0;
        for (const product of products) {
            console.log(`Nome: ${product.name}, Preço: ${product.price}, Avaliações: ${product.rating}`)
            const params = {
                TableName: BEST_SELLERS_TABLE,
                Item: {
                    bestSellerId: String(num),
                    name: product.name,
                    price: product.price,
                    rating: product.rating
                }
            }

            await dynamoDB.send(new PutCommand(params))
            console.log("Item inserido com sucesso!")
            num = num + 1
        }
    } else {
        console.log('Elemento não encontrado.');
    }

    await browser.close();
})();
