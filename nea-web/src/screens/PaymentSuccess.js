import React from "react";
import {LOAD_USER, LOAD_CARWASH} from '../actions/types'
import { createUserWithEmailAndPasswordHandler, getCarwashesForWasher } from "../services/firebaseServices"
import {checkUserStatus} from '../services/firebaseServices';
import {connect} from 'react-redux';
import {auth} from '../services/firebaseServices';
import {firestore} from '../services/firebaseServices';
import {Button, Input, TextField} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import { getUserDocument } from '../services/firebaseServices'
import logo from '../assets/imgs/logo_black.png';
import lighter from '../assets/imgs/lighter_background_wet.png'



class PaymentSuccess extends React.Component {
  

  render() {


    return (
        <div  style={{textAlign: 'center'}}>
          <div style={{ backgroundImage: `url(${lighter})`, paddingTop: 100}} className="new-banner">
            <div  style={{textAlign: 'center'}}>
              <div style={styles.registerContainer} className="register-container">
                <div  space="between">
                  <div style={{textAlign: 'center'}} space="between" style={{paddingTop: 70}}>
                    <div style={{textAlign: 'center'}} flex={0.9}>
                      <div  space="between">
                      <div  style={{width: '100%', textAlign: 'center'}}>
                            <img 
                                style={{  height: 50 }}
                                src={logo}
                            />
                        </div>
                        <div style={{width: '100%', textAlign: 'center', marginTop: 30}}>
                            Exito! Puedes regresar al app.
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

export default withRouter(connect(mapStateToProps)(PaymentSuccess));