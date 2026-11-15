import { test, expect } from '../fixtures/test-fixtures';
import { checkoutData } from '../test-data/checkout-data';

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