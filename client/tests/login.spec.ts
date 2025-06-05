import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

test.describe('Login Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

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

    test('Login Form Submission', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('vselva@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('Admin@123');
        await page.getByTestId('rememberMe').check();
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL('/dashboard');
    });

    test('Login Form Submission with Invalid Credentials', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('vselva@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('1234');
        await page.getByTestId('rememberMe').check();
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByText('Invalid Credentials').click({
            button: 'right'
        });
    });

    test('Login Form Submission with Empty Fields', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByText('User not found').click();
    });
});
