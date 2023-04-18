import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { items } from './items';
import { getOrders } from './mocks/data';

describe('App', () => {
  it('Displays the Logged In User\'s Username', async () => {
    render(<App />);
    await screen.findByText(/Tester/i);
  });
  it('Allows the user to build a cart and place an order', async () => {
    render(<App />);
    await waitFor(() => {
      const thumbnails = screen.queryAllByTestId('thumbnail-component');
      expect(thumbnails).toHaveLength(items.length);
    });
    await userEvent.click(screen.getByRole('link', { name: /Tea/i }));
    await screen.findByRole('button', { name: /Add to Cart/i });
    await userEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));
    await waitFor(() => {
      expect(screen.getByTestId('cart-quantity')).toHaveTextContent('1');
    });
    await userEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));
    await waitFor(() => {
      expect(screen.getByTestId('cart-quantity')).toHaveTextContent('2');
    });
    await userEvent.click(screen.getByRole('link', { name: /Cart/i }));
    await screen.findByLabelText(/Name/i);
    expect(screen.getByRole('button', { name: /Order Now/i })).toBeDisabled();
    await userEvent.type(screen.getByLabelText(/Name/i), 'Big Nerd Ranch');
    await userEvent.type(screen.getByLabelText(/ZIP Code/i), '30316');
    expect(screen.getByRole('button', { name: /Order Now/i })).toBeEnabled();
    await userEvent.click(screen.getByRole('button', { name: /Order Now/i }));
    await waitFor(() => {
      expect(screen.getByText(/Thank you for your order/i)).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByTestId('cart-quantity')).toHaveTextContent('0');
    });
    expect(getOrders()).toHaveLength(1);
  });
});
