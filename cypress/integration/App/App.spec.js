describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should see the header when the user visits localhost:3000', () => {
    cy.get('header').contains('Better Jeopardy!')
    cy.contains('Jeopardy for people who aren\'t good at Jeopardy.')
  });

  it('Should allow the user to view past games posted to the API');

  it('Should allow the user to go back to the game start page');

  it('Should not allow the user to go to the game page without selecting a number of categories', () => {
    cy.get('button').contains('Start Game').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.visit('http://localhost:3000/game');
    cy.get('label').contains('Number of Categories:')
  });

});
