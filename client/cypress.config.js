import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "761c1i",
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true, // Enable video recording
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    // Video settings
    videoCompression: 32, // Lower compression for better quality
  },
});
