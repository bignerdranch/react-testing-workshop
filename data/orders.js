let orders = [];
let orderId = 1;

const validateOrder = (order) => {
  if (!order) {
    return { error: 'Missing body', valid: false };
  }
  if (typeof order.name !== 'string' || !order.name.trim()) {
    return { error: 'Invalid Name', valid: false };
  }
  if (!order.zipCode) {
    return { error: 'Zip Code is missing. Make sure it was passed under the key "zipCode".', valid: false };
  }
  if (!/^[0-9]{5}$/i.test(order.zipCode)) {
    return { error: 'Invalid Zip Code', valid: false };
  }
  if (order.zipCode === '99999') {
    return { error: "We don't ship to 99999.", valid: false };
  }
  if (!Array.isArray(order.items) || order.items.length === 0) {
    return { error: 'You must order at least one item.', valid: false };
  }
  return { valid: true };
};

const createOrder = (order) => {
  const result = validateOrder(order);
  if (!result.valid) {
    return { success: false, ...result };
  }

  const id = `${orderId}`;
  orderId += 1;
  const newOrder = {
    id,
    name: order.name,
    phone: order.phone,
    zipCode: order.zipCode,
    items: order.items,
  };
  orders.push(newOrder);

  return { success: true };
};

const deleteOrders = () => {
  orders = [];
};

const deleteOrder = (id) => {
  orders = orders.filter((order) => order.id !== id);
};

const editOrder = (id, editedOrder) => {
  const result = validateOrder(editedOrder);
  if (!result.valid) {
    return { success: false, ...result };
  }

  orders = orders.map((order) => (order.id === id ? {
    ...order,
    items: editedOrder.items,
    name: editedOrder.name,
    phone: editedOrder.phone,
    zipCode: editedOrder.zipCode,
  } : order));

  return { success: true, order: orders.find((order) => order.id === id) };
};

const getOrders = () => orders;

module.exports = {
  createOrder,
  deleteOrders,
  deleteOrder,
  editOrder,
  getOrders,
  validateOrder,
};
