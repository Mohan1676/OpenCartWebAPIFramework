import { test, expect } from "../src/fixtures/pageFixtures";
import { CSVHelper } from "../src/utils/csv-util";

test.beforeEach(async ({ loginpage }) => {
  await loginpage.goToLogin();
  await loginpage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
  expect(await loginpage.getAppTitle()).toBeTruthy();
});

let productCsvData = CSVHelper.readCsv("src/test-data/product.csv");

for (let row of productCsvData) {
  console.log(productCsvData);
  test(`verify search result count - ${row.searchkey} - ${row.productname}`, async ({
    homepage,
    searchpage,
  }) => {
    await homepage.doSearch(row.searchkey);
    expect(await searchpage.getProductSearchResultsCount()).toBe(
      Number(row.resultcount),
    );
  });
}


for(let row of productCsvData){
test(`verify user is able to land on product page - ${row.searchkey} - ${row.productname}`, async({homepage, searchpage, page})=>{
await homepage.doSearch(row.searchkey);
await searchpage.selectProduct(row.productname);
expect(await page.title()).toBe(row.productname);
})
}

