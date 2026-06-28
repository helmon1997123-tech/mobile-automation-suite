import { expect } from 'chai';
import { LoginScreen } from '../screens/LoginScreen';
import { CatalogScreen } from '../screens/CatalogScreen';
import { USERS } from '../helpers/testData';

describe('Авторизация', () => {
  let loginScreen: LoginScreen;
  let catalogScreen: CatalogScreen;

  before(async () => {
    loginScreen = new LoginScreen();
    catalogScreen = new CatalogScreen();
  });

  beforeEach(async () => {
    try {
      const isLoginVisible = await loginScreen.isLoginScreenDisplayed();
      if (!isLoginVisible) {
        await loginScreen.logout();
      }
    } catch {
      // уже на экране логина
    }
  });

  // Happy path
  it('Успешный логин — standard_user', async () => {
    await loginScreen.login(USERS.STANDARD.username, USERS.STANDARD.password);
    const isCatalogDisplayed = await catalogScreen.isCatalogDisplayed();
    expect(isCatalogDisplayed).to.be.true;
  });

  // Negative tests
  it('Логин заблокированного пользователя — ошибка', async () => {
    await loginScreen.login(USERS.LOCKED.username, USERS.LOCKED.password);
    const errorMessage = await loginScreen.getErrorMessage();
    expect(errorMessage).to.include('Sorry, this user has been locked out');
  });

  it('Логин с пустым паролем — ошибка', async () => {
    await loginScreen.login(USERS.STANDARD.username, '');
    const errorMessage = await loginScreen.getErrorMessage();
    expect(errorMessage).to.include('Password is required');
  });

  it('Логин с пустым username — ошибка', async () => {
    await loginScreen.login('', USERS.STANDARD.password);
    const errorMessage = await loginScreen.getErrorMessage();
    expect(errorMessage).to.include('Username is required');
  });

  it('Логин с неверным паролем — ошибка', async () => {
    await loginScreen.login(USERS.STANDARD.username, 'wrong_password');
    const errorMessage = await loginScreen.getErrorMessage();
    expect(errorMessage).to.include('do not match any user in this service');
  });
});