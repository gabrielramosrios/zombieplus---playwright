const { expect } = require('@playwright/test')

export class Login {

    constructor(page) {
        this.page = page
    }

    async do(email, password, userName) {
        await this.visit()
        await this.submit(email, password)
        await this.isLoggedIn(userName)
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()
    }

    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }

    async isLoggedIn(userName) {

        const loggedUser = this.page.locator('.logged-user')
        await expect(loggedUser).toHaveText(`Olá, ${userName}`)

        // //waitForLoadState ira aguardar até a pagina estar em um estado especifico
        // //idle é o estado de oscioso aguardando uma proxima requisição, após finalizar todo o trafego de rede 
        // await this.page.waitForLoadState('networkidle')
        // // A URL /.*admin/ seria equivalente a um contenha a palavra admin na URL
        // await expect(this.page).toHaveURL(/.*admin/)
    }
}

