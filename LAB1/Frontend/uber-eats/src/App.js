
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
import CustomerLanding from './CustomerComponent/CustomerLanding';
import Home from './Home/Home';
import CustomerRestComponent from './CustomerComponent/CustomerRestComponent';
import CustomerFavouritesList from './CustomerComponent/CustomerFavouritesList';
import CheckoutComponent from './CustomerComponent/CheckoutComponent';
import CustomerOrders from './CustomerComponent/CustomerOrders';
import CustomerProtectedRoute from './SharedComponents/CustomerProtectedRoute';
import ViewCustomerProfile from './RestaurantComponent/ViewCustomerProfile';
import RestaurantProtectedRoute from './SharedComponents/RestaurantProtectedRoute'
import Unauthorized from './SharedComponents/Unauthorized';





function App() {
  return (
    <Router>
      
        <div className="App">
          <Switch>
            {/* Unprotected Routes */}
            <Route exacth path="/home" component={Home}></Route>
            <Route exact path="/customer">
              <LoginComponent type="Customer" key="cust" path="customerSignup"></LoginComponent>
            </Route>
            <Route exact path="/restaurant" >
              <LoginComponent type="Restaurant Owner" key="rest" path="restaurantSingup"></LoginComponent>
            </Route>
            <Route exact path="/restaurantSingup">
              <RestaurantSignup></RestaurantSignup>
            </Route>
            <Route exact path="/customerSignup">
              <CustomerSignup></CustomerSignup>
            </Route>
            <Route exact path="/unauthorized" component={Unauthorized}> <Unauthorized/></Route>
            {/* Restaurant Protected Routes */}
            <Route exact path="/restaurant/:restId/dish/:dishId" component={DishesDetailsComponent}><DishesDetailsComponent></DishesDetailsComponent></Route>
            <RestaurantProtectedRoute exact path="/restaurant/:restId/orderslist" component={OrdersListComponent}></RestaurantProtectedRoute>
            <Route exact path="/restaurantSingup/success">
              <SignupStatus type="Success" view="rest"></SignupStatus>
            </Route>
            <Route exact path="/restaurantSingup/error">
              <SignupStatus type="error" view="rest"></SignupStatus>
            </Route>
            <RestaurantProtectedRoute exact path="/restaurant/landing/:profileId" component={RestaurantLanding}></RestaurantProtectedRoute>
            <RestaurantProtectedRoute exact path="/restaurant/profile/:profileId" component={RestaurantProfile}></RestaurantProtectedRoute>
            <RestaurantProtectedRoute exact path="/restaurant/:restId/view/customer/:custId" component={ViewCustomerProfile}></RestaurantProtectedRoute>

            {/* Customer protected routes */}
            <Route exact path="/customerSignup/success">
              <SignupStatus type="Success" view="cust"></SignupStatus>
            </Route>
            <Route exact path="/customerSignup/error">
              <SignupStatus type="error" view="cust"></SignupStatus>
            </Route>
            <CustomerProtectedRoute exact path="/customer/profile/:custId" component={CustomerProfile}></CustomerProtectedRoute>
            <CustomerProtectedRoute exact path="/customer/landing/:custId" component={CustomerLanding}></CustomerProtectedRoute>
            <CustomerProtectedRoute exact path="/customer/:custId/restaurant/:restId" component={CustomerRestComponent}></CustomerProtectedRoute>
            <CustomerProtectedRoute exact path="/customer/:custId/favourites" component={CustomerFavouritesList}></CustomerProtectedRoute>
            <CustomerProtectedRoute exact path="/customer/checkout/:custId" component={CheckoutComponent}></CustomerProtectedRoute>
            <CustomerProtectedRoute exact path="/customer/orders/:custId" component={CustomerOrders}></CustomerProtectedRoute>
            
          </Switch>
        </div>
      
    </Router>
  );
}

export default App;
