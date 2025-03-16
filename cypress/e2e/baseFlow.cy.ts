describe("Base flow e2e test", () => {
  it("should visit and select and favour third item", () => {
    cy.visit("https://sale4319.github.io/movie-grid-node/");

    cy.get('[data-testid="grid-item"]').eq(2).click();

    cy.get('[data-testid="grid-item"]')
      .eq(2)
      .should(($el) => {
        expect($el.attr("class")).to.contain("selected");
      });

    cy.get('[data-testid="favourite-icon-outlined"]').eq(2).click();

    cy.get('[data-testid="favourite-icon-filled"]').should("exist");
  });

  it("should navigate using keyboard and select and favour an item", () => {
    cy.visit("https://sale4319.github.io/movie-grid-node/");

    cy.get('[data-testid="grid-item"]').eq(0).click();

    cy.get("body").type(
      "{rightarrow}{downarrow}{downarrow}{rightarrow}{leftarrow}{uparrow}"
    );

    cy.get("body").type("{enter}");
    cy.get('[data-testid="grid-item"]')
      .eq(7)
      .should(($el) => {
        expect($el.attr("class")).to.contain("selected");
      });
    cy.get('[data-testid="favourite-icon-filled"]').should("exist");
  });
});
