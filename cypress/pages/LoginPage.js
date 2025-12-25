export class LoginPage {
  visit() {
    cy.visit('https://juice-shop.herokuapp.com/#/login')
  }

  typeEmail(email) {
    cy.log('UI: Type login email')
    cy.getById('email').type(email)
  }

  typePassword(password) {
    cy.log('UI: Type login password')
    cy.getById('password').type(password)
  }

  submit() {
    cy.log('UI: Submit login form')
    cy.contains('button', 'Log in')
      .should('be.enabled')
      .click()
  }

  assertLoggedIn() {
    cy.log('Assert: User is logged in')
    cy.contains('Your Basket', { timeout: 10000 }).should('be.visible')
  }
}
