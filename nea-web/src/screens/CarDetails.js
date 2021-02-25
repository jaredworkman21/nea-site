import React from "react";
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {REMOVE_CAR, ADD_CARWASH_TO_USER,UPDATE_CAR_ON_USER,REMOVE_CARWASH_FROM_WASHER, ADD_CARWASH_TO_WASHER, LOAD_CHAT} from '../actions/types'
import {updateUser, createCarwash, updateWasher, createChat, getChatDocument, updateCarwash, getWasherDocument, getCarwashDocument} from '../services/firebaseServices';


class CarDetails extends React.Component {

  state ={
    loading: false
  }

  acceptOffer = async () =>  {
    this.props.navigation.navigate('Agenda', {screen: 'WashType'});
  }
  deleteCar = async(car) => {

    if(!this.state.loading){
      this.setState({loading: true})

        this.props.dispatch({
          type: REMOVE_CAR,
          payload: {
            car: this.props.carwash.currentCarwash.car
          }
        });
        await updateUser(this.props.user, 'cars');
        this.props.history.push("/home");

        this.setState({loading: false});
      
    }
  }

  render() {
    return (
      <div style={styles.container}>
        {/* <img src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Flighter_background_wet.png?alt=media&token=e129172c-0b32-4f31-bcf3-6f7b2158bd9b'}} style={styles.image} />  */}
            <div style={{alignItems: 'center'}}>
              <div style={styles.cardblock} >
                    <div>
                        {(this.props.carwash.currentCarwash.car.car.carUrl == '' || this.props.carwash.currentCarwash.car.car.carUrl == null) && 
                              <div>
                                  <img 
                                    style={{height:   10 * 10, width:   10 * 20,  borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                                    src={require('../assets/imgs/filler.png')}                                  />
                              </div>
                          }
                          {(this.props.carwash.currentCarwash.car.car.carUrl != '' && this.props.carwash.currentCarwash.car.car.carUrl != null) && 
                              <div>
                                  <img
                                    style={{height:   10 * 10, width:   10 * 20,  borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                                    src={{uri: this.props.carwash.currentCarwash.car.car.carUrl}}
                                  />
                              </div>
                          }
                    </div>
                    
                    <div style={{alignItems: 'center', marginTop: 20}}>
                      <div h3 style={{color: '#286AEC'}}>{this.props.carwash.currentCarwash.car.car.make} {this.props.carwash.currentCarwash.car.car.model}</div>
                    </div>
                    
                <div>

                    <div style={{padding: 30}} >
                      <div style={{alignItems: 'center'}}>

                          {(Object.keys(this.props.carwash.currentCarwash.car.car.carwash).length > 0)  && <div >
                                <img
                                src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fcheck.png?alt=media&token=2bcf402a-0cd8-412b-9ce7-05ea16ff0620'}}
                                style={{height: 50, width: 50}}
                              />
                              {(this.props.carwash.currentCarwash.car.car.carwash.subscription == 'weekly-yearly') &&<div size={12} color='black'> Lavado Semanal </div>}    
                              {(this.props.carwash.currentCarwash.car.car.carwash.subscription  == 'monthly-yearly') &&<div size={12} color='black'> Lavado Mensual </div>}    
                              {(this.props.carwash.currentCarwash.car.car.carwash.subscription  == 'weekly-monthly') &&<div size={12} color='black'> Lavado Semanal</div>}    
                              {(this.props.carwash.currentCarwash.car.car.carwash.subscription  == 'monthly-monthly') &&<div size={12} color='black'> Lavado Mensual</div>}  
                              {(this.props.carwash.currentCarwash.car.car.carwash.subscription  == 'one-time') &&<div size={12} color='black'> Ultimo Lavado: {this.props.carwash.currentCarwash.car.car.carwash.dateString}</div>}     
                            </div>
                          }
                          {(Object.keys(this.props.carwash.currentCarwash.car.car.carwash).length == 0)  && <div >
                            <div size={12} color='black'> Nunca ha sido lavado</div>
                            </div>
                          }

                      </div>
                      </div>
 
                    </div>
                    
            </div>
            </div>
            <div style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
              <Button
                onClick={() =>  this.acceptOffer()}
                >
                        <div style={styles.cardblock4}>
                            <div className="row">
                            <div>
                                <img
                                        src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fschedule.png?alt=media&token=3d101683-b9f1-458e-86bb-7c3f1488426d'}}
                                        style={{height: 40, width: 40, marginLeft: 30}}
                                        />
                            </div>
                            <div style={{marginLeft: 20, justifyContent: 'center'}}>
                                <div p style={{color: 'white'}}>Agenda Lavado</div>
                            </div>
                            </div>
                        </div>
                    </Button>
                    

                
            </div>
            <div style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 150}}>
            <Button
                  onClick={()=> this.deleteCar()}
                  >
                        <div style={styles.cardblock5}>
                            <div className="row">
                            <div>
                                <img
                                src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Ftrash.png?alt=media&token=b5f09782-0eab-4f7e-942e-f5af5474e10c'}}
                                style={{height: 40, width: 40, marginLeft: 30}}
                                        />
                            </div>
                            <div style={{marginLeft: 20, justifyContent: 'center'}}>
                                <div p style={{color: 'black'}}>Eliminar Carro</div>
                            </div>
                            </div>
                        </div>
                    </Button>
            </div>
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
      marginTop: 20,
      height:  10 * 22,
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
    cardblock4: {
      width: 10 * 15,
      marginTop: 20,
      height:  10 * 4,
      backgroundColor: "#286AEC",
      borderRadius: 10,
      justifyContent: 'center',
      shadowColor: '#C0C0C0',
      shadowOffset: { width: .5, height: 1.5 },
      shadowOpacity: 0.9,
      shadowRadius:2,  
      elevation: 1,
    },
    cardblock5: {
      width: 10 * 15,
      marginTop: 20,
      height:  10 * 4,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      justifyContent: 'center',
      shadowColor: '#C0C0C0',
      shadowOffset: { width: .5, height: 1.5 },
      shadowOpacity: 0.9,
      shadowRadius:2,  
      elevation: 1,
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
  
  export default withRouter(connect(mapStateToProps)(CarDetails));