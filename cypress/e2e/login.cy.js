beforeEach(() => {
  cy.viewport(
    Cypress.config("viewportWidth"),
    Cypress.config("viewportHeight")
  );
  cy.visit("/");
});

describe("Login", () => {
  it("Successful login", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("Empty mail", () => {
    cy.login(null, "123");
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("Empty pass", () => {
    cy.login("bropet@mail.ru", null);
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });
});

describe("Add books", () => {
  beforeEach(() => {
    cy.login("bropet@mail.ru", "123");
  });

  it.skip("Successful add new book", () => {
    cy.contains("Add new").click();
    cy.contains("Book description").should("be.visible");
    cy.get("#title").type("Атомные привычки");
    cy.get("#description").type("Формирование полезных привычек");
    cy.get("#authors").type("Джеймс Клир");
    cy.contains("Submit").click();
  });

  it("Add to favorite book", () => {
    cy.contains("Add to favorite").click();
    cy.contains("Favorite").click();
    cy.get(".card-body").then((elements) => {
      expect(elements).to.have.length.at.least(1);
    });
  });

  it("Delete from favorite book", () => {
    cy.contains("Favorite").click();
    cy.contains("Delete from favorite").click();
    cy.contains("Please add some book").should("be.visible");
  });
});
