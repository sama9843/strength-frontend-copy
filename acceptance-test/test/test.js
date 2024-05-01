import { Builder, By } from 'selenium-webdriver';

const url = process.env['ACCEPTANCE_TEST_URL'];
const driver = await new Builder().forBrowser('chrome').build();

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
