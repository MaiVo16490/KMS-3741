import { expect, Page } from "@playwright/test";

export class ElementManager {
    private page: Page;
    private locator: string;

    public constructor(page: Page, locator: string) {
        this.page = page;
        this.locator = locator;
    }

    public async click(): Promise<void> {
        await this.page.locator(this.locator).click();
    }

    public async enterText(text: string): Promise<void> {
        await this.page.locator(this.locator).fill(text);
    }

    public async isDisplayed(): Promise<void> {
        var locator = this.page.locator(this.locator);
        await expect(locator).toBeVisible();
    }

    public async isSelected(): Promise<boolean> {
        return await this.page.locator(this.locator).isChecked();
    }

    public async getText(): Promise<string> {
        var locator = await this.page.locator(this.locator)
        var text = await locator.innerText();
        return text.trim();
    }

    public async verifyText(expectedText: string): Promise<void> {
        var locator = this.page.locator(this.locator);
        await expect(locator).toHaveText(expectedText);
    }

    public async getElements(): Promise<ElementManager[]> {
        const elementHandles = await this.page.locator(this.locator).elementHandles();
        return elementHandles.map(elementHandle => new ElementManager(this.page, this.locator));
    }
}