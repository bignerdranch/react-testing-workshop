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
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (username = 'Tester', password = 'pass') => {
  cy.findByRole('link', { name: /Log In/i }).click();
  cy.findByLabelText(/Username/i).type(username);
  cy.findByLabelText(/Password/i).type(password);
  cy.findByRole('button', { name: /Log In/i }).click();
});

Cypress.Commands.add('checkout', (name = 'Customer', zipCode = '30316') => {
  cy.findByRole('link', { name: /Tea/i }).click();
  cy.findByRole('button', { name: /Add to Cart/i }).click();
  cy.findByRole('link', { name: /Cart/i }).click();
  cy.findByLabelText(/Name/i).type(name);
  cy.findByLabelText(/Zip Code/i).type(zipCode);
  cy.findByRole('button', { name: /Order Now/i }).click();
});
