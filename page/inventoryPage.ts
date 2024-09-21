import { Page } from "@playwright/test";
import { ElementManager } from "../core/elementManager";
import fs from "fs";

const productionRawData = fs.readFileSync("test_data/productionId.json", "utf-8");
const production = JSON.parse(productionRawData);

export class InventoryPage {
    private page: Page;
    private btnCart: ElementManager;
    private btnMenu: ElementManager;
    private btnLogout: ElementManager;
    private btnAddProduct(productName: string): ElementManager {
        return new ElementManager(this.page, production[productName]);;
    }

    public constructor(page: Page) {
        this.page = page;
        this.btnCart = new ElementManager(this.page, "//a[@data-test='shopping-cart-link']");
        this.btnMenu = new ElementManager(this.page, "#react-burger-menu-btn");
        this.btnLogout = new ElementManager(this.page, "#logout_sidebar_link");
    }

    public async addTwoProductsThenClickCartButton(productName1: string, productName2: string) {
        await this.btnAddProduct(productName1).click();
        await this.btnAddProduct(productName2).click();
        await this.btnCart.click();
    }

    public async logout(): Promise<void> {
        await this.btnMenu.click();
        await this.btnLogout.click();
    }
}