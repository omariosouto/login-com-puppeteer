require('dotenv').config();
const puppeteer = require('puppeteer');

const beatTime =  async () => {
  const browser = await puppeteer.launch(
    { headless: false }
  );
  const page = await browser.newPage();
  await page.goto(`${process.env.SITE_URL}`);
  
  await page.waitForNavigation();
  await page.waitForNavigation();
  
  await page.type('#userNameInput', process.env.SITE_LOGIN)
  await page.type('#passwordInput', process.env.SITE_PASS)

  await page.click('#submitButton')
  
  await page.waitForNavigation();
  await page.waitForNavigation(); 

  console.log('Caregandoo...')

  const selectCSSButton = '#Freq > div.sapMTileContent > div.sapMStdTileTopRow';
  await page.waitForSelector(selectCSSButton);

  await page.click(selectCSSButton);
  console.log('Seu ponto foi batido');

  // await browser.close();
};
beatTime();