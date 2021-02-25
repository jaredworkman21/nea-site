import React from "react";
import { StyleSheet, Dimensions, View, Image, Alert } from "react-native";
import {connect} from 'react-redux';
import {UPDATE_CARWASH_STATUS, LOAD_CARWASH, LOAD_CURRENT_CARWASH, REMOVE_CARWASH_FROM_WASHER} from '../actions/types'
import { updateCarwash, updateWasher, } from '../services/firebaseServices';
// import { showLocation } from 'react-native-map-link'
import Moment from 'moment';
import axios from 'axios';
import LoadingButton from "../components/LoadingButton";


class CarwashDetails extends React.Component {
  state ={
    loading: false
  }
  acceptOffer = async () =>  {
    this.props.dispatch({
      type: UPDATE_CARWASH_STATUS,
      payload: {
        status: 'accepted'
      }
    });
    this.props.carwash.currentCarwash.status = 'accepted';
    updateCarwash(this.props.carwash.currentCarwash, 'status');
    this.props.navigation.navigate('DashboardWasher')
  }
  rejectOffer = async () => {
    // Reassign carwash
    this.props.navigation.navigate('DashboardWasher');

    carwash = this.props.carwash.currentCarwash;
    carwash.closestWashers.shift();

    if(carwash.closestWashers.length > 0){
      carwash.washer = carwash.closestWashers[0].uid;
      updateCarwash(carwash, "washerId-closest");
      axios({
        method:'POST',
        url: 'https://us-central1-nea-app-b1e8f.cloudfunctions.net/reassignWash',
        data: {
          carwash: carwash
        },
      }).then(response => {
        console.log('d', response.data);
      });
    }
    else {
      carwash.washer = "no-washer-assigned"
      updateCarwash(carwash, "washerId-closest");
    }

    // Remove from washes
    let carwashes = this.props.carwash.carwashes;
    const index = carwashes.indexOf(this.props.carwash.currentCarwash);
    if(index != -1){
     carwashes.splice(index, 1);
    }
    this.props.dispatch({
      type: LOAD_CARWASH,
      payload: {
        carwashes: carwashes
      }
    });
    let washer = this.props.washer
    this.props.dispatch({
      type: REMOVE_CARWASH_FROM_WASHER,
      payload: {
        carwash: this.props.carwash.currentCarwash.id
      }
    });
    const i = washer.carwashIds.indexOf(this.props.carwash.currentCarwash.id);
    if(i != -1){
      washer.carwashIds.splice(i, 1);
    }
    updateWasher(washer,'carwashIds');
  }

  checkDate() {
    if(!this.state.loading){
      this.setState({loading: true})
      let myDate = new Date(this.props.carwash.currentCarwash.dateString);
      let todaysDate = new Date();
      todaysDate.setHours(0, 0, 0, 0);
      if(myDate > todaysDate){
        Alert.alert(
          "Espera",
          "La fecha de lavar no ha llegado",
          [
            {
              text: "OK",
              onClick: () => console.log("Ask me later pressed")
            },
          ],
          { cancelable: false }
        );
        this.setState({loading: false})
      }
      else {
        axios({
          method:'POST',
          url: 'https://us-central1-nea-app-b1e8f.cloudfunctions.net/getReview',
          data: {
            userId: this.props.carwash.currentCarwash.userId,
            carwashId: this.props.carwash.currentCarwash.id,
            washerId: this.props.carwash.currentCarwash.washer,
          },
        }).then(response => {
          console.log('d', response.data);
        });

        
        // Remove from washes
        let carwashes = this.props.carwash.carwashes;
        const index = carwashes.indexOf(this.props.carwash.currentCarwash);
        if(index != -1){
        carwashes.splice(index, 1);
        }
        this.props.dispatch({
          type: LOAD_CARWASH,
          payload: {
            carwashes: carwashes
          }
        });
        let washer = this.props.washer
        this.props.dispatch({
          type: REMOVE_CARWASH_FROM_WASHER,
          payload: {
            carwash: this.props.carwash.currentCarwash.id
          }
        });
        const i = washer.carwashIds.indexOf(this.props.carwash.currentCarwash.id);
        if(i != -1){
          washer.carwashIds.splice(i, 1);
        }
        updateWasher(washer,'carwashIds');
        // axios({
        //     method:'POST',
        //     url: 'https://us-central1-nea-app-b1e8f.cloudfunctions.net/payWasher',
        //     data: {
        //         account: this.props.washer.stripeAccount,
        //         amount: this.props.carwash.currentCarwash.price * .80
        //     },
        // }).then(response => {
        //     console.log('pay data', response.data);
        // });
        this.setState({loading: false})
        this.props.navigation.navigate('Washer');
      }
    }
  }

