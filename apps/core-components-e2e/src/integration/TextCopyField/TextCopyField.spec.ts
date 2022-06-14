describe('core-components: TextCopyField component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textcopyfield--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TextCopyField!');
    });
});
