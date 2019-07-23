import uuidv4 from 'uuid/v4';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  addToCart: ['item'],
  removeFromCart: ['itemId']
});

export const AppTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  cartItems: []
};

/* ------- Selectors --------- */
export const AppSelectors = {
  selectCartItems: state => state.app.cartItems,
  selectCartPrice: state =>
    state.app.cartItems.reduce((acc, item) => acc + item.price, 0)
};

/* -------- Reducers ---------- */
export const addToCart = (state, { item }) => ({
  ...state,
  cartItems: state.cartItems.concat({
    ...item,
    id: uuidv4()
  })
});

export const removeFromCart = (state, { itemId }) => ({
  ...state,
  cartItems: state.cartItems.filter(item => item.id !== itemId)
});

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TO_CART]: addToCart,
  [Types.REMOVE_FROM_CART]: removeFromCart
});
