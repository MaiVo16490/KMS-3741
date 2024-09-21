import { Page } from "@playwright/test";
import { ElementManager } from "../core/elementManager";

export class CheckoutInfoPage {
    private page: Page;
    private txtFirstName: ElementManager;
    private txtLastName: ElementManager;
    private txtZipCode: ElementManager;
    private btnContinue: ElementManager;

    public constructor(page: Page) {
        this.page = page;
        this.txtFirstName = new ElementManager(this.page, "#first-name");
        this.txtLastName = new ElementManager(this.page, "#last-name");
        this.txtZipCode = new ElementManager(this.page, "#postal-code");
        this.btnContinue = new ElementManager(this.page, "#continue");
    }

    public async enterCheckoutInfoThenClickContinueButton(firstName: string, lastName: string, zipCode: string) {
        await this.txtFirstName.enterText(firstName);
        await this.txtLastName.enterText(lastName);
        await this.txtZipCode.enterText(zipCode);
        await this.btnContinue.click();
    }
}