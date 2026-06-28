import { driver } from '@wdio/globals';

export class BaseScreen {
  async waitForDisplayed(selector: string, timeout = 10000): Promise<void> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
  }

  async tap(selector: string): Promise<void> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout: 10000 });
    await element.click();
  }

  async setText(selector: string, text: string): Promise<void> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout: 10000 });
    await element.clearValue();
    await element.setValue(text);
  }

  async getText(selector: string): Promise<string> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout: 10000 });
    return element.getText();
  }

  async isDisplayed(selector: string): Promise<boolean> {
    try {
      const element = await $(selector);
      return element.isDisplayed();
    } catch {
      return false;
    }
  }

  async swipeUp(): Promise<void> {
    const { width, height } = await driver.getWindowSize();
    await driver.action('pointer')
        .move({ duration: 0, x: Math.round(width / 2), y: Math.round(height * 0.8) })
        .down({ button: 0 })
        .move({ duration: 500, x: Math.round(width / 2), y: Math.round(height * 0.2) })
        .up({ button: 0 })
        .perform();
  }

  async swipeDown(): Promise<void> {
    const { width, height } = await driver.getWindowSize();
    await driver.action('pointer')
        .move({ duration: 0, x: Math.round(width / 2), y: Math.round(height * 0.2) })
        .down({ button: 0 })
        .move({ duration: 500, x: Math.round(width / 2), y: Math.round(height * 0.8) })
        .up({ button: 0 })
        .perform();
  }

  async logout(): Promise<void> {
    await $('~test-Menu').click();
    await $('~test-LOGOUT').click();
  }
}