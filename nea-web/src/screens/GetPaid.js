import React from "react";
import { ScrollView, StyleSheet, Dimensions, View, Image, FlatList, ImageBackground, Linking } from "react-native";
import {connect} from 'react-redux';

import axios from 'axios';
import LoadingButton from '../components/Button'

import {ADD_STRIPE_ACCOUNT_TO_WASHER, ADD_CARWASH_TO_USER,UPDATE_CAR_ON_USER, ADD_CARWASH_TO_WASHER, LOAD_CHAT} from '../actions/types'
import {updateUser, createCarwash, updateWasher, createChat, getChatDocument} from '../services/firebaseServices';


class GetPaid extends React.Component {

    state = {
        loading: false,
        token: 0,
        errorMessage: '',
        clabe: '',
        nameOnBank: '',
        errorMessage: '',
    }


    getStripeLink = async (stripeAccount) => {
        axios({
            method:'POST',
            url: 'https://us-central1-nea-app-b1e8f.cloudfunctions.net/createAccountLink',
            data: {
                stripeAccount: stripeAccount
            },
        }).then(response => {
            this.setState({loading: false});
            this.setState({token: 1});
            Linking.openURL(response.data.url);
        });
        this.props.dispatch({
            type: ADD_STRIPE_ACCOUNT_TO_WASHER,
            payload: {
                  stripeAccount: stripeAccount.id,
            }
          });
        updateWasher(this.props.washer, 'stripeAccount');
    }

    createBank = async () => {
        axios({
            method:'POST',
            url: 'https://us-central1-nea-app-b1e8f.cloudfunctions.net/createBank',
            data: {
                account_id: this.props.washer.stripeAccount,
                name: this.state.nameOnBank,
                clabe: '000000001234567897'
                // clabe: this.state.clabe,
            },
        }).then(response => {
            if(response.data.details_submitted){
                this.props.navigation.navigate('Capacitacion');
            }
            else{
                this.setState({errorMessage: 'No has completado tu forma de pago'})
            }
        });
    }

    getAccount = async () => {
        axios({
            method:'POST',
            url: 'https://us-central1-nea-app-b1e8f.cloudfunctions.net/getAccount',
            data: {
                account_id: this.props.washer.stripeAccount
            },
        }).then(response => {

            if(response.data.details_submitted){
              this.setState({token: 2});
            }
            else{
                this.setState({errorMessage: 'No has completado tu forma de pago. Debes crear nuevo link y crear cuenta en el sitio web Stripe'})
            }
        });
    }


    SignUpWithStripe = async () => {
        axios({
            method:'POST',
            url: 'https://us-central1-nea-app-b1e8f.cloudfunctions.net/createAccount',
            data: {
                email: this.props.washer.email
            },
        }).then(response => {
            this.getStripeLink(response.data);
        });
    }
  
  render() {
    const { loading, token } = this.state
    return (
        <div style={styles.container}>
              {token == 2 &&
                <div>
                        <div>
                          <div style={{alignItems: 'center', marginBottom: 30}}>
                              <div
                                h5
                              >
                                  Login
                              </div>
                          </div>
                          <div
                            
                            style={{ marginBottom: 5 }}
                          >
                            <Input
                              color='black'
                              style={{borderColor:'#C6C6C6', borderWidth:2}}
                              placeholderTextColor="black"   
                              placeholder="Nombre en Cuenta de Banco"
                              autoCapitalize = 'none'
                              textContentType='oneTimeCode'
                              onChangeText={text => this.setState({nameOnBank: text})} 
                              value={this.state.nameOnBank}
                            />
                          </div>
                          <div >
                          <Input
                              color='black'
                              style={{borderColor:'#C6C6C6', borderWidth:2}}
                              placeholderTextColor="black"   
                              placeholder="CLABE"
                              autoCapitalize = 'none'
                              secureTextEntry={true}
                              textContentType='oneTimeCode'
                              onChangeText={text => this.setState({clabe: text})} 
                              value={this.state.clabe}
                            />
                          </div>
                          <Button
                              text="Agregar Banco"
                              loading={loading}
                              style={styles.buttonStyle}
                              onClick={()=> this.createBank()}
                          />
                          </div>
                          
                          </div>
                    }
        {token == 0 &&
          <div>
                <div style={{marginTop: 30}}>
                <img
                    style={{height:   10 * 20, width:   10 * 25, borderTopLeftRadius: 50}}
                    src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fcreditcard.png?alt=media&token=33cfdc90-f0d1-4b02-9ef1-4580a2ff55ef'}}
              />
                  </div>
                <div style={{marginTop: 30, alignItems: 'center'}}>
                    <Button
                         shadowless
                        style={styles.buttonStyle}
                        onClick={()=> this.SignUpWithStripe()}
                    >Forma De Recibir Pagos
                      </Button>
                </div>

            </div>
          }
        <div
          style={styles.token}>
          {token == 1 &&
          <div>

            <Button
              shadowless
              style={styles.buttonStyle}
               onClick={() => this.getAccount()}
            >
              Verificar Tu Cuenta
            </Button>
            <div>{this.state.errorMessage}</div>
            <Button
              shadowless
              style={styles.buttonStyle}
               onClick={() => this.SignUpWithStripe()}
            >
              Crear Nuevo Link
            </Button>
            </div>
          }
        </div>
      </div>

    );
  }
}

const styles = {
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    cardblock: {
      width: 10 * 20,
      paddingTop: 20,
      marginTop: 20,
      height:  10 * 7,
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
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      },
      buttonStyle: {
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 0,
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
  });

  const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      carwash: state.carwash,
      washer: state.washer.washer
    }
  };
  
  export default connect(mapStateToProps)(GetPaid);