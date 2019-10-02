import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getLoggedInUser } from '../store/actions/authActions'
const PrivateRoute = ({ signedin, component: Component, ...rest}) => {
console.log("TCL: props proute", signedin)
return(
  <Route
    {...rest}
    render={propss =>
      signedin ? (
        <Component {...propss} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
  )
  };

// export default PrivateRoute;
const mapStateToProps = state => ({
  signedin: state.authReducer.signedin
});
export default connect(
  mapStateToProps,
  { getLoggedInUser }
)(PrivateRoute);