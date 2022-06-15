describe('core-components: Pill component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=pill--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Pill!');
  });
});
