import { expect } from 'chai';
import { LoginScreen } from '../screens/LoginScreen';
import { CatalogScreen } from '../screens/CatalogScreen';
import { USERS, PRODUCTS } from '../helpers/testData';

describe('Каталог товаров', () => {
  let loginScreen: LoginScreen;
  let catalogScreen: CatalogScreen;

  before(async () => {
    loginScreen = new LoginScreen();
    catalogScreen = new CatalogScreen();
    await loginScreen.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await catalogScreen.isCatalogDisplayed();
  });

  // Happy path
  it('Каталог отображается после логина', async () => {
    const isDisplayed = await catalogScreen.isCatalogDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('Добавление первого товара в корзину', async () => {
    await catalogScreen.addFirstProductToCart();
    const hasRemove = await catalogScreen.hasRemoveButton(0);
    expect(hasRemove).to.be.true;
  });

  it('Добавление нескольких товаров в корзину', async () => {
    await catalogScreen.addFirstProductToCart();
    const count = (await $$('~test-REMOVE')).length;
    expect(count).to.equal(2);
  });

  it('Сортировка по цене — от дешёвых к дорогим', async () => {
    await catalogScreen.sortBy('lohi');
    const isDisplayed = await catalogScreen.isCatalogDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('Сортировка по имени — A to Z', async () => {
    await catalogScreen.sortBy('az');
    const isDisplayed = await catalogScreen.isCatalogDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('Открытие карточки товара', async () => {
    await catalogScreen.openProduct(PRODUCTS.BACKPACK);
    const isDisplayed = await catalogScreen.isProductDetailDisplayed();
    expect(isDisplayed).to.be.true;
    await driver.back();
    await catalogScreen.isCatalogDisplayed();
  });

  // Negative tests
  it('Сортировка по цене — от дорогих к дешёвым', async () => {
    await catalogScreen.sortBy('hilo');
    const isDisplayed = await catalogScreen.isCatalogDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('Сортировка по имени — Z to A', async () => {
    await catalogScreen.sortBy('za');
    const isDisplayed = await catalogScreen.isCatalogDisplayed();
    expect(isDisplayed).to.be.true;
  });
});