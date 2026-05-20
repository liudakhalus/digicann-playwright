import { test, expect } from '@playwright/test';
import { waitForDebugger } from 'node:inspector';
import { text } from 'node:stream/consumers';



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
const successMessage = page.getByRole('heading', { name: 'Search Results:' });
await successMessage.waitFor({ state: 'visible' });
// await expect(page.getByRole('heading', { name: 'Search Results:' })).toBeVisible();

await expect(page.getByAltText('Profile Image')).toHaveCount(5);

//Select option 10
await page.getByPlaceholder('Select option').click();
await page.getByText('10', { exact: true }).click();
await expect(page.getByPlaceholder('Search for candidates...')).toBeVisible();
await page.getByPlaceholder('Search for candidates...').fill('Spain');
await searchButton.click();
await successMessage.waitFor({ state: 'visible' });

await expect(page.getByAltText('Profile Image')).toHaveCount(10);

//Select option 50
await page.getByPlaceholder('Select option').click();
await page.getByText('50', { exact: true }).click();
await expect(page.getByPlaceholder('Search for candidates...')).toBeVisible();
await page.getByPlaceholder('Search for candidates...').fill('Spain');
await searchButton.click();

await successMessage.waitFor({ state: 'visible' });
  await page.waitForTimeout(5000);

await expect(page.getByAltText('Profile Image')).toHaveCount(50);

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


  //Companies tab
  await page.locator('a[href="/app/intel"]').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: 'Companies' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'What companies are you looking for?' })).toBeVisible();
await expect(page.getByText('Search for companies that tend to hire candidates with specific skills in specific locations and get perfect matches for your needs. For example: "Company in Stockholm that hires in SAP Payroll and SAP HR", "Company in Berlin that hires in Oracle BI and Oracle HRMS", "SAP HCM Madrid"')).toBeVisible();

await expect(page.locator('[data-qa="number_of_results"]')).toHaveText('Number of results');
await expect(page.getByPlaceholder('Select option')).toBeVisible();

await page.getByPlaceholder('Select option').click();

await page.getByText('5', { exact: true }).click();


//Assert search for companies
await expect(page.getByPlaceholder('Search for companies...')).toBeVisible();
await page.getByPlaceholder('Search for companies...').fill('Amazon');

await expect(searchButton).toHaveText('Search');
await searchButton.click();
// const successMessage = page.getByText('Search Results:');
await successMessage.waitFor({ state: 'visible' });

// await expect(page.getByRole('heading', { name: 'Search Results:' })).toBeVisible();

await expect(page.getByText('Profile')).toHaveCount(5);

//Select option 10
await page.getByPlaceholder('Select option').click();
await page.getByText('10', { exact: true }).click();
await expect(page.getByPlaceholder('Search for companies...')).toBeVisible();
await page.getByPlaceholder('Search for companies...').fill('Amazon');
await searchButton.click();
await successMessage.waitFor({ state: 'visible' });

// await expect(page.getByRole('heading', { name: 'Search Results:' })).toBeVisible();

await expect(page.getByText('Profile')).toHaveCount(10);

//Select option 50
await page.getByPlaceholder('Select option').click();
await page.getByText('50', { exact: true }).click();
await expect(page.getByPlaceholder('Search for companies...')).toBeVisible();
await page.getByPlaceholder('Search for companies...').fill('Amazon');
await searchButton.click();
await successMessage.waitFor({ state: 'visible' });
await expect(page.getByText('Profile')).toHaveCount(50);
  await page.waitForTimeout(3000);

//Client funnel

await page.locator('a[href="/app/clients"]').click();
await page.waitForTimeout(1000);

await expect(page.locator('.title')).toHaveText('Client outreach intel');
await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
await expect(page.getByRole('button', { name: 'New Item' })).toBeVisible();

await expect(page.getByText('linkedin_id')).toBeVisible();
await expect(page.getByText('country')).toBeVisible();
await expect(page.getByText('status')).toBeVisible();
await expect(page.getByText('messages')).toBeVisible();


//Email tab

await page.locator('a[href="/app/emails"]').click();
await page.waitForTimeout(1000);

