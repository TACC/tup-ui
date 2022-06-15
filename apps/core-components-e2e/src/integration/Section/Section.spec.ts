describe('core-components: Section component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=section--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Section!');
  });
});
