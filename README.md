# Mobile Automation Suite

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![WebDriverIO](https://img.shields.io/badge/WebDriverIO-8.x-orange)
![Appium](https://img.shields.io/badge/Appium-2.x-purple)

Фреймворк мобильной автоматизации для [Sauce Labs Sample App](https://github.com/saucelabs/sample-app-mobile) на Android и iOS.

## Стек

| Инструмент | Назначение |
|---|---|
| TypeScript | Язык разработки |
| WebDriverIO 8 | Фреймворк автоматизации |
| Appium 2 | Мобильная автоматизация |
| UiAutomator2 | Android драйвер |
| XCUITest | iOS драйвер |
| Allure | Отчёты о прогоне тестов |
| Chai | Assertions |

## Структура проекта

mobile-automation-suite/

├── tests/

│   ├── login.spec.ts      # Авторизация (happy path + negative)

│   ├── catalog.spec.ts    # Каталог товаров и сортировка

│   └── purchase.spec.ts   # Корзина и оформление заказа

├── screens/               # Screen Object Model

│   ├── BaseScreen.ts      # Базовые методы (tap, swipe, logout)

│   ├── LoginScreen.ts

│   ├── CatalogScreen.ts

│   ├── CartScreen.ts

│   └── CheckoutScreen.ts

├── helpers/

│   └── testData.ts        # Тестовые данные и константы

├── apps/                  # APK/IPA файлы (не коммитятся)

├── wdio.android.conf.ts   # Конфиг для Android

├── wdio.ios.conf.ts       # Конфиг для iOS

├── wdio.shared.conf.ts    # Общий конфиг

└── .env.example           # Пример переменных окружения

## Покрытие тестами

### Авторизация
| Сценарий | Тип |
|---|---|
| Успешный логин | Happy path |
| Заблокированный пользователь | Negative |
| Пустой username | Negative |
| Пустой пароль | Negative |
| Неверный пароль | Negative |

### Каталог
| Сценарий | Тип |
|---|---|
| Отображение каталога | Happy path |
| Добавление товара в корзину | Happy path |
| Добавление нескольких товаров | Happy path |
| Открытие карточки товара | Happy path |
| Сортировка A-Z, Z-A | Happy path |
| Сортировка по цене (оба направления) | Negative |

### Корзина и оформление
| Сценарий | Тип |
|---|---|
| E2E: логин → товар → корзина → заказ | Happy path |
| Два товара → оформление | Happy path |
| Удаление товара из корзины | Happy path |
| Возврат в каталог | Happy path |
| Пустое имя при оформлении | Negative |
| Пустая фамилия при оформлении | Negative |
| Пустой почтовый индекс | Negative |

## Запуск

### Установка

```bash
git clone https://github.com/helmon1997123-tech/mobile-automation-suite.git
cd mobile-automation-suite
npm install
```

### Настройка окружения

```bash
cp .env.example .env
```

Отредактируй `.env` под своё устройство.

---

## Android

### Требования

- Node.js 20+
- Appium 2.x (`npm install -g appium`)
- UiAutomator2 драйвер (`appium driver install uiautomator2`)
- Эмулятор Android API 21+ или реальное устройство с Android 5.0+
- 
### Скачай APK

```bash
wget https://github.com/saucelabs/sample-app-mobile/releases/download/2.7.1/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk \
  -O apps/Android.SauceLabs.Mobile.Sample.app.apk
```

### Запуск

```bash
# Запусти Appium в отдельном терминале
appium

# Все тесты с отчётом 
npm run test:android:all

# По отдельности с отчётом
npm run test:android:login
npm run test:android:catalog
npm run test:android:purchase
```

---

## iOS

> ⚠️ Запуск iOS тестов возможен только на macOS с установленным Xcode.

### Требования

- Node.js 20+
- macOS + Xcode
- Appium 2.x (`npm install -g appium`)
- XCUITest драйвер (`appium driver install xcuitest`)
- Xcode Simulator с iOS 10.0+
- 
### Скачай IPA

```bash
# Для симулятора
wget https://github.com/saucelabs/sample-app-mobile/releases/download/2.7.1/iOS.Simulator.SauceLabs.Mobile.Sample.app.2.7.1.zip \
  -O apps/iOS.Simulator.SauceLabs.Mobile.Sample.app.zip
unzip apps/iOS.Simulator.SauceLabs.Mobile.Sample.app.zip -d apps/SauceLabs.app
```

### Запуск

```bash
# Запусти Appium в отдельном терминале
appium

# Все тесты с отчётом
npm run test:ios:all

# По отдельности с отчётом
npm run test:ios:login
npm run test:ios:catalog
npm run test:ios:purchase
```

---

## Allure отчёт

```bash
npm run report
```

> ⚠️ Открывать `index.html` напрямую через браузер не работает — нужен локальный сервер.