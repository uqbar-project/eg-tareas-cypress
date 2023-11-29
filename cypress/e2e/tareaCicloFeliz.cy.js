/// <reference types="cypress" />

describe("template spec", () => {
  const URL_BASE_BACKEND = "http://localhost:9000";

  beforeEach(() => {
    cy.request("PUT", URL_BASE_BACKEND + "/reset/tareas");
    cy.visit("http://localhost:4200/");
  });

  it("crea una tarea", () => {
    const miTarea = {
      descripcion: "Algo3: Preparar la clase de E2E Testing",
      iteracion: "Cursada 2023",
      asignatario: "Juan Contardo",
    };

    cy.intercept({ method: "GET", url: URL_BASE_BACKEND + "/usuarios" }).as(
      "getUsuarios"
    );

    cy.intercept({ method: "GET", url: "http://localhost:9000/tareas" }).as(
      "getTareas"
    );

    cy.get("[data-testid='nueva-tarea']").click();

    cy.wait("@getUsuarios");

    cy.get('[data-testid="descripcion"').type(miTarea.descripcion);

    cy.get('[data-testid="iteracion"').type(miTarea.iteracion);

    cy.findByTestId("asignatario").select(miTarea.asignatario);

    cy.get('input[placeholder="Fecha de inicio de la tarea"]').click();

    cy.get(".dp-calendar-wrapper").get(".dp-calendar-day").first().click();

    // cy.pause()

    cy.contains("Guardar").click();

    cy.wait("@getTareas");

    cy.get('[data-testid="fila-tarea"]').last().as("tareaCreada");

    cy.get("@tareaCreada")
      .findDescripcion()
      .should("contain.text", miTarea.descripcion);

    cy.get("@tareaCreada")
      .findIteracion()
      .should("contains.text", miTarea.iteracion);
      
    cy.get("@tareaCreada")
      .findAsignatario()
      .should("contains.text", miTarea.asignatario);

    cy.get("@tareaCreada").findCumplirButton().should("exist");
    cy.get("@tareaCreada").findAsignarButton().should("exist");
    cy.get("@tareaCreada").findDesasignarButton().should("exist");
  });
});
