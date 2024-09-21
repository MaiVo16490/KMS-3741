import { Page } from "@playwright/test";
import { ElementManager } from "../core/elementManager";

export class CheckoutCompletePage {
    private page: Page;
    private txaThankyou: ElementManager;

    public constructor(page: Page) {
        this.page = page;
        this.txaThankyou = new ElementManager(this.page, "//h2[@data-test='complete-header']");
    }

    public async verifyThankyou(): Promise<void> {
        await this.txaThankyou.verifyText("Thank you for your order!");
    }
}