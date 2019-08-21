import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'store/modules/rootReducers';
import rootSaga from 'store/modules/rootSagas';
import persistReducers from 'store/persistReducers';
import { persistStore } from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistReducers(rootReducer),
  applyMiddleware(sagaMiddleware)
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
