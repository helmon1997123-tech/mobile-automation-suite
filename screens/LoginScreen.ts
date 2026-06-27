import { BaseScreen } from './BaseScreen';

export class LoginScreen extends BaseScreen {
  // Selectors
  private get usernameInput() {
    return $('~test-Username');
  }
  private get passwordInput() {
    return $('~test-Password');
  }
  private get loginButton() {
    return $('~test-LOGIN');
  }
  private get errorMessage() {
    return $('~test-Error message');
  }

  async login(username: string, password: string): Promise<void> {
    await (await this.usernameInput).waitForDisplayed({ timeout: 15000 });
    await (await this.usernameInput).setValue(username);
    await (await this.passwordInput).setValue(password);
    await (await this.loginButton).click();
  }

  async getErrorMessage(): Promise<string> {
    await (await this.errorMessage).waitForDisplayed({ timeout: 5000 });
    return (await this.errorMessage).getText();
  }

  async isLoginScreenDisplayed(): Promise<boolean> {
    return (await this.loginButton).isDisplayed();
  }
}
