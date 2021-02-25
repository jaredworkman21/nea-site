import React from 'react';
import userReducer from './reducers/userReducer';
import {Provider} from 'react-redux';
import { combineReducers, createStore} from 'redux';
import {loadStripe} from '@stripe/stripe-js';
import washerReducer from './reducers/washerReducer';
import chatReducer from './reducers/chatReducer';
import carwashReducer from './reducers/carwashReducer';
import staticDataReducer from './reducers/staticDataReducer';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import history from './history';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import AddCar from './screens/AddCar';
import SelectCar from './screens/SelectCar';
import WashType from './screens/WashType';
import SubscriptionType from './screens/SubscriptionType';
import DateSelect from './screens/DateSelect';
import SubmitCarwash from './screens/SubmitCarwash';
import CardFormScreen from './screens/CardFormScreen';
import CarDetails from './screens/CarDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');


const allReducers = combineReducers({
  user: userReducer,
  washer: washerReducer,
  currentChat: chatReducer,
  carwash: carwashReducer,
  staticData: staticDataReducer,
})
const store = createStore(
  allReducers
);


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false,
  }
  async componentDidMount() {
    this.setState({ fontLoaded: true });
  }
  render() {
    // YellowBox.ignoreWarnings(['Setting a timer']);

      return (
          <Provider store={store}>
              <Router history={history}>
          <Switch>
              <Route exact path="/" component={Onboarding} />
              <Route path="/login" component={Login} />
              <Route  path="/registrar" component={Register} />
              <Route  path="/dashboard" component={Dashboard} />
              <Route  path="/add-car" component={AddCar} />
              <Route  path="/select-car" component={SelectCar} />
              <Route  path="/wash-type" component={WashType} />
              <Route  path="/subscription-type" component={SubscriptionType} />
              <Route  path="/date-select" component={DateSelect} />
              <Route  path="/submit-carwash" component={SubmitCarwash} />
              <Route  path="/card-form-screen" component={CardFormScreen} />
              <Route  path="/car-details" component={CarDetails} />

          </Switch>
        </Router>
        </Provider>
      );
  }
}