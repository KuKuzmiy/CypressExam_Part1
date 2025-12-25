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

    cy.log('Generate address data')
    const country = faker.location.country()
    const name = faker.person.fullName()
    const mobile = faker.string.numeric(9)
    const zip = faker.location.zipCode('#####')
    const address = faker.location.streetAddress()
    const city = faker.location.city()

    cy.log('Fill address form')
    orderPage.typeCountry(country)
    orderPage.typeName(name)
    orderPage.typeMobileNumber(mobile)
    orderPage.typeZipCode(zip)
    orderPage.typeAddress(address)
    orderPage.typeCity(city)

    cy.log('Submit address form')
    orderPage.submitNewAddress()

    cy.log('Select address')
    orderPage.selectFirstAddress()

    cy.log('Continue to next step')
    orderPage.clickContinue()

    cy.log('Select delivery speed')
    orderPage.selectFirstDeliverySpeed()

    cy.log('Continue to next step')
    orderPage.clickContinueDeliverySpeed()

    cy.log('Add new card')
    orderPage.clickAddNewCard()

    cy.log('Generate card data')
    const cardName = faker.person.fullName()
    const cardNumber = faker.string.numeric(16)

    cy.log('Fill card form')
    orderPage.typeCardName(cardName)
    orderPage.typeCardNumber(cardNumber)

    cy.log('Select expiry month/year')
    const month = faker.number.int({ min: 1, max: 12 })
    const year = faker.number.int({ min: 2080, max: 2099 })

    orderPage.selectExpiryMonth(month)
    orderPage.selectExpiryYear(year)

    cy.log('Submit card form')
    orderPage.submitNewCard()

    cy.log('Select payment method (card)')
    orderPage.selectFirstPaymentMethod()

    cy.log('Continue to review')
    orderPage.clickContinuePayment()

    cy.log('Place order and pay')
    orderPage.clickPlaceOrderAndPay()

    cy.log('Assert order confirmation')
    orderPage.assertOrderPlaced()






  })

  
})
