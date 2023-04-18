import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import Cart from './Cart';
import { items } from '../items';
import server from '../mocks/server';

describe('Cart Errors', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('Shows Checkout Failure Error', async () => {
    const testErrorMessage = 'Code Café is Closed';
    server.use(
      rest.post('/api/orders', async (req, res, ctx) => (
        res(ctx.status(500), ctx.json({ error: testErrorMessage }))
      )),
    );
    const cart = [{ itemId: items[0].itemId, quantity: 1 }];
    const dispatch = jest.fn(() => {});
    render(
      <Cart cart={cart} dispatch={dispatch} items={items} />,
    );
    expect(screen.getByRole('button', { name: /Order Now/i })).toBeDisabled();
    await userEvent.type(screen.getByLabelText(/Name/i), 'Big Nerd Ranch');
    await userEvent.type(screen.getByLabelText(/ZIP Code/i), '30316');
    expect(screen.getByRole('button', { name: /Order Now/i })).toBeEnabled();
    await userEvent.click(screen.getByRole('button', { name: /Order Now/i }));
    await waitFor(() => {
      expect(screen.getByText(testErrorMessage)).toBeVisible();
    });
    expect(dispatch).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
