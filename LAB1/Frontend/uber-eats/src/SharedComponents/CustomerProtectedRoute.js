import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from 'react-cookie';

function CustomerProtectedRoute({ component: Component, ...restOfProps }) {
  const [cookies, setCookie] = useCookies(['cookie']);
  const isAuthenticated = cookies.cookie?.authenticated
  // const cust_id;
  console.log(restOfProps)
  const custIdfromCookie=cookies.cookie?.cust_id
  const cust_id=restOfProps.computedMatch.params.custId
  const isUserIdSame=(custIdfromCookie==cust_id)
  // const isUserIdSame=true
  console.log(isUserIdSame)
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (isUserIdSame?<Component {...props} />:<Redirect to="/unauthorized" /> ): <Redirect to="/customer" />
      }
    />
  );
}

export default CustomerProtectedRoute;