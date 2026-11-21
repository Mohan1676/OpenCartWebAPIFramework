import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class SearchResultPage extends BasePage {
  private readonly searchResult: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResult = page.locator("div.product-layout");
  }

  // actions

  async getProductSearchResultsCount(): Promise<number> {
    return await this.searchResult.count();
  }

  async selectProduct(productName: string): Promise<void> {
    await this.page
      .getByRole("link", { name: productName, exact: true })
      .first()
      .click();
  }

  async selectProductTest(productName: string): Promise<boolean> {
    const product = this.page
      .getByRole("link", {
        name: productName,
        exact: true,
      })
      .first();

    if ((await product.count()) > 0) {
      await product.click(); //  CLICK HAPPENS HERE
      return true;
    }

    return false;
  }
}
