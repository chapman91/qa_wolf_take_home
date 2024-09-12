//  Import necessary modules for Playwright (or mock them)
const { chromium } = require('playwright');
const setupBrowserAndNavigate = require('../src/main');


jest.mock('playwright');

describe('setupBrowserAndNavigate', () => {
    let mockBrowser, mockContext, mockPage;

    beforeEach(() => {
        // Mock the browser, context, and page objects from Playwright
        mockPage = {
            goto: jest.fn().mockResolvedValueOnce(), // Mock the page.goto function
        };


        mockContext = {
            newPgae: jest.fn().mockResolvedValueOnce(mockPage), // Mock newPage to resolve to the mock page 
        };


        mockBrowser = {
            newContext: jestfn().mockResolvedValueOnce(mockContext), // Mocking newContext to return the mock context
            close: jest.fn(), // Mocking close() if needed
        };

        // Mocking chromium.launch to return the mock browser 
        chromium.launch = jest.fn().mockResolvedValueOnce(muchBrowser);

    });

    it('should launch the browser, navigate to the URL, and return browser and page objects', async () => {
        const url = 'httpss://example.com';

        // Call the function
        const { browser, page } = await setupBrowserAndNavigate(url);

        // Assertions 
        expect(chromium.launch).toHaveBeenCalledWith({ headless: false });
        expect(mockBrowser.newContext).toHaveBeenCalled();
        expect(mockContext.newPage).toHaveBeenCalled();
        expect(mockPage.goto).toBe(mockPage);

        expect(browser).toBe(mockBrowser);
        expect(page).toBe(mockPage);
    })
});