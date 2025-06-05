import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('Login Page Tests', () => {
    test('Login Page Loads Correctly', async ({ page }) => {
        await page.goto('/login');
        await expect(page).toHaveTitle(/E-Commerce App/i);
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

        // form fields by textbox name
        await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
        await expect(page.getByRole('textbox', { name: /password/i })).toBeVisible();

        // form fields by placeholder name
        await expect(page.getByPlaceholder('Enter your email')).toBeVisible();
        await expect(page.getByPlaceholder('Enter your password')).toBeVisible();

        // form buttons
        await expect(page.getByRole('button', { name: /login/i })).toBeVisible();

        // register link
        await expect(page.getByRole('link', { name: 'Register', exact: true })).toBeVisible();
        await expect(page.getByRole('link', { name: "Don't have an account? Register", exact: true })).toBeVisible();

        // login link 
        await expect(page.getByRole('link', { name: /Login/i })).toHaveAttribute('href', '/login');
    });
});
