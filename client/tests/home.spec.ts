import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { describe } from 'node:test';

dotenv.config();
const baseURL = process.env.VITE_BASE_URL || 'http://localhost:5173';

describe('Home Page Tests', () => {
    test('Home Page Redirects to Login Page', async ({ page }) => {
        await page.goto(baseURL);
        const expectedLoginUrl = new URL('/login', baseURL).toString();
        await expect(page).toHaveURL(expectedLoginUrl);
    });
})

