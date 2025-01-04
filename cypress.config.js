const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, _) {
      // implement node event listeners here
    },
  },
});
