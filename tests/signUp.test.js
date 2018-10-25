const timeout = 15000

// série de tests sur la page d'accueil
describe("Creer un compte", () => {
    let page
    test('sign up', async () => {
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#navbar li a')
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#navbar li a' ) )
                .filter( el => el.textContent === 'Sign Up' )[0].click();
        });
        await page.waitForSelector('.title')
        const html = await page.$eval('.title', e => e.innerHTML)
        expect(html).toContain("Register")
    }, timeout)

    test('form', async () => {
        await page.goto('http://polr.campus-grenoble.fr/signup')
        await page.waitForSelector('.form-field')
        await page.type('.content-div input[name=username]','johdoe')
        await page.type('.content-div input[name=password]','123')
        await page.type('.content-div input[name=email]','johdoe@hotmail.fr')
        await page.screenshot({path: './tests/img/signUp1.png'});
        await page.waitForSelector('.content-div input[type=submit]')
        await page.$eval( '.content-div input[type=submit]', el => el.click() );
        await page.screenshot({path: './tests/img/signUp2.png'});
    }, timeout)

    test('connect', async () => {
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector("#navbar li a")
        await page.evaluate( () => $('#dropdown').dropdown('toggle'))
        await page.screenshot({path: './tests/img/signUp3.png'});
        await page.type('#dropdown input[name=username]','johdoe')
        await page.type('#dropdown input[name=password]','123')
        await page.screenshot({path: './tests/img/signUp4.png'});
        await page.$eval('#dropdown input[name=login]', el => el.click() );
        await page.screenshot({path: './tests/img/signUp5.png'});
    }, timeout)

    test('deconnect', async () => {
         await page.goto('http://polr.campus-grenoble.fr')
         await page.waitForSelector("#navbar li a")
         await page.evaluate( () => $('.login-name').dropdown('toggle'))
         await page.screenshot({path: './tests/img/signUp6.png'});
         await page.$eval(' ul .dropdown-menu li:last-child a', el => el.click() );
         await page.screenshot({path: './tests/img/signUp7.png'});
             }, timeout)
   

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
  