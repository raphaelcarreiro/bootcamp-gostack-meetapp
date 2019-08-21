import React from 'react';
import GlobalStyle from 'styles/Global';
import { Provider } from 'react-redux';
import { store, persistor } from 'store';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

function App({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyle />
        <ToastContainer autoClose={2000} />
        {children}
      </PersistGate>
    </Provider>
  );
}

App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default App;
