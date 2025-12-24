Cypress.Commands.add('getById', (id, options = {}) => {
  return cy.get(`#${id}`, { timeout: 10000, ...options })
})

Cypress.Commands.add('getByAriaLabel', (label, options = {}) => {
  return cy.get(`[aria-label="${label}"]`, { timeout: 10000, ...options })
})
