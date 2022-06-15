describe('core-components: LoadingSpinner component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=loadingspinner--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to LoadingSpinner!');
  });
});
