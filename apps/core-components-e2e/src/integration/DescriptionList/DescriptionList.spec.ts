describe('core-components: DescriptionList component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=descriptionlist--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to DescriptionList!');
    });
});
