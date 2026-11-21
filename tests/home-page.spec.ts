import {test, expect} from '../src/fixtures/pageFixtures';
// import login from '../src/fixtures/loginfix.json'
test.beforeEach(async ({loginpage})=>{
await loginpage.goToLogin();
await loginpage.doLogin('mohan@mailinator.com', 'Test@123');
// await loginpage.doLogin(login.username, login.password)

})

test('Home page links test', async ({homepage})=>{
    await homepage.verifyLinks()
})