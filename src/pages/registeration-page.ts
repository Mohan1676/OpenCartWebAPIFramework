import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class RegisterationPage extends BasePage {
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly telephone: Locator;
  private readonly password: Locator;
  private readonly confirmPwd: Locator;
  private readonly termConditionCheckBox: Locator;
  private readonly continuebtn: Locator;
  private readonly menu_register: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByRole("textbox", { name: "* First Name" });
    this.lastName = page.getByRole("textbox", { name: "* Last Name" });
    this.email = page.getByRole("textbox", { name: "* E-Mail" });
    this.telephone = page.getByRole("textbox", { name: "* Telephone" });
    this.password = page.getByRole("textbox", {
      name: "* Password",
      exact: true,
    });
    this.confirmPwd = page.getByRole("textbox", { name: "* Password Confirm" });
    this.termConditionCheckBox = page.locator('[name="agree"]');
    this.continuebtn = page.getByRole("button", { name: "Continue" });
    this.menu_register = page.getByRole("link", { name: "Register" });
  }

  async goToRegisterationPage(): Promise<void> {
    await this.page.goto("opencart/index.php?route=account/register");
  }

  async getRegisterTitle(): Promise<string> {
    return await this.page.title();
  }

  async registerForm(
    lfirstName: string,
    llastName: string,
    lemail: string,
    ltelephone: string,
    lpwd: string,
    lconfirmPwd: string,
  ) {
    await this.firstName.fill(lfirstName);
    await this.lastName.fill(llastName);
    await this.email.fill(lemail);
    await this.telephone.fill(ltelephone);
    await this.password.fill(lpwd);
    await this.confirmPwd.fill(lconfirmPwd);
    await this.termConditionCheckBox.click();
  }

  async continueButton(): Promise<void> {
    await this.continuebtn.click();
  }

  async clickOnRegisterPage(): Promise<void> {
    await this.menu_register.click();
  }
}
