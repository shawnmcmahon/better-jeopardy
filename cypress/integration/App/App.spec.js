describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should see the header when the user visits localhost:3000', () => {
    cy.get('header').contains('Better Jeopardy!')
    cy.contains('Jeopardy for people who aren\'t good at Jeopardy.')
  });

  it('Should allow the user to view past games posted to the API', () => {
    cy.get('button').contains('Saved Games').click();
    cy.url().should('eq', 'http://localhost:3000/saved-games');
    cy.get('h2').should('contain', 'Past Games');
  });

  it('Should allow the user to go back to the game start page', () => {
    cy.get('button').contains('Saved Games').click();
    cy.url().should('eq', 'http://localhost:3000/saved-games');
    cy.get('h2').should('contain', 'Past Games');
    cy.get('button').contains('Back').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('label').contains('Number of Categories:')
  });

  it('Should not allow the user to go to the game page without selecting a number of categories', () => {
    cy.get('button').contains('Start Game').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.visit('http://localhost:3000/game');
    cy.get('label').contains('Number of Categories:')
  });

  it('Should not load the game if there is a 404 error', () => {
    cy.intercept('GET', 'https://better-jeopardy-api-v2.herokuapp.com/api/v1/questions',
      {
        statusCode: 404
      }
    )
    cy.visit('http://localhost:3000');
    cy.get('button').contains('Start Game').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Should not load the game if there is a 500 error', () => {
    cy.intercept('GET', 'https://better-jeopardy-api-v2.herokuapp.com/api/v1/questions',
      {
        statusCode: 500
      }
    )
    cy.visit('http://localhost:3000');
    cy.get('button').contains('Start Game').click();
    cy.url().should('eq', 'http://localhost:3000/');
  })
});
