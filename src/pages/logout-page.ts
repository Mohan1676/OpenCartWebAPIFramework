import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class LogOutPage extends BasePage{

    private logout:Locator;

    constructor(page:Page){
        super(page)
        this.logout = page.getByRole('link', { name: 'Logout' });
    }

    async logoutApp():Promise<void>{
        await this.logout.click()
    }

}