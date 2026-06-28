import { config as baseConfig } from './wdio.shared.conf';

export const config: WebdriverIO.Config = {
  ...baseConfig,

  specs: [
    './tests/login.spec.ts',
    './tests/catalog.spec.ts',
    './tests/purchase.spec.ts',
  ],
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': process.env.DEVICE_NAME || 'emulator-5554',
    'appium:platformVersion': process.env.PLATFORM_VERSION || '13.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': process.env.APP_PATH || './apps/Android.SauceLabs.Mobile.Sample.app.apk',
    'appium:appWaitActivity': 'com.swaglabsmobileapp.*',
    'appium:ignoreHiddenApiPolicyError': true,
    'appium:adbExecTimeout': 60000,
    'appium:newCommandTimeout': 240,
    'appium:autoGrantPermissions': true,
  }],
};