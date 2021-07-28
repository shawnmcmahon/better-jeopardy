describe('Game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should see a dropdown menu to select the number of categories for a game', () => {
    cy.get('label')
    .contains('Number of Categories:')
  }); 

  it('Should be able to all dropdown options', () => {
    cy.get('select')
      .select('2')
      .select('3')
      .select('6')
  }); 

  it('Should be able to start a game with 2 categories', () => {
    cy.get('select')
      .select('2')
    cy.get('button').contains('START GAME').click()
  }); 


});