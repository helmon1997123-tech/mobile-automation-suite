import { expect } from 'chai';
import { LoginScreen } from '../screens/LoginScreen';
import { CatalogScreen } from '../screens/CatalogScreen';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { USERS, ORDER_DATA } from '../helpers/testData';

describe('Корзина и оформление заказа', () => {
  let loginScreen: LoginScreen;
  let catalogScreen: CatalogScreen;
  let cartScreen: CartScreen;
  let checkoutScreen: CheckoutScreen;
  let skipAfterEach = false;

  before(async () => {
    loginScreen = new LoginScreen();
    catalogScreen = new CatalogScreen();
    cartScreen = new CartScreen();
    checkoutScreen = new CheckoutScreen();
    await loginScreen.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await catalogScreen.isCatalogDisplayed();
  });

  afterEach(async () => {
    if (skipAfterEach) return;

    try {
      const backHome = await $('~test-BACK HOME');
      if (await backHome.isDisplayed()) {
        await backHome.click();
        await catalogScreen.isCatalogDisplayed();
        return;
      }
    } catch {}

    try {
      const isOnCatalog = await $('~test-PRODUCTS').isDisplayed();
      if (!isOnCatalog) {
        await catalogScreen.goToCart();
        let removeButtons = await $$('~test-REMOVE');
        while (removeButtons.length > 0) {
          await removeButtons[0].click();
          await browser.pause(500);
          removeButtons = await $$('~test-REMOVE');
        }
        await cartScreen.continueShopping();
      }
      await catalogScreen.isCatalogDisplayed();
    } catch {
      try {
        await driver.back();
        await driver.back();
        await catalogScreen.isCatalogDisplayed();
      } catch {}
    }
  });

  // Happy path
  it('Логин → добавление товара → корзина → оформление заказа', async () => {
    await catalogScreen.addFirstProductToCart();
    await catalogScreen.goToCart();

    const isCartDisplayed = await cartScreen.isCartDisplayed();
    expect(isCartDisplayed).to.be.true;

    const itemCount = await cartScreen.getCartItemCount();
    expect(itemCount).to.equal(1);

    await cartScreen.proceedToCheckout();
    await checkoutScreen.fillShippingInfo(
        ORDER_DATA.firstName,
        ORDER_DATA.lastName,
        ORDER_DATA.postalCode,
    );

    const total = await checkoutScreen.getSummaryTotal();
    expect(total).to.include('$');

    await checkoutScreen.finishOrder();
    const isSuccess = await checkoutScreen.isOrderSuccessful();
    expect(isSuccess).to.be.true;
  });

  it('Удаление товара из корзины', async () => {
    await catalogScreen.addFirstProductToCart();
    await catalogScreen.goToCart();

    const countBefore = await cartScreen.getCartItemCount();
    expect(countBefore).to.equal(1);

    await cartScreen.removeItem(0);

    const countAfter = await cartScreen.getCartItemCount();
    expect(countAfter).to.equal(0);
  });

  it('Два товара → корзина → оформление', async () => {
    await catalogScreen.addFirstProductToCart();
    await catalogScreen.addFirstProductToCart();
    await catalogScreen.goToCart();

    const itemCount = await cartScreen.getCartItemCount();
    expect(itemCount).to.equal(2);

    await cartScreen.proceedToCheckout();
    await checkoutScreen.fillShippingInfo(
        ORDER_DATA.firstName,
        ORDER_DATA.lastName,
        ORDER_DATA.postalCode,
    );
    await checkoutScreen.finishOrder();

    const isSuccess = await checkoutScreen.isOrderSuccessful();
    expect(isSuccess).to.be.true;
  });

  it('Возврат в каталог через Continue Shopping', async () => {
    await catalogScreen.goToCart();
    await cartScreen.continueShopping();
    const isDisplayed = await catalogScreen.isCatalogDisplayed();
    expect(isDisplayed).to.be.true;
  });

  // Negative tests
  describe('Негативные тесты оформления заказа', () => {
    before(async () => {
      skipAfterEach = true;
      await catalogScreen.addFirstProductToCart();
      await catalogScreen.goToCart();
      await cartScreen.proceedToCheckout();
    });

    after(async () => {
      skipAfterEach = false;
    });

    it('Пустое имя — ошибка', async () => {
      await checkoutScreen.fillShippingInfo('', ORDER_DATA.lastName, ORDER_DATA.postalCode);
      const errorMessage = await checkoutScreen.getErrorMessage();
      expect(errorMessage).to.include('First Name is required');
    });

    it('Пустая фамилия — ошибка', async () => {
      await checkoutScreen.fillShippingInfo(ORDER_DATA.firstName, '', ORDER_DATA.postalCode);
      const errorMessage = await checkoutScreen.getErrorMessage();
      expect(errorMessage).to.include('Last Name is required');
    });

    it('Пустой индекс — ошибка', async () => {
      await checkoutScreen.fillShippingInfo(ORDER_DATA.firstName, ORDER_DATA.lastName, '');
      const errorMessage = await checkoutScreen.getErrorMessage();
      expect(errorMessage).to.include('Postal Code is required');
    });
  });
});