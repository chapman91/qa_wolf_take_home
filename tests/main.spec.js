// @ts-check
const { test, expect } = require('@playwright/test');
const {
  setupBrowserAndNavigate,
  handlePagination,
  extractTimestamps,
  isSorted,
  closeResources,
} = require('../src/main'); // Adjust the path accordingly

/**
 *
 * test.describe(title, callback)
 * test.describe(callback)
 * test.describe(title, details, callback)
 *
 */

// Test the setupBrowserAndNavigate function
test.describe('Browser Setup and Navigation', () => {
  let browser, page;

  // Sets up a consistent state before test is ran
  test.beforeEach(async () => {
    const result = await setupBrowserAndNavigate('https://news.ycombinator.com/');
    browser = result.browser;
    page = result.page;
  });

  //
  test('Should go to the Hacker News website', async () => {
    const url = page.url();
    expect(url).toBe('https://news.ycombinator.com/');
  });

  // Runs after  each test in the group
  test.afterEach(async () => {
    await closeResources(null, browser); // Close the browser after the test
  });
});

// Test the handlePagination function
test.describe('Pagination Handling', () => {
  let browser, page;

  test.beforeEach(async () => {
    const result = await setupBrowserAndNavigate('https://news.ycombinator.com/');
    browser = result.browser;
    page = result.page;
  });

  test('should click the "More" button and navigate to the next page', async () => {
    const hasNextPage = await handlePagination(page);
    expect(hasNextPage).toBe(true); // Ensure pagination occurred
  });

  test.afterEach(async () => {
    await closeResources(null, browser);
  });
});

// Test the extractTimestamps function
test.describe('Timestamp Extraction', () => {
  let browser, page;

  test.beforeEach(async () => {
    const result = await setupBrowserAndNavigate('https://news.ycombinator.com/');
    browser = result.browser;
    page = result.page;
  });

  test('should extract timestamps from the articles', async () => {
    const timestamps = await extractTimestamps(page);
    expect(Array.isArray(timestamps)).toBe(true);
    expect(timestamps.length).toBeGreaterThan(0);
  });

  test.afterEach(async () => {
    await closeResources(null, browser);
  });
});

// Test the isSorted function
test.describe('Sorting Validation', () => {
  test('should return true if the articles are sorted in descending order', () => {
    const dates = [
      new Date('2024-01-01').getTime(),
      new Date('2023-12-31').getTime(),
      new Date('2023-12-30').getTime(),
    ];
    const result = isSorted(dates);
    expect(result).toBe('True: Articles are arranged from newest to oldest.');
  });

  test('should return false if the articles are not sorted in descending order', () => {
    const dates = [
      new Date('2023-12-30').getTime(),
      new Date('2023-12-31').getTime(),
      new Date('2024-01-01').getTime(),
    ];
    const result = isSorted(dates);
    expect(result).toBe('False: Articles are NOT arranged from newest to latest.');
  });
});
