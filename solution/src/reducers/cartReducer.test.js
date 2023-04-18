import { cartReducer, CartTypes } from './cartReducer';

describe('cartReducer', () => {
  it('adds a new item', () => {
    const initialCartState = [];
    const itemId = 1;

    const cartReducerOutput = cartReducer(
      initialCartState,
      { type: CartTypes.ADD, itemId },
    );

    const finalCartState = [{
      itemId,
      quantity: 1,
    }];

    expect(cartReducerOutput).toEqual(finalCartState);
  });

  it('updates item quantity when adding existing item', () => {
    const itemId = 1;
    const initialCartState = [{
      itemId,
      quantity: 1,
    }];

    const cartReducerOutput = cartReducer(
      initialCartState,
      { type: CartTypes.ADD, itemId },
    );

    const finalCartState = [{
      itemId,
      quantity: 2,
    }];

    expect(cartReducerOutput).toEqual(finalCartState);
  });

  it('empties cart', () => {
    const initialCartState = [{
      itemId: 1,
      quantity: 1,
    }];

    const cartReducerOutput = cartReducer(
      initialCartState,
      { type: CartTypes.EMPTY },
    );

    const finalCartState = [];

    expect(cartReducerOutput).toEqual(finalCartState);
  });

  it('removes item', () => {
    const itemId = 1;
    const initialCartState = [{
      itemId,
      quantity: 1,
    }];

    const cartReducerOutput = cartReducer(
      initialCartState,
      { type: CartTypes.REMOVE, itemId },
    );

    const finalCartState = [];

    expect(cartReducerOutput).toEqual(finalCartState);
  });
});
