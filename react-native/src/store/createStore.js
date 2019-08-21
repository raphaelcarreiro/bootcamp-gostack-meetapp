import { createStore, compose, applyMiddleware } from 'redux';

function store(reducers, middleware) {
  const enhancer = __DEV__
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(middleware)
      )
    : applyMiddleware(middleware);

  return createStore(reducers, enhancer);
}

export default store;
