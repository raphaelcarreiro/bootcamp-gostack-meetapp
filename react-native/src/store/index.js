import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import rootReducer from './modules/rootReducers';
import rootSaga from './modules/rootSagas';
import persistReducers from './persistReducers';
import createStore from './createStore';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store = createStore(persistReducers(rootReducer), sagaMiddleware);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
