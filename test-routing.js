import puppeteer from 'puppeteer';

(async () => {
  console.log("Starting browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  console.log("Navigating to http://localhost:3000/ ...");
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  
  // Wait for login to be visible
  await page.waitForSelector('input[type="email"]');
  console.log("At login page.");
  
  // Login
  await page.type('input[type="email"]', 'vikram@decormart.com');
  await page.click('button[type="submit"]');
  console.log("Clicked login.");
  
  // Wait for dashboard to load
  await page.waitForFunction(() => document.querySelector('h1') && document.querySelector('h1').textContent.includes('Good'));
  let title = await page.$eval('h1', el => el.textContent);
  console.log("H1 after login:", title); // Should be "Good morning, User" or similar

  // Look for a link on the dashboard, e.g. "View All Projects"
  console.log("Clicking a link on the dashboard...");
  const links = await page.$$('a');
  console.log(`Found ${links.length} anchor tags.`);
  
  let clicked = false;
  for (const link of links) {
    const href = await page.evaluate(el => el.getAttribute('href'), link);
    if (href === '/projects') {
      console.log("Clicking link to /projects...");
      await page.evaluate(el => el.click(), link);
      clicked = true;
      break;
    }
  }
  
  if (!clicked) {
    console.log("Could not find /projects link!");
  } else {
    // Wait a bit to see if DOM changes
    await new Promise(r => setTimeout(r, 2000));
    
    title = await page.$eval('h1', el => el.textContent);
    console.log("H1 after click:", title); // Should be "Projects"
    
    console.log("Current URL:", page.url());
  }

  await browser.close();
})();
