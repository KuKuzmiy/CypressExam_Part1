export class RegisterPage {
  visit() {
    cy.visit('https://juice-shop.herokuapp.com/#/register')
  }

  dismissWelcomeBanner() {
    cy.log('UI: Dismiss welcome banner')
    cy.contains('button', 'Dismiss', { timeout: 10000 }).click()
  }

  acceptCookies() {
    cy.log('UI: Accept cookies')
    cy.contains('a', 'Me want it!', { timeout: 10000 }).click()
  }

  typeEmail(email) {
    cy.log('UI: Fill email')
    cy.getById('emailControl').type(email)
  }

  typePassword(password) {
    cy.log('UI: Fill password')
    cy.getById('passwordControl').type(password)
  }

  typeRepeatPassword(password) {
    cy.log('UI: Fill repeat password')
    cy.getById('repeatPasswordControl').type(password)
  }

  openSecurityQuestionDropdown() {
    cy.log('UI: Open security question dropdown')
    cy.getByAriaLabel('Selection list for the security question').click()
  }

  selectFirstSecurityQuestion() {
    cy.log('UI: Select first security question')
    cy.get('mat-option', { timeout: 10000 }).first().click()
  }

  typeSecurityAnswer(answer) {
    cy.log('UI: Fill security answer')
    cy.getById('securityAnswerControl').type(answer)
  }

  submit() {
    cy.log('UI: Submit registration')
    cy.getById('registerButton')
      .should('be.enabled')
      .click()
  }

  assertSuccessToast() {
    cy.log('Assert: Registration success snackbar')
    cy.get('.mat-mdc-snack-bar-label', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Registration completed successfully')
  }
}
