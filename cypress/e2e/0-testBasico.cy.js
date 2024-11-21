describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    // Visito la página
    cy.visit('https://example.cypress.io/todo')

    // Valido estado inicial
    cy.get('.todo-list').children().as('items')
    cy.get('@items').should('have.length', 2) // o podría hacerlo más resiliente y capturar el valor

    // Creo un nuevo ítem
    const itemDescription = 'Learn cypress'
    cy.get('[data-test="new-todo"]').type(`${itemDescription}\n`)
    cy.get('@items').should('have.length', 3)
    cy.get('@items').should('contain', itemDescription)
    
    // Marco el último ítem como cumplido
    cy.get('@items').children().last().as('lastItem')
    cy.get('@lastItem').find('.toggle').click()

    // Activo el filtro de solo activos y verifico que desaparece un ítem
    // test más exhaustivo => chequeo que no esté itemDescription
    // test más resiliente => asumo que es alguno de los ítems (qué pasa si se agrega
    // cada elemento nuevo al principio?)
    cy.get('[href="#/active"]').click()
    cy.get('@items').should('have.length', 2)
  })
})