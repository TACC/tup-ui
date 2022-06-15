describe('core-components: TABLE_MARKUP component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=table_markup--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to TABLE_MARKUP!');
  });
});
