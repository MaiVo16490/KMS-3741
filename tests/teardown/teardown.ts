import { test } from "../../core/fixture";

test.afterEach(async ({ INVENTORY }) => {
    await INVENTORY.logout();
});

export { test };