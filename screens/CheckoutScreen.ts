import { BaseScreen } from './BaseScreen';

export class CheckoutScreen extends BaseScreen {
  private readonly firstNameSelector = '~test-First Name';
  private readonly lastNameSelector = '~test-Last Name';
  private readonly postalCodeSelector = '~test-Zip/Postal Code';
  private readonly continueButtonSelector = '~test-CONTINUE';
  private readonly errorContainerSelector = '~test-Error message';
  private readonly successHeaderSelector = '~test-CHECKOUT: COMPLETE!';
  private readonly totalSelector = '//android.widget.TextView[contains(@text, "Item total")]';

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.swipeDown();
    await browser.pause(500);
    await this.waitForDisplayed(this.firstNameSelector, 10000);

    const firstNameEl = await $(this.firstNameSelector);
    await firstNameEl.clearValue();
    if (firstName) await firstNameEl.setValue(firstName);

    const lastNameEl = await $(this.lastNameSelector);
    await lastNameEl.clearValue();
    if (lastName) await lastNameEl.setValue(lastName);

    const postalCodeEl = await $(this.postalCodeSelector);
    await postalCodeEl.clearValue();
    if (postalCode) await postalCodeEl.setValue(postalCode);

    await driver.hideKeyboard();
    await this.tap(this.continueButtonSelector);
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForDisplayed(this.errorContainerSelector, 5000);
    const errorContainer = await $(this.errorContainerSelector);
    const text = await errorContainer.$('android.widget.TextView');
    return text.getText();
  }

  async getSummaryTotal(): Promise<string> {
    await this.waitForDisplayed(this.totalSelector, 10000);
    return this.getText(this.totalSelector);
  }

  async finishOrder(): Promise<void> {
    const finish = await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("test-FINISH"))');
    await finish.click();
  }

  async isOrderSuccessful(): Promise<boolean> {
    await this.waitForDisplayed(this.successHeaderSelector, 10000);
    return this.isDisplayed(this.successHeaderSelector);
  }
}