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
 * * Corrected Logic
 * 
 * * 1. Extract timestamps from the current page.
 * * 2. Keep collecting from subsequent pages
 * * 3. Skip to the next page if necessary
 * * 4. Stop collecting 
 * 
 */



/**
 * *Extract the timestamps for the first 100 Articles 
 * @param {object} page - Page to the url 
 * @returns {Array[]} - array of timestamps 
 * @argument {object} elements - An array of elements matching the selector 
 */

async function ExtractTimestamps(page) {

return await page.$$eval('span.age[title]', elements => 

      // Slcing and Mapping Elements
      // ! The total selector is spread out across different pages 
    elements.slice(0, 100).map(element => {
      // Extract `title` value and store in variable `timeText`
      // ! timeText variable is not an ARRAY but a single string representing the date extracted from the title attribute of each individual element
 const timeText = element.getAttribute('title');
      // Convert timestamp to milliseconds
      // Converts the timeText (a date string) into a JavaScript Date object
      return new Date(timeText).getTime();
    }
    )
  )
}




/**
 * * Handles Pagination by clicking "More" button that takes you to the next page
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
  



/**
 * 
 * * Handles pagination and Collect Timestamps | Combine functionality
 * @param {object} page 
 * @param {number} maxPages 
 * @returns 
 */





async function handlePaginationAndExtractTimestamps(page, maxPages) {
  let allTimestamps = [];
  let currentPage = 0;

  // Logic to collect timestamps and handle pagnination

  // Loops navigate through web pages and collect timestamps
  // The Logical AND operator results in true if both conditions are true
  while (allTimestamps.length < 100 && currentPage < maxPages) {
    // Extract timestramps from the current page 
    const timestamps = await extractTimestamps(page);
    // combines two arrays | the defined array into the extracted one 
    allTimestamps = allTimestamps.concat(timestamps);


    // Check if we have collected enough timestamps
    if (allTimestamps.length >= 100) {
      // Slice to the first 100 timestamps, if the extracted picked up more than 100
      allTimestamps = allTimestamps.slice(0, 100);
      break;
    }


    // Navigate to the next page using the provided `handlePagination`
    const nextPageExists = await handlePagination(page);  // Use the handlePagniation function
    if (!nextPageExists) {
      console.log('No more pages to navigate.');
      break; 
    }

    currentPage++;
  }

  return allTimestamps;
}

// Set a number to the max pages 
// How are elements or data passed into the `allTimestamps` array? 




/**
 * *Compare the extracted dates to ensure they are in descending order
 * @param {Array<number|Date>} - An array of dayes or number to be checked
 * @returns {boolean} - Returns `true` if the array is sorted in ascending order, `false` otherwise.
 */

function isSorted(articleDates) { 
 // for loop iterates `articleDates` list
  for (let i = 0; i < articleDates.length - 1; i++) {
  //  compares `article date` and an increment on `article date`
    if (articleDates[i] < articleDates[i + 1]) {
      return "False: Articles are NOT arranged from newest to latest.";
    };
  }
 return "True: Articles are arranged from newest to oldest.";
}





/**
 ** Gracefully closes up all resources.
 * 
 * @param {Object} context - The context object to be closed. 
 * @param {Object} browser - The browser to be closed.
 * @returns {Pronise<void>} - A promise that resolves when the resources are closed. 
 */

async function closeResources(context, browser) {
  try {
    // Close ht econtext
    if  (context) {
      await browser.close();
    }

    // Close the browser
    if (browser) {
      await browser.close();
    }
    console.log("Resources have been cloed successfully.");
  } catch (error) {
    console.log("Error while closig resources:", error);
  }
}


// Exporting the functions so they can be used in main.js
module.exports = {
  setupBrowserAndNavigate,
  handlePaginationAndExtractTimestamps,
  isSorted,
  closeResources,
}













// Handle scenarios where there might be no text button
// Handle Scenarios where button might not be clickable 
// Provide clear feedback on whether pagination succeeded or failed


















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
