import { test, expect } from '@playwright/test';

test('digicann', async ({ page }) => {
  await page.goto('https://digicann.chromane.com/app/auth_tester');
  await page.waitForTimeout(1000);

  //sign in as tester

  await page.getByText('Sign in as Tester').click();
  await page.waitForTimeout(1000);
  await page.locator('input[data-qa="code"]').fill('NCEIQP5839XBVDJWIUE129404VNCM21');
  await page.getByText('Save').click();
  await page.waitForTimeout(1000);

  //assert login was successful
  await expect(page.locator('.page .section .title')).toHaveText('My Account');
  await expect(page.locator('.page .section .text')).toHaveText('In this section you can see information about your account and your usage statistics.');
  await expect(page.locator('.name-value-cont')).toBeVisible();

  await expect(page.locator('.name-value .name').nth(0)).toHaveText('Email: ');
  await expect(page.locator('.name-value .value').nth(0)).toHaveText('tester@chromane.com');

  await expect(page.locator('.name-value .name').nth(1)).toHaveText('Roles: ');
  await expect(page.locator('.name-value .value').nth(1)).toHaveText('user, admin, tester');

  //Candidates page
await page.locator('a[href="/app/candidates"]').click();
await page.waitForTimeout(1000);
await expect(page.getByRole('heading', { name: 'Who are you looking for?' })).toBeVisible();
await expect(page.getByText('Search for candidates with specific skills in specific locations and get perfect matches for your needs. For example: "Candidate in Stockholm with experience in SAP Payroll and SAP HR", "Developer in Berlin who knows Oracle BI and Oracle HRMS",')).toBeVisible();

await expect(page.locator('[data-qa="number_of_results"]')).toHaveText('Number of results');
await expect(page.getByPlaceholder('Select option')).toBeVisible();

await page.getByPlaceholder('Select option').click();

//Select option 5
await page.getByText('5', { exact: true }).click();


//Assert search for candidates
await expect(page.getByPlaceholder('Search for candidates...')).toBeVisible();
await page.getByPlaceholder('Search for candidates...').fill('Spain');

const searchButton = page.locator('.button-text');
await expect(searchButton).toHaveText('Search');
await searchButton.click();
await page.waitForTimeout(6000);

await expect(page.getByRole('heading', { name: 'Search Results:' })).toBeVisible();

await expect(page.getByAltText('Profile Image')).toHaveCount(5);

//Select option 10
await page.getByPlaceholder('Select option').click();
await page.getByText('10', { exact: true }).click();
await expect(page.getByPlaceholder('Search for candidates...')).toBeVisible();
await page.getByPlaceholder('Search for candidates...').fill('Spain');
await searchButton.click();
await expect(page.getByRole('heading', { name: 'Search Results:' })).toBeVisible();

await expect(page.getByAltText('Profile Image')).toHaveCount(10);

//Select option 50
await page.getByPlaceholder('Select option').click();
await page.getByText('50', { exact: true }).click();
await expect(page.getByPlaceholder('Search for candidates...')).toBeVisible();
await page.getByPlaceholder('Search for candidates...').fill('Spain');
await searchButton.click();
await page.waitForTimeout(6000);

await expect(page.getByRole('heading', { name: 'Search Results:' })).toBeVisible();

await expect(page.getByAltText('Profile Image')).toHaveCount(50);
await page.waitForTimeout(6000);


});
