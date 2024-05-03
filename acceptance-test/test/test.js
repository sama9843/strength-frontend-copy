import { Builder, By, locateWith } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome.js';
import assert from 'assert';

const url = process.env['ACCEPTANCE_TEST_URL'];
const driver = await new Builder().forBrowser('chrome').setChromeOptions(new ChromeOptions()
  .addArguments('headless', 'remote-debugging-port=9222')).build();

before(async function () {
  await driver.get(url);
  await driver.manage().setTimeouts({ implicit: 2000 });
});

after(async function () {
  await driver.close();
});

describe('articles', function () {
  // User story: As a user, I want to view fitness headlines
  it('should list articles', async function () {
    this.timeout(3000);
    const articles = await driver.findElements(By.css('.article-list li a'));
    assert(articles.length > 4);
    articles.forEach(async function(article) {
      assert(await article.isDisplayed());
      assert((await article.getText()).length > 0);
    });
  });

  // User story: As a user, I want to be able to search fitness articles to find a specific topic that interests me
  it('should display search results in response to user search query', async function () {
    this.timeout(3000);
    const searchQuery = 'resistance band';
    const searchField = await driver.findElement(By.css('.search-articles input[name="search"]'));
    await driver.actions()
      // Moves cursor to search field and clicks it
      .move({ origin: searchField })
      .press()
      // Sends keystrokes to search
      .sendKeys(searchQuery)
      .perform();
    // Confirms that articles including this search now exists below the search field
    const articles = await driver.findElements(locateWith(By.css('.article-list li a')).below(searchField));
    assert(articles.length > 0);
    articles.forEach(async function(article) {
      assert(await article.isDisplayed());
      assert((await article.getText()).toLowerCase().includes(searchQuery));
    });
  });
});
