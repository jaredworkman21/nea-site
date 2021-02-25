import React, { PureComponent } from 'react'
// import stripe from 'tipsi-stripe'
import {Button} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import { ADD_PAYMENT_METHOD_TO_USER} from '../actions/types'
import {updateUser, createCarwash, updateWasher, createChat, getChatDocument} from '../services/firebaseServices';


class CardFormScreen extends PureComponent {
  static title = 'Card Form'

  state = {
    loading: false,
    token: null,
  }
  makePayment () {
    
  }
  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null })
      // const token = await stripe.paymentRequestWithCardForm({
      //   Only iOS support this options
      //   smsAutofillDisabled: true,
      //   requiredBillingAddressFields: 'full',
      //   prefilledInformation: {
      //     billingAddress: {
      //       name: '',
      //       line1: '',
      //       line2: '',
      //       city: '',
      //       state: '',
      //       country: '',
      //       postalCode: '',
      //       email: '',
      //     },
      //   },
      // })
      axios({
        method:'POST',
        url: 'https://us-central1-nea-app-b1e8f.cloudfunctions.net/createCustomer',
        data: {
          empty: ''
        },
      }).then(response => {
        this.props.dispatch({
          type: ADD_PAYMENT_METHOD_TO_USER,
          payload: {
                paymentMethod: this.state.token,
                customer: response.data,
          }
        });
        this.nextPaso(this.state.token, response.data)
      });

    } catch (error) {
      this.setState({ loading: false })
    }
  }
  nextPaso = async (token, customer) => {
    axios({
      method:'POST',
      url: 'https://us-central1-nea-app-b1e8f.cloudfunctions.net/createCustomerSource',
      data: {
        customer: customer,
        tokenId: token.tokenId
      },
    }).then(response => {
      this.props.dispatch({
        type: ADD_PAYMENT_METHOD_TO_USER,
        payload: {
              paymentMethod: token,
              customer: customer,
        }
      });
      this.finalPaso(token)
    });
  }
  finalPaso = async (token) => {
    await updateUser(this.props.user, 'paymentMethod');
    this.setState({ loading: false, token })
    this.props.history.push("/sumbit-carwash");
  }


  render() {
    const { loading, token } = this.state

    return (
      <div style={styles.container}>
        {this.state.token == null &&
          <div>
                <div style={{marginTop: 30}}>
                <img
                    style={{height:   10 * 20, width:   10 * 25, borderTopLeftRadius: 50}}
                    src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fcreditcard.png?alt=media&token=33cfdc90-f0d1-4b02-9ef1-4580a2ff55ef'}}
              />
                  </div>
                <div style={{marginTop: 30, alignItems: 'center'}}>
                <Button
                    text="Agregar Tarjeta"
                    loading={loading}
                    style={styles.buttonStyle}
                    onClick={this.handleCardPayPress}
                  />
                  </div>

            </div>
          }
        <div
          style={styles.token}>
          {token &&
          <div>

            <Button
              loading={loading}
              text="Completar la Compra"
              style={styles.buttonStyle}
              onClick={this.makePayment}
            >
            </Button>
            </div>
          }
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
