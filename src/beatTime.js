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

  console.log('Loading...')

  const selectCSSButton = '#Freq > div.sapMTileContent > div.sapMStdTileTopRow';
  await page.waitForSelector(selectCSSButton);

  await page.click(selectCSSButton);
  // await browser.close();
};


module.exports = {
  beatTime
}

// Success => #__view3
//  Error1 (beated) (Registro Negado! Intervalo entre marcação menor que 10 minutos) => #__view3 