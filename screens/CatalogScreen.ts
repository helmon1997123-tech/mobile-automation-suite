import { BaseScreen } from './BaseScreen';

export class CatalogScreen extends BaseScreen {
  private readonly productListSelector = '~test-PRODUCTS';
  private readonly cartBadgeSelector = '~test-Cart';
  private readonly sortButtonSelector = '~test-Modal Selector Button';
  private readonly backToProductsSelector = '~test-BACK TO PRODUCTS';

  async isCatalogDisplayed(): Promise<boolean> {
    await this.waitForDisplayed(this.productListSelector, 15000);
    return this.isDisplayed(this.productListSelector);
  }

  async openProduct(productName: string): Promise<void> {
    const product = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${productName}"))`);
    await product.click();
  }

  async isProductDetailDisplayed(): Promise<boolean> {
    return this.isDisplayed(this.backToProductsSelector);
  }

  async addFirstProductToCart(): Promise<void> {
    await browser.waitUntil(async () => {
      const buttons = await $$('~test-ADD TO CART');
      return buttons.length > 0;
    }, { timeout: 10000 });
    const addButtons = await $$('~test-ADD TO CART');
    await addButtons[0].waitForDisplayed({ timeout: 10000 });
    await addButtons[0].click();
  }

  async addProductToCart(index: number): Promise<void> {
    await browser.waitUntil(async () => {
      const buttons = await $$('~test-ADD TO CART');
      return buttons.length > index;
    }, { timeout: 10000 });
    const addButtons = await $$('~test-ADD TO CART');
    await addButtons[index].waitForDisplayed({ timeout: 10000 });
    await addButtons[index].click();
  }

  async getCartItemCount(): Promise<string> {
    await browser.pause(1000);
    const cart = await $(this.cartBadgeSelector);
    const badge = await cart.$('android.widget.TextView');
    const isDisplayed = await badge.isDisplayed();
    if (!isDisplayed) return '0';
    return badge.getText();
  }

  async goToCart(): Promise<void> {
    await this.tap(this.cartBadgeSelector);
  }

  async hasRemoveButton(index: number): Promise<boolean> {
    const removeButtons = await $$('~test-REMOVE');
    if (removeButtons.length === 0) return false;
    return removeButtons[index].isDisplayed();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.tap(this.sortButtonSelector);
    const optionMap = {
      az: 'Name (A to Z)',
      za: 'Name (Z to A)',
      lohi: 'Price (low to high)',
      hilo: 'Price (high to low)',
    };
    const optionElement = await $(`android=new UiSelector().text("${optionMap[option]}")`);
    await optionElement.click();
  }
}