import React, { PureComponent } from 'react'
// import stripe from 'tipsi-stripe'
import {Button} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import { ADD_PAYMENT_METHOD_TO_USER} from '../actions/types'
import {updateUser, createCarwash, updateWasher, createChat, getChatDocument} from '../services/firebaseServices';
import creditcard from '../assets/imgs/creditcard.png';
import Header from '../components/Header';
import lighter from '../assets/imgs/lighter_background_wet.png'
import {Elements, CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CardMinimal from './CardMinimal';
import StripeExample from './StripeExample';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');


class CardFormScreen extends PureComponent {
  static title = 'Card Form'

  state = {
    loading: false,
    token: null,
  }
  makePayment () {
    
  }
  
  


  render() {
    const { loading, token } = this.state

    return (
      <div style={styles.container}>
        <div  style={{textAlign: 'center'}}>
          <div style={{ backgroundImage: `url(${lighter})`, }} className="new-banner1">
            <div  style={{textAlign: 'center', }}>
              <div style={{backgroundColor: 'white', marginBottom: 30}}>
              <Header/>
              </div>

              <div style={styles.registerContainer} className="register-container2">
        {this.state.token == null &&
          <div>
                <div style={{marginTop: 30}}>
                <img
                    style={{height:   10 * 20, width:   10 * 25, borderTopLeftRadius: 50}}
                    src={creditcard}
              />
                  </div>
                  <div className="checkout-container">
                      
                      <StripeExample/>

                    </div>
                 
                  
                                  
                <div style={{marginTop: 30, alignItems: 'center'}}>

                  </div>

            </div>
          }
        <div
          style={styles.token}>
          {token &&
          <div>

            <Button
              style={{color: 'white', backgroundColor: 'black'}}
              onClick={this.makePayment}
            >
              Completar la Compra
            </Button>
            </div>
          }
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  registerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  buttonStyle: {
    backgroundColor: 'black',
    width:  10 * 15
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    carwash: state.carwash,
    washer: state.washer.washer
  }
};

export default withRouter(connect(mapStateToProps)(CardFormScreen));
