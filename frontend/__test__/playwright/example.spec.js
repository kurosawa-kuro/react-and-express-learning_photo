// @ts-check
import { test, expect } from '@playwright/test';

import { db } from "../../../backend/src/database/prisma/prismaClient.js";
import { setupDatabaseForOperations } from "../../../backend/src/database/databaseOperations/operations/prepareDatabase.js";

test('get register', async ({ page }) => {
  // setup database user table truncate
  await setupDatabaseForOperations();

  await page.goto('http://localhost:3000/register');
  await page.getByPlaceholder('Enter your name').click();
  await page.getByPlaceholder('Enter your name').fill('aaa');
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('aaa@aaa.aaa');
  await page.getByPlaceholder('Enter your password').click();
  await page.getByPlaceholder('Enter your password').fill('aaa');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL("http://localhost:3000");
});

test('get login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('aaa@aaa.aaa');
  await page.getByPlaceholder('Enter your password').click();
  await page.getByPlaceholder('Enter your password').fill('aaa');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL("http://localhost:3000");
});
