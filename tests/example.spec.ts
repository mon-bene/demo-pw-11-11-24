import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  const path = require('path');
  const filePath = `file://${path.resolve('web.html')}`;
  await page.goto(filePath);
})
test('Check that place order button is enabled when correct data is filled and pop-up message is OK', async ({ page }) => {
  const orderButton = page.getByTestId("submit-order")
  const userNameInput = page.getByTestId("username")
  const emailInput = page.getByTestId("email")
  const okPopUp = page.locator( "#popup-message")

  await expect(orderButton).toBeDisabled()
  await userNameInput.fill("testUser")
  await emailInput.fill("testUser@test.com")
  await expect(orderButton).toBeEnabled()

  await orderButton.click()
  await expect(okPopUp).toBeVisible()

});

test('When correct data is removed the button place the order is disabled', async ({ page }) => {
  const orderButton = page.getByTestId("submit-order")
  const userNameInput = page.getByTestId("username")
  const emailInput = page.getByTestId("email")
  const okPopUp = page.locator( "#popup-message")


  await userNameInput.fill("testUser")
  await emailInput.fill("testUser@test.com")
  await expect(orderButton).toBeEnabled()

  await userNameInput.fill("")
  await emailInput.fill("")
  await expect(orderButton).toBeDisabled()



});

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });
//
// test.only('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


