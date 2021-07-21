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

const makeLogin = async (page) => {
  await page.type("#userNameInput", process.env.SITE_LOGIN);
  await page.type("#passwordInput", process.env.SITE_PASS);

  await page.click("#submitButton");
};

const punchTheClock = async (page) => {
  const selectCSSButton = "#Freq > div.sapMTileContent > div.sapMStdTileTopRow";

  await page.waitForSelector(selectCSSButton, {
    timeout: TIMEOUT,
  });

  await page.click(selectCSSButton);
};

const getResponseMessage = async (page) => {
  const selectCSSMessage = "#__view3";
  await page.waitForSelector(selectCSSMessage);
  let element = await page.$(selectCSSMessage);
  return page.evaluate((el) => el.textContent, element);
};

const registeredHour = (message) => {
  const successMessage = "Registro Efetuado";

  return message.indexOf(successMessage) !== -1;
};

const punchAClock = async (attempt = 0) => {
  const browser = await puppeteer.launch({ headless: !UnderDevelopment });

  try {
    const page = await browser.newPage();
    await page.goto(`${process.env.SITE_URL}`);

    await page.waitForNavigation({ timeout: TIMEOUT });
    await page.waitForNavigation({ timeout: TIMEOUT });

    await makeLogin(page);

    await page.waitForNavigation({ timeout: TIMEOUT });
    await page.waitForNavigation({ timeout: TIMEOUT });

    console.log("Loading...");

    await punchTheClock(page);

    const responseMessage = await getResponseMessage(page);

    await closeBrowser(browser);

    return {
      status: registeredHour(responseMessage) ? "success" : "failure",
      message: responseMessage,
    };
  } catch (error) {
    console.log("ERROR", error.message);

    await closeBrowser(browser);

    if (attempt < TOTAL_ATTEMPTS - 1) {
      return punchAClock(attempt + 1);
    } else {
      return {
        status: "failure",
        message: error.message,
      };
    }
  }
};

module.exports = {
  punchAClock,
};
