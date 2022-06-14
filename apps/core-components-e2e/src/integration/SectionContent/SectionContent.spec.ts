describe('core-components: SectionContent component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sectioncontent--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SectionContent!');
    });
});
