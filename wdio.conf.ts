import { config as baseConfig } from './wdio.shared.conf';

export const config: WebdriverIO.Config = {
  ...baseConfig,

  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '13.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': process.env.APP_PATH || './apps/Android.SauceLabs.Mobile.Sample.app.apk',
    'appium:appWaitActivity': 'com.swaglabsmobileapp.*',
    'appium:newCommandTimeout': 240,
    'appium:autoGrantPermissions': true,
  }],
};
