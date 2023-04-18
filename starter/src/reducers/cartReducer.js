export const initialCartState = [];

export const CartTypes = {
  ADD: 'ADD',
  EMPTY: 'EMPTY',
  REMOVE: 'REMOVE',
};

const findItem = (cart, itemId) => cart.find((item) => item.itemId === itemId);

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CartTypes.ADD:
      if (findItem(state, action.itemId)) {
        return state.map((item) => (item.itemId === action.itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item));
      }
      return [
        ...state,
        { itemId: action.itemId, quantity: 1 },
      ];
    case CartTypes.EMPTY:
      return [];
    case CartTypes.REMOVE:
      return state.filter((item) => item.itemId !== action.itemId);
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};
