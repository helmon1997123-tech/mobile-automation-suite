import { BaseScreen } from './BaseScreen';

export class CartScreen extends BaseScreen {
  private get checkoutButton() {
    return $('~test-CHECKOUT');
  }
  private get continueShoppingButton() {
    return $('~test-CONTINUE SHOPPING');
  }
  private get cartItems() {
    return $$('~test-Item');
  }

  async isCartDisplayed(): Promise<boolean> {
    await (await this.checkoutButton).waitForDisplayed({ timeout: 10000 });
    return (await this.checkoutButton).isDisplayed();
  }

  async getCartItemCount(): Promise<number> {
    const items = await this.cartItems;
    return items.length;
  }

  async removeItem(index: number): Promise<void> {
    const removeButtons = await $$('~test-REMOVE');
    await removeButtons[index].click();
  }

  async proceedToCheckout(): Promise<void> {
    await (await this.checkoutButton).click();
  }

  async continueShopping(): Promise<void> {
    await (await this.continueShoppingButton).click();
  }

  async getItemNames(): Promise<string[]> {
    const titleElements = await $$('~test-Item title');
    return Promise.all(titleElements.map((el) => el.getText()));
  }
}
