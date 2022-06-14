describe('core-components: SectionTableWrapper component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sectiontablewrapper--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SectionTableWrapper!');
    });
});
