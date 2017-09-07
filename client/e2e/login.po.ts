import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/');
  }

  getUsernameField() {
    return element(by.id('loginUsername'));
  }

  getPasswordField(){
    return element(by.id('loginPassword'));
  }

  getSignInButtonText(){
    return element(by.css("input[type='submit']")).getAttribute('value');
  }

  getForgotPasswordLink(){
    return element(by.id('loginForgotPassword'));
  }
}
