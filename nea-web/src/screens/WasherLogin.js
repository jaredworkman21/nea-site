import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import {LOAD_CARWASH, LOAD_WASHER} from '../actions/types'
import { createUserWithEmailAndPasswordHandler, getWasherDocument } from "../services/firebaseServices"
import {connect} from 'react-redux';
import {auth} from '../services/firebaseServices';
import {firestore} from '../services/firebaseServices';


import {  getCarwashesForWasher} from '../services/firebaseServices'

const { width, height } = Dimensions.get("screen");
const image = { uri: "https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Flighter_background_wet.png?alt=media&token=e129172c-0b32-4f31-bcf3-6f7b2158bd9b" };

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onClick={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class WasherLogin extends React.Component {
  
  state = {
    email: '',
    password: '',
    errorMessage: ''

  }


  handleErrors () {
    if(this.state.email == ''){
      this.setState({errorMessage: "Por favor agregar su correo"})
      return false;
    }
    if(this.state.password == ''){
      this.setState({errorMessage: "Por favor agregar su contrasena"})
      return false;
    }
    return true
  }

  loadUser = async () => {
    if(this.handleErrors())
    {
      const userAuth = await auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
        console.error("Error signing in with password and email", error);
      });
      let washer = auth.currentUser;
      let washerData = await getWasherDocument(washer.uid)
      this.props.dispatch({
              type: LOAD_WASHER,
              payload: {
              washer: washerData
              }
          });
        let carwashes = [];
        let index = 0;
        console.log('w', washerData)
        if(washerData.carwashIds.length == 0){
          this.loadWork([]);
        }
        washerData.carwashIds.forEach(async (id) => {
          const carwashRef = await firestore.doc(`carwash/${id}`).get();
          const data = carwashRef.data();
          index += 1;
          carwashes.push(data)
          if(index == washerData.carwashIds.length){
            this.loadWork(carwashes);
          }
      })
            //STORING CREDS
            try {
              await AsyncStorage.setItem('@loginCredsWasher', washer.uid)
            } catch (e) {
              // saving error
            }
    }
}

loadWork (carwashes) {
  console.log('washes: ', carwashes)
  this.props.dispatch({
    type: LOAD_CARWASH,
    payload: {
      carwashes: carwashes
    }
  });
  this.props.navigation.navigate('Work')
  }
  render() {
    return (
      <DismissKeyboard>
        <div  middle>
          <StatusBar hidden/>
          <img
            src={image}
            style={{ width, height, zIndex: 1 }}
          >
            <div  middle>
              <div style={styles.registerContainer}>
                <div  space="between">
                  <div middle space="between" style={{paddingTop: 150}}>
                    <div center flex={0.9}>
                      <div  space="between">
                        <div>
                          <div style={{alignItems: 'center', marginBottom: 30}}>
                              <div
                                h5
                              >
                                  Lavador Iniciar Sesión
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
                              onChangeText={text => this.setState({email: text})} 
                              value={this.state.email}
                            />
                          </div>
                          <div >
                            <Input
                              color='black'
                              style={{borderColor:'#C6C6C6', borderWidth:2}}
                              placeholderTextColor="black"   
                              placeholder="Contrasena"
                              secureTextEntry={true}
                              autoCapitalize = 'none'
                              onChangeText={text => this.setState({password: text})} 
                              value={this.state.password}
                            />
                          </div>
                          </div>
                        <div style={{textAlign: 'center'}}>
                        <div style={{color: 'red'}}>{this.state.errorMessage}</div>

                          <Button color="primary" 
                          onClick={this.loadUser}
                          color="black"
                          style={{marginBottom:  10 * 1.5}}
                          >
                            <div
                              size={14}
                              color="white"
                            >
                               Iniciar Sesión
                            </div>
                          </Button>
                          <div style={{flexDirection: "row"}}>
                            <Button
                              onClick={() => this.props.navigation.navigate("RegisterWasher")}
                            >
                                <div style={{fontWeight: 'bold', padding: 10}}> Registrar </div>
                            </Button>
                            <Button
                              onClick={() => this.props.navigation.navigate("Onboarding")}
                            >
                                <div style={{padding: 10}}> Regrese</div>
                            </Button>
                          </div>
                          <Button
                              onClick={() => this.props.navigation.navigate("ForgotPassword")}
                            >
                                <div style={{fontWeight: 'bold', padding:20}}>Olvidé Contraseña </div>
                            </Button>
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
    washer: state.washer,
  }
};

export default connect(mapStateToProps)(WasherLogin);