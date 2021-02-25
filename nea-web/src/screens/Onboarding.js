import React from "react";
import {connect} from 'react-redux';
import {firestore} from '../services/firebaseServices';
import { getUserDocument ,getWasherDocument} from '../services/firebaseServices'
import {LOAD_USER, LOAD_CARWASH, LOAD_WASHER} from '../actions/types'
import {Button} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import leaving from '../assets/imgs/background_wet.png';
import logo from '../assets/imgs/logo_white.png';
const image = { uri: "https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/background_wet.png?alt=media&token=0a08d5a4-03ff-4a3d-9836-5c418925ef6b" };


class Onboarding extends React.Component {
  finallySend = async (carwashes, theType) => {
    console.log('here')
      this.props.dispatch({
        type: LOAD_CARWASH,
        payload: {
          carwashes: carwashes
        }
    });
    if(theType == 'user')
    {
      this.props.history.push("/login");
    }
    else if(theType == 'washer'){
      this.props.history.push("/washer-login");
    }
  }
    render () {

        const getDataReg = async () => {
          try {
            // const jsonValue = await AsyncStorage.getItem('@loginCreds')
            const jsonValue=null;
            console.log(jsonValue)
            if(jsonValue != null){
              console.log('h', jsonValue)
              let userData = await getUserDocument(jsonValue)
                this.props.dispatch({
                        type: LOAD_USER,
                        payload: {
                        user: userData
                        }
                    });
              console.log(userData)
              if(userData.carwashIds.length > 0){
                let carwashes = []
                let i = 0;
                userData.carwashIds.forEach(async (id) => {
                  const carwashRef = await firestore.doc(`carwash/${id}`).get();
                  const data = carwashRef.data();
                  carwashes.push(data)
                  if(i == userData.carwashIds.length - 1){
                    this.finallySend(carwashes, 'user')
                  }
                  i += 1;
                })
              }
              else{
                this.props.history.push("/login");
              }
            }
            else{
              this.props.history.push("/login");
            }
          } catch(e) {
            console.log('i',e)
            // error reading value
          }
        }
        const getDataWasher = async () => {
          try {
            // const jsonValue = await AsyncStorage.getItem('@loginCredsWasher')
            const jsonValue=null;
            if(jsonValue != null){
              console.log(jsonValue)
              let washerData = await getWasherDocument(jsonValue)
                this.props.dispatch({
                        type: LOAD_WASHER,
                        payload: {
                          washer: washerData
                        }
                    });
              if(washerData.carwashIds.length > 0){
                let carwashes = []
                  let i = 0;
                  washerData.carwashIds.forEach(async (id) => {
                    const carwashRef = await firestore.doc(`carwash/${id}`).get();
                    const data = carwashRef.data();
                    carwashes.push(data)
                    if(i == washerData.carwashIds.length - 1){
                      this.finallySend(carwashes, 'washer')
                    }
                    i += 1;
                  })
                }
              else{
                this.props.history.push("/login");
              }
            }
            else{
              this.props.history.push("/login");
            }
          } catch(e) {
            console.log('i',e)
            // error reading value
          }
        }
        return (
          <div style={{}}>
              <div style={{ backgroundImage: `url(${leaving})`}} className="new-banner">
                <div style={{textAlign:"center"}}>
                <img 
                    style={{ width: 200, marginTop: 200, marginBottom: 50 }}
                    src={logo}
                />
                </div>
                <div className="row" style={{padding: 0, margin: 0}}>
                <div className="col-md-4" style={{textAlign: 'center'}}>
                  </div>
                  <div className="col-md-2" style={{textAlign: 'center'}}>
                      <Button
                        
                        style={{ marginTop: 20, backgroundColor: '#fff'}}
                        onClick={(async () => getDataReg())}
                        >
                            <div color="#00000">LAVAR MI CARRO</div>
                    </Button>
                  </div>
                  <div className="col-md-2" style={{textAlign: 'center'}}>
                    <Button
                      style={{marginTop: 20, backgroundColor: 'white'}}
                      onClick={(async () => getDataWasher())}
                      >
                      LAVAR CARROS
                  </Button>
                  </div>
                </div>
              </div>
          </div>
            
        );

    }
}
const styles = {
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    }

  };

  const mapStateToProps = (state) => {
    return {
      user: state.user.user,
    }
  };
  
  export default withRouter(connect(mapStateToProps)(Onboarding));