describe('core-components: Checkbox component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=checkbox--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Checkbox!');
  });
});
