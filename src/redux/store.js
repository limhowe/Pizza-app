import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const enableMiddleware = (...middlewares) => {
  if (process.env.NODE_ENV === 'development') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }
  return compose(applyMiddleware(...middlewares));
};

const configureStore = initialState => {
  const store = createStore(rootReducer, initialState, enableMiddleware());

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
