const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, before, after } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Test Case 2', function () {
  this.timeout(90000); // Aumente o timeout se necessário

  let driver;

  before(async function () {
    // Inicialize o driver antes de todos os testes
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    // Encerre o driver após todos os testes
    await driver.quit();
  });

  it('Test "value" = santander', async function () {
    // Passo 1: Navegar para a página
    await driver.get('https://commerceos.staging.devpayever.com/registration/santander');

    // Esperar pelo elemento "Transactions" antes de interagir com ele
    const transactionsElement = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Transactions")]')));

    // Agora você pode interagir com o elemento
    // Por exemplo, você pode verificar se ele está visível
    expect(transactionsElement.isDisplayed()).to.eventually.be.true;

    // Você pode realizar outras ações com o elemento, se necessário

    // Passo 2: Validar elementos na página
    const expectedApps = ['Transactions', 'Checkout', 'Connect', 'Point of Sale', 'Settings'];

    for (const appName of expectedApps) {
      // Localize o elemento na página e valide se ele está presente
      const appElement = await driver.findElement(By.xpath(`//span[contains(text(), '${appName}')]`));
      expect(appElement.isDisplayed()).to.eventually.be.true;
    }
  });

  it('Teste de login automático', async function () {
    // Passo 1: Navegar para a página de login
    await driver.get('https://commerceos.staging.devpayever.com/registration/santander'); // Substitua pela URL da página de login

    // Passo 2: Preencher campos de login
    const usernameField = await driver.findElement(By.id('username')); // Substitua 'username' pelo ID do campo de nome de usuário
    const passwordField = await driver.findElement(By.id('password')); // Substitua 'password' pelo ID do campo de senha
    const loginButton = await driver.findElement(By.id('login-button')); // Substitua 'login-button' pelo ID do botão de login

    const username = 'SEU_NOME_DE_USUARIO'; // Substitua pelo nome de usuário desejado
    const password = 'SUA_SENHA'; // Substitua pela senha desejada

    await usernameField.sendKeys(username);
    await passwordField.sendKeys(password);

    // Passo 3: Clicar no botão de login
    await loginButton.click();

    // Passo 4: Esperar pela página de destino após o login e validar algo (por exemplo, uma mensagem de boas-vindas)
    const welcomeMessageElement = await driver.wait(until.elementLocated(By.id('welcome-message'))); // Substitua pelo seletor correto
    const welcomeMessage = await welcomeMessageElement.getText();
    
    // Verifique se a mensagem de boas-vindas contém o nome de usuário ou outro indicador de login bem-sucedido
    expect(welcomeMessage).to.contain(username);

    // Você pode adicionar mais verificações ou interações na página de destino após o login, se necessário
  });
});
