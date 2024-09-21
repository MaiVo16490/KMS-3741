import { Page } from "@playwright/test";
import { ElementManager } from "../core/elementManager";

export class LoginPage {
    private page: Page;
    private txtUsername;
    private txtPassword;
    private btnLogin;

    public constructor(page: Page) {
        this.page = page;
        this.txtUsername = new ElementManager(page, "#user-name");
        this.txtPassword = new ElementManager(page, "#password");
        this.btnLogin = new ElementManager(page, "#login-button");
    }
    public async login(username: string, password: string): Promise<void> {
        await this.txtUsername.enterText(username);
        await this.txtPassword.enterText(password);
        await this.btnLogin.click();
    }
}