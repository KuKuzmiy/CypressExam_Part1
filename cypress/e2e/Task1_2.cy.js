import { faker } from '@faker-js/faker'
import { RegisterPage } from '../pages/RegisterPage'
import { LoginPage } from '../pages/LoginPage'

describe('Task 1.2 - Authorization', () => {
  const registerPage = new RegisterPage()
  const loginPage = new LoginPage()

  let email
  let password

  before(() => {
    cy.log('Prepare test user via registration')

    email = faker.internet.email()
    password = `Aa1!${faker.string.alphanumeric(8)}`
    const answer = faker.lorem.word()

    registerPage.visit()
    registerPage.dismissWelcomeBanner()
    registerPage.acceptCookies()

    registerPage.typeEmail(email)
    registerPage.typePassword(password)
    registerPage.typeRepeatPassword(password)

    registerPage.openSecurityQuestionDropdown()
    registerPage.selectFirstSecurityQuestion()
    registerPage.typeSecurityAnswer(answer)

    registerPage.submit()
    registerPage.assertSuccessToast()
  })

  it('Login with registered user', () => {
    cy.log('Open login page')
    loginPage.visit()

    cy.log('Fill login credentials')
    loginPage.typeEmail(email)
    loginPage.typePassword(password)

    cy.log('Submit login form')
    loginPage.submit()

    cy.log('Verify successful login')
    loginPage.assertLoggedIn()
  })
})
