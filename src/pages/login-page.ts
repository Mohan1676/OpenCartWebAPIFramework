import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage{

private readonly emailId:Locator;
private readonly password:Locator;
private readonly loginbtn:Locator;
private readonly forgottenPwdLink:Locator;
private readonly loginErrorMessage:Locator;

constructor(page:Page){
    super(page);
    this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });;
    this.password = page.getByRole('textbox', {name: 'Password'});
    this.loginbtn = page.getByRole('button', {name: 'Login'});
    this.forgottenPwdLink= page.getByRole('link', { name: 'Forgotten Password' }).first();
    this.loginErrorMessage = page.getByText('Warning: No match for E-Mail Address and/or Password.', { exact: true });
}

async goToLogin():Promise<void>{
    await this.page.goto('opencart/index.php?route=account/login');
}

async getAppTitle():Promise<string>{
return await this.page.title()
}

async isForgotPwdLinkExist():Promise<boolean>{
    return await this.forgottenPwdLink.isVisible()
}

async doLogin(username:string, password:string){
await this.emailId.fill(username);
await this.password.fill(password)
await this.loginbtn.click()

}

// async isInvalidLoginErrorDisplayed():Promise<boolean> {
//     return await this.loginErrorMessage.isVisible();
// }
async isInvalidLoginErrorDisplayed(): Promise<boolean> {
    await this.loginErrorMessage.waitFor({ state: "visible" });
    return await this.loginErrorMessage.isVisible();
}

}