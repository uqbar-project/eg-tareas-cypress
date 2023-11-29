/// <reference types="cypress" />

describe('template spec', () => {

  const URL_BASE_BACKEND = "http://localhost:9000"

  beforeEach(() =>{
    cy.request("PUT", URL_BASE_BACKEND + "/reset/tareas")
    cy.visit("http://localhost:4200/")
  })

  it('crea una tarea', () => {

    cy.intercept({ method: 'GET', url: URL_BASE_BACKEND + "/usuarios" })
    .as("getUsuarios")

    cy.intercept({ method: 'GET', url: "http://localhost:9000/tareas" })
    .as("getTareas")

    const descTarea =  "Algo3: Clase E2E"

    cy.get("[data-testid='nueva-tarea']").click()

    cy.wait("@getUsuarios")

    cy.get('[data-testid="descripcion"').type(descTarea)

    cy.get('[data-testid="iteracion"').type("Cursada 2023")

    cy.findByTestId('asignatario').select("Juan Contardo")

    cy.get('input[placeholder="Fecha de inicio de la tarea"]').click()

    cy.get(".dp-calendar-wrapper").get(".dp-calendar-day").first().click()

    cy.pause()

    cy.contains("Guardar").click()

    cy.wait("@getTareas")

    cy.get('[data-testid="fila-tarea"]').last().as("tareaCreada")

    cy.get("@tareaCreada")
      .should("contain.text", descTarea)

    cy.get("@tareaCreada")
      .find('[data-testid^="asignatario"]')
      .should("contains.text", "Juan Contardo")
  })
})