// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands'

Cypress.Commands.add('findDescripcion', { prevSubject: 'element'}, (subject) =>  subject.find('[data-testid^="descripcion_"]') )
Cypress.Commands.add('findAsignatario', { prevSubject: 'element'}, (subject) =>  subject.find('[data-testid^="asignatario_"]') )
Cypress.Commands.add('findFecha', { prevSubject: 'element'}, (subject) =>  subject.find('[data-testid^="fecha_"]') )
Cypress.Commands.add('findIteracion', { prevSubject: 'element'}, (subject) =>  subject.find('[data-testid^="iteracion_"]') )
Cypress.Commands.add('findCumplirButton', { prevSubject: 'element'}, (subject) =>  subject.find('[data-testid^="cumplir_"]') )
Cypress.Commands.add('findAsignarButton', { prevSubject: 'element'}, (subject) =>  subject.find('[data-testid^="asignar_"]') )
Cypress.Commands.add('findDesasignarButton', { prevSubject: 'element'}, (subject) =>  subject.find('[data-testid^="desasignar_"]') )

Cypress.Commands.add('esMiTareaRecienCreada', { prevSubject: true}, (subject, miTarea) => {
    subject
        .findDescripcion()
        .should("contain.text", miTarea.descripcion);

    subject
      .findAsignatario()
      .should("contains.text", miTarea.asignatario);

    subject
      .findIteracion()
      .should("contains.text", miTarea.iteracion);

    subject.findCumplirButton().should("exist");
    subject.findAsignarButton().should("exist");
    subject.findDesasignarButton().should("exist");
} )