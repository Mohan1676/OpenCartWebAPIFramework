import { test, expect } from "../src/fixtures/pageFixtures";
import { CSVHelper } from "../src/utils/csv-util";
import { Excelhelper } from "../src/utils/excel-util";
import { JsonHelper } from "../src/utils/json-util";

test.beforeEach(async ({ loginpage }) => {
  await loginpage.goToLogin();
});

test("Login title test", async ({ loginpage }) => {
  expect(await loginpage.getAppTitle()).toBe("Account Login");
});

test("IsForgot link exist", async ({ loginpage }) => {
  expect(await loginpage.isForgotPwdLinkExist()).toBeTruthy();
});

test("Login test with valid credentials", async ({ loginpage }) => {
  await loginpage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

// DD_1: sequqnce mode -- 1 test is running with test data one by one using testdata from fixture.
// This is not recommend way
test.skip("Login to app using wrong credentials with Data driven test", async ({
  testdata,
  loginpage,
}) => {
  for (let row of testdata) {
    await loginpage.doLogin(row.username, row.password);
    expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  }
});

// DD_2: without fixtures, parallel mode, read csv data directly and loop the test method row wise...
let testData = CSVHelper.readCsv("src/test-data/loginData.csv");
for (let row of testData) {
  test(`invalid login test with - ${row.username} - ${row.password}`, async ({
    loginpage,
  }) => {
    await loginpage.doLogin(row.username, row.password);
    expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  });
}
// -----------------------------------------------------------------------------------------------------------------------------
// fetching from excel: Mac doesn't have inbuild Microsoft excel so couldn't test. JFI we have implemented the code 
// and commented.
//-------------------------
// let loginTestData = Excelhelper.readExcel("pathName", "sheetName");
// for (let row of loginTestData) {
//   test(`invalid login test with excel data - ${row.username} ---> ${row.password}`, async ({
//     loginpage,
//   }) => {
//     await loginpage.doLogin(row.username, row.password);
//     expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
//   });
// }
// -----------------------------------------------------------------------------------------------------------------------------

let loginJsonData = JsonHelper.readJson('src/test-data/loginData.json');
for(let row of loginJsonData){

  test(`invalid login test with json data ${row.username} ---> ${row.password}`, async ({loginpage})=>{
   await loginpage.doLogin(row.username, row.password);
   expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  })
}