import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import DefaultLayout from 'pages/_layouts/default/DefaultLayout';
import AuthLayout from 'pages/_layouts/auth/AuthLayout';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function WrapperRoute({ component: Component, isPrivate, ...rest }) {
  const auth = useSelector(state => state.auth);
  const { signed } = auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

WrapperRoute.defaultProps = {
  isPrivate: false,
};

WrapperRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
  isPrivate: PropTypes.bool,
};

export default WrapperRoute;
