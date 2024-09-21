import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../page/loginPage";
import { InventoryPage } from "../page/inventoryPage";
import { CartPage } from "../page/cartPage";
import { CheckoutInfoPage } from "../page/checkoutInfoPage";
import { CheckoutOverviewPage } from "../page/checkoutOverviewPage";
import { CheckoutCompletePage } from "../page/checkoutCompletePage";

export const test = baseTest.extend<{
  LOGIN: LoginPage;
  INVENTORY: InventoryPage;
  CART: CartPage;
  CHECKOUT_INFO: CheckoutInfoPage;
  CHECKOUT_OVERVIEW: CheckoutOverviewPage;
  CHECKOUT_COMPLETE: CheckoutCompletePage;
}>({
  LOGIN: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  INVENTORY: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  CART: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  CHECKOUT_INFO: async ({ page }, use) => {
    const checkoutPage = new CheckoutInfoPage(page);
    await use(checkoutPage);
  },
  CHECKOUT_OVERVIEW: async ({ page }, use) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await use(checkoutOverviewPage);
  },
  CHECKOUT_COMPLETE: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  }
});