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


}
