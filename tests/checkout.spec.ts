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
  const promoPopup = page.getByRole('button', { name: 'Yes' });

  if (await promoPopup.isVisible().catch(() => false)) {
    await promoPopup.click();
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