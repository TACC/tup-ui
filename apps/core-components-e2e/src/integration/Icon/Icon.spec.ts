describe('core-components: Icon component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=icon--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Icon!');
  });
});
