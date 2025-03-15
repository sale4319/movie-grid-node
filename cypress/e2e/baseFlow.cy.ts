/// <reference types="cypress" />

describe("Base flow e2e test", () => {
  it("should visit and select and favour third item", () => {
    cy.visit("https://sale4319.github.io/movie-grid-node/");

    cy.get('[data-testid="grid-item"]').eq(2).click();

    cy.get('[data-testid="grid-item"]')
      .eq(2)
      .should("contain.text", "The Godfather");

    cy.get('[data-testid="favourite-icon-outlined"]').eq(2).click();

    cy.get('[data-testid="favourite-icon-filled"]').should("exist");
  });
});
