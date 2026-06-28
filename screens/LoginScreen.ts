import { BaseScreen } from './BaseScreen';

export class LoginScreen extends BaseScreen {
  private readonly usernameSelector = '~test-Username';
  private readonly passwordSelector = '~test-Password';
  private readonly loginButtonSelector = '~test-LOGIN';
  private readonly errorSelector = "//android.widget.TextView[contains(@text, 'required') or contains(@text, 'match') or contains(@text, 'locked')]";

  async login(username: string, password: string): Promise<void> {
    await this.waitForDisplayed(this.usernameSelector, 15000);
    await this.setText(this.usernameSelector, username);
    await this.setText(this.passwordSelector, password);
    await this.tap(this.loginButtonSelector);
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForDisplayed(this.errorSelector, 5000);
    return this.getText(this.errorSelector);
  }

  async isLoginScreenDisplayed(): Promise<boolean> {
    return this.isDisplayed(this.loginButtonSelector);
  }
}