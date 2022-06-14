describe('core-components: InlineMessage component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=inlinemessage--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to InlineMessage!');
    });
});