  goToGoogleMaps () {
    // showLocation({
    //   latitude: this.props.carwash.currentCarwash.car.car.latlang.lat,
    //   longitude: this.props.carwash.currentCarwash.car.car.latlang.lng,
    //   // sourceLatitude: -8.0870631,  // optionally specify starting location for directions
    //   // sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
    //   // title: 'The White House',  // optional
    //   googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
    //   googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
    //   alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
    //   dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
    //   dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
    //   cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
    //   appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
    //   naverCallerName: 'com.example.neaapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
    //   // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
    //   // app: 'uber'  // optionally specify specific app to use
    // })
  }
  render() {
    return (
      <div style={styles.container}>
        {/* <img src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Flighter_background_wet.png?alt=media&token=e129172c-0b32-4f31-bcf3-6f7b2158bd9b'}} style={styles.image}> */}
              {(this.props.carwash.currentCarwash.car.car.carUrl == '' || this.props.carwash.currentCarwash.car.car.carUrl == null)  && 
              <div style={{alignItems: 'center'}}>
                  <img 
                    style={{height:   10 * 7, width: 200}}
                    src={require('../assets/imgs/filler.png')}
                    />
                </div>
  }
                {(this.props.carwash.currentCarwash.car.car.carUrl != '' && this.props.carwash.currentCarwash.car.car.carUrl != null) && 
                    <div style={{alignItems: 'center'}}>
                        <img
                        style={{height:   10 * 7,  width: 200}}
                        src={{uri: this.props.carwash.currentCarwash.car.car.carUrl}}
                        />
                    </div>
                } 
            <div style={{alignItems: 'center'}}>
              <div style={styles.cardblock} >
                    <div style={{ marginTop: 20}}>
                      <div h2 style={{marginLeft: 20}}>{this.props.carwash.currentCarwash.car.car.make} {this.props.carwash.currentCarwash.car.car.model}</div>
                      <div h2 style={{color: '#286AEC', marginLeft: 20}}>${this.props.carwash.currentCarwash.price * .80}</div>
                    </div>
                    
                <div className="row">
                    <div style={{marginLeft: 20}}>
                    
                      <div p style={{  marginBottom:  10 / 2, marginTop:  10 /2}} color='black'>
                          Direccion
                      </div>
                      <Button
                        onClick={()=> this.goToGoogleMaps()}
                        >
                        <div p style={{color: '#286AEC'}}>{this.props.carwash.currentCarwash.car.car.address.street}</div>
                        <div p style={{color: '#286AEC'}}>{this.props.carwash.currentCarwash.car.car.address.city}</div>
                        <div p style={{color: '#286AEC'}}>{this.props.carwash.currentCarwash.car.car.address.state} {this.props.carwash.currentCarwash.car.car.address.zip}</div>
                      </Button>

                    </div>
                    
                    </div>
                    
            </div>
            </div>
            {(this.props.carwash.currentCarwash.status == 'pending-approval') && 

            <div style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Button
                shadowless
                style={{backgroundColor: '#286AEC', width:  10 * 8, height:  10 * 8,  marginTop: 30, borderRadius: 150}}
                onClick={() =>  this.acceptOffer()}
                >
                    <div style={{color:'white', fontWeight: 'bold', fontSize: 20}}
                    >
                    Acceptar
                    </div>
                </Button>
                <Button
                shadowless
                style={{backgroundColor: 'black', width:  10 * 8, height:  10 * 8,  marginTop: 30, borderRadius: 120}}
                onClick={() =>  this.rejectOffer()}
                >
                    <div style={{color:'white', fontWeight: 'bold', fontSize: 17}}
                    >
                    Rechazar
                    </div>
                </Button>
            </div>
            }
            {(this.props.carwash.currentCarwash.status == 'accepted') && 
              <div style={{alignItems: 'center'}}>
                {(!this.state.loading) && 
                <LoadingButton
                    text="Completar"
                    loading={this.state.loading}
                    style={styles.buttonStyle}
                    onClick={() =>  this.checkDate()}
                />
              }
              </div>
            }
        {/* </ImageBackground> */}
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
      height:  10 * 18,
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
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      carwash: state.carwash,
      washer: state.washer.washer,
    }
  };
  
  export default connect(mapStateToProps)(CarwashDetails);