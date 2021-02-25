import React from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import {ADD_PAYMENT_STATUS_TO_CARWASH, ADD_CARWASH, ADD_CARWASH_TO_USER,UPDATE_CAR_ON_USER, ADD_CARWASH_TO_WASHER, LOAD_CHAT} from '../actions/types'
import {updateUser, createCarwash, updateWasher, createChat, getChatDocument} from '../services/firebaseServices';

import {Button} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';


class SubmitCarwash extends React.Component {
  state = {
    loading: false
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

  makePayment = async () =>{
    if(this.state.loading)
    {
      return;
    }
    this.setState({loading: true});
    if(this.props.carwash.currentCarwash.cash){
      this.props.dispatch({
        type: ADD_PAYMENT_STATUS_TO_CARWASH,
        payload: {
              paymentStatus: 'unpaid'
        }
      });
      this.props.carwash.currentCarwash.status = 'pending-approval';
      this.props.carwash.currentCarwash.userId = this.props.user.uid;
      const carwashId = await createCarwash(this.props.carwash.currentCarwash);
      const currentCar = carwashId;
      await this.submitCarwashToServer(carwashId);
      this.props.dispatch({
        type: ADD_CARWASH_TO_USER,
        payload: {
              carwashId: carwashId.id
        }
      });
      this.props.dispatch({
        type: ADD_CARWASH,
        payload: {
              carwash: carwashId
        }
      });
      currentCar.car.car.carwash = {
        id: carwashId.id,
        type: carwashId.washType,
        subscription: carwashId.subscription,
        dateString: carwashId.dateString,
        time: carwashId.time
      }
      this.props.dispatch({
        type: UPDATE_CAR_ON_USER,
        payload: {
              car: currentCar.car
        }
      });
      await updateUser(this.props.user, 'carwashIds')

      this.setState({loading: false});
      this.props.history.push("/dashboard");
    }
    else {
      
    
      this.setState({loading:true})
      axios({
        method:'POST',
        url: 'https://us-central1-nea-app-b1e8f.cloudfunctions.net/completePaymentWithStripe',
        data: {
          amount: this.props.carwash.currentCarwash.price * 100,
          currency: 'mxn',
          cardId: this.props.user.paymentMethod.card.cardId,
          customerId: this.props.user.customer.id,
          subscription: this.props.carwash.currentCarwash.subscription
        },
      }).then(response => {
        if(response.data.paid){

          this.props.dispatch({
            type: ADD_PAYMENT_STATUS_TO_CARWASH,
            payload: {
                  paymentStatus: 'paid'
            }
          });

        }
        
        this.setState({loading: false});
      });

      this.props.carwash.currentCarwash.status = 'pending-approval';
      this.props.carwash.currentCarwash.userId = this.props.user.uid;
      console.log(this.props.user.uid);
      const carwashId = await createCarwash(this.props.carwash.currentCarwash);
      console.log(carwashId.id);
      const currentCar = carwashId;
      await this.submitCarwashToServer(carwashId);
          this.props.dispatch({
            type: ADD_CARWASH_TO_USER,
            payload: {
                  carwashId: carwashId.id
            }
          });
          this.props.dispatch({
            type: ADD_CARWASH_TO_WASHER,
            payload: {
                  carwashId: carwashId.id
            }
          });
          currentCar.car.car.carwash = {
            id: carwashId.id,
            type: carwashId.washType,
            subscription: carwashId.subscription,
            dateString: carwashId.dateString,
            time: carwashId.time
          }
          this.props.dispatch({
            type: UPDATE_CAR_ON_USER,
            payload: {
                  car: currentCar.car
            }
          });
          const chatId = await createChat(
            {
              userName: this.props.user.names,
              washerName: this.props.carwash.currentCarwash.washer.names,
              userUrl: this.props.user.profileUrl,
              washerUrl: this.props.carwash.currentCarwash.washer.profileUrl,
              messages: [
                {
                  id: 1,
                  lavador: true,
                  message: `Gracias por solicitar mi ayuda, te voy a contactar en los proximos horas`,
                  time: `10:31 PM`
                },
                
              ],
              userId: this.props.user.uid,
              washerId: this.props.carwash.currentCarwash.washer.uid
            }
          );
          // const chat = await getChatDocument(chatId);
          // this.props.dispatch({
          //   type: LOAD_CHAT,
          //   payload: {
          //         chat: chatId
          //   }
          // });
          // this.props.user.chatIds.push(chatId);

          // updateUser(this.props.user, 'carwashIds-chat');

          console.log('here');
          await updateUser(this.props.user, 'carwashIds')
          this.setState({loading: false});
          this.props.history.push("/dashboard");

      }
  };
  render() {
    console.log('test3:', this.props.carwash.carwashes.length);
    return (
      <div style={styles.container}>
        {/* <img src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Flighter_background_wet.png?alt=media&token=e129172c-0b32-4f31-bcf3-6f7b2158bd9b'}} style={styles.image}> */}
            <div p style={{  marginTop:  10 *2, marginLeft:  10 *3 }} color='black'>
                 Realizar el pago
               </div>
            <div style={{alignItems: 'center'}}>
              <div style={styles.cardblock} >
                    <div style={{alignItems: 'center'}}>
                      <div p style={{  marginBottom:  10 / 2, marginTop:  10 *1 }} color='black'>
                          Pago total
                      </div>
                      <div h2 style={{color: '#286AEC'}}>${this.props.carwash.currentCarwash.price}</div>
                    </div>
                    <div style={{padding: 30}}>
                      <div  space="between">
                        <div >
                        <div  size={12} color='black'>Fecha</div>

                          <div
                            size={15}
                            color="#525F7F"
                            style={{ marginBottom: 4 }}
                          >
                            {this.props.carwash.currentCarwash.dateString}
                          </div>
                        </div>
                        <div >
                            <img
                            src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fcheck.png?alt=media&token=2bcf402a-0cd8-412b-9ce7-05ea16ff0620'}}
                            style={{height: 50, width: 50}}
                          />

                        </div>
                        
                        <div >
                          <div  size={12} color='black'>Tiempo</div>
                            <div
                              color="#525F7F"
                              size={15}
                              style={{ marginBottom: 4}}
                            >
                            {this.props.carwash.currentCarwash.time}
                            </div>
                        </div>
                      </div>
                    </div>
            </div>
            </div>
            <div p style={{  marginTop:  10 *2, marginLeft:  10 *3 }} color='black'>
                 Mèthodo de Pago
               </div>
            <div style={{alignItems: 'center'}}>
            {!this.props.carwash.currentCarwash.cash && 
              <div>
                <div style={styles.cardblock2}>
                  <div className="row">
                    <div>
                      <img
                                src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fcard.png?alt=media&token=641187b6-00b3-4998-8a6e-fe21921b838c'}}
                                style={{height: 50, width: 70, marginLeft: 20}}
                              />
                    </div>
                    <div style={{marginLeft: 20}}>
                        <div p>Tarjeta </div>
                        <div>**** **** **** {this.props.user.paymentMethod.card.last4}</div>
                    </div>
                  </div>
                </div>
              </div>
            }
              <Button
                        shadowless
                        style={{backgroundColor: 'black', width:  10 * 18, marginTop: 50}}
                          onClick={() =>  this.makePayment()}
                        >
                          <div style={{color:'white', fontWeight: 'bold'}}
                          >
                            Enviar
                          </div>
                        </Button>
                        {/* <Button
                              onClick={() => this.props.navigation.dispatch(CommonActions.reset({
                                index: 1,
                                routes: [
                                  { name: 'Home' },
                                ],
                              })
                              )}
                            >
                                <div>Inicio</div>
                            </Button> */}
            </div>
            
        {/* </ImageBackground> */}
       </div>
    );
  }
}

const styles = {
    container: {
      flex: 1,
      flexDirection: "column",
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
      user: state.user.user,
      carwash: state.carwash,
    }
  };
  
  export default withRouter(connect(mapStateToProps)(SubmitCarwash));