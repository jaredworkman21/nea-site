import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Input} from '@material-ui/core';

import {Link, withRouter} from 'react-router-dom';
import {getCarwashDocument, getUserDocument, updateCarwash, updateUser} from '../services/firebaseServices'
import { PayPalButton } from "react-paypal-button-v2";
import Header from '../components/Header';
import logo from '../assets/imgs/logo_black.png';
import lighter from '../assets/imgs/lighter_background_wet.png'
import check from '../assets/imgs/check.png';
import axios from 'axios';

class CheckoutPage extends Component {
  state ={
      user: {},
      carwash: {},
      subscription: true,
      subscriptionID: '',
      price: ""
  }
  submitCarwashToServer = async (carwash) => {
    axios({
      method:'POST',
      url: 'https://us-central1-nea-app-b1e8f.cloudfunctions.net/assignWash',
      data: {
        carwash: carwash
      },
    }).then(response => {
      console.log('d', response.data);
    });
  }
 
  render () {
    const updateUserInfo = async () => {

        //Edit Carwash
        let carwash = this.state.carwash;
        carwash.paymentStatus = 'paid';
        carwash.status = 'pending-approval';
        carwash.userId = this.state.user.uid;

        //Upoad Carwash
        const carwashId = await updateCarwash(carwash, 'payment');

        //submit carwash to washer
        await this.submitCarwashToServer(carwashId);

        
        //add that carwash to user
        let userInfo = this.state.user;
        userInfo.carwashIds.push(this.state.carwash.id);
        await updateUser(userInfo, 'carwashIds')

        //go to the final page
        this.props.history.push("/payment-success");
    }

    const { parameter1, parameter2 } = this.props.match.params;
    const getInfo = async() => {
        const carwash = await getCarwashDocument(parameter1);
        this.setState({carwash: carwash});
        if(carwash.subscription == 'one-time'){
            this.setState({subscription: false})
            const price = carwash.price;
            this.setState({price: price});
        }
        if(carwash.subscription == 'monthly-monthly'){
            if(carwash.car.car.size == "chico"){
                if(carwash.washType == "express"){
                    this.setState({subscriptionID: 'P-2GA27402NJ290181UMA7GYAA'});
                }
                else if(carwash.washType == "encerado"){
                    this.setState({subscriptionID: 'P-3M813046329589424MA7G2AI'});
                }
                else if(carwash.car.car.size == "detallado"){
                    this.setState({subscriptionID: 'P-70H06404040570116MA7G2MI'});
                }
                else if(carwash.car.car.size == "interior"){
                    this.setState({subscriptionID: 'P-51056819RX944364CMA7G27I'});
                }
                else if(carwash.car.car.size == "polished"){
                    this.setState({subscriptionID: 'P-67765509H79506609MA7G3NQ'});
                }
            }
            else if(carwash.car.car.size == "mediano"){
                if(carwash.washType == "express"){
                    this.setState({subscriptionID: 'P-59846759FE8536432MA7GYRI'});
                }
                else if(carwash.washType == "encerado"){
                    this.setState({subscriptionID: 'P-6JE66062TJ2238215MA7G6QQ'});
                }
                else if(carwash.car.car.size == "detallado"){
                    this.setState({subscriptionID: 'P-47Y86516DP699263KMA7G7EA'});
                }
                else if(carwash.car.car.size == "interior"){
                    this.setState({subscriptionID: 'P-1WC18026GF724604DMA7G7YY'});
                }
                else if(carwash.car.car.size == "polished"){
                    this.setState({subscriptionID: 'P-1WC18026GF724604DMA7G7YY'});
                }
            }
            else if(carwash.car.car.size == "grande"){
                if(carwash.washType == "express"){
                    this.setState({subscriptionID: 'P-78H88161HW124580XMA7GY2Y'});
                }
                else if(carwash.washType == "encerado"){
                    this.setState({subscriptionID: 'P-0837619768863601GMA7HAII'});
                }
                else if(carwash.car.car.size == "detallado"){
                    this.setState({subscriptionID: 'P-5JL52409HR583530TMA7HARI'});
                }
                else if(carwash.car.car.size == "interior"){
                    this.setState({subscriptionID: 'P-2HC30873B3447142AMA7HBAA'});
                }
                else if(carwash.car.car.size == "polished"){
                    this.setState({subscriptionID: 'P-2HC30873B3447142AMA7HBAA'});
                }
            }
        }
        else if (carwash.subscription == 'weekly-monthly'){
            if(carwash.car.car.size == "chico"){
                if(carwash.washType == "express"){
                    this.setState({subscriptionID: 'P-9DY64250UA3995240MA7HCPA'});
                }
                else if(carwash.washType == "encerado"){
                    this.setState({subscriptionID: 'P-0C70389648382604YMA7HDLY'});
                }
                else if(carwash.car.car.size == "detallado"){
                    this.setState({subscriptionID: 'P-88H62329DC604914XMA7HDTQ'});
                }
                else if(carwash.car.car.size == "interior"){
                    this.setState({subscriptionID: 'P-82296547PW041360UMA7HD3Q'});
                }
                else if(carwash.car.car.size == "polished"){
                    this.setState({subscriptionID: 'P-82296547PW041360UMA7HD3Q'});
                }
            }
            else if(carwash.car.car.size == "mediano"){
                if(carwash.washType == "express"){
                    this.setState({subscriptionID: 'P-5RD84368FM330691KMA7HEOY'});
                }
                else if(carwash.washType == "encerado"){
                    this.setState({subscriptionID: 'P-2J2175494P676311SMA7HEYQ'});
                }
                else if(carwash.car.car.size == "detallado"){
                    this.setState({subscriptionID: 'P-289428869S1263224MA7HFCA'});
                }
                else if(carwash.car.car.size == "interior"){
                    this.setState({subscriptionID: 'P-86J40718VV940562KMA7HFKI'});
                }
                else if(carwash.car.car.size == "polished"){
                    this.setState({subscriptionID: 'P-86J40718VV940562KMA7HFKI'});
                }
            }                
            else if(carwash.car.car.size == "grande"){
                if(carwash.washType == "express"){
                    this.setState({subscriptionID: 'P-2JY02061KY609754SMA7HFZA'});
                }
                else if(carwash.washType == "encerado"){
                    this.setState({subscriptionID: 'P-8GH75558F7790994TMA7HGDY'});
                }
                else if(carwash.car.car.size == "detallado"){
                    this.setState({subscriptionID: 'P-04X91275A0866341HMA7HGNA'});
                }
                else if(carwash.car.car.size == "interior"){
                    this.setState({subscriptionID: 'P-7C517371N0279381FMA7HG4Y'});
                }
                else if(carwash.car.car.size == "polished"){
                    this.setState({subscriptionID: 'P-7C517371N0279381FMA7HG4Y'});
                }
            }
        }
        const user = await getUserDocument(parameter2);
        this.setState({user: user});
    }
    return (

<div  style={{textAlign: 'center'}}>
  <div style={{ backgroundImage: `url(${lighter})`, paddingTop: 100}} className="new-banner1">
    <div  style={{textAlign: 'center'}}>
      <div style={styles.registerContainer} className="register-container">
        {/* <img src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Flighter_background_wet.png?alt=media&token=e129172c-0b32-4f31-bcf3-6f7b2158bd9b'}} style={styles.image}> */}
            <h3 style={{  marginLeft:  10 *3 }} color='black'>
                 Realizar el pago
               </h3>
               { this.state.user.uid != null && 
               <div>
                        <div style={{alignItems: 'center'}}>
                        <div >
                            <div style={{alignItems: 'center'}}>
                                <h4 style={{color: '#286AEC'}}>${this.state.carwash.price}</h4>
                                <div p style={{  marginBottom:  10 / 2, marginTop:  10 *1 }} color='black'>
                                    Pago total
                                </div>
                            </div>
                            <div className="row" style={{marginTop: 40}}>
                                <div className="col-4 col-md-4" >
                                <div  color='black'>Fecha</div>
                                <div
                                    size={15}
                                    color="#525F7F"
                                    style={{ marginBottom: 4 }}
                                >
                                    {this.state.carwash.dateString}
                                </div>
                                </div>
                                <div className="col-4 col-md-4" >
                                <div >
                                        <img
                                        src={check}
                                        style={{height: 50, width: 50}}
                                    />

                                    </div>
                                </div>
                                <div className="col-4 col-md-4" >
                                <div  size={12} color='black'>Tiempo</div>
                                        <div
                                        color="#525F7F"
                                        size={15}
                                        style={{ marginBottom: 4}}
                                        >
                                        {this.state.carwash.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div p style={{  marginTop:  10 *2, marginLeft:  10 *3 }} color='black'>
                        Mèthodo de Pago
                        </div>
                        </div>
               }

            <div style={{alignItems: 'center'}}>
                <img 
                    style={{  height: 50 }}
                    src={logo}
                />
            </div>
          {this.state.user.uid == null &&
          <div style={{width: '100%', textAlign: 'center'}}>
            <Button 
            style={{backgroundColor: 'black', color: 'white', marginTop: 100, textAlign: 'center'}}
            onClick={() => getInfo()}>
                Continuar
            </Button>
            </div>
          }

        {(this.state.user.uid != null && !this.state.subscription) && 
            <div style={{marginTop: 100}}>
                    <PayPalButton
                        createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                            amount: {
                                currency_code: "MXN",
                                value: this.state.price
                                }
                            }],
                            // application_context: {
                            //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                            // }
                        });
                        }}
                        onApprove={(data, actions) => {
                            // Capture the funds from the transaction
                            return actions.order.capture().then(function(details) {
                              // Show a success message to your buyer
                              alert("Gracias por tú pago " + details.payer.name.given_name);
                              updateUserInfo();
                              // OPTIONAL: Call your server to save the transaction
                              return fetch("/paypal-transaction-complete", {
                                method: "post",
                                body: JSON.stringify({
                                  orderID: data.orderID
                                })
                              });
                            });
                        }}
                        options={{
                            currency: "MXN",
                            clientId: "ASjPTH_16m2iRLSfm3HHSWSwWTlbRKAiSkVvkghYCEXz8yVcxLHQl47NUZWXHMOdoZ2kq9EUkSGSGIeA"
                        }}
                    />
            </div>
        }

        {(this.state.user.uid != null && this.state.subscription) && 
            <div style={{marginTop: 100}}>
                <PayPalButton
                        createSubscription={(data, actions) => {
                        return actions.subscription.create({
                            plan_id: this.state.subscriptionID
                        });
                        }}
                        onApprove={(data, actions) => {
                        // Capture the funds from the transaction
                        return actions.subscription.get().then(function(details) {
                            // Show a success message to your buyer
                            alert("Gracias por tu pago");
                            updateUserInfo();
                            // OPTIONAL: Call your server to save the subscription
                            return fetch("/paypal-subscription-complete", {
                            method: "post",
                            body: JSON.stringify({
                                orderID: data.orderID,
                                subscriptionID: data.subscriptionID
                            })
                            });
                        });
                        }}
                        options={{
                            vault: true,
                            currency: "MXN",
                            clientId: "ASjPTH_16m2iRLSfm3HHSWSwWTlbRKAiSkVvkghYCEXz8yVcxLHQl47NUZWXHMOdoZ2kq9EUkSGSGIeA"
                        }}
                    /> 
            </div>
        }
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
      flexDirection: "column",
    },
    registerContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 50, 
      shadowColor: "black",
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
      overflow: "hidden"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    cardblock: {
      width: 10 * 20,
      paddingTop: 20,
      marginTop: 20,
      height:  10 * 15,
      backgroundColor: "white",
      borderRadius: 10,
      shadowColor: '#C0C0C0',
      shadowOffset: { width: .5, height: 1.5 },
      shadowOpacity: 0.9,
      shadowRadius:2,  
      elevation: 1,
  },
  cardblock2: {
    width: 10 * 20,
    marginTop: 20,
    height:  10 * 5,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: '#C0C0C0',
    shadowOffset: { width: .5, height: 1.5 },
    shadowOpacity: 0.9,
    shadowRadius:2,  
    elevation: 1,
},
    padded: {
      paddingHorizontal:  10 * 2,
      zIndex: 3,
      position: "absolute",

    },
    button: {
width:  100,
      height:  10 * 3,
      shadowRadius: 0,
      shadowOpacity: 0
    },
    pro: {
      backgroundColor: 'black',
      paddingHorizontal: 8,
      marginLeft: 3,
      borderRadius: 4,
      height: 22,
      marginTop: 15
    },
    gradient: {
      zIndex: 1,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 66
    }
  }

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }

};


export default withRouter(connect(mapStateToProps)(CheckoutPage));