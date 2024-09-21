import { Page } from "@playwright/test";
import { ElementManager } from "../core/elementManager";

export class CheckoutOverviewPage {
    private page: Page;
    private tax: number;
    private btnFinish: ElementManager;
    private txaTotal: ElementManager;
    private txaItemPrice(productName: string): ElementManager {
        return new ElementManager(this.page, `//div[text()='${productName}']//parent::a//following-sibling::div[@class='item_pricebar']/div`)
    }

    public constructor(page: Page) {
        this.page = page;
        this.tax = 0.08;
        this.btnFinish = new ElementManager(this.page, "#finish");
        this.txaTotal = new ElementManager(this.page, "//div[@data-test='total-label']");
    }

    private async getTotalAmount(): Promise<number> {
        var totalString = await this.txaTotal.getText();
        var total = parseFloat((await totalString).replace(/[^\d.]/g, ''));
        return total;
    }

    private async getItemPrice(productName: string): Promise<number> {
        var priceString = await this.txaItemPrice(productName).getText();
        var price = parseFloat((await priceString).replace('$', '').trim());
        return price;
    }

    public async verifyPriceTotalThenClickFinishButton(productName1: string, productName2: string): Promise<void> {
        var itemPrice1 = await this.getItemPrice(productName1);
        var itemPrice2 = await this.getItemPrice(productName2);
        var actualTotalPrice = await this.getTotalAmount();
        var totalPrice = itemPrice1 + itemPrice2;
        var taxAmount = totalPrice * this.tax;
        var totalAmount = totalPrice + taxAmount;
        totalAmount = Math.round(totalAmount * 100) / 100;
        if (actualTotalPrice !== totalAmount) {
            throw new Error(`Expected total amount: ${totalAmount}, but got: ${actualTotalPrice}`);
        };
        await this.btnFinish.click();
    }
}