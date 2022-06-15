describe('core-components: SectionMessage component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sectionmessage--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to SectionMessage!');
  });
});
