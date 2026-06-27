# Mobile Automation Suite

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![WebDriverIO](https://img.shields.io/badge/WebDriverIO-8.x-orange)
![Appium](https://img.shields.io/badge/Appium-2.x-purple)

Фреймворк мобильной автоматизации для [Sauce Labs Sample App](https://github.com/saucelabs/sample-app-mobile) на Android.

## Стек

| Инструмент | Назначение |
|---|---|
| TypeScript | Язык разработки |
| WebDriverIO | Фреймворк автоматизации |
| Appium | Мобильная автоматизация (Android) |
| UiAutomator2 | Android драйвер |
| Allure | Отчёты о прогоне тестов |
| Chai | Assertions |

## Структура проекта

```
mobile-automation-suite/
├── tests/
│   ├── login.spec.ts      # Авторизация (happy path + negative)
│   ├── catalog.spec.ts    # Каталог товаров и сортировка
│   └── purchase.spec.ts   # Корзина и оформление заказа
├── screens/               # Screen Object Model
│   ├── BaseScreen.ts      # Базовые методы (tap, swipe, scroll)
│   ├── LoginScreen.ts
│   ├── CatalogScreen.ts
│   ├── CartScreen.ts
│   └── CheckoutScreen.ts
├── helpers/
│   └── testData.ts        # Тестовые данные и константы
├── apps/                  # APK файлы (не коммитятся)
├── wdio.conf.ts           # Конфиг для Android
├── wdio.shared.conf.ts    # Общий конфиг
└── .env.example
```

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
| Сортировка по цене (оба направления) | Happy path / Negative |

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

### Требования

- Node.js 20+
- Android SDK
- Appium 2.x
- Android эмулятор или реальное устройство

### Установка

```bash
git clone https://github.com/helmon1997123-tech/mobile-automation-suite.git
cd mobile-automation-suite
npm install
```

### Настройка

1. Скачай APK: [Sauce Labs Sample App](https://github.com/saucelabs/sample-app-mobile/releases)
2. Положи в папку `apps/`
3. Запусти Appium: `appium`
4. Запусти эмулятор или подключи устройство

### Запуск тестов

```bash
# Все тесты
npm test

# Только авторизация
npm run test:login

# Только каталог
npm run test:catalog

# Корзина и оформление
npm run test:purchase
```

### Allure отчёт

```bash
npm run report
```

> ⚠️ Открывать `index.html` напрямую через браузер не работает — нужен локальный сервер.
