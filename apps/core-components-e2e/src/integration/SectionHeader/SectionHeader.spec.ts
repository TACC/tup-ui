describe('core-components: SectionHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sectionheader--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SectionHeader!');
    });
});
