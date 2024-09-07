// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1


const { chromium } = require("playwright");


 /** 
   * * Launch browser, creates a new context and page, and navigates to the specified URL.
   * @param {string} url - The URL to navigate to.
   * @returns {Promise<{ browser: any, page: any}>} - The browser and page objects
   * 
   * */ 

async function setupBrowserAndNavigate(url) {
  // Launch browser
  const browser = await chromium.launch({ headless: false});

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Navigate to the specified URL
  await page.goto(url);

  return { browser, page};


}





/**
 * * Handles Pagination by clicking "More" button
 * @param {Page} page - The Playwright page object
 * @returns {Promise<boolean>} - A promise that resolves to true if there is a next page, false otherwise
 * 
 */

async function handlePagination(page) {
try {
    // Select and store button DOM element
    const nextButton = await page.$('.morelink'); // Adjust the selector as needed

    // Click button if found
if (nextButton) {
      await Promise.all([
        // Wait for the page to fully load
  page.waitForNavigation({ waitUntil: 'networkidle' }),
        nextButton.click(),
      ]);
      return true; // Indicate that there was a next page and pagination was handled
    } else {
      return false; // Indicate that there is no next page
    }
  } catch (error) {
    console.error('Error handling pagination:', error);
    return false; // Indicate failure due to an error
  }
}

// Handle scenarios where there might be no text button
// Handle Scenarios where button might not be clickable 
// Provide clear feedback on whether pagination succeeded or failed





/**
 * *Extract the timestamps for the first 100 Articles 
 * @param {object} page - Page to the url 
 * @returns 
 */

// Function to extract timestamps from articles 

async function extractTimestamps(page) {
return await page.$$eval('span.age[title]', elements => 
  //  
    elements.slice(100).map(element => {
      // Extract `title` value and store in variable `timeText`
 const timeText = element.getAttribute('title');
      // Convert timestamp to milliseconds
      return new Date(timeText).getTime();
    }
    )
  )
}









/**
 * 
 */








  // asynchronous operations
async function sortHackerNewsArticles() {
  // Simulate user interaction 

  /**
   * 
   * * launch browser 
   * 
   * */ 
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // Extract the Article Information
  

  // What is the purpose of this `function`?
  
    
    
    // Extract the timestamps from the first 100 articles
   const articleDates = await page.$$eval('.age', element =>
      element.slice(0, 100).map(element => {
       const timeText = element.getAttribute('title');
       return new Date(timetext).getTime(); // Convert to timestamp for easy comparison
      }))

  // 
 



 

  // Sort and Compare
  // Compare the extracted dates to ensure they are in descending order
  let isSorted = true;
  for (let i = 0; i < articleDates.length - 1; 1++) {
    if (articleDates[i] < articleDates(i + 1)) {
      isSorted = false;
      break;
    };
  }


  // 
  // Write the logic for what to happen if the articles are not structured from newest to latest








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
