import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('vselva');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('vselva@gmail.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Welcome to Dashboard Page!').click();
  await page.locator('div').filter({ hasText: /^Products$/ }).click();
  await page.locator('div').filter({ hasText: /^Orders$/ }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.getByRole('link', { name: 'Orders' }).click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
});