import { BaseScreen } from './BaseScreen';

export class CartScreen extends BaseScreen {
  private readonly checkoutSelector = '~test-CHECKOUT';
  private readonly continueShoppingSelector = '~test-CONTINUE SHOPPING';

  async isCartDisplayed(): Promise<boolean> {
    await this.waitForDisplayed(this.checkoutSelector, 10000);
    return this.isDisplayed(this.checkoutSelector);
  }

  async getCartItemCount(): Promise<number> {
    const items = await $$('~test-REMOVE');
    return items.length;
  }

  async removeItem(index: number): Promise<void> {
    const removeButtons = await $$('~test-REMOVE');
    await removeButtons[index].click();
  }

  async proceedToCheckout(): Promise<void> {
    const checkout = await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("test-CHECKOUT"))');
    await checkout.click();
  }

  async continueShopping(): Promise<void> {
    await this.tap(this.continueShoppingSelector);
  }
}