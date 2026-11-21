import { Locator, Page } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;
  protected readonly logo:Locator;
  protected readonly searchBox:Locator;
  protected readonly searchIcon:Locator;
  protected readonly footerLinks:Locator;
  protected readonly currency:Locator;
  protected readonly cartButton:Locator;


  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByAltText('naveenopencart');
    this.searchBox = page.getByPlaceholder('Search');
    this.searchIcon = page.locator('div#search button');
    this.currency = page.locator('#form-currency');
    this.footerLinks= page.locator('footer a');
    this.cartButton = page.locator('div#cart button');
  }

  async isLogoVisible():Promise<boolean>{
    return await this.logo.isVisible();
  }

  async isSearchBoxVisible():Promise<boolean>{
    return await this.searchBox.isVisible();
  }

  async getPageFooterCount():Promise<number>{
    return await this.footerLinks.count();
  }

}
