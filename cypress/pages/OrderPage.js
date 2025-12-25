export class OrderPage {
  visit() {
    cy.visit('https://juice-shop.herokuapp.com/#/')
  }

  dismissWelcomeBanner() {
    cy.log('UI: Dismiss welcome banner')
    cy.contains('button', 'Dismiss', { timeout: 10000 }).click()
  }

  acceptCookies() {
    cy.log('UI: Accept cookies')
    cy.contains('a', 'Me want it!', { timeout: 10000 }).click()
  }

  openLoginPage() {
    cy.log('UI: Open login page')
    cy.visit('https://juice-shop.herokuapp.com/#/login')
  }

  login(email, password) {
    cy.log('UI: Login with provided credentials')

    cy.get('[name="email"]').type(email)
    cy.get('[name="password"]').type(password)

    cy.contains('button', 'Log in')
      .should('be.enabled')
      .click()
  }

  assertLoggedIn() {
    cy.log('Assert: Logged in state')
    cy.contains('Your Basket', { timeout: 10000 }).should('be.visible')
  }

addAnyProductToBasket() {
  cy.log('UI: Add first available product to basket')

  cy.get('button[aria-label="Add to Basket"]', { timeout: 10000 })
    .should('be.visible')
    .first()
    .click()
}


openBasket() {
  cy.log('UI: Open shopping basket (scroll to top)')

  cy.get('mat-sidenav-content', { timeout: 10000 })
    .scrollTo('top', { ensureScrollable: false })

  cy.getByAriaLabel('Show the shopping cart')
    .should('be.visible')
    .click()
}

  clickCheckout() {
    cy.log('UI: Click Checkout button')

    cy.get('mat-sidenav-content')
      .scrollTo('bottom', { ensureScrollable: false })

    cy.contains('button', 'Checkout', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click()
  }

    clickAddNewAddress() {
    cy.log('UI: Click "Add New Address"')

    cy.get('mat-sidenav-content', { timeout: 10000 })
      .scrollTo('top', { ensureScrollable: false })

    cy.contains('button', 'Add New Address', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click()
  }

    getInputByLabel(labelText) {
    cy.log(`UI: Get input by label "${labelText}"`)

    return cy.contains('mat-form-field', labelText, { timeout: 10000 })
      .scrollIntoView()
      .find('input')
      .first()
  }

  typeCountry(country) {
    cy.log('UI: Fill Country')
    this.getInputByLabel('Country')
      .should('be.enabled')
      .clear()
      .type(country)
  }

  typeName(name) {
    cy.log('UI: Fill Name')
    this.getInputByLabel('Name')
      .should('be.enabled')
      .clear()
      .type(name)
  }

  typeMobileNumber(number) {
    cy.log('UI: Fill Mobile Number')
    this.getInputByLabel('Mobile Number')
      .should('be.enabled')
      .clear()
      .type(String(number))
  }

  typeZipCode(zip) {
    cy.log('UI: Fill ZIP Code')
    this.getInputByLabel('ZIP Code')
      .should('be.enabled')
      .clear()
      .type(String(zip))
  }

    getTextareaByLabel(labelText) {
    cy.log(`UI: Get textarea by label "${labelText}"`)

    return cy.contains('mat-form-field', labelText, { timeout: 10000 })
      .scrollIntoView()
      .find('textarea')
      .first()
  }

  typeAddress(address) {
    cy.log('UI: Fill Address')
    this.getTextareaByLabel('Address')
      .should('be.enabled')
      .clear()
      .type(address)
  }

  typeCity(city) {
    cy.log('UI: Fill City')
    this.getInputByLabel('City')
      .should('be.enabled')
      .clear()
      .type(city)
  }

  submitNewAddress() {
    cy.log('UI: Submit new address')
    cy.getById('submitButton', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click()
  }

  selectFirstAddress() {
  cy.log('UI: Select first address')

  cy.get('mat-radio-button input[type="radio"]', { timeout: 10000 })
    .first()
    .should('exist')
    .check({ force: true })
}

clickContinue() {
  cy.log('UI: Click Continue')

  cy.contains('button', 'Continue', { timeout: 10000 })
    .should('be.visible')
    .and('not.be.disabled')
    .click()
}

  selectFirstDeliverySpeed() {
    cy.log('UI: Select first delivery speed option')

    cy.get('mat-radio-button input[type="radio"]', { timeout: 10000 })
      .first()
      .should('exist')
      .check({ force: true })
  }

  clickContinueDeliverySpeed() {
    cy.log('UI: Click Continue on delivery speed step')

    cy.contains('button', 'Continue', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click()
  }

  clickAddNewCard() {
    cy.log('UI: Click "Add new card"')

    cy.contains('mat-expansion-panel-header', 'Add new card', { timeout: 10000 })
      .scrollIntoView()
      .click()

    cy.contains('mat-form-field', 'Expiry Month', { timeout: 10000 }).should('be.visible')
  }


typeCardName(name) {
  cy.log('UI: Fill card Name')

  this.getInputByLabel('Name')
    .should('be.enabled')
    .clear()
    .type(name)
}

typeCardNumber(cardNumber) {
  cy.log('UI: Fill Card Number')

  this.getInputByLabel('Card Number')
    .should('be.enabled')
    .clear()
    .type(cardNumber)
}

  getSelectByLabel(labelText) {
    cy.log(`UI: Get select by label "${labelText}"`)

    return cy.contains('mat-form-field', labelText, { timeout: 10000 })
      .scrollIntoView()
      .find('select')
      .first()
  }

  selectExpiryMonth(month) {
    cy.log(`UI: Select Expiry Month = ${month}`)

    this.getSelectByLabel('Expiry Month')
      .should('be.enabled')
      .select(String(month))
  }

  selectExpiryYear(year) {
    cy.log(`UI: Select Expiry Year = ${year}`)

    this.getSelectByLabel('Expiry Year')
      .should('be.enabled')
      .select(String(year))
  }

    submitNewCard() {
    cy.log('UI: Submit new card')

    cy.contains('button', 'Submit', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click()
  }

  selectFirstPaymentMethod() {
  cy.log('UI: Select first payment method (card radio)')

  cy.get('mat-radio-button input[type="radio"]', { timeout: 10000 })
    .first()
    .should('exist')
    .check({ force: true })
}

clickContinuePayment() {
  cy.log('UI: Click Continue on payment step')

  cy.contains('button', 'Continue', { timeout: 10000 })
    .should('be.visible')
    .and('not.be.disabled')
    .click()
}

clickPlaceOrderAndPay() {
  cy.log('UI: Place order and pay')

  cy.contains('button', 'Place your order and pay', { timeout: 10000 })
    .should('be.visible')
    .and('not.be.disabled')
    .click()
}

assertOrderPlaced() {
  cy.log('Assert: Order has been placed')

  cy.contains(
    'Your order has been placed and is being processed',
    { timeout: 10000 }
  ).should('be.visible')
}





}
