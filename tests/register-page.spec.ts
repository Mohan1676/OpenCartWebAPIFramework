import { test, expect } from "../src/fixtures/pageFixtures";
import { CSVHelper } from "../src/utils/csv-util";

test.beforeEach(async ({ registerpage }) => {
  await registerpage.goToRegisterationPage();
});

test("register title test", async ({ registerpage }) => {
  expect(await registerpage.getRegisterTitle()).toBe("Register Account");
});

let testdata = CSVHelper.readCsv("./src/test-data/registerData.csv");
for (let row of testdata) {
  test(`Registeration ${row.email}`, async ({
    registerpage,
    loginpage,
    page,
    logoutpage,homepage
  }) => {
    await registerpage.registerForm(
      row.firstname!,
      row.lastname!,
      row.email!,
      row.telephone!,
      row.password!,
      row.confirmpassword!,
    );
    await registerpage.continueButton();
    await logoutpage.logoutApp();
    await loginpage.goToLogin();
    await loginpage.doLogin(row.email, row.password);
    expect(await homepage.homePageTitle()).toBe('My Account');
    await logoutpage.logoutApp();
    await registerpage.clickOnRegisterPage()
    //  await page.pause();
  });
}
