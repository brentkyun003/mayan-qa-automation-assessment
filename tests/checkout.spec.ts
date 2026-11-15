import { test, expect } from '../fixtures/test-fixtures';
import { checkoutData } from '../test-data/checkout-data';

// Main checkout test
test('customer can complete a coffee purchase', async ({
  page,
  homePage,
  checkoutPage,
}) => {
  await homePage.goto();

  // Add product to cart
  await homePage.addProduct(checkoutData.product);

  // Handle promo popup if it appears
  const acceptPromo = page.getByRole('button', {
    name: 'Yes, of course!',
  });

  const skipPromo = page.getByRole('button', {
    name: "Nah, I'll skip.",
  });

  if (await acceptPromo.isVisible().catch(() => false)) {
    await acceptPromo.click();
  } else if (await skipPromo.isVisible().catch(() => false)) {
    await skipPromo.click();
  }

  // Proceed to checkout
  await homePage.checkout();

  // Fill payment details
  await checkoutPage.fillPaymentDetails(
    checkoutData.customerName,
    checkoutData.customerEmail
  );

  // Submit payment details
  await checkoutPage.submitPayment();

  // Verify successful checkout
  await expect(homePage.cartLink).toContainText('(0)');
  await expect(homePage.checkoutButton).toContainText('$0.00');
});

// Double-click translation bonus test
test('double-clicking a coffee title translates it into Chinese', async ({
  page,
  homePage,
}) => {
  await homePage.goto();

  const espressoTitle = page
    .locator('li')
    .filter({ has: page.locator('[data-test="Espresso"]') })
    .locator('h4');

  await homePage.doubleClickProductTitle('Espresso');

  // Verify that the original title has changed
  await expect(espressoTitle).not.toHaveText('Espresso');
});