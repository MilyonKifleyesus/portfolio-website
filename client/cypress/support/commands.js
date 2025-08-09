// Custom commands for Cypress
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/admin");
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
});

Cypress.Commands.add("checkNavigation", () => {
  cy.get("nav").should("be.visible");
  cy.get("nav").contains("Home").should("be.visible");
  cy.get("nav").contains("About").should("be.visible");
  cy.get("nav").contains("Projects").should("be.visible");
  cy.get("nav").contains("Services").should("be.visible");
  cy.get("nav").contains("Contact").should("be.visible");
});
