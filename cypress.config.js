const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true,
    scrollBehavior: false,
    testIsolation: false,
    video: false,
    viewportHeight: 1000,
    viewportWidth: 1000,
  },
})
