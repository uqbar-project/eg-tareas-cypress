/// <reference types="cypress" />
import { format } from 'date-fns'

describe('tareas spec', () => {
  const URL_BASE_BACKEND = 'http://localhost:9000'
  const miTarea = {
    descripcion: 'Algo3: Preparar la clase de E2E Testing',
    iteracion: 'Cursada 2023',
    asignatario: 'Juan Contardo',
    fechaIngresada: new Date('2024-10-10'),
  }

  before(() => {
    cy.request('PUT', URL_BASE_BACKEND + '/reset/tareas')
  })

  beforeEach(() => {
    // hay que tener cuidado con agregar interceptores en el hook before

    cy.intercept({ method: 'GET', url: URL_BASE_BACKEND + '/usuarios' }).as('getUsuarios')

    cy.intercept({ method: 'GET', url: URL_BASE_BACKEND + '/tareas' }).as('getTareas')

    cy.intercept({ method: 'PUT', url: URL_BASE_BACKEND + '/tareas/*' }).as('updateTarea')

    cy.visit('/')
  })

  it('crea una tarea', () => {
    cy.get('[data-testid=\'nueva-tarea\']').click()

    cy.wait('@getUsuarios')

    cy.get('[data-testid="descripcion"').type(miTarea.descripcion)

    cy.get('[data-testid="iteracion"').type(miTarea.iteracion)

    cy.findByTestId('asignatario').select(miTarea.asignatario)

    cy.get('input[placeholder="Fecha de inicio de la tarea"]').type(format(miTarea.fechaIngresada, 'yyyy-MM-dd'))

    cy.contains('Guardar').click()

    cy.wait('@getTareas')

    // cy.pause()

    cy.get('[data-testid="fila-tarea"]').last().as('tareaCreada')

    cy.get('@tareaCreada')
      .findDescripcion()
      .should('contain.text', miTarea.descripcion)

    cy.get('@tareaCreada')
      .findIteracion()
      .should('contains.text', miTarea.iteracion)

    cy.get('@tareaCreada')
      .findAsignatario()
      .should('contains.text', miTarea.asignatario)

    cy.get('@tareaCreada')
      .findFecha()
      .should('contains.text', format(miTarea.fechaIngresada, 'dd/MM/yyyy'))

    cy.get('@tareaCreada').findCumplirButton().should('exist')
    cy.get('@tareaCreada').findAsignarButton().should('exist')
    cy.get('@tareaCreada').findDesasignarButton().should('exist')
  })

  it('desasigna la tarea sin inconvenientes', () => {
    cy.get('[data-testid="fila-tarea"]')
      .filter(`:contains(${miTarea.descripcion})`)
      .as('tareaCreada')

    cy.get('@tareaCreada')
      .findAsignatario()
      .should('contains.text', miTarea.asignatario)

    cy.get('@tareaCreada').findDesasignarButton().click()

    cy.get('@tareaCreada').findAsignatario().should('be.empty')

    cy.get('@tareaCreada').findDesasignarButton().should('not.exist')
  })

  it('asigna a alguien nuevo', () => {
    const nuevoAsignatario = 'Jorge Luis Lescano'

    cy.get('[data-testid="fila-tarea"]')
      .filter(`:contains(${miTarea.descripcion})`)
      .as('tareaCreada')

    cy.get('@tareaCreada').findAsignarButton().click()

    cy.wait('@getUsuarios')

    cy.findByTestId('asignatario').select(nuevoAsignatario)

    cy.contains('Guardar').click()

    cy.wait('@getTareas')

    cy.get('@tareaCreada')
      .findAsignatario()
      .should('contains.text', nuevoAsignatario)

    cy.get('@tareaCreada').findDesasignarButton().should('exist')
  })

  it('completar la tarea, no poder reasignarla o volverla a completar', () => {
    cy.get('[data-testid="fila-tarea"]')
      .filter(`:contains(${miTarea.descripcion})`)
      .as('tareaCreada')

    cy.get('@tareaCreada').findCumplirButton().click()

    cy.wait('@updateTarea')

    cy.get('@tareaCreada').findDesasignarButton().should('not.exist')
    cy.get('@tareaCreada').findAsignarButton().should('not.exist')
    cy.get('@tareaCreada').findDesasignarButton().should('not.exist')
  })
})
