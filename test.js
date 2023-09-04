const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, before, after } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Test Case 1', function () {
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

  it('Exemplo de teste automatizado', async function () {
    // Passo 1: Navegar para uma página de exemplo
    await driver.get('https://commerceos.staging.devpayever.com/registration/fashion');

    // Passo 2: Validar o título da página
    const expectedTitle = 'payever'; // Atualize o título esperado
    const actualTitle = await driver.getTitle();
    expect(actualTitle).to.equal(expectedTitle);
  });
});

//const chromeOptions = new chrome.Options().setChromeBinaryPath('/usr/local/bin/google-chrome-dev');



