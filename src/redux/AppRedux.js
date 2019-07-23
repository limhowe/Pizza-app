import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setLoading: ['loading']
});

export const AppTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  loading: false
};

/* ------- Selectors --------- */
export const AppSelectors = {
  selectLoading: state => state.app.loading
};

/* -------- Reducers ---------- */
export const setLoading = (state, { loading }) => ({
  ...state,
  loading
});

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOADING]: setLoading
});
