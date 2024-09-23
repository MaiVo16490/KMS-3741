import { test } from "../../core/fixture";
import fs from 'fs';

const configRawData = fs.readFileSync("test_data/configuration.json", "utf-8");
const config = JSON.parse(configRawData);

test.beforeEach(async ({ page }) => {
    await page.goto(config.homePage);
});

export { test };