describe('core-components: ShowMore component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=showmore--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ShowMore!');
    });
});
