const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://juice-shop.herokuapp.com/#/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
