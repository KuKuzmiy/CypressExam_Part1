export class RegisterPage {
  visit() {
    cy.visit('https://juice-shop.herokuapp.com/#/register')
  }

  visitFeedback() {
    cy.visit('https://juice-shop.herokuapp.com/#/contact')
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

  typeFeedbackComment(comment) {
    cy.log('UI: Fill feedback comment')
    cy.getById('comment')
      .should('be.visible')
      .clear()
      .type(comment)
  }

  assertFeedbackCommentValue(comment) {
    cy.log('Assert: Feedback comment value')
    cy.getById('comment').should('have.value', comment)
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

setRating(value = 5) {
  cy.log(`UI: Set rating to ${value} stars`)

  cy.get('#rating input[matSliderThumb]', { timeout: 10000 })
    .should('exist')
    .then(($el) => {
      const el = $el[0]
      el.value = String(value)
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.dispatchEvent(new Event('change', { bubbles: true }))
    })
}

getCaptchaExpression() {
  cy.log('UI: Read captcha expression')
  return cy.getById('captcha')
    .should('exist')
    .invoke('text')
    .then((t) => t.trim())
}

calculateExpression(expression) {
  const sanitized = expression.replace(/\s+/g, '')

  if (!/^[0-9+\-*/().]+$/.test(sanitized)) {
    throw new Error(`Unsupported captcha expression: "${expression}"`)
  }

  const result = Function(`"use strict"; return (${sanitized});`)()

  return Number.isFinite(result) ? result : NaN
}

solveCaptchaAndTypeResult() {
  cy.log('UI: Solve captcha and type result')

  this.getCaptchaExpression().then((expr) => {
    const result = this.calculateExpression(expr)

    if (!Number.isFinite(result)) {
      throw new Error(`Captcha result is not a number. Expr="${expr}", result="${result}"`)
    }

    cy.log(`CAPTCHA: ${expr} = ${result}`)

    cy.getById('captchaControl')
      .should('exist')
      .clear()
      .type(String(result))
  })
}

submitFeedback() {
  cy.log('UI: Submit feedback')
  cy.getById('submitButton')
    .should('be.enabled')
    .click()
}


}
