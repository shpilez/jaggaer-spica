export default (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        cartItems: state.cartItems + action.count,
      };
    case "SHOW_HEADER_BUTTON":
      return {
        ...state,
        showHeaderButton: action.showButton,
      };
    case "ITEMS_COUNT":
      return {
        ...state,
        count: action.count,
      };
    default:
      return state;
  }
};
