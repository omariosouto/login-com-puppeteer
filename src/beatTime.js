const puppeteer = require('puppeteer');

const UnderDevelopment = `${process.env.NODE_ENV}` === 'DEVELOPMENT' ? true: false;

const beatTime =  async () => {

  const timeout = 10000; // 10s

  const browser = await puppeteer.launch(
    { headless: !UnderDevelopment }
  );
  const page = await browser.newPage();
  await page.goto(`${process.env.SITE_URL}`);
  
  await page.waitForNavigation({ timeout });
  await page.waitForNavigation({ timeout });
  
  await page.type('#userNameInput', process.env.SITE_LOGIN)
  await page.type('#passwordInput', process.env.SITE_PASS)

  await page.click('#submitButton')
  
  await page.waitForNavigation({ timeout });
  await page.waitForNavigation({ timeout });

  console.log('Loading...')

  const selectCSSButton = '#Freq > div.sapMTileContent > div.sapMStdTileTopRow';
  await page.waitForSelector(selectCSSButton, { timeout });

  await page.click(selectCSSButton);

  if(!UnderDevelopment){
    await browser.close();
  }
};


module.exports = {
  beatTime
}

// Success => #__view3
//  Error1 (beated) (Registro Negado! Intervalo entre marcação menor que 10 minutos) => #__view3 