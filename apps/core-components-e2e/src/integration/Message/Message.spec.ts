describe('core-components: Message component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=message--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Message!');
  });
});
