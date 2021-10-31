import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {useSelector} from 'react-redux'
export default function RestaurantProtectedRoute({ component: Component, ...restOfProps }) {
  const [cookies, setCookie] = useCookies(['restCookie']);
  const isAuthenticated = useSelector(state=>state.Login.isRestaurantAuthenticated)
  // const cust_id;
  console.log(restOfProps)
  const restIdfromtoken=useSelector(state=>state.Login.id)
  const rest_id=restOfProps.computedMatch.params.profileId
  // const isUserIdSame=(restIdfromtoken==rest_id)
  console.log("restId token",restIdfromtoken)
  console.log("rest id from match",restOfProps.computedMatch.params.profileId)
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

 
 



