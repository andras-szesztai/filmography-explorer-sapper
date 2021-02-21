/// <reference types="cypress" />

context('Explore Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  describe('Testing search bar', () => {
    it('Typing valid person into main search bar and selecting', () => {
      cy.get('.main-search-container')
        .get('input')
        .type('saoirse')
        .should('have.value', 'saoirse')
      cy.get('.result-container').its('length').should('gte', 3)
      cy.get('.main-search-container')
        .get('input')
        .type('{downarrow}{downarrow}{uparrow}{downarrow}')
      cy.get('.result-container')
        .eq(2)
        .children('.active')
        .should('exist')
        .click()
      cy.get('.results-container').should('not.exist')
      cy.get('.main-search-container').get('input').should('have.value', '')
    })
  })
})
