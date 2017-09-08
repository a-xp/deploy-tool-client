import { DeployToolPage } from './app.po';

describe('deploy-tool App', () => {
  let page: DeployToolPage;

  beforeEach(() => {
    page = new DeployToolPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
