import puppeteer from "puppeteer"

const ogUrl = "http://localhost:3000/og"

async function screenshot(url) {
  // Launch a "browser"
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Set the emulated media feature to 'dark'
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }])

  // higher res
  await page.setViewport({ width: 1125, height: 590, deviceScaleFactor: 1 })

  // Navigate to the URL
  await page.goto(url)

  // Ensure that the element is loaded
  await page.waitForSelector("#og")

  // Zero in on the element we want to capture
  const ogDiv = await page.$("#og")
  await ogDiv.screenshot({
    path: "testim.png",
  })

  // Close the page and browser
  await page.close()
  await browser.close()
}

screenshot(ogUrl)
