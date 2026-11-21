import { test, expect } from "../src/fixtures/pageFixtures";

test.beforeEach(async ({ loginpage }) => {
  await loginpage.goToLogin();
  await loginpage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
  expect(await loginpage.getAppTitle()).toBeTruthy();
});

test("verify the product images count", async ({
  homepage,
  searchpage,
  productInfopage,
}) => {
  await homepage.doSearch("macbook");
  await searchpage.selectProduct("MacBook Pro");
  expect(await productInfopage.getProductHeader()).toBe("MacBook Pro");
  expect(await productInfopage.getproductImagesCount()).toBe(4);
});

test("verify product information/data", async ({
  homepage,
  searchpage,
  productInfopage,
}) => {
  await homepage.doSearch("macbook");
  await searchpage.selectProduct("MacBook Pro");
  let actualProductInfoMap = await productInfopage.getProductInfo();
  console.log("The actual product details:", actualProductInfoMap);
  expect.soft(actualProductInfoMap.get("ProductHeader")).toBe("MacBook Pro");
  expect.soft(actualProductInfoMap.get("Brand")).toBe("Apple");
  expect.soft(actualProductInfoMap.get("Product Code")).toBe("Product 18");
  // expect.soft(actualProductInfoMap.get('ProductPrice')).toBe('$2,000.00');
  // expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');
  expect.soft(actualProductInfoMap.get("Reward Points")).toBe("800");
});
