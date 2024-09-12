// index.js

const {
  setupBrowserAndNavigate,
  handlePagination,
  extractTimestamps,
  isSorted,
  closeResources,
} = require('./src/main.js');

(async () => {
  // handle exceptipns (errors)
  // The try block contains the code might throw an error

  try {
    const url = 'https://news.ycombinator.com/newest';

    // 1. Launch the browser and open
    const { browser, page } = await setupBrowserAndNavigate(url);

    // 3. Handle pagination and collect article timestamps
    const maxPages = 5;

    // Set the maximum number of pages to iterate over
    const allTimestamps = await handlePagination(page, maxPages);

    // 4. Compare timestamps to check if they are in descending order
    const isValidOrder = isSorted(allTimestamps);
    if (isValidOrder) {
      console.log('Articles are in the correct order (newest to oldest)');
    } else {
      console.log('Articles are NOT in the correcr order!');
    }

    // 5. Close the browser after everything is done
    await browser.closeResources();
  } catch (error) {
    // Executed if an error is thrown inside the try block
    console.error('An error occurred:', error);
  }

  // Execute whether an errors or not, making it usefu; for cleanup operations
})();

// The try/catch within async functions to catch errors from await calls
