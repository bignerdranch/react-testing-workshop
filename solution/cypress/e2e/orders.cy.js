describe('Orders', () => {
  before(() => {
    cy.request('DELETE', '/api/orders');
  });
  it('Can View and Delete Orders', () => {
    cy.visit('/');
    cy.checkout();
    cy.login();
    cy.findByRole('link', { name: /Orders/i }).click();
    cy.findByRole('button', { name: /Delete Order/i }).click();
    cy.findByText(/No Orders/i);
  });
});
