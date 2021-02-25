import React from "react";
import { ScrollView, StyleSheet, Dimensions, View, Image, FlatList, ImageBackground, Alert } from "react-native";

import {connect} from 'react-redux';

import axios from 'axios';
import {ADD_PAYMENT_STATUS_TO_CARWASH, ADD_CARWASH_TO_USER,UPDATE_CAR_ON_USER, ADD_CARWASH_TO_WASHER, LOAD_CHAT} from '../actions/types'
import {updateUser, createCarwash, updateWasher, createChat, getChatDocument} from '../services/firebaseServices';

class Billing extends React.Component {

  deleteCar = async() => {

        Alert.alert(
          "Espera",
          "Si quieres cancelar tu orden, por favor llama a +52 1 686 362 3493",
          [
            {
              text: "OK",
              onClick: () => console.log("Ask me later pressed")
            },
          ],
          { cancelable: false }
        );
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <img src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Flighter_background_wet.png?alt=media&token=e129172c-0b32-4f31-bcf3-6f7b2158bd9b'}} style={styles.image}> */}
            { this.props.user.paymentMethod != null && 
            <div>
                        <div p style={{  marginTop:  10 *2,   marginLeft:  10 *1.5 }} color='black'>
                        Mèthodo de Pago
                   </div>
              <div style={{alignItems: 'center', marginBottom:  10 *2,}}>
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
                <Button
                  shadowless
                  onClick={()=> this.props.navigation.navigate('EditCard')}
                  style={{backgroundColor: 'black', shadowColor: 'black'}}
                  >
                  Cambiar
                  </Button>
              </div>
              </div>
            }
            <div p style={{  marginTop:  10 *2, marginBottom: 5, marginLeft:  10 *1.5 }} color='black'>
                 Subscripciones
            </div>
            <div style={{marginLeft:  10 *1.5, flexDirection: 'row'}}>
            <Button
                  onClick={()=> this.deleteCar()}
                  >
                        <div style={styles.cardblock5}>
                            <div className="row">
                            <div>
                                <img
                                src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Ftrash.png?alt=media&token=b5f09782-0eab-4f7e-942e-f5af5474e10c'}}
                                style={{height: 20, width: 20, marginLeft: 10}}
                                        />
                            </div>
                            <div style={{marginLeft: 20, justifyContent: 'center'}}>
                                <div p style={{color: 'black'}}>Cancelar Subscripciones</div>
                            </div>
                            </div>
                        </div>
                    </Button>
            </div>
               <FlatList
                    data={this.props.carwash.carwashes}
                    renderItem={({item}) =>
                    <div >
                        {(item.subscription == 'weekly-monthly') && 
                            <div style={{alignItems: 'center'}}>
                            <div style={styles.cardblock} >
                                <div>
                                <div  space="between">
                                    <div style={{marginLeft: 20}}>
                                        <div>
                                            <div style={{fontSize: 20, fontWeight: 'bold'}}>LAVAR CADA SEMANA </div>
                                            <div style={{fontSize: 20}}>Pago Mensual: ${item.price} empezó:{item.dateString}</div>
                                            {item.paymentStatus == 'paid' && 
                                              <div><div style={{fontSize: 15}}>Pagado</div></div>
                                            }
                                            {item.paymentStatus == 'unpaid' && 
                                              <div><div style={{fontSize: 15}}>No ha pagado, pago en efectivo</div></div>
                                            }
                                        </div>
                                        
                                    </div>
                                    <div >
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        }
                        {(item.subscription == 'weekly-yearly') && 
                            <div style={{alignItems: 'center'}}>
                            <div style={styles.cardblock} >
                                <div>
                                <div  space="between">
                                    <div style={{marginLeft: 20}}>
                                        <div>
                                            <div style={{fontSize: 20, fontWeight: 'bold'}}>LAVAR CADA SEMANA </div>
                                            <div style={{fontSize: 20}}>Pago Anual: ${item.price} empezó:{item.dateString}</div>
                                            {item.paymentStatus == 'paid' && 
                                              <div><div style={{fontSize: 15}}>Pagado</div></div>
                                            }
                                            {item.paymentStatus == 'unpaid' && 
                                              <div><div style={{fontSize: 15}}>No ha pagado, pago en efectivo</div></div>
                                            }
                                        </div>
                                        
                                    </div>
                                    <div >
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        }
                        {(item.subscription == 'monthly-yearly') && 
                            <div style={{alignItems: 'center'}}>
                            <div style={styles.cardblock} >
                                <div>
                                <div  space="between">
                                    <div style={{marginLeft: 20}}>
                                        <div>
                                        <div style={{fontSize: 20, fontWeight: 'bold'}}>LAVAR CADA MES </div>
                                        <div style={{fontSize: 20}}>Pago Anual: ${item.price} empezó:{item.dateString}</div>
                                        {item.paymentStatus == 'paid' && 
                                              <div><div style={{fontSize: 15}}>Pagado</div></div>
                                            }
                                            {item.paymentStatus == 'unpaid' && 
                                              <div><div style={{fontSize: 15}}>No ha pagado, pago en efectivo</div></div>
                                            }
                                        </div>
                                        
                                    </div>
                                    <div >
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        }
                        {(item.subscription == 'monthly-monthly') && 
                            <div style={{alignItems: 'center'}}>
                            <div style={styles.cardblock} >
                                <div>
                                <div  space="between">
                                    <div style={{marginLeft: 20}}>
                                        <div>
                                        <div style={{fontSize: 20, fontWeight: 'bold'}}>LAVAR CADA MES </div>
                                        <div style={{fontSize: 20}}>Pago Mensual: ${item.price} empezó:{item.dateString}</div>
                                        {item.paymentStatus == 'paid' && 
                                              <div><div style={{fontSize: 15}}>Pagado</div></div>
                                            }
                                            {item.paymentStatus == 'unpaid' && 
                                              <div><div style={{fontSize: 15}}>No ha pagado, pago en efectivo</div></div>
                                            }
                                        </div>

                                    </div>
                                    <div >
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        }

                    </div>
                    }/> 
                <div p style={{  marginTop:  10 *2, marginBottom: 5, marginLeft:  10 *1.5 }} color='black'>
                 Transaciones
               </div>
               <div style={{marginLeft:  10 *1.5, flexDirection: 'row'}}>

               <Button
                  onClick={()=> this.deleteCar()}
                  >
                        <div style={styles.cardblock5}>
                            <div className="row">
                            <div>
                                <img
                                src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Ftrash.png?alt=media&token=b5f09782-0eab-4f7e-942e-f5af5474e10c'}}
                                style={{height: 20, width: 20, marginLeft: 10}}
                                        />
                            </div>
                            <div style={{marginLeft: 20, justifyContent: 'center'}}>
                                <div p style={{color: 'black'}}>Cancelar Transaciones</div>
                            </div>
                            </div>
                        </div>
                    </Button>
            </div>
                <FlatList
                    data={this.props.carwash.carwashes}
                    renderItem={({item}) =>
                    <div style={{alignItems: 'center'}}>
                        {(item.subscription == 'one-time') && 
                            <div style={styles.cardblock2} >

                                    <div>
                                    <div  space="between">
                                        <div style={{marginLeft: 20}}>
                                            <div><div style={{fontSize: 20, fontWeight: 'bold'}}>Carro Lavado: ${item.price}</div></div>
                                            <div><div style={{fontSize: 15}}>{item.dateString}</div></div>
                                            {item.paymentStatus == 'paid' && 
                                              <div><div style={{fontSize: 15}}>Pagado</div></div>
                                            }
                                            {item.paymentStatus == 'unpaid' && 
                                              <div><div style={{fontSize: 15}}>No ha pagado, pago en efectivo</div></div>
                                            }

                                        </div>

                                        
                                        <div >
                                        
                                        </div>
                                    </div>
                                    </div>
                            </div>
                        }
                    </div>
                    }/> 

            
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
      margin: 3,
      paddingTop: 20,
      marginTop: 20,
      height:  10 * 9,
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
    margin: 3,
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
cardblock5: {
  width: 10 * 21,
  margin: 3,
  marginTop: 20,
  height:  10 * 2,
  backgroundColor: "#FFFFFF",
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
  
  export default connect(mapStateToProps)(Billing);