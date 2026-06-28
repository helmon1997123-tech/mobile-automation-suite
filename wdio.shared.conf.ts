export const config: Partial<WebdriverIO.Config> = {
  runner: 'local',
  port: 4723,
  path: '/',
  specs: ['./tests/**/*.spec.ts'],
  exclude: [],
  maxInstances: 1,
  logLevel: 'warn',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['appium'],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false,
    }],
  ],
  before: async function() {
    await driver.execute('mobile: terminateApp', { appId: 'com.swaglabsmobileapp' });
    await driver.execute('mobile: clearApp', { appId: 'com.swaglabsmobileapp' });
    await driver.execute('mobile: activateApp', { appId: 'com.swaglabsmobileapp' });
  },
  afterTest: async function(test, context, { error }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },
};