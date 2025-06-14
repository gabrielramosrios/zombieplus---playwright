const { test: base, expect } = require('@playwright/test')

const { Leads } = require('./actions/Leads')
const { Login } = require('./actions/Login')
const { Toast } = require('./actions/Components')
const { Movies } = require('./actions/Movies')

// landing: new LandingPage(page),
// login: new LoginPage(page),
// movies: new MoviesPage(page),
// toast: new Toast(page)

const test = base.extend({
    page: async ({ page }, use) => {

        const context = page

        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['toast'] = new Toast(page)

        await use(context)
    }
})

export { test, expect }