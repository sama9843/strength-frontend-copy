import { Builder, By } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome.js';

const url = process.env['ACCEPTANCE_TEST_URL'];
const options = new ChromeOptions();
const driver = await new Builder().forBrowser('chrome').setChromeOptions(new ChromeOptions()
  .addArguments('headless', 'remote-debugging-port=9222')).build();

before(async function () {
  await driver.get(url);
});

after(async function () {
  await driver.close();
});

describe('articles', function () {
  it('should have a search field', async function () {
    await driver.findElement(By.id('articles-search'));
  });
});
