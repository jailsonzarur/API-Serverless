import { PutCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { Product } from "../models/product";
import { dynamoDB, BEST_SELLERS_TABLE } from "../config/config";
import { BestSeller } from "../models/best-seller";
import { v4 as uuidv4 } from "uuid";


export class BestSellerRepository {
  private tableName = BEST_SELLERS_TABLE;

  async add_top3_bestsellers(top3: Product[]): Promise<void> {
    
    const best_seller_record: BestSeller = {
      bestSellerId: uuidv4(),
      scraping_date: new Date().toISOString(),
      top3: top3
    }
    
    await dynamoDB.send(new PutCommand({
      TableName: this.tableName,
      Item: best_seller_record,
    }));
  }

  async get_last_top3_bestsellers(){
    const data = await dynamoDB.send(new ScanCommand({
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
  }

  async get_all_top3_bestsellers(){
    const data = await dynamoDB.send(new ScanCommand({
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
      }
    })

    return all_best_sellers;
  }

}
