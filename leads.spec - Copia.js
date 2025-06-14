// @ts-check
import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  //visit
  await page.goto('http://localhost:3000')

  //Usando o elemento
  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  //usando a Role, com o nome completo do botão (elemento)
  //await page.getByRole('button', {name:'Aperte o play... se tiver coragem'}).click()

 //openLeadModal
  //Usando role e '/' para substrings (contains) do texto
  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')  

  //Exemplo de input com ID 
  //await page.locator('#name').fill('Gabriel')
  
  //Exemplo de input sem ID - locator('ELEMENT[PROPRIEDADE=VALOR]
  //await page.locator('input[name=name]').fill('Gabriel')

  //Exemplo de input sem ID e sem propriedade, usando o placeholder 
  // O texto quando tiver caracteres especiais ou espaço, então deve possuir aspas duplas ""
  //await page.locator('input[placeholder="Informe seu nome"]').fill('Gabriel')

  //submitLeaadForm
  await page.getByPlaceholder('Informe seu nome').fill('Gabriel')
  await page.getByPlaceholder('Informe seu email').fill('email.exemplo@hotmail.com')
  
  //Dessa forma eu amarro o texto pra fazer ele esperar ele aparecer no modal
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  //Para pegar todo o HTML da pagina no momento do evento  

  // await page.getByText('seus dados conosco').click()
  // const content =  await page.content()  
  // console.log(content)

  //  toastHaveText
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await expect(page.locator('.toast')).toHaveText(message)

  //o timeout no final é para garantir que o elemento irá sumir depois de 5 segundos
  await expect(page.locator('toast')).toBeHidden({timeout: 5000})

  await page.waitForTimeout(5000)
});

test('não deve cadastrar com e-mail incorreto', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')  

  await page.getByPlaceholder('Informe seu nome').fill('Gabriel')
  await page.getByPlaceholder('Informe seu email').fill('email.com')
  
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Email incorreto')  
});

test('não deve cadastrar quando o nome nçao é preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')  

  await page.getByPlaceholder('Informe seu email').fill('email.exemplo@hotmail.com')
  
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')  
});

test('não deve cadastrar quando o e-mail não é preenchido', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')  

  await page.getByPlaceholder('Informe seu nome').fill('Gabriel')
  
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

    await expect(page.locator('.alert')).toHaveText('Campo obrigatório')  
  });

  test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    await page.getByRole('button', {name: /Aperte o play/}).click()
  
    await expect(
      page.getByTestId('modal').getByRole('heading')
    ).toHaveText('Fila de espera')  
      
    await page.getByTestId('modal')
      .getByText('Quero entrar na fila!').click()
  
      await expect(page.locator('.alert')).toHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
      ])  
    });  