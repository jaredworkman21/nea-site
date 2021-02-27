import React from "react";
import {LOAD_USER, LOAD_CARWASH} from '../actions/types'
import {checkUserStatus} from '../services/firebaseServices';
import {connect} from 'react-redux';
import {auth} from '../services/firebaseServices';
import {firestore} from '../services/firebaseServices';
import {Button, Input, TextField} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import { getUserDocument } from '../services/firebaseServices'
import { createUserWithEmailAndPasswordHandler } from "../services/firebaseServices"

import lighter from '../assets/imgs/lighter_background_wet.png'

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
  constructor () {
    super();
    // console.ignoredYellowBox = ['Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.']
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

  finallySend = async (carwashes) => {
      this.props.dispatch({
        type: LOAD_CARWASH,
        payload: {
          carwashes: carwashes
        }
    });
    this.setState({loading: false});
    this.props.history.push("/dashboard");
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
        this.props.history.push("/dashboard");
      }
    }
  }


  render() {
    const onNamesChange = (event) => {
        const {value} = event.currentTarget;
        this.setState({names: value});
      };
      const onLastNamesChange = (event) => {
        const {value} = event.currentTarget;
        this.setState({lastNames: value});
      };
      const onPhoneChange = (event) => {
        const {value} = event.currentTarget;
        this.setState({phone: value});
      };
    const onEmailChange = (event) => {
      const {value} = event.currentTarget;
      this.setState({email: value});
    };
    const onPasswordChange = (event) => {
      const {value} = event.currentTarget;
      this.setState({password: value});
    };

    return (
        <div  style={{textAlign: 'center'}}>
          <div style={{ backgroundImage: `url(${lighter})`, paddingTop: 100}} className="new-banner">
            <div  style={{textAlign: 'center'}}>
              <div style={styles.registerContainer} className="register-container">
                <div  space="between">
                  <div style={{textAlign: 'center'}} space="between" style={{paddingTop: 70}}>
                    <div style={{textAlign: 'center'}} flex={0.9}>
                      <div  space="between">
                        <div style={{textAlign:'center'}}>
                          <div style={{textAlign: 'center', marginBottom: 30}}>
                              <div
                                h5
                              >
                                  Registrar
                              </div>
                          </div>
                          <div
                            style={{ marginBottom: 5, width: '70%', marginLeft: '15%' }}
                          >
                            <TextField
                              className="input-text"
                              style={{marginBottom: '20px'}}
                              id="outlined-standard-static"
                              label=""
                              value={this.state.names}
                              defaultValue=""
                              variant={"outlined"}
                              style={{width:'96%'}}
                              placeholder="Nombres"
                              onChange={event => onNamesChange(event)}
                            />
                            
                          </div>
                          <div
                            style={{ marginBottom: 5, width: '70%', marginLeft: '15%' }}
                          >
                            <TextField
                              className="input-text"
                              style={{marginBottom: '20px'}}
                              id="outlined-standard-static"
                              label=""
                              value={this.state.lastNames}
                              defaultValue=""
                              variant={"outlined"}
                              style={{width:'96%'}}
                              placeholder="Apellidos"
                              onChange={event => onLastNamesChange(event)}
                            />
                            
                          </div>
                          <div
                            style={{ marginBottom: 5, width: '70%', marginLeft: '15%' }}
                          >
                            <TextField
                              className="input-text"
                              style={{marginBottom: '20px'}}
                              id="outlined-standard-static"
                              label=""
                              value={this.state.phone}
                              defaultValue=""
                              variant={"outlined"}
                              style={{width:'96%'}}
                              placeholder="Telefono"
                              onChange={event => onPhoneChange(event)}
                            />
                            
                          </div>
                          <div
                            style={{ marginBottom: 5, width: '70%', marginLeft: '15%' }}
                          >
                            <TextField
                              className="input-text"
                              style={{marginBottom: '20px'}}
                              id="outlined-standard-static"
                              label=""
                              value={this.state.email}
                              defaultValue=""
                              variant={"outlined"}
                              style={{width:'96%'}}
                              placeholder="Correo"
                              onChange={event => onEmailChange(event)}
                            />
                            
                          </div>
                          <div
                            style={{ marginBottom: 5, width: '70%', marginLeft: '15%' }}
                          >
                            <TextField
                              className="input-text"
                              style={{marginBottom: '20px'}}
                              id="outlined-standard-static"
                              label=""
                              value={this.state.password}
                              defaultValue=""
                              variant={"outlined"}
                              type="password"
                              style={{width:'96%'}}
                              placeholder="Contraseña"
                              onChange={event => onPasswordChange(event)}
                            />
                            
                          </div>
                          <div >
   

                          </div>
                          </div>
                        <div style={{textAlign: 'center'}}>
                        <div style={{color: 'red'}}>{this.state.errorMessage}</div>

                          <Button 
                          onClick={this.createUser}
                          style={{backgroundColor: 'black', color:'white', marginTop: 10}}
                          >
                            <div
                              size={14}
                            >
                              CREAR CUENTA
                            </div>
                          </Button>

                          <div style={{flexDirection: "row"}}>
                            <Button
                              onClick={() => this.props.history.push("/login")}
                            >
                                <div style={{fontWeight: 'bold', padding:20}}>Login </div>
                            </Button>
                            <Button
                              onClick={() => this.props.history.push("/")}
                            >
                                <div style={{padding:20}}> Regrese</div>
                            </Button>
                          </div>
                          <Button
                              onClick={() => this.props.history.push("/forgot-password")}
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
    marginTop: 25,
    marginBottom: 40
  }
};


const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
};

export default withRouter(connect(mapStateToProps)(Register));