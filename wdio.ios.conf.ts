import { config as baseConfig } from './wdio.shared.conf';

export const config: WebdriverIO.Config = {
    ...baseConfig,

    specs: [
        './tests/login.spec.ts',
        './tests/catalog.spec.ts',
        './tests/purchase.spec.ts',
    ],
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 14',
        'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '16.0',
        'appium:automationName': 'XCUITest',
        'appium:app': process.env.IOS_APP_PATH || './apps/SauceLabs.app/iOS.Simulator.SauceLabs.Mobile.Sample.app.2.7.1.app',
        'appium:newCommandTimeout': 240,
        'appium:autoGrantPermissions': true,
    }],
};