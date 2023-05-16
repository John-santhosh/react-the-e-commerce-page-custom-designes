import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let max = action.payload.map((product) => product.price);
    max = Math.max(...max);
    // console.log(max);
    return {
      ...state,
      filtered_products: [...action.payload],
      all_products: [...action.payload],
      filters: { ...state.filters, max_price: max, price: max },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === UPDATE_SORT) {
    // console.log(state);
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let newSort = [...filtered_products];
    // console.log(sort);
    if (sort === "price-lowest") {
      newSort = newSort.sort((curr, prev) => curr.price - prev.price);
    }
    if (sort === "price-highest") {
      newSort = newSort.sort((curr, prev) => prev.price - curr.price);
    }
    if (sort === "name-a") {
      newSort = newSort.sort((curr, prev) =>
        curr.name.localeCompare(prev.name)
      );
      // console.log(newSort);
    }
    if (sort === "name-z") {
      newSort = newSort.sort((curr, prev) =>
        prev.name.localeCompare(curr.name)
      );
      // console.log(newSort);
    }
    return { ...state, filtered_products: newSort };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    // setting dynamic object [name]: value
    // console.log("triggered");
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, company, category, color, price, shipping } = state.filters;

    let tempProducts = [...all_products];

    // filter based on input text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }

    // company
    // can do this way and next category way
    if (company !== "all") {
      // if (company === "all") {
      //   tempProducts = [...all_products];
      // } else {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }

    // category
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }

    // color
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c == color);
      });
    }

    // price
    // if (price) {
    tempProducts = tempProducts.filter((product) => product.price <= price);
    // }

    //shipping
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }
    // console.log(tempProducts);

    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
