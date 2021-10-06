import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function RestaurantProtectedRoute({ component: Component, ...restOfProps }) {
  const [cookies, setCookie] = useCookies(['restCookie']);
  const isAuthenticated = cookies.restCookie?.authenticated
  // const cust_id;
  console.log(restOfProps)
  const restIdfromCookie=cookies.cookie?.rest_id
  const rest_id=restOfProps.computedMatch.params.restId
  // const isUserIdSame=(custIdfromCookie==cust_id)
  const isUserIdSame=true
  console.log(isUserIdSame)
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (isUserIdSame?<Component {...props} />:<Redirect to="/unauthorized" /> ): <Redirect to="/restaurant" />
      }
    />
  );
}

 
 



