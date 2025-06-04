import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { describe } from 'node:test';

dotenv.config();
const baseURL = process.env.VITE_BASE_URL || 'http://localhost:5173';

describe('Login Page Tests', () => {
    test('Login Page Loads Correctly', async ({ page }) => {
        await page.goto(baseURL+'/login');
        await expect(page).toHaveTitle(/E-Commerce App/i);
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });
});
