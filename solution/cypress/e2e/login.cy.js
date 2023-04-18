describe('Login', () => {
  it('Show Logged In User\'s Username', () => {
    cy.visit('/');
    cy.login();
    cy.findByRole('link', { name: /Log In/i }).should('not.exist');
    cy.findByText(/Tester/i);
  });
});
