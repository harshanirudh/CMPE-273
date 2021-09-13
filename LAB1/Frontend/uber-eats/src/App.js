
import './App.css';
import NavComponent from './SharedComponents/NavComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RestaurantSignup from './RestaurantComponent.js/RestaurantSignup';
import CustomerSignup from './CustomerComponent/CustomerSignup';
import LoginComponent from './SharedComponents/LoginComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <NavComponent></NavComponent>
        <div className="content">
          <Switch>
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
