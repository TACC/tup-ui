describe('core-components: CoreComponents component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=corecomponents--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to CoreComponents!');
  });
});
