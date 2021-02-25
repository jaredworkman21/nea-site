import React from "react";
import { StyleSheet, Dimensions, View, Image, Alert } from "react-native";
import {connect} from 'react-redux';
import {UPDATE_CARWASH_STATUS, LOAD_CARWASH, LOAD_CURRENT_CARWASH, REMOVE_CARWASH_FROM_WASHER} from '../actions/types'
import { updateCarwash, updateWasher, getWasherDocument,  getCarwashDocument} from '../services/firebaseServices';
// import { showLocation } from 'react-native-map-link'
import Moment from 'moment';
import axios from 'axios';
import LoadingButton from "../components/LoadingButton";


class CarwashDetailsUser extends React.Component {
  state ={
    loading: false
  }
  cancelWash = async(car) => {

    if(!this.state.loading){
      this.setState({loading: true})
      if(this.props.carwash.currentCarwash.paymentStatus == 'paid'){
        Alert.alert(
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
        Alert.alert(
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

        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Home' },
            ],
          })
        );
        this.setState({loading: false});
      }
    }
  }

  render() {
    return (
      <div style={styles.container}>
        {/* <img src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Flighter_background_wet.png?alt=media&token=e129172c-0b32-4f31-bcf3-6f7b2158bd9b'}} style={styles.image}> */}
            <div style={{alignItems: 'center'}}>
              <div style={styles.cardblock} >
                    <div style={{ marginTop: 20}}>
                    {(this.props.carwash.currentCarwash.car.car.carUrl == '' || this.props.carwash.currentCarwash.car.car.carUrl == null ) && 
                        <div style={{alignItems: 'center'}}>
                            <img 
                                style={{height:   10 * 7, width: 200, borderRadius: 5}}
                                src={require('../assets/imgs/filler.png')}
                                />
                            </div>
                            }
                            {/* {(this.props.carwash.currentCarwash.car.car.carUrl != '' && this.props.carwash.currentCarwash.car.car.carUrl != null ) && */}
                                <div style={{alignItems: 'center'}}>
                                    <img
                                style={{height:   10 * 7, width: 200, borderRadius: 5}}
                                src={{uri: this.props.carwash.currentCarwash.car.car.carUrl}}
                                    />
                                </div>
                            {/* }  */}
                                <div h2 style={{marginLeft: 20}}>{this.props.carwash.currentCarwash.car.car.make} {this.props.carwash.currentCarwash.car.car.model}</div>
                                <div h5 style={{marginLeft: 20}}>{this.props.carwash.currentCarwash.time} {this.props.carwash.currentCarwash.dateString}</div>
                                <div h5 style={{color: '#286AEC', marginLeft: 20}}>${this.props.carwash.currentCarwash.price}</div>
                                </div>
                                
                            <div className="row">
                                <div style={{marginLeft: 20}}>
                                
                                <div p style={{  marginBottom:  10 / 2, marginTop:  10 /2}} color='black'>
                                    Dirección
                                </div>
                                <Button
                                    >
                                    <div p >{this.props.carwash.currentCarwash.car.car.address.street}</div>
                                    <div p >{this.props.carwash.currentCarwash.car.car.address.city}</div>
                                    <div p >{this.props.carwash.currentCarwash.car.car.address.state} {this.props.carwash.currentCarwash.car.car.address.zip}</div>
                                </Button>

                                </div>
                                
                                </div>
                                <div style={{flexDirection: 'row', justifyContent: 'center'}}>

                                <Button
                        shadowless
                        style={{backgroundColor: '#286AEC', width:  10 * 8, height:  10 * 8,  marginTop: 30, borderRadius: 150, marginBottom: 30}}
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