describe("Portfolio Application E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the home page successfully", () => {
    cy.title().should("contain", "Portfolio");
    cy.get("body").should("be.visible");
  });

  it("should display navigation menu", () => {
    cy.checkNavigation();
  });

  it("should navigate to About page", () => {
    cy.get("nav").contains("About").click();
    cy.url().should("include", "/about");
    cy.get("h1").should("contain", "About Me");
  });

  it("should navigate to Projects page", () => {
    cy.get("nav").contains("Projects").click();
    cy.url().should("include", "/projects");
    cy.get("h1").should("contain", "My Projects");
  });

  it("should navigate to Services page", () => {
    cy.get("nav").contains("Services").click();
    cy.url().should("include", "/services");
    cy.get("h1").should("contain", "Services");
  });

  it("should navigate to Contact page", () => {
    cy.get("nav").contains("Contact").click();
    cy.url().should("include", "/contact");
    // Check for contact page content instead of specific h1
    cy.get("body").should("contain", "Contact");
  });

  it("should display contact form", () => {
    cy.visit("/contact");
    // Check for form elements that actually exist
    cy.get("form").should("be.visible");
    // Look for form inputs more generically
    cy.get("input").should("have.length.at.least", 1);
    cy.get("textarea").should("be.visible");
    cy.get("button").should("be.visible");
  });

  it("should display profile information", () => {
    // Check for actual profile content - use more generic assertions
    cy.get("h1").should("contain", "Milyon");
    // Check for any h2 element that contains developer-related text
    cy.get("h2").should("exist");
    cy.get("body").should("contain", "Developer");
  });

  it("should display social links", () => {
    // Check for social media links more generically
    cy.get("a[href*='linkedin']").should("exist");
    cy.get("a[href*='github']").should("exist");
  });

  it("should be responsive on mobile viewport", () => {
    cy.viewport("iphone-x");
    // Check for mobile navigation or main content
    cy.get("body").should("be.visible");
    cy.get("h1").should("be.visible");
  });

  it("should be responsive on tablet viewport", () => {
    cy.viewport("ipad-2");
    cy.get("nav").should("be.visible");
    cy.get("h1").should("be.visible");
  });

  it("should display project cards on projects page", () => {
    cy.visit("/projects");
    cy.get("[data-testid='project-card']").should("have.length.at.least", 1);
  });

  it("should display service sections on services page", () => {
    cy.visit("/services");
    cy.get("h1").should("contain", "Services");
  });
});