await expect(page.locator('.title')).toHaveText('Emails');

//Users Tab

await page.locator('a[href="/app/users"]').click();
await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();

await expect(page.locator('.name-value .name').nth(0)).toHaveText('_id:');
await expect(page.locator('.name-value .value').nth(0)).toHaveText('69775300987d00cebd67f028');

await expect(page.locator('.name-value .name').nth(1)).toHaveText('email:');
await expect(page.locator('.name-value .value').nth(1)).toHaveText('bash.vlas@gmail.com');

await expect(page.locator('.name-value .name').nth(2)).toHaveText('name:');
await expect(page.locator('.name-value .value').nth(2)).toHaveText('Vlas Bashynskyi');

await expect(page.locator('.name-value .name').nth(3)).toHaveText('roles:');
// await expect(page.locator('.name-value .value').nth(3)).toHaveText(`user`);

await expect(page.locator('.name-value .name').nth(4)).toHaveText('tags:');
// await expect(page.locator('.name-value .value').nth(4)).toHaveText(`["unlocked","unlocked_all_features"]`);

await expect(page.locator('.name-value .name').nth(5)).toHaveText('assigned_sender_emails:');
await expect(page.locator('.name-value .value').nth(5)).toHaveText('NO_EMAILS_ASSIGNED');

await page.waitForTimeout(1000);

await expect(page.getByRole('button', { name: 'Load stats' }).nth(0)).toBeVisible();
await expect(page.getByRole('button', { name: 'Load sequence prompt' }).nth(0)).toBeVisible();
expect(page.getByRole('button', { name: 'Create campaign' }).nth(0)).toBeVisible();
await page.waitForTimeout(1000);

//Logs tab

await page.locator('a[href="/app/logs"]').click();
// await page.waitForTimeout(16000);

const verifyFirstLineInLogsTab = page.locator('.logs-item').nth(0);
await verifyFirstLineInLogsTab.waitFor({ state: 'visible' });

expect(page.getByText('generate_message_sequence').nth(0)).toBeVisible();
expect(page.locator('.tag-container .tag').nth(0)).toBeVisible();
await page.waitForTimeout(1000);

//Settings tab

await page.locator('a[href="/app/settings"]').click();
await page.waitForTimeout(1000);

 expect(page.locator('.title')).toHaveText('Extension settings');

 //Testing Tab

await page.locator('a[href="/app/testing"]').click();
await page.waitForURL('https://digicann.chromane.com/app/testing');

await page.waitForTimeout(1000);

//Side panel

await page.locator('a[href="/app/sidepanel"]').click();
await page.waitForTimeout(1000);
await page.waitForURL('https://digicann.chromane.com/app/sidepanel');

expect(page.getByRole('button', { name: 'Test 1' })).toBeVisible();
expect(page.getByRole('button', { name: 'Test 2' })).toBeVisible();
expect(page.getByRole('button', { name: 'Test 3' })).toBeVisible();
await page.waitForTimeout(1000);


//My prompts
await page.locator('a[href="/app/table_my_prompts"]').click();
await page.waitForTimeout(1000);
await page.waitForURL('https://digicann.chromane.com/app/table_my_prompts');
await page.waitForTimeout(1000);

expect(page.locator('.title')).toContainText('My prompts');

expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
expect(page.getByRole('button', { name: 'New Item' })).toBeVisible();

expect(page.getByText('Name')).toBeVisible();
expect(page.getByText('Description')).toBeVisible();
expect(page.getByText('Prompt text')).toBeVisible();

//Admin prompts

await page.locator('a[href="/app/table_admin_prompts"]').click();
await page.waitForTimeout(1000);
await page.waitForURL('https://digicann.chromane.com/app/table_admin_prompts');
await page.waitForTimeout(1000);

expect(page.locator('.title')).toHaveText('Prompts');

expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
expect(page.getByRole('button', { name: 'New Item' })).toBeVisible();

expect(page.getByText('Name')).toBeVisible();
expect(page.getByText('User email')).toBeVisible();
expect(page.getByText('Description')).toBeVisible();
expect(page.getByText('Prompt text')).toBeVisible();
await page.waitForTimeout(1000);

