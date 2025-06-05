import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('Home Page Tests', () => {
    test('Home Page Redirects to Login Page', async ({ page }, testInfo ) => {
        await page.goto('/');
        await expect(page).toHaveURL('/login');
    });
});
