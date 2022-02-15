import { createStore } from "redux";
import globalReducer from "./reducer";

function configureStore(
  state = { cartItems: 0, showHeaderButton: false, count: 0 }
) {
  return createStore(globalReducer, state);
}

export default configureStore;
