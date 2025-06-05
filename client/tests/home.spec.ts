import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Home Page Redirects to Login Page', async ({ page }) => {
        await expect(page).toHaveURL('/login');
    });

    test.afterEach(async ({ page }, testInfo) => {
        console.log(`Test finished: ${testInfo.title}`);
        // Optionally, you can take a screenshot after each test
        // await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    });
});
