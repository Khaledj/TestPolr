const timeout = 15000

// série de tests sur la page d'accueil
describe("Test pour se loguer", () => {

//test pour vérifier que les caractères spéciaux sont refusés dans le sign up
test('unauthorised character ', async () => {
    await page.goto('http://localhost:8000/signup')

    // on attent que l'élément ".dropdown-menu" soit chargé
    await page.waitForSelector('.container')
    // on récupère le code HTML
    const html = await page.$eval('.container', e => e.innerHTML)
    // on vérifie qu'il contient la bonne chaîne de caractères et le formulaire
    expect(html).toContain("Register" , 'form')
    // on attent que l'élément soit chargé
    await page.waitForSelector('form')
    await page.type('form[action="/signup"] input[name="username"]',"toto%")
    // on insère le mot de passe dans le champ Password
    await page.type('form[action="/signup"] input[name="password"]',"campus")
    await page.type('form[action="/signup"] input[name="email"]',"email@campus.fr")
    // on clique sur le bouton Sign IN
    await page.$eval( '.btn-default', el => el.click() );
    await page.screenshot({path: './tests/img/form-full.png'});
    const toastMessage = await page.$eval('#toast-container div div.toast-message', e => e.innerHTML)
    // on vérifie qu'il contient la bonne chaîne de caractères
    expect(toastMessage).toContain("The username format is invalid")
}, timeout)


// cette fonction est lancée avant chaque test de cette
// série de tests
beforeAll(async () => {
    // ouvrir un onglet dans le navigateur
    page = await global.__BROWSER__.newPage()
}, timeout)

})