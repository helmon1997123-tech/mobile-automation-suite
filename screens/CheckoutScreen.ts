import { BaseScreen } from './BaseScreen';

export class CheckoutScreen extends BaseScreen {
  // Step 1
  private get firstNameInput() {
    return $('~test-First Name');
  }
  private get lastNameInput() {
    return $('~test-Last Name');
  }
  private get postalCodeInput() {
    return $('~test-Zip/Postal Code');
  }
  private get continueButton() {
    return $('~test-CONTINUE');
  }
  private get errorMessage() {
    return $('~test-Error message');
  }

  // Step 2
  private get finishButton() {
    return $('~test-FINISH');
  }
  private get summaryTotal() {
    return $('~test-Price Total');
  }

  // Complete
  private get successHeader() {
    return $('~test-THANK YOU FOR YOU ORDER');
  }
  private get backHomeButton() {
    return $('~test-BACK HOME');
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await (await this.firstNameInput).waitForDisplayed({ timeout: 10000 });
    await (await this.firstNameInput).setValue(firstName);
    await (await this.lastNameInput).setValue(lastName);
    await (await this.postalCodeInput).setValue(postalCode);
    await (await this.continueButton).click();
  }

  async getErrorMessage(): Promise<string> {
    await (await this.errorMessage).waitForDisplayed({ timeout: 5000 });
    return (await this.errorMessage).getText();
  }

  async getSummaryTotal(): Promise<string> {
    await (await this.summaryTotal).waitForDisplayed({ timeout: 10000 });
    return (await this.summaryTotal).getText();
  }

  async finishOrder(): Promise<void> {
    await (await this.finishButton).waitForDisplayed({ timeout: 10000 });
    await (await this.finishButton).click();
  }

  async isOrderSuccessful(): Promise<boolean> {
    await (await this.successHeader).waitForDisplayed({ timeout: 10000 });
    return (await this.successHeader).isDisplayed();
  }

  async backToHome(): Promise<void> {
    await (await this.backHomeButton).click();
  }
}
