describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8080/')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.ueb-grid').click();
    cy.get('.ueb-grid').click();
    cy.get('[data-nodes=""]').click();
    /* ==== End Cypress Studio ==== */
  })
})
