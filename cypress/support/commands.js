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

import "@testing-library/cypress/add-commands";

Cypress.Commands.add("findDescripcion", { prevSubject: "element" }, (subject) =>
  cy.wrap(subject).find('[data-testid^="descripcion_"]')
);
Cypress.Commands.add("findAsignatario", { prevSubject: "element" }, (subject) =>
  cy.wrap(subject).find('[data-testid^="asignatario_"]')
);

// Cypress.Commands.add("findFecha", { prevSubject: "element" }, (subject) =>
//   cy.wrap(subject).find('[data-testid^="fecha_"]')
// );
Cypress.Commands.add("findFecha", { prevSubject: "element" }, (subject) =>
  cy.wrap(subject)
    .find("td")
    .contains(/\d{2}\/\d{2}\/\d{4}/)
);

Cypress.Commands.add("findIteracion", { prevSubject: "element" }, (subject) => 
  cy.wrap(subject).find('[data-testid^="iteracion_"]')
);
Cypress.Commands.add("findCumplirButton", { prevSubject: "element" }, (subject) => 
  cy.wrap(subject).find('[data-testid^="cumplir_"]')
);
Cypress.Commands.add("findAsignarButton", { prevSubject: "element" }, (subject) => 
  cy.wrap(subject).find('[data-testid^="asignar_"]')
);
Cypress.Commands.add("findDesasignarButton", { prevSubject: "element" }, (subject) => 
  cy.wrap(subject).find('[data-testid^="desasignar_"]'
)
);
