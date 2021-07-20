const puppeteer = require("puppeteer");

const UnderDevelopment =
  `${process.env.NODE_ENV}` === "DEVELOPMENT" ? true : false;

const TIMEOUT = process.env.TIMEOUT_SECOND
  ? parseInt(process.env.TIMEOUT_SECOND) * 1000
  : 10000; // 10s
const TOTAL_ATTEMPTS = process.env.TOTAL_ATTEMPTS
  ? parseInt(process.env.TOTAL_ATTEMPTS)
  : 3;

const closeBrowser = async (browser) => {
  if (!UnderDevelopment) {
    await browser.close();
  }
};

const beatTime = async (attempt = 0) => {
  const browser = await puppeteer.launch({ headless: !UnderDevelopment });

  try {
    const page = await browser.newPage();
    await page.goto(`${process.env.SITE_URL}`);

    await page.waitForNavigation({ timeout: TIMEOUT });
    await page.waitForNavigation({ timeout: TIMEOUT });

    //Login
    await page.type("#userNameInput", process.env.SITE_LOGIN);
    await page.type("#passwordInput", process.env.SITE_PASS);

    await page.click("#submitButton");

    await page.waitForNavigation({ timeout: TIMEOUT });
    await page.waitForNavigation({ timeout: TIMEOUT });

    console.log("Loading...");

    //Beat Point
    const selectCSSButton =
      "#Freq > div.sapMTileContent > div.sapMStdTileTopRow";
    await page.waitForSelector(selectCSSButton, {
      timeout: TIMEOUT,
    });

    await page.click(selectCSSButton);

    //Check message
    const selectCSSMessage = "#__view3";
    await page.waitForSelector(selectCSSMessage)
    let element = await page.$(selectCSSMessage)
    let value = await page.evaluate(el => el.textContent, element)

    console.log(value)


    await closeBrowser(browser);
    return "success";
  } catch (error) {
    console.log("ERROR", error.message);

    await closeBrowser(browser);

    if (attempt < TOTAL_ATTEMPTS - 1) {
      return bot(attempt + 1);
    } else {
      return "failure";
    }
  }
};

module.exports = {
  beatTime,
};

// Success => #__view3
//  Error1 (beated) (Registro Negado! Intervalo entre marcação menor que 10 minutos) => #__view3
