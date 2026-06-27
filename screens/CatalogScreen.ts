import { BaseScreen } from './BaseScreen';

export class CatalogScreen extends BaseScreen {
  private get productList() {
    return $('~test-PRODUCTS');
  }
  private get cartBadge() {
    return $('~test-Cart');
  }
  private get sortButton() {
    return $('~test-Modal Selector Button');
  }

  async isCatalogDisplayed(): Promise<boolean> {
    await (await this.productList).waitForDisplayed({ timeout: 15000 });
    return (await this.productList).isDisplayed();
  }

  async openProduct(productName: string): Promise<void> {
    const product = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${productName}"))`);
    await product.click();
  }

  async isProductDetailDisplayed(): Promise<boolean> {
    const backButton = await $('~test-BACK TO PRODUCTS');
    return backButton.isDisplayed();
  }

  async addFirstProductToCart(): Promise<void> {
    const addButton = await $$('~test-ADD TO CART');
    await addButton[0].waitForDisplayed({ timeout: 10000 });
    await addButton[0].click();
  }

  async addProductToCart(index: number): Promise<void> {
    const addButtons = await $$('~test-ADD TO CART');
    await addButtons[index].waitForDisplayed({ timeout: 10000 });
    await addButtons[index].click();
  }

  async getCartItemCount(): Promise<string> {
    const badge = await $('~test-Cart');
    const text = await badge.$('//*[@content-desc="test-Cart item quantity"]');
    return text.getText();
  }

  async goToCart(): Promise<void> {
    await (await this.cartBadge).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await (await this.sortButton).click();
    const optionMap = {
      az: 'Name (A to Z)',
      za: 'Name (Z to A)',
      lohi: 'Price (Low to High)',
      hilo: 'Price (High to Low)',
    };
    const optionElement = await $(`android=new UiSelector().text("${optionMap[option]}")`);
    await optionElement.click();
  }
}
