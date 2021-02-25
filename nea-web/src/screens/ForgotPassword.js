
  import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  View
} from "react-native";
import {LOAD_USER, LOAD_CARWASH} from '../actions/types'
import { createUserWithEmailAndPasswordHandler, getCarwashesForWasher } from "../services/firebaseServices"
import {checkUserStatus} from '../services/firebaseServices';
import {connect} from 'react-redux';
import {auth} from '../services/firebaseServices';
import {firestore} from '../services/firebaseServices';

import { getUserDocument } from '../services/firebaseServices'




const { width, height } = Dimensions.get("screen");
const image = { uri: "https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Flighter_background_wet.png?alt=media&token=e129172c-0b32-4f31-bcf3-6f7b2158bd9b" };

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onClick={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Login extends React.Component {
  
  state = {
    email: '',
    password: '',
    errorMessage: ''

  }
  constructor () {
    super();
    // console.ignoredYellowBox = ['Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.']
  }


  forgotPassword = () => {
    auth.sendPasswordResetEmail(this.state.email)
      .then(function (user) {
        alert('Please check your email...')
      }).catch(function (e) {
        console.log(e)
      })
  }



  render() {
    return (
      <DismissKeyboard>
        <div  middle>
          <StatusBar hidden />
          <img
            src={image}
            style={{ width, height, zIndex: 1 }}
          >
            <div  middle>
              <div style={styles.registerContainer}>
                <div  space="between">
                  <div  middle space="between" style={{paddingTop: 150}}>
                    <div center flex={0.9}>
                      <div  space="between">
                        <div>
                          <div style={{alignItems: 'center', marginBottom: 30}}>
                              <div
                                h5
                              >
                                  Cambiar Contraseña
                              </div>
                          </div>

                          <div
                            
                            style={{ marginBottom: 5 }}
                          >
                            <Input
                              color='black'
                              style={{borderColor:'#C6C6C6', borderWidth:2}}
                              placeholderTextColor="black"   
                              placeholder="Correo"
                              autoCapitalize = 'none'
                              textContentType='oneTimeCode'
                              onChangeText={text => this.setState({email: text})} 
                              value={this.state.email}
                            />
                          </div>

                          </div>
                        <div style={{textAlign: 'center'}}>
                        <div style={{color: 'red'}}>{this.state.errorMessage}</div>

                          <Button color="primary" 
                          onClick={this.forgotPassword}
                          color="black"
                          style={{marginBottom:  10 * 1.5}}
                          >
                            <div
                              size={14}
                              color="white"
                            >
                              Enviar Correo
                            </div>
                          </Button>
                          <div style={{flexDirection: "row"}}>
                            <Button
                              onClick={() => this.props.navigation.navigate("Onboarding")}
                            >
                                <div style={{padding:20}}> Regrese</div>
                            </Button>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ImageBackground>
        </div>
      </DismissKeyboard>
    );
  }
}

const styles = {
  registerContainer: {
    width: width * 0.9,
    
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: "white",
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  }
});


const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
};

export default connect(mapStateToProps)(Login);