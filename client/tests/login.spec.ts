import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('Login Page Tests', () => {
    test('Login Page Loads Correctly', async ({ page }) => {
        await page.goto('/login');
        await expect(page).toHaveTitle(/E-Commerce App/i);
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });
});
