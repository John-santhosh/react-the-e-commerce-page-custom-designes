import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  const { type, payload } = action;
  if (type === ADD_TO_CART) {
    const { id, color, amount, product } = payload;

    //searching with "id + color" because we have added the id of the "newItem" like that only
    const tempItem = state.cart.find((i) => i.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          // if the same item already exist in the cart increase the count of the item
          let newAmount = item.amount + amount;
          if (newAmount > item.max_stock) {
            newAmount = item.max_stock;
          }
          return { ...item, amount: newAmount };
          // else return the item , it will be added as a new item
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      // this setup is coz same item will have multiple color
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        price: product.price,
        image: product.images[0].url,
        product: product.price,
        max_stock: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (type === CLEAR_CART) {
    console.log("john");
    return { ...state, cart: [] };
  }

  if (type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== payload);
    return { ...state, cart: tempCart };
  }

  if (type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount <= 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }

  if (type === COUNT_CART_TOTALS) {
    const { total_amount, total_items } = state.cart.reduce(
      (prev, curr) => {
        prev.total_amount += curr.amount;
        prev.total_items += curr.amount * curr.price;
        return prev;
      },
      { total_amount: 0, total_items: 0 }
    );
    return { ...state, total_amount, total_items };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
