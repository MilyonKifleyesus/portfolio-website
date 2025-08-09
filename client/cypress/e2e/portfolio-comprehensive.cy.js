describe("Portfolio Application - Comprehensive E2E Demo", () => {
  beforeEach(() => {
    cy.visit("/");
    // Add a small delay to make the video more watchable
    cy.wait(1000);
  });

  it("Complete Portfolio Walkthrough", () => {
    // 1. Home Page Demo
    cy.log("🏠 Starting with Home Page");
    cy.get("h1").should("contain", "Milyon");
    cy.wait(500);

    // Scroll through home page content
    cy.scrollTo("bottom", { duration: 2000, ensureScrollable: false });
    cy.wait(1000);
    cy.scrollTo("top", { duration: 1000, ensureScrollable: false });
    cy.wait(500);

    // 2. Navigation Demo
    cy.log("🧭 Testing Navigation");

    // About Page
    cy.get("nav").contains("About").click();
    cy.url().should("include", "/about");
    cy.get("h1").should("contain", "About Me");
    cy.wait(1000);
    cy.scrollTo("bottom", { duration: 1500, ensureScrollable: false });
    cy.wait(500);

    // Projects Page
    cy.get("nav").contains("Projects").click();
    cy.url().should("include", "/projects");
    cy.get("h1").should("contain", "My Projects");
    cy.wait(1000);

    // Check for project cards
    cy.get("[data-testid='project-card']").should("have.length.at.least", 1);
    cy.wait(500);

    // Scroll through projects
    cy.scrollTo("bottom", { duration: 2000, ensureScrollable: false });
    cy.wait(1000);

    // Services Page
    cy.get("nav").contains("Services").click();
    cy.url().should("include", "/services");
    cy.get("h1").should("contain", "Services");
    cy.wait(1000);
    cy.scrollTo("bottom", { duration: 1500, ensureScrollable: false });
    cy.wait(500);

    // Contact Page
    cy.get("nav").contains("Contact").click();
    cy.url().should("include", "/contact");
    cy.wait(1000);

    // Test contact form
    cy.get("form").should("be.visible");
    cy.get("input").first().type("Test User");
    cy.wait(500);
    cy.get("input").eq(1).type("test@example.com");
    cy.wait(500);
    cy.get("textarea").type("This is a test message from the E2E test suite.");
    cy.wait(1000);

    // Don't actually submit to avoid sending real emails
    cy.log("📝 Contact form filled (not submitted)");
    cy.wait(500);

    // 3. Responsive Design Demo
    cy.log("📱 Testing Responsive Design");

    // Mobile view
    cy.viewport("iphone-x");
    cy.wait(1000);
    cy.get("body").should("be.visible");
    cy.scrollTo("bottom", { duration: 1500, ensureScrollable: false });
    cy.wait(500);

    // Tablet view
    cy.viewport("ipad-2");
    cy.wait(1000);
    cy.get("nav").should("be.visible");
    cy.scrollTo("bottom", { duration: 1500, ensureScrollable: false });
    cy.wait(500);

    // Desktop view
    cy.viewport(1280, 720);
    cy.wait(1000);

    // 4. Back to Home
    cy.get("nav").contains("Home").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.wait(1000);

    // 5. Social Links Demo
    cy.log("🔗 Checking Social Links");
    cy.get("a[href*='linkedin']").should("exist");
    cy.get("a[href*='github']").should("exist");
    cy.wait(1000);

    // 6. Final Scroll and Demo
    cy.log("🎬 Final Demo");
    cy.scrollTo("bottom", { duration: 2000, ensureScrollable: false });
    cy.wait(1000);
    cy.scrollTo("top", { duration: 1000, ensureScrollable: false });
    cy.wait(500);

    cy.log("✅ Comprehensive E2E Demo Complete!");
  });

  it("Performance and Loading Test", () => {
    // Test page load performance
    cy.visit("/", { timeout: 10000 });

    // Check that all main elements load
    cy.get("h1").should("be.visible");
    cy.get("nav").should("be.visible");

    // Test navigation performance
    cy.get("nav").contains("Projects").click();
    cy.get("[data-testid='project-card']").should("be.visible");

    cy.get("nav").contains("Services").click();
    cy.get("h1").should("contain", "Services");

    cy.get("nav").contains("Contact").click();
    cy.get("form").should("be.visible");

    cy.get("nav").contains("Home").click();
    cy.get("h1").should("contain", "Milyon");
  });
});
