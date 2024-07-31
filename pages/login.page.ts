import { $ } from '@wdio/globals';
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
export class LoginBasePage extends Page {
  constructor(pageName: string) {
    super(pageName);
  }
  
  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  public async login(username: string, password: string) {
    const elem_username = await this.username;
    const elem_password = await this.password;
    const elem_submit = await this.submit_button;

    const timeout = 10000;

    await elem_username.isDisplayedInViewport();
    await elem_username.waitForClickable({ timeout });
    await elem_username.isEnabled();
    await elem_username.click();
    await elem_username.setValue(username);

    await elem_password.isDisplayedInViewport();
    await elem_password.isEnabled();
    await elem_password.waitForClickable({ timeout });
    await elem_password.click();
    await elem_password.addValue(password);

    await elem_submit.isEnabled();
    await elem_submit.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  public open() {
    return super.open(this.url);
  }
}

export default new LoginBasePage('login');
