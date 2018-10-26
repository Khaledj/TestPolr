const timeout = 15000

// Customiser une adresse
describe("URLOption", () => {
    let page

    // Vérifier que le bouton <Link Option> affiche une page d'options
    test('URL option', async () => {

        // on se connecte sur le site
        await page.goto('http://polr.campus-grenoble.fr')
        // on attend que le bouton <Link Option> soit chargé
        await page.waitForSelector('#show-link-options')
        // on clique sur le bouton <Link Option>
        await page.$eval('#show-link-options', el => el.click());
        // on attend que les options soit chargé
        await page.waitForSelector('#options')
        await page.waitFor(2000)
        // on prend une capture d'écran
        await page.screenshot({ path: './tests/img/urlOption.png' })
        // on récupere la valeur du champs "h2"
        const html = await page.$eval('#options h2', e => e.innerHTML)
        // on vérifie que dans cet élément on trouve "Customize link"
        expect(html).toContain("polr.campus-grenoble.fr/")
               
    }, timeout)

    // vérification que le message "available" s'affiche
    test('URL option available', async () => {

        // on se connecte sur le site et on ouvre les options
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#show-link-options')
        await page.$eval('#show-link-options', el => el.click());
        await page.waitForSelector('#options')
        await page.waitFor(2000)

        // on saisi une extention dans le champs
        await page.type('.custom-link-text input[name=custom-ending]', 'tonton');
        // on prend une capture d'écran
        await page.screenshot({ path: './tests/img/urlToto.png' })
        // on clique sur le bouton <check-link-availability>
        await page.$eval('#check-link-availability', el => el.click());
        // on prend une capture d'écran
        await page.screenshot({ path: './tests/img/urlAvailable.png' })
        // on récupere la valeur du champs "span"
        const html = await page.$eval('#options span', e => e.innerHTML)
        // on verifie que le texte est bien "available"
        expect(html).toContain('Available')

    }, timeout)

    // vérification que l'adresse est bien customisée
    test('URL option custom', async () => {

        // on se connecte sur le site et on ouvre les options
        await page.goto('http://polr.campus-grenoble.fr')
        // on rentre une adresse longue
        await page.waitForSelector('.long-link-input')
        await page.type('.long-link-input', 'https://zxing.org/w/decode.jspx');
        await page.waitForSelector('#show-link-options')
        await page.$eval('#show-link-options', el => el.click());
        await page.waitForSelector('#options')
        await page.waitFor(2000)

        // on saisi une extention dans le champs
        await page.type('.custom-link-text input[name=custom-ending]', 'tonton');
        await page.$eval('#shorten', el => el.click());
        // on prend une capture d'écran
        await page.screenshot({ path: './tests/img/urlShorten.png' })
    }, timeout)

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})