import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class ProductInfoPage extends BasePage {
  private readonly header: Locator;
  private readonly productImage: Locator;
  private readonly productMetaData: Locator;
  private readonly productPrice: Locator;
  private map: Map<string, string|number>;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { level: 1 });
    this.productImage = page.locator("div#content li img");
    this.productMetaData = page.locator(
      "div#content ul.list-unstyled:nth-of-type(1) li",
    );
    this.productPrice = page.locator(
      "div#content ul.list-unstyled:nth-of-type(2) li",
    );
    this.map = new Map<string, string>();
  }

  async getProductHeader(): Promise<string> {
    return await this.header.innerText();
  }

  async getproductImagesCount(): Promise<number> {
    await this.productImage.first().waitFor({state: 'visible'});
    return await this.productImage.count();
  }

  /**
   * 
   * @returns this method is returning the actual product data, header, images, metadata, pricing data.
   */
  async getProductInfo():Promise<Map<string, string | number>>{
   this.map.set('ProductHeader', await this.getProductHeader());
   this.map.set('ProductImages', await this.getproductImagesCount());
   await this.getProductMetaData();
   await this.getProductPricingData();
   return this.map;
  }

  // Brand: Apple
  // Product Code: Product 18
  // Reward Points: 800
  // Availability: Out Of Stock
  private async getProductMetaData():Promise<void>{
    let metaData = await this.productMetaData.allInnerTexts();
    for (let data of metaData) {
      let meta = data.split(":");
      let metaKey = meta[0].trim();
      let metaValue = meta[1].trim();
      this.map.set(metaKey, metaValue);
    }
  }

  //   $2,000.00
  // Ex Tax: $2,000.00
  private async getProductPricingData():Promise<void>{
  let priceData = await this.productPrice.allInnerTexts();
  let productPrice = priceData[0].trim();
  let exTaxPrice = priceData[1].split(':')[1].trim();
  this.map.set('ProductPrice ', productPrice);
  this.map.set('ExTaxPrice ', exTaxPrice);
  }
}
