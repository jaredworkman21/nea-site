import React from "react";
import {connect} from 'react-redux';
import {UPDATE_CARWASH_STATUS, LOAD_CARWASH, LOAD_CURRENT_CARWASH, REMOVE_CARWASH_FROM_WASHER} from '../actions/types'
import { updateCarwash, updateWasher, getWasherDocument,  getCarwashDocument} from '../services/firebaseServices';
// import { showLocation } from 'react-native-map-link'
import Moment from 'moment';
import axios from 'axios';
import lighter from '../assets/imgs/lighter_background_wet.png'
import filler from '../assets/imgs/filler.png';
import check from '../assets/imgs/check.png';
import schedule from '../assets/imgs/schedule.png';
import trash from '../assets/imgs/trash.png';
import {Button, Input, TextField} from '@material-ui/core';


class CarwashDetailsUser extends React.Component {
  state ={
    loading: false
  }
  cancelWash = async(car) => {

    if(!this.state.loading){
      this.setState({loading: true})
      if(this.props.carwash.currentCarwash.paymentStatus == 'paid'){
        alert(
          "Espera",
          "Si necesitas cancelar tu orden por favor llama +52 1 686 236 4628 para cancelar. Cobramos $100 pesos para cancelar.",
          [
            {
              text: "OK",
              onClick: () => console.log("Ask me later pressed")
            },
          ],
          { cancelable: false }
        );
        this.setState({loading: false});
      }
      else if(this.props.carwash.currentCarwash.status == 'accepted'){
        alert(
          "Espera",
          "Un lavador ya ha aceptado este trabajo. Por favor llama +52 1 686 236 4628 para cancelar. Cobramos $100 pesos para cancelar.",
          [
            {
              text: "OK",
              onClick: () => console.log("Ask me later pressed")
            },
          ],
          { cancelable: false }
        );
        this.setState({loading: false});
      }
      else {
        const carwash = {
          id: this.props.carwash.currentCarwash.id,
          status: 'canceled & deleted'
        }
        if(this.props.carwash.currentCarwash.id != null){
            console.log('******', this.props.carwash.currentCarwash);
          const carwash2 = await getCarwashDocument(this.props.carwash.currentCarwash.id);
          const washer = await getWasherDocument(carwash2.washer);
          console.log('@@@@', washer);
          const newwashIds = washer.carwashIds
          const index = newwashIds.indexOf(this.props.carwash.currentCarwash.id);
          if(index != -1){
            newwashIds.splice(index, 1);
          }

          const washer2 = {
            uid: washer.uid,
            carwashIds: newwashIds
          }
          console.log('!!!!!!!',washer2)
          await updateWasher(washer2, 'carwashIds')
          await updateCarwash(carwash, 'status');
          let tempCarwashes = this.props.carwash.carwashes;
          const index2 = tempCarwashes.indexOf(this.props.carwash.currentCarwash);
          if(index2 != -1){
            tempCarwashes.splice(index2, 1);
          }
          this.props.dispatch({
            type: LOAD_CARWASH,
            payload: {
              carwashes: tempCarwashes
            }
        });
        }
        else{
          console.log('no carwash to delete')
        }
        this.props.history.push("/dashboard");

        this.setState({loading: false});
      }
    }
  }

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
                    <div style={{ marginTop: 20}}>
                    {(this.props.carwash.currentCarwash.car.car.carUrl == '' || this.props.carwash.currentCarwash.car.car.carUrl == null ) && 
                        <div style={{alignItems: 'center'}}>
                            <img 
                                style={{height:   10 * 7, width: 200, borderRadius: 5}}
                                src={filler}
                                />
                            </div>
                            }
                            {/* {(this.props.carwash.currentCarwash.car.car.carUrl != '' && this.props.carwash.currentCarwash.car.car.carUrl != null ) && */}
                                <div style={{alignItems: 'center'}}>
                                    <img
                                style={{height:   10 * 7, width: 200, borderRadius: 5}}
                                src={this.props.carwash.currentCarwash.car.car.carUrl}
                                    />
                                </div>
                            {/* }  */}
                                <h2  style={{marginLeft: 20, marginTop: 20}}>{this.props.carwash.currentCarwash.car.car.make} {this.props.carwash.currentCarwash.car.car.model}</h2>
                                <div h5 style={{marginLeft: 20}}>{this.props.carwash.currentCarwash.time} {this.props.carwash.currentCarwash.dateString}</div>
                                <h5 style={{color: '#286AEC'}}>${this.props.carwash.currentCarwash.price}</h5>
                                </div>
                                
                            <div style={{width: '100%'}}>
                                <div style={{textAlign: 'center'}}>
                                
                                <div p style={{  marginBottom:  10 / 2, marginTop:  10 /2, fontWeight: 'bold'}} color='black'>
                                    Dirección
                                </div>

                                    <div p >{this.props.carwash.currentCarwash.car.car.address.street}</div>
                                    <div p >{this.props.carwash.currentCarwash.car.car.address.city}</div>
                                    <div p >{this.props.carwash.currentCarwash.car.car.address.state} {this.props.carwash.currentCarwash.car.car.address.zip}</div>

                                </div>
                                
                                </div>
                                <div style={{flexDirection: 'row', justifyContent: 'center'}}>

                                <Button
                        shadowless
                        style={{backgroundColor: '#286AEC', width:  150, height:  50,  marginTop: 30, marginBottom: 30}}
                        onClick={() =>  this.cancelWash()}
                        >
                            <div style={{color:'white', fontWeight: 'bold', fontSize: 20,}}>
                                Cancelar
                            </div>
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
      alignSelf: 'stretch',
      height:  10 * 40,
      backgroundColor: "white",
      borderRadius: 10,
      margin: 10,
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
    registerContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      shadowColor: "black",
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
      overflow: "hidden"
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
      washer: state.washer.washer,
    }
  };
  
  export default connect(mapStateToProps)(CarwashDetailsUser);