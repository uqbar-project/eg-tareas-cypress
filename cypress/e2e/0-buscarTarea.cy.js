/// <reference types="cypress" />

describe("Lista de Tareas - Test Suite", () => {
  const URL_BASE_BACKEND = "http://localhost:9000";
  before(() => {
    cy.request("PUT", URL_BASE_BACKEND + "/reset/tareas");

    cy.intercept({ method: "GET", url: URL_BASE_BACKEND + "/tareas" }).as(
      "getTareas"
    );
  });

  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });

  
  it("se puede traer una tarea", () => {
    cy.wait("@getTareas");
    cy.get('[data-testid="tareaBuscada"]').type("Deco");
    cy.get('[data-testid="fila-tarea"]')
      .findDescripcion()
      .contains("Algo2: migrar ejemplo de Decorator a Kotlin");
  });
});
