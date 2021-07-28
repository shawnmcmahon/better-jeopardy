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
    cy.get('.tiles')
      .find('article')
      .should('have.length', 10)
  }); 

  it('Should be able to start a game with 3 categories', () => {
    cy.get('select')
      .select('3')
    cy.get('button').contains('START GAME').click()
    cy.get('.tiles')
      .find('article')
      .should('have.length', 15)
  }); 

  it('Should be able to start a game with 3 categories', () => {
    cy.get('select')
      .select('6')
    cy.get('button').contains('START GAME').click()
    cy.get('.tiles') 
      .get('article').contains('$100')
    cy.get('.tiles')
      .find('article')
      .should('have.length', 30)
  }); 

  it('Should have a property formatted tile', () => {
    cy.get('select')
      .select('2')
    cy.get('button').contains('START GAME').click()
    cy.get('article').then(($el) => {
      Cypress.dom.isElement($el) // true
      Cypress.dom.isFocusable($el)
    })
    cy.get('article')
      .contains('$100') 
  })

  it('Should have an exit game button', () => {
    // cy.contains('EXIT GAME')
    cy.get('[data-cy=exit]').click()
  })


})