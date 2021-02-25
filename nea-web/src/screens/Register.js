import React from "react";
import {LOAD_USER} from '../actions/types'
import { createUserWithEmailAndPasswordHandler } from "../services/firebaseServices"
import { getUserDocument} from '../services/firebaseServices';
import {connect} from 'react-redux';
import {Button, Input, Checkbox} from '@material-ui/core';

const image = { uri: "https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Flighter_background_wet.png?alt=media&token=e129172c-0b32-4f31-bcf3-6f7b2158bd9b" };

class Register extends React.Component {
  
  state = {
    names: '',
    lastNames: '',
    email: '',
    password: '',
    phone: '',
    errorMessage: ''
  }


  handleErrors () {
    if(this.state.names == ''){
      this.setState({errorMessage: "Por favor agregar su nombre"})
      return false;
    }
    if(this.state.phone == ''){
      this.setState({errorMessage: "Por favor agregar su numero"})
      return false;
    }
    if(this.state.lastNames ==''){
      this.setState({errorMessage: "Por favor agregar su apellidos"})
      return false;
    }
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

  createUser = async () =>{
    if(this.handleErrors())
    {
      const userTemp = await createUserWithEmailAndPasswordHandler(this.state.names, this.state.lastNames, this.state.email, this.state.password, this.state.phone);
      if(userTemp.errorMessage != null){
        this.setState({errorMessage: 'tu correo esta mal formado o ya usado: ' + userTemp.errorMessage})
        return;
      }
      const user = userTemp.user
      this.props.dispatch({
          type: LOAD_USER,
          payload: {
          user: user
          }
      });
      if(user.uid != null){
        //STORING CREDS
        try {
          // await AsyncStorage.setItem('@loginCreds', user.uid);
        } catch (e) {
          // saving error
        }
        this.props.navigation.navigate('App')
      }
    }
  }
  gotToURL() {
    // Linking.openURL('https://www.sympact.tech/privacy-policy');
  }

  render() {
    return (
        <div  middle>
          <img
            src={image}
            style={{  zIndex: 1 }}
          />
            <div  middle>
              <div style={styles.registerContainer}>
                <div  space="between">
                  <div middle space="between" style={{paddingTop: 40}}>
                    <div center flex={0.9}>
                      <div  space="between">
                        <div>
                          <div style={{alignItems: 'center', marginBottom: 5}}>
                              <div
                                h5
                              >
                                  Registrese
                              </div>
                          </div>
                          <div
                            
                          >
                            <Input
                              color='black'
                              style={{borderColor:'#C6C6C6', borderWidth:2}}
                              placeholderTextColor="black"
                              placeholder="Nombres"
                              onChangeText={text => this.setState({names: text})} 
                              value={this.state.firstName}
                            />
                          </div>
                          <div
                            
                          >
                            <Input
                              color='black'
                              style={{borderColor:'#C6C6C6', borderWidth:2}}
                              placeholderTextColor="black"                              
                              placeholder="Apellidos"
                              onChangeText={text => this.setState({lastNames: text})} 
                              value={this.state.lastName}
                              
                            />
                          </div>
                          <div
                            
                          >
                            <Input
                              color='black'
                              style={{borderColor:'#C6C6C6', borderWidth:2}}
                              placeholderTextColor="black"   
                              placeholder="Correo"
                              onChangeText={text => this.setState({email: text})} 
                              value={this.state.email}
                            />
                          </div>
                          <div
                            
                          >
                            <Input
                              color='black'
                              style={{borderColor:'#C6C6C6', borderWidth:2}}
                              placeholderTextColor="black"   
                              placeholder="Telefono"
                              autoCapitalize = 'none'
                              onChangeText={text => this.setState({phone: text})} 
                              value={this.state.phone}
                            />
                          </div>
                          <div >
                            <Input
                              color='black'
                              style={{borderColor:'#C6C6C6', borderWidth:2}}
                              placeholderTextColor="black"   
                              placeholder="Contrasena"
                              autoCapitalize = 'none'
                              secureTextEntry={true}
                              onChangeText={text => this.setState({password: text})} 
                              value={this.state.password}
                            />
                          </div>
                          <div   style={{alignItems: 'center'}}>
                            <Checkbox
                              checkboxStyle={{
                                borderWidth: 1,
                                borderColor: 'black'
                              }}
                              labelStyle={{
                                color: "black",
                              }}
                              label="Acepto"
                            />
                            <Button
                              style={{ width: 180, borderWidth: 0}}
                              color="transparent"
                              textStyle={{
                                fontSize: 14,
                                marginRight: 5,
                                color: 'blue',
                              }}
                              onClick={this.gotToURL}
                            >
                              La Política de Privacidad

                            </Button>
                          </div>
                        </div>
                        <div style={{textAlign: 'center'}}>
                          <div style={{color: 'red', paddingLeft: 10, paddingRight: 10}}>{this.state.errorMessage}</div>
                          <Button color="primary" 
                          onClick={this.createUser}
                          color="black"
                          >
                            <div
                              size={14}
                              color="white"
                            >
                              CREAR CUENTA
                            </div>
                          </Button>
                          <Button
                            onClick={() => this.props.navigation.navigate("Login")}
                          >
                              <div
                              style={{padding: 40, paddingTop: 10}}
                                >
                                  Regrese</div>
                          </Button>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

const styles = {
  registerContainer: {
    
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
    marginTop: 25,
    marginBottom: 40
  }
};


const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
};

export default connect(mapStateToProps)(Register);