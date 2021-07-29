describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should see the header when the user visits localhost:3000', () => {
    cy.get('header').contains('Better Jeopardy!')
    cy.contains('Jeopardy for people who aren\'t good at Jeopardy.')
  }); 


});