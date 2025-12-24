import { faker } from '@faker-js/faker'
import { RegisterPage } from '../pages/RegisterPage'

describe('Task 1.1', () => {
  const page = new RegisterPage()

  beforeEach(() => {
    cy.log('Open registration page')
    page.visit()

    page.dismissWelcomeBanner()
    page.acceptCookies()
  })

  it('Register new user', () => {
    cy.log('Generate random user credentials')
    const email = faker.internet.email()
    const password = `Aa1!${faker.string.alphanumeric(8)}`
    const answer = faker.lorem.word()

    cy.log('Type email and password')
    page.typeEmail(email)
    page.typePassword(password)
    page.typeRepeatPassword(password)

    cy.log('Select secret question and type the answer')
    page.openSecurityQuestionDropdown()
    page.selectFirstSecurityQuestion()
    page.typeSecurityAnswer(answer)

    cy.log('Register button click')
    page.submit()

    cy.log('Verify successful registration')
    page.assertSuccessToast()
  })
})