//Edit button

const firstRow = page.locator('.row').nth(1);
// await firstRow.scrollIntoViewIfNeeded();

const box = await firstRow.boundingBox();

if (box) {
  await page.mouse.move(
    box.x + 10,
    box.y + box.height / 2
  );
}
await page.locator('.row-action-items #mdi-pencil').nth(0).click();
await page.waitForTimeout(1000);

expect(page.getByRole('heading', { name: 'Edit item' })).toBeVisible();
expect(page.locator('#mdi-close')).toBeVisible();

expect(page.getByRole('textbox', { name: 'Description' })).toBeVisible();
expect(page.locator('textarea[data-qa="description"]')).toBeVisible();

expect(page.getByRole('textbox', { name: 'Prompt text' })).toBeVisible();
expect(page.locator('textarea[data-qa="prompt_text"]')).toBeVisible();

expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

await page.locator('#mdi-close').click();

//Delete button

if(box) {
  await page.mouse.move(
    box.x + 10,
    box.y + box.height / 2
  );
}

await page.locator('.row-action-items #mdi-delete').nth(0).click();
await page.waitForTimeout(1000);
// await page.pause();

expect(page.locator('.page-confirm__title')).toHaveText('Deleting item');
expect(page.locator('.page-confirm__subtitle')).toHaveText('Are you sure you want to delete this row? This action cannot be undone.');

expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

await page.getByRole('button', { name: 'Cancel' }).click();

// User settings

await page.locator('a[href="/app/table_user_settings"]').click();
await page.waitForTimeout(1000);

expect(page.locator('.title')).toHaveText('User settings');

expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
expect(page.getByRole('button', { name: 'New Item' })).toBeVisible();

expect(page.getByText('User email')).toBeVisible();
expect(page.getByText('Full name')).toBeVisible();
expect(page.getByText('Team name')).toBeVisible();
expect(page.getByText('Usage mode')).toBeVisible();
expect(page.getByText('Smartlead Campaign ID')).toBeVisible();

//Log out
expect(page.locator('a[href="/app/log_out"]')).toBeVisible();

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

  await expect(frameTabProfile.getByText('Annika Grüner')).toBeVisible();
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

  expect(frame.locator('.toast')).toBeVisible();
  expect(frame.getByText('Do Not Contact')).toBeVisible();
  expect(frame.getByText('This profile has been messaged by a teammate and cannot be messaged again to avoid spamming the contact.')).toBeVisible();
  expect(frame.locator('.close #mdi-close')).toBeVisible();
  expect(frame.locator('.toast #mdi-fire-circle')).toBeVisible();

    expect(frame.getByText('Messaged by tester_two@chromane.com')).toBeVisible();

  //Background color
  expect(frame.locator('.profile-header')).toHaveCSS('background-color', 'rgb(255, 228, 230)');

  // await page.pause()
    await page.waitForTimeout(3000);
});

