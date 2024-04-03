const puppeteer = require("puppeteer");

const renderShirt = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:5173"); // Replace with the URL of your app

  // Wait for the component to render
  await page.waitForSelector("#root mesh");

  // Take a screenshot of the rendered component
  await page.screenshot({ path: "shirt.png" });

  await browser.close();
};

renderShirt();
