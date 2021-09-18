
import './App.css';
import NavComponent from './SharedComponents/NavComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RestaurantSignup from './RestaurantComponent/RestaurantSignup';
import CustomerSignup from './CustomerComponent/CustomerSignup';
import LoginComponent from './SharedComponents/LoginComponent';
import CustomPopup from './SharedComponents/CustomPopup';
import SignupStatus from './CustomerComponent/SignupStatus';
import CustomerProfile from './CustomerComponent/CustomerProfile';
import RestaurantProfile from './RestaurantComponent/RestaurantProfile';
import RestaurantLanding from './RestaurantComponent/RestaurantLanding';
import DishesDetailsComponent from './RestaurantComponent/DishesDetailsComponent';
import { OrdersListComponent } from './RestaurantComponent/OrdersListComponent';





function App() {
  return (
    <Router>
      <div className="App">
        <div >
        <NavComponent></NavComponent>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/customer">
              <LoginComponent type="Customer" key="cust" path="customerSignup"></LoginComponent>
            </Route>
            <Route exact path="/restaurant" >
              <LoginComponent type="Restaurant Owner" key="rest" path="restaurantSingup"></LoginComponent>
            </Route>
            <Route exact path="/restaurant/:restId/dish/:dishId" >
              <DishesDetailsComponent></DishesDetailsComponent>
            </Route>
            <Route exact path="/restaurant/:restId/orderslist" component={OrdersListComponent}>
              
            </Route>
            <Route exact path="/restaurantSingup">
              <RestaurantSignup></RestaurantSignup>
            </Route>
            <Route exact path="/customerSignup">
              <CustomerSignup></CustomerSignup>
            </Route>
            <Route exact path="/customerSignup/success">
              <SignupStatus type="Success"></SignupStatus>
            </Route>
            <Route exact path="/customerSignup/error">
              <SignupStatus type="error"></SignupStatus>
            </Route>
            <Route exact path="/customer/profile/:profileId">
              <CustomerProfile></CustomerProfile>
            </Route>

            <Route exact path="/restaurant/landing/:profileId">
              <RestaurantLanding></RestaurantLanding>
            </Route>
            <Route exact path="/restaurant/profile/:profileId">
              <RestaurantProfile></RestaurantProfile>
            </Route>
            

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
