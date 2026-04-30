import { test, expect } from '@playwright/test';

test('digicann', async ({ page }) => {
  await page.goto('https://digicann.chromane.com/app/auth_tester');
  await page.waitForTimeout(1000);

  //sign in as tester

  await page.getByText('Sign in as Tester').click();
  await page.waitForTimeout(1000);
  await page.locator('input[data-qa="email"]').fill('tester@chromane.com');
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

//Analytics

await page.locator('a[href="/app/analytics"]').click();
await page.waitForTimeout(1000);
await expect(page.getByRole('heading', { name: 'Analytics' })).toBeVisible();

await expect(page.locator('.button-simple:has-text("All Teams")')).toBeVisible();
await expect(page.locator('.button-simple:has-text("Team Leamington")')).toBeVisible();
await expect(page.locator('.button-simple:has-text(" Team Manchester ")')).toBeVisible();
await expect(page.locator('.button-simple:has-text(" Last 30 days ")')).toBeVisible();
await expect(page.locator('.button-simple:has-text(" Last 7 days ")')).toBeVisible();
await expect(page.locator('.button-simple:has-text(" Last week ")')).toBeVisible();
await expect(page.locator('.button-simple:has-text(" This week ")')).toBeVisible();
await expect(page.locator('.button-simple:has-text(" Yesterday ")')).toBeVisible();

//last week


await page.locator('.button-simple:has-text(" Last week ")').click();
await expect(page.locator('.stats-users-table .row-main')).toBeVisible();
await expect(page.getByText('Email', { exact: true })).toBeVisible();
await expect(page.getByText('LinkedIn messages sent in client mode')).toBeVisible();
await expect(page.getByText('LinkedIn messages sent in candidate mode')).toBeVisible();
await expect(page.getByText('Emails scheduled')).toBeVisible();
await expect(page.getByText('Emails sent')).toBeVisible();

await expect(page.getByText('Daily stats')).toBeVisible();
await expect(page.getByText('User stats')).toBeVisible();

//Work with Canva

const canvaFirst = page.locator('[data-chart_id="daily_stats"]');
await canvaFirst.scrollIntoViewIfNeeded();

await expect(canvaFirst).toBeVisible();

const isCanvasEmpty = await page.evaluate(() => {
  const canvas = document.querySelector('canvas');
  if (!canvas) return true;

  const ctx = canvas.getContext('2d');
  if (!ctx) return true;

  const pixel = ctx.getImageData(0, 0, 1, 1).data;
  return pixel.every(value => value === 0);
});

await page.waitForTimeout(3000);


});

test('Browser', async ({ page }) => {
  await page.goto('https://digicann.chromane.com/app/auth_tester');
  await page.waitForTimeout(1000);

  //sign in as tester

  await page.getByText('Sign in as Tester').click();
  await page.waitForTimeout(1000);
  await page.locator('input[data-qa="email"]').fill('tester_two@chromane.com');
  await page.locator('input[data-qa="code"]').fill('NCEIQP5839XBVDJWIUE129404VNCM21');
  await page.getByText('Save').click();
  await page.waitForTimeout(1000);

  //assert login was successful
  await expect(page.locator('.page .section .title')).toHaveText('My Account');
  await expect(page.locator('.page .section .text')).toHaveText('In this section you can see information about your account and your usage statistics.');
  await expect(page.locator('.name-value-cont')).toBeVisible();

  await expect(page.locator('.name-value .name').nth(0)).toHaveText('Email: ');
  await expect(page.locator('.name-value .value').nth(0)).toHaveText('tester_two@chromane.com');

  await expect(page.locator('.name-value .name').nth(1)).toHaveText('Roles: ');
  await expect(page.locator('.name-value .value').nth(1)).toHaveText('user, admin, tester');

  await page.locator('a[href="/app/browser"]').click();
    await page.waitForTimeout(3000);

    const frame = page.frameLocator('.tab-sidepanel iframe');

  await frame.getByText('Sign in as Tester').click();
  await page.waitForTimeout(1000);
  await frame.locator('input[data-qa="email"]').fill('tester_two@chromane.com');
  await frame.locator('input[data-qa="code"]').fill('NCEIQP5839XBVDJWIUE129404VNCM21');
  await frame.getByText('Save').click();


  const frameTabProfile = page.frameLocator('.tab-page iframe');

  await expect(frameTabProfile.getByText('Vlas Bashynskyi')).toBeVisible();
  await frameTabProfile.getByText('Annika Grüner').click();

  await frame.locator('.icon.menu').click();
  await frame.getByText('Message sequences', { exact: true }).click();

  await expect(frame.getByText('Mark contact as messaged', { exact: true })).toBeVisible();
  await frame.getByText('Mark contact as messaged', { exact: true }).click();

  await frame.locator('.icon.menu').click();

  //log in as another user
  await frame.getByText('Log out', { exact: true }).click();

  await frame.getByText('Sign in as Tester').click();
  await page.waitForTimeout(1000);
  await frame.locator('input[data-qa="email"]').fill('tester@chromane.com');
  await frame.locator('input[data-qa="code"]').fill('NCEIQP5839XBVDJWIUE129404VNCM21');
  await frame.getByText('Save').click();

   await frameTabProfile.getByText('Annika Grüner').click();

  await frame.locator('.icon.menu').click();
  await frame.getByText('Message sequences', { exact: true }).click();

  await expect(frame.getByText('Messaged by tester_two@chromane.com')).toBeVisible();
  await page.waitForTimeout(4000);


  
});