test('Mode assertion', async ({ page }) => {
  await page.goto('https://digicann.chromane.com/app/auth_tester');
  await page.waitForTimeout(1000);  await page.goto('https://digicann.chromane.com/app/auth_tester');
  await page.waitForTimeout(1000);

  //sign in as tester

  await page.getByText('Sign in as Tester').click();
  await page.waitForTimeout(1000);
  await page.locator('input[data-qa="email"]').fill('tester_two@chromane.com');
  await page.locator('input[data-qa="code"]').fill('NCEIQP5839XBVDJWIUE129404VNCM21');
  await page.getByText('Save').click();
  await page.waitForTimeout(1000);

   await page.locator('a[href="/app/browser"]').click();
    await page.waitForTimeout(3000);

    const frame = page.frameLocator('.tab-sidepanel iframe');

  await frame.getByText('Sign in as Tester').click();
  await page.waitForTimeout(1000);
  await frame.locator('input[data-qa="email"]').fill('tester_two@chromane.com');
  await frame.locator('input[data-qa="code"]').fill('NCEIQP5839XBVDJWIUE129404VNCM21');
  await frame.getByText('Save').click();


const frameTabProfile = page.frameLocator('.tab-page iframe');

  await expect(frameTabProfile.getByText('Annika Grüner')).toBeVisible();
  await frameTabProfile.getByText('Annika Grüner').click();
   await frame.locator('.icon.menu').click();
  await frame.getByText('Message sequences', { exact: true }).click();

const clientBtn = frame.getByText("Set mode 'Candidate'");
const candidateBtn = frame.getByText("Set mode 'Client'");

const clientMode = frame.getByText('Current mode: Client');
const candidateMode = frame.getByText('Current mode: Candidate');

const clientIcon = frame.locator('#mdi-bank');
const candidateIcon = frame.locator('#mdi-contacts');

const clientMessages = frame.getByText(/Messages sent today in Client mode/i);
const candidateMessages = frame.getByText(/Messages sent today in Candidate mode/i);


const isClient = await clientMode.isVisible().catch(() => false);
const isCandidate = await candidateMode.isVisible().catch(() => false);

if (isClient) {

  await expect(clientMode).toBeVisible();
  await expect(clientIcon).toBeVisible();
  await expect(clientMessages).toBeVisible();

  await clientBtn.waitFor();
  await clientBtn.click();

  await expect(candidateMode).toBeVisible();
  await expect(candidateIcon).toBeVisible();
}


if (isCandidate) {

  await expect(candidateMode).toBeVisible();
  await expect(candidateIcon).toBeVisible();
  await expect(candidateMessages).toBeVisible();

  await candidateBtn.waitFor();
  await candidateBtn.click();

  await expect(clientMode).toBeVisible();
  await expect(clientIcon).toBeVisible();
}

  await page.waitForTimeout(3000);


});

