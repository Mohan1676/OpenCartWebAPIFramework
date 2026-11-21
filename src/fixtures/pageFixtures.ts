import {test as baseTest, expect} from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { CSVHelper } from '../utils/csv-util';
import { RegisterationPage } from '../pages/registeration-page';
import { LogOutPage } from '../pages/logout-page';
import { SearchResultPage } from '../pages/search-result-page';
import { ProductInfoPage } from '../pages/product-info-page';


type pageFixtures ={
    loginpage:LoginPage
    homepage:HomePage;
    testdata: Record<string, string>[];
    registerpage: RegisterationPage;
    logoutpage: LogOutPage;
    searchpage: SearchResultPage;
    productInfopage: ProductInfoPage;
}

let test = baseTest.extend<pageFixtures>({
    loginpage: async({page}, use)=>{
      let loginpage = new LoginPage(page);
      await use(loginpage)
    },
    homepage: async ({page}, use)=>{
    let homepage = new HomePage(page);
    await use(homepage)
    },
    testdata: async({}, use)=>{
        let testData = CSVHelper.readCsv('src/test-data/loginData.csv');
        await use(testData);
    },
    registerpage: async({page}, use)=>{
      let registerpage = new RegisterationPage(page);
      await use(registerpage);
    },
    logoutpage: async({page}, use)=>{
        let logoutpage = new LogOutPage(page);
        await use(logoutpage);
    },
    searchpage: async({page}, use) =>{
        let searchpage = new SearchResultPage(page);
        await use(searchpage);
    },
    productInfopage: async({page}, use)=>{
        let productInfopage = new ProductInfoPage(page);
        use(productInfopage);
    }
})

export{test, expect};