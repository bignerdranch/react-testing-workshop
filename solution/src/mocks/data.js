let orders = [];

export const reset = () => {
  orders = [];
};

export const getOrders = () => orders;

export const addOrder = (newOrder) => {
  orders.push({ ...newOrder });
};
