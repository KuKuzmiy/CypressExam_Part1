import { faker } from '@faker-js/faker'
import { RegisterPage } from '../pages/RegisterPage'
import { OrderPage } from '../pages/OrderPage'

describe('Task1.3 - Order placement', () => {
  const registerPage = new RegisterPage()
  const orderPage = new OrderPage()

  let email
  let password

  before(() => {
    cy.log('Generate random user credentials')

    email = faker.internet.email()
    password = `Aa1!${faker.string.alphanumeric(8)}`
    const answer = faker.lorem.word()

    cy.log('Register new user')

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

    cy.log('Login with registered user')

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
    const addressData = {
      country: faker.location.country(),
      name: faker.person.fullName(),
      mobile: faker.string.numeric(9),
      zip: faker.location.zipCode('#####'),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
    }

    cy.log('Fill address form')
    orderPage.typeCountry(addressData.country)
    orderPage.typeName(addressData.name)
    orderPage.typeMobileNumber(addressData.mobile)
    orderPage.typeZipCode(addressData.zip)
    orderPage.typeAddress(addressData.address)
    orderPage.typeCity(addressData.city)

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
    const cardData = {
      cardName: faker.person.fullName(),
      cardNumber: faker.string.numeric(16),
      month: faker.number.int({ min: 1, max: 12 }),
      year: faker.number.int({ min: 2080, max: 2099 }),
    }

    cy.log('Fill card form')
    orderPage.typeCardName(cardData.cardName)
    orderPage.typeCardNumber(cardData.cardNumber)

    cy.log('Select expiry month/year')
    orderPage.selectExpiryMonth(cardData.month)
    orderPage.selectExpiryYear(cardData.year)

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
