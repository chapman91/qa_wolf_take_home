// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1


const { chromium } = require("playwright");







async function openBrowserLaunchIsolatedPage (url) {
  // Simulate user interaction 

  // launch headless browser
  const browser = await chromium.launch({ headless: false });

  // Open a new page in the context
  const context = await browser.newContext();

  // Navigate to the specified URL
  const page = await context.newPage();

  // go to Hacker News
  // await page.goto("https://news.ycombinator.com/newest");
  await page.goto(url);

  return page;

}


/**
 * Extracts and converts the dates from article elements into timestamps
 * @param {import('playwright').Page} page - The Playwright page object
 * @returns {Promise<number[]>} - A promise that resolves to an array of timestamps. 
 */

async function extractArticleDates(page) {
  // Select element with `.age` class
  const articleDates = await page.$$eval('.age', elements => 
    elements.slice(100).map(element => {
      // Get the timestamp from the `tile` attribute
      const timeText = element.getAttribute('title');
      // Convert to timestamp
      return new Date(timeText).getTime();
    })
)
}




/**
 * Navigates through paginated pages and extracts article timestamps.
 * @param {import('play')}
 * 
 * 
 * 
 */













  // asynchronous operations
async function sortHackerNewsArticles() {

  // Ascending order, for first 100 artice 

  // Extract the timestamps from the first 100 articles
  const articleDates = await page.$$eval('.age', element =>
     element.slice(0, 100).map(element => {
      const timeText = element.getAttribute('title');
      return new Date(timetext).getTime(); // Convert to timestamp for easy comparison
     }))


  // Step 3: Compare the extracted dates to ensure they are in descending order
  let isSorted = true;
  for (let i = 0; i < articleDates.length - 1; 1++) {
    if (articleDates[i] < articleDates(i + 1)) {
      isSorted = false;
      break;
    };
  }

  // Output the result of the validation 
  if (isSorted) {
    console.log('The first 100 articles are sorted from newest to oldest.');
  } else {
    console.log('The first 100 articles are NOT sorted correctly.');
  }






  // gracefully close up everything 
  await context.close();
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();

// Query html element with .age Id/class
// Extract the content of the selected element. The timestamp and the parent element of the post 
// 
''