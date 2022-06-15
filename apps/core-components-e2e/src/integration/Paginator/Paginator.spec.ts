describe('core-components: Paginator component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=paginator--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Paginator!');
  });
});
