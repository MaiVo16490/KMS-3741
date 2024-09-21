import { test } from "../core/fixture";
import fs from 'fs';
import * as userData from "../test_data/account.json";
import * as productionName from "../test_data/productionName.json";

const accountSetRawData = fs.readFileSync("test_data/accountSet.json", "utf-8");
const configRawData = fs.readFileSync("test_data/configuration.json", "utf-8");
const productNameRawData = fs.readFileSync("test_data/productionName.json", "utf-8");
const accountSet = JSON.parse(accountSetRawData);
const config = JSON.parse(configRawData);
const productName = JSON.parse(productNameRawData);

function getUserData(Key: string) {
  return userData[Key];
}

test.beforeEach(async ({ page }) => {
  await page.goto(config.homePage);
});

// Execute asynchronously for all users' test cases.
accountSet.forEach((user) => {
  [
    {
      productionId1: "backpack",
      productionId2: "bikeLight",
      productName1: productName["backpack"],
      productName2: productName["bikeLight"],
      firstName: user.firstName,
      lastName: user.lastName,
      zipCode: user.zipCode
    }
  ].forEach(({ productionId1, productionId2, productName1, productName2, firstName, lastName, zipCode }) => {
    test(`Asynchronously - Verify e2e shopping cart with user: ${user.username}:`, async ({ LOGIN, INVENTORY, CART, CHECKOUT_INFO, CHECKOUT_OVERVIEW, CHECKOUT_COMPLETE }) => {
      
      console.log(`Step 1: Logging in with username: ${user.username}`);
      await LOGIN.login(user.username, user.password);

      console.log(`Step 2: Adding Product 1: ${productName1} to the cart`);
      console.log(`Step 3: Adding Product 2: ${productName2} to the cart`);
      await INVENTORY.addTwoProductsThenClickCartButton(productionId1, productionId2);

      console.log(`Step 4: Verified that products are added successfully`);
      console.log(`- Product 1: ${productName1}`);
      console.log(`- Product 2: ${productName2}`);
      await CART.verifyCartThenClickCheckoutButton(productName1, productName2);

      console.log(`Step 5: Entering checkout information with firstName: ${firstName}, lastName: ${lastName}, zipCode: ${zipCode}`);
      await CHECKOUT_INFO.enterCheckoutInfoThenClickContinueButton(firstName, lastName, zipCode);

      console.log(`Step 6: Verifying the total price and clicking the finish button`);
      await CHECKOUT_OVERVIEW.verifyPriceTotalThenClickFinishButton(productName1, productName2);

      console.log(`Step 7: Verifying that the order completion message is displayed`);
      await CHECKOUT_COMPLETE.verifyThankyou();

      console.log(`Test case completed successfully for user: ${user.username}`);
    });
  });
});

// Execute synchronously all users' test cases  
async function runTestCasesForAllUsers() {
  for (const user of accountSet) {
    console.log(`Starting test flow for user: ${user.username}`);
    const testCases = [
      {
        productionId1: "backpack",
        productionId2: "bikeLight",
        productName1: productName["backpack"],
        productName2: productName["bikeLight"],
        firstName: user.firstName,
        lastName: user.lastName,
        zipCode: user.zipCode,
      },
    ];
    // Run all test cases for the current user
    for (const { productionId1, productionId2, productName1, productName2, firstName, lastName, zipCode } of testCases) {
      console.log(`Executing test case for user: ${user.username}`);

      await test(`Verify e2e shopping cart with user: ${user.username}`, async ({ LOGIN, INVENTORY, CART, CHECKOUT_INFO, CHECKOUT_OVERVIEW, CHECKOUT_COMPLETE }) => {
      
      console.log(`Step 1: Logging in with username: ${user.username}`);
      await LOGIN.login(user.username, user.password);

      console.log(`Step 2: Adding Product 1: ${productName1} to the cart`);
      console.log(`Step 3: Adding Product 2: ${productName2} to the cart`);
      await INVENTORY.addTwoProductsThenClickCartButton(productionId1, productionId2);

      console.log(`Step 4: Verified that products are added successfully`);
      console.log(`- Product 1: ${productName1}`);
      console.log(`- Product 2: ${productName2}`);
      await CART.verifyCartThenClickCheckoutButton(productName1, productName2);

      console.log(`Step 5: Entering checkout information with firstName: ${firstName}, lastName: ${lastName}, zipCode: ${zipCode}`);
      await CHECKOUT_INFO.enterCheckoutInfoThenClickContinueButton(firstName, lastName, zipCode);

      console.log(`Step 6: Verifying the total price and clicking the finish button`);
      await CHECKOUT_OVERVIEW.verifyPriceTotalThenClickFinishButton(productName1, productName2);

      console.log(`Step 7: Verifying that the order completion message is displayed`);
      await CHECKOUT_COMPLETE.verifyThankyou();

      console.log(`Test case completed successfully for user: ${user.username}`);
      });
    }

    console.log(`Finished all test cases for user: ${user.username}`);
  }
}

// Execute for specific user getting from JSON
test(`Verify e2e shopping cart for specific user`, async ({ LOGIN, INVENTORY, CART, CHECKOUT_INFO, CHECKOUT_OVERVIEW, CHECKOUT_COMPLETE }) => {
  const user = getUserData('user1');
  const productionId1 = "backpack";
  const productionId2 = "bikeLight";
  const productName1 = productionName["backpack"];
  const productName2 = productionName["bikeLight"];

    console.log(`Step 1: Logging in with username: ${user.username}`);
    await LOGIN.login(user.username, user.password);

    console.log(`Step 2: Adding Product 1: ${productName1} to the cart`);
    console.log(`Step 3: Adding Product 2: ${productName2} to the cart`);
    await INVENTORY.addTwoProductsThenClickCartButton(productionId1, productionId2);

    console.log(`Step 4: Verified that products are added successfully`);
    console.log(`- Product 1: ${productName1}`);
    console.log(`- Product 2: ${productName2}`);
    await CART.verifyCartThenClickCheckoutButton(productName1, productName2);

    console.log(`Step 5: Entering checkout information with firstName: ${user.username}, lastName: ${user.lastName}, zipCode: ${user.zipCode}`);
    await CHECKOUT_INFO.enterCheckoutInfoThenClickContinueButton(user.username, user.lastName, user.zipCode);
  
    console.log(`Step 6: Verifying the total price and clicking the finish button`);
    await CHECKOUT_OVERVIEW.verifyPriceTotalThenClickFinishButton(productName1, productName2);

    console.log(`Step 7: Verifying that the order completion message is displayed`);
    await CHECKOUT_COMPLETE.verifyThankyou();

    console.log(`Test case completed successfully for user: ${user.username}`);
})

test.afterEach(async ({ page, INVENTORY }) => {
  await INVENTORY.logout();
  await page.close();
});


