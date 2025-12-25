import { faker } from '@faker-js/faker'
import { RegisterPage } from '../pages/RegisterPage'
import { OrderPage } from '../pages/OrderPage'

describe('Task 1.3 - Order placement (setup only)', () => {
  const registerPage = new RegisterPage()
  const orderPage = new OrderPage()

  let email
  let password

  before(() => {
    cy.log('Setup: Generate random user credentials')
    email = faker.internet.email()
    password = `Aa1!${faker.string.alphanumeric(8)}`
    const answer = faker.lorem.word()

    cy.log('Setup: Register new user')
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

    cy.log('Setup: Login with newly registered user')
    orderPage.openLoginPage()
    orderPage.login(email, password)
    orderPage.assertLoggedIn()
  })

  it('Order', () => {

    cy.log('Adding the item to the basket')
    orderPage.addAnyProductToBasket()

    cy.log('Open basket')
    orderPage.openBasket()

    cy.log('Proceed to checkout')
    orderPage.clickCheckout()

    cy.log('Add new address')
    orderPage.clickAddNewAddress()

  })

  
})
