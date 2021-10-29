import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {useSelector} from 'react-redux'

function CustomerProtectedRoute({ component: Component, ...restOfProps }) {
  const [cookies, setCookie] = useCookies(['cookie']);
  // const isAuthenticated = cookies.cookie?.authenticated
  const isAuthenticated=useSelector(state=>state.Login.isCustomerAuthenticated)
  console.log("cust protec",useSelector(state=>state.Login.isCustomerAuthenticated))
  // const cust_id;
  console.log(restOfProps)
  // const custIdfromCookie=cookies.cookie?.cust_id
  const custIdfromToken=useSelector(state=>state.Login.id)
  const cust_id=restOfProps.computedMatch.params.custId
  const isUserIdSame=(custIdfromToken==cust_id)
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