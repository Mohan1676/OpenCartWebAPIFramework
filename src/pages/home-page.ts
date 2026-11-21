import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
  private readonly list: Locator;
  private readonly search:Locator;
  private readonly searchIcon:Locator;

  constructor(page: Page) {
    super(page);
    this.list = page.locator(".list-group a");
    this.search = page.getByRole('textbox', {name:'Search'});
    this.searchIcon= page.locator('div#search button')
  }

  async homePageTitle(): Promise<string> {
    return await this.page.title();
  }

  async verifyLinks() {
    let links = await this.list.evaluateAll((elements) => elements.map((element) => (element as HTMLAnchorElement).href),
    );
    for (let link of links) {
      let response = this.page.request.get(link);
      console.log(`${link} ---> ${(await response).status()}`);
      if ((await response).status() >= 400) {
        console.log("Broken link: " + link);
      } else {
        console.log("Working link: " + link);
      }
    }
  }

  async doSearch(searchkey:string):Promise<void>{
  console.log(`search key ${searchkey}`);
  await this.search.fill(searchkey);
  await this.searchIcon.click();
  }


}
