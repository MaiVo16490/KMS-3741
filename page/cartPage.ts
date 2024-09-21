import { Page } from "@playwright/test";
import { ElementManager } from "../core/elementManager";

export class CartPage {
    private page: Page;
    private btnCheckout: ElementManager;
    private txaProduct(productName: string): ElementManager {
        return new ElementManager(this.page, `//div[text()='${productName}']`);
    };

    public constructor(page: Page) {
        this.page = page;
        this.btnCheckout = new ElementManager(this.page, "#checkout");
    }

    public async verifyCartThenClickCheckoutButton(productName1: string, productName2: string) {
        await this.txaProduct(productName1).isDisplayed();
        await this.txaProduct(productName2).isDisplayed();
        await this.btnCheckout.click();
    }
}