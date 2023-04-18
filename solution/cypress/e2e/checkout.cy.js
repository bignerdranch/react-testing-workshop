describe('Checkout', () => {
  it('User can build a cart and place an order', () => {
    cy.visit('/');
    cy.findByRole('link', { name: /Tea/i }).click();
    cy.findByRole('button', { name: /Add to Cart/i }).click();
    cy.findByTestId('cart-quantity').should('contain', '1');
    cy.findByRole('button', { name: /Add to Cart/i }).click();
    cy.findByTestId('cart-quantity').should('contain', '2');
    cy.findByRole('link', { name: /Cart/i }).click();
    cy.findByLabelText(/Name/i);
    cy.findByRole('button', { name: /Order Now/i }).should('be.disabled');
    cy.findByLabelText(/Name/i).type('Big Nerd Ranch');
    cy.findByLabelText(/ZIP Code/i).type('30316');
    cy.findByRole('button', { name: /Order Now/i }).should('be.enabled');
    cy.findByRole('button', { name: /Order Now/i }).click();
    cy.findByText(/Thank you for your order/i).should('be.visible');
    cy.findByTestId('cart-quantity').should('contain', '0');
  });

  it('Shows an error when the order fails', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });
    cy.checkout('Big Nerd Ranch', '99999');
    cy.findByText(/There was an error/i);
    cy.findByText(/We don't ship to 99999/i);
    cy.get('@consoleError').should('be.calledOnce');
  });
});