test('browser assertions', async ({ page }) => {
 await page.goto('https://digicann.chromane.com/app/auth_tester');
  await page.waitForTimeout(1000);

  //sign in as tester

  await page.getByText('Sign in as Tester').click();
  await page.waitForTimeout(1000);
  await page.locator('input[data-qa="email"]').fill('tester_two@chromane.com');
  await page.locator('input[data-qa="code"]').fill('NCEIQP5839XBVDJWIUE129404VNCM21');
  await page.getByText('Save').click();
  await page.waitForTimeout(1000);

  await page.locator('a[href="/app/browser"]').click();
    await page.waitForTimeout(3000);

    const frame = page.frameLocator('.tab-sidepanel iframe');

  await frame.getByText('Sign in as Tester').click();
  await page.waitForTimeout(1000);
  await frame.locator('input[data-qa="email"]').fill('tester_two@chromane.com');
  await frame.locator('input[data-qa="code"]').fill('NCEIQP5839XBVDJWIUE129404VNCM21');
  await frame.getByText('Save').click();


const frameTabProfile = page.frameLocator('.tab-page iframe');

  await expect(frameTabProfile.getByText('Annika Grüner')).toBeVisible();
  await frameTabProfile.getByText('Annika Grüner').click();
// My account

expect(frame.getByText('My Account', { exact: true })).toBeVisible();
expect(frame.getByText('In this section you can see information about your account and your usage statistics.')).toBeVisible();

 await expect(frame.locator('.name-value-cont')).toBeVisible();

  await expect(frame.locator('.name-value .name').nth(0)).toHaveText('Email: ');
  // await expect(page.locator('.name-value .value').nth(0)).toHaveText('tester@chromane.com');

   await expect(frame.locator('.name-value .name').nth(1)).toHaveText('Unlocked: ');
  await expect(frame.locator('.name-value .value').nth(1)).toHaveText('true');

  await expect(frame.locator('.name-value .name').nth(2)).toHaveText('Roles: ');
  await expect(frame.locator('.name-value .value').nth(2)).toHaveText('user, admin, tester');

  await expect(frame.locator('.name-value .name').nth(3)).toHaveText('Tags: ');
  await expect(frame.locator('.name-value .value').nth(3)).toHaveText('unlocked, unlocked_all_features, tester');

  expect(frame.getByText('Delete Account', { exact: true })).toBeVisible();
  expect(frame.getByText('Use this section to delete your account and all information, associated with it from our servers.', { exact: true })).toBeVisible();
  expect(frame.getByRole('button', { name: 'Delete account' })).toBeVisible();

  //Main page
    await frame.locator('.icon.menu').click();

  await frame.locator('#mdi-home').click();

  expect(frame.locator('.headline')).toHaveText('Mock Sidepanel');
  expect(frame.locator('.body')).toHaveText('Mock Sidepanel');
  expect(frame.getByRole('button', { name: 'Sign in as Tester'})).toBeVisible();

      await page.waitForTimeout(3000);


  //Email finder

  await frame.locator('.icon.menu').click();

  await frame.locator('#mdi-at').click();
    expect(frame.locator('.headline')).toHaveText('Email Finder');
  expect(frame.locator('.body')).toHaveText("Navigate to a profile page in LinkedIn Recruiter, click on 'Add email' and the extension will automatically find and fill in the email address if possible.");
      await page.waitForTimeout(3000);
      //Message sequences
  await frame.locator('.icon.menu').click();

  await frame.locator('#mdi-message-text-clock').click();

  expect(frame.getByText('Current mode:')).toBeVisible();
  expect(frame.locator('#mdi-bank')).toBeVisible();
  expect(frame.getByText('Client', { exact: true })).toBeVisible();
  expect(frame.locator('.micro-button')).toHaveText("Set mode 'Candidate'");
  expect(frame.locator('.profile-header')).toBeVisible();
    await page.waitForTimeout(3000);


//buttons
expect(frame.getByRole('button', { name: 'Reload profile data' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Generate sequence' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Reveal verifiend email and Start Email Campaign' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Mark contact as messaged' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Mark contact as replied' })).toBeVisible();
expect(frame.getByRole('button', { name: 'DND (Do Not Contact)' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Clear profile' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Mark profile as messaged by Vlas 89 days ago' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Mark profile as messaged by Vlas 91 days ago' })).toBeVisible();
//Employees
await expect(frame.getByText('Employees of')).toBeVisible();
await expect(frame.getByAltText('Profile Image').nth(1)).toBeVisible();
//Message sequence settings

await frame.locator('.icon.menu').click();
await frame.locator('#mdi-message-cog').click();
await page.waitForTimeout(1000);

// expect(frame.getByTitle('Message sequence settings')).toBeVisible();
expect(frame.getByText(' Please provide a prompt for generating a message sequence below. Also please provide an example of a sequence of messages that will be used for training the model. ')).toBeVisible();
expect(frame.getByRole('button', { name: 'Save' }).nth(0)).toBeVisible();
expect(frame.locator('.current-user-contacts textarea')).toBeVisible();

expect(frame.getByRole('button', { name: 'Example sequence 1' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Example sequence 2' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Test sequence generation' })).toBeVisible();

expect(frame.getByText('Example profile summary:', { exact: true }).nth(0)).toBeVisible();
expect(frame.locator('textarea.textarea-profile-summary').nth(0)).toBeVisible();

expect(frame.getByText('Example message sequence:', { exact: true }).nth(0)).toBeVisible();
expect(frame.getByText('# Day 0 - LinkedIn Inmail 1', {exact: true}).nth(0)).toBeVisible();

// Buttons Variation 

expect(frame.getByRole('button', { name: 'Variation A' }).nth(0)).toBeVisible();
expect(frame.getByRole('button', { name: 'Variation B' }).nth(0)).toBeVisible();
expect(frame.getByRole('button', { name: 'Variation C' }).nth(0)).toBeVisible();
expect(frame.getByRole('button', { name: 'Variation D' }).nth(0)).toBeVisible();

//Example message sequence:
expect(frame.getByText('Subject:', { exact: true }).nth(0)).toBeVisible();
expect(frame.locator('.variation textarea').nth(0)).toBeVisible();
expect(frame.getByText('Body:', { exact: true }).nth(0)).toBeVisible();
expect(frame.locator('.variation textarea').nth(1)).toBeVisible();

expect(frame.getByRole('button', { name: 'Save' }).nth(1)).toBeVisible();

//Follow-up list 
await frame.locator('.icon.menu').click();
await frame.locator('#mdi-format-list-bulleted').click();
expect(frame.getByText('Your follow-up list', {exact: true})).toBeVisible();
expect(frame.getByText('Follow-up list for user')).toBeVisible();

expect(frame.getByRole('button', { name: 'Refresh' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Clear all follow-up messages' })).toBeVisible();

//Settings
await frame.locator('.icon.menu').click();
await frame.locator('#mdi-cog').click();
expect(frame.getByText('Settings').nth(0)).toBeVisible();
expect(frame.getByText('On this page you can update default settings and customize the extension to your needs.')).toBeVisible();
expect(frame.getByText('Mode selector', { exact: true })).toBeVisible();  
expect(frame.getByText('Please choose how you intend to use the application to get started. You can always change this later in the settings.')).toBeVisible();

expect(frame.getByRole('heading', { name: 'Candidate mode' })).toBeVisible();
expect(frame.getByText('Use the app to find candidates and manage your candidate interactions.')).toBeVisible();
expect(frame.getByRole('heading', { name: 'Client mode' })).toBeVisible();
expect(frame.getByText('Use the app to generate outreach messages and manage client interactions.')).toBeVisible();

expect(frame.getByText('Team selector', { exact: true })).toBeVisible();  
expect(frame.getByText('Please choose your team to get started. You can always change this later in the settings.')).toBeVisible();
expect(frame.getByRole('heading', { name: 'Leamington' })).toBeVisible();
expect(frame.getByText('Leamington.', { exact: true })).toBeVisible();
expect(frame.getByRole('heading', { name: 'Manchester' })).toBeVisible();
expect(frame.getByText('Manchester.', { exact: true })).toBeVisible();
//Message generator (old) and Testing

await frame.locator('.icon.menu').click();
await frame.locator('#mdi-script-text').click();
await frame.locator('.icon.menu').click();
await frame.locator('#mdi-flask-outline').click();

expect(frame.getByRole('button', { name: 'download_page_html' })).toBeVisible();

//Admin prompts

await frame.locator('.icon.menu').click();
await frame.getByText('Admin prompts').click();

expect(frame.getByText('Prompts', { exact: true })).toBeVisible();
await frame.locator('#mdi-information-outline').nth(0).hover()
expect(frame.getByText('List of prompts.')).toBeVisible();
expect(frame.getByRole('button', { name: 'Refresh' })).toBeVisible();
expect(frame.getByRole('button', { name: 'New Item' })).toBeVisible();

expect(frame.getByText('Name')).toBeVisible();
expect(frame.getByText('User email')).toBeVisible();
expect(frame.getByText('Description')).toBeVisible();
expect(frame.getByText('Prompt text')).toBeVisible();
await page.waitForTimeout(1000);

//Edit button

const firstRow = frame.locator('.row').nth(1);
// await firstRow.scrollIntoViewIfNeeded();

const box = await firstRow.boundingBox();

if (box) {
  await page.mouse.move(
    box.x + 10,
    box.y + box.height / 2
  );
}
await frame.locator('.row-action-items #mdi-pencil').nth(0).click();
await page.waitForTimeout(1000);

expect(frame.getByRole('heading', { name: 'Edit item' })).toBeVisible();
expect(frame.locator('#mdi-close')).toBeVisible();
expect(frame.getByRole('textbox', { name: 'Description' })).toBeVisible();
expect(frame.locator('textarea[data-qa="description"]')).toBeVisible();
expect(frame.getByRole('textbox', { name: 'Prompt text' })).toBeVisible();
expect(frame.locator('textarea[data-qa="prompt_text"]')).toBeVisible();
expect(frame.getByRole('button', { name: 'Save' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Cancel' })).toBeVisible();

await frame.locator('#mdi-close').click();

//Delete button

if(box) {
  await page.mouse.move(
    box.x + 10,
    box.y + box.height / 2
  );
}

await frame.locator('.row-action-items #mdi-delete').nth(0).click();
await page.waitForTimeout(1000);
// await page.pause();

expect(frame.locator('.page-confirm__title')).toHaveText('Deleting item');
expect(frame.locator('.page-confirm__subtitle')).toHaveText('Are you sure you want to delete this row? This action cannot be undone.');
expect(frame.getByRole('button', { name: 'Delete' })).toBeVisible();
expect(frame.getByRole('button', { name: 'Cancel' })).toBeVisible();

await frame.getByRole('button', { name: 'Cancel' }).click();

//My prompts

await frame.locator('.icon.menu').click();
await frame.getByText('My prompts').click();

expect(frame.getByText('My prompts', { exact: true }).nth(0)).toBeVisible();
await frame.locator('#mdi-information-outline').nth(0).hover()
expect(frame.getByText('List of your personal prompts')).toBeVisible();

expect(frame.getByRole('button', { name: 'Refresh' })).toBeVisible();
expect(frame.getByRole('button', { name: 'New Item' })).toBeVisible();

expect(frame.getByText('Name')).toBeVisible();
expect(frame.getByText('Description')).toBeVisible();
expect(frame.getByText('Prompt text')).toBeVisible();


//Log out
await frame.locator('.icon.menu').click();
expect(frame.locator('#mdi-logout-variant')).toBeVisible();
await page.waitForTimeout(3000);


});

test('for tests ', async ({ page }) => {
await page.goto('https://digicann.chromane.com/app/auth_tester');
  await page.waitForTimeout(1000);

  //sign in as tester

  await page.getByText('Sign in as Tester').click();
  await page.waitForTimeout(1000);
  await page.locator('input[data-qa="email"]').fill('tester_two@chromane.com');
  await page.locator('input[data-qa="code"]').fill('NCEIQP5839XBVDJWIUE129404VNCM21');
  await page.getByText('Save').click();
  await page.waitForTimeout(1000);

  await page.locator('a[href="/app/browser"]').click();
    await page.waitForTimeout(3000);

    const frame = page.frameLocator('.tab-sidepanel iframe');

  await frame.getByText('Sign in as Tester').click();
  await page.waitForTimeout(1000);
  await frame.locator('input[data-qa="email"]').fill('tester_two@chromane.com');
  await frame.locator('input[data-qa="code"]').fill('NCEIQP5839XBVDJWIUE129404VNCM21');
  await frame.getByText('Save').click();


const frameTabProfile = page.frameLocator('.tab-page iframe');

  await expect(frameTabProfile.getByText('Annika Grüner')).toBeVisible();
  await frameTabProfile.getByText('Annika Grüner').click();
  await frame.locator('.icon.menu').click();
  await frame.getByText('Message sequences', { exact: true }).click();

const clientBtn = frame.getByText("Set mode 'Candidate'");
const candidateBtn = frame.getByText("Set mode 'Client'");

const clientMode = frame.getByText('Current mode: Client');
const candidateMode = frame.getByText('Current mode: Candidate');

const clientIcon = frame.locator('#mdi-bank');
const candidateIcon = frame.locator('#mdi-contacts');

const clientMessages = frame.getByText(/Messages sent today in Client mode/i);
const candidateMessages = frame.getByText(/Messages sent today in Candidate mode/i);


const isClient = await clientMode.isVisible().catch(() => false);
const isCandidate = await candidateMode.isVisible().catch(() => false);

if (isClient) {

  await expect(clientMode).toBeVisible();
  await expect(clientIcon).toBeVisible();
  await expect(clientMessages).toBeVisible();

  await clientBtn.waitFor();
  await clientBtn.click();

  await expect(candidateMode).toBeVisible();
  await expect(candidateIcon).toBeVisible();
}


if (isCandidate) {

  await expect(candidateMode).toBeVisible();
  await expect(candidateIcon).toBeVisible();
  await expect(candidateMessages).toBeVisible();

  await candidateBtn.waitFor();
  await candidateBtn.click();

  await expect(clientMode).toBeVisible();
  await expect(clientIcon).toBeVisible();
}

  await page.waitForTimeout(3000);


});
