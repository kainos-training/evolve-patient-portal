import { LoginPage } from './login.po';

describe('evolve-login Login', () => {
    let page: LoginPage;
  
    beforeEach(() => {
      page = new LoginPage();
    });
  
    it('should display sign in button', () => {
      page.navigateTo();
      expect(page.getSignInButtonText()).toEqual('Sign in');
    });

  });
