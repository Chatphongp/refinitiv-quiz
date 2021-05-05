const puppeteer = require('puppeteer');
const argv = process.argv.slice(2);


(async () => {
  const cookie = {
    name: 'hasCookie',
    value: 'true',
    domain: 'codequiz.azurewebsites.net',
    path: '/',
    expires: -1,
    size: 13,
    httpOnly: false,
    secure: false,
    session: true,
    sameParty: false,
    sourceScheme: 'Secure',
    sourcePort: 443
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setCookie(cookie);
  await page.goto('https://codequiz.azurewebsites.net/');
  

  const navList = await page.$$eval('table tbody tr', rows => {
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, column => column.innerText);
    });
  });

  navList.forEach( nav => {
    if (nav[0] == argv) console.log(nav[1]);
  });

  await browser.close();
})();