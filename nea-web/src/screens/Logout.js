import React from "react";
import { View, Image, ScrollView, FlatList, StyleSheet, Button} from "react-native";
import { ADD_CAR_TO_CARWASH } from '../actions/types'
import {auth} from '../services/firebaseServices';
import {connect} from 'react-redux';



class Logout extends React.Component {
    selectCar (car) {
        this.props.navigation.navigate('WashType')
        this.props.dispatch({
          type: ADD_CAR_TO_CARWASH,
          payload: {
          car: car
          }
      });
    
      }
      logout = async () => {
         await auth.signOut().then(function() {
            console.log('signed Out')
          }).catch(function(error) {
              console.log(error)
          });
                  //STORING CREDS
        try {
            await AsyncStorage.removeItem('@loginCredsWasher')
          } catch (e) {
              console.log(e)
            // saving error
          }
        try {
            await AsyncStorage.removeItem('@loginCreds')
          } catch (e) {
            // saving error
          }
        this.props.navigation.navigate('Onboarding');
      }
    render () {
        return (
            <div>
                <ScrollView>
                <div style={{alignItems: 'center', paddingTop: 40, paddingBottom: 50}}>
                    <img
                        style={{ width: 180, height: 180 }}
                        src={require('../assets/imgs/leaving-car.png')}
                    />
                    <div style={{width: 200, textAlign:'center', paddingTop: 15, fontSize: 20, color: 'grey'}}>
                        Te extrañaremos! Debes quedar y lavar su carro, me da pena que no lava su carro. Pobresito carro.
                    </div>
                </div>
                <div style={{flexDirection:"row"}}>
                    <div style={{flex:1, paddingLeft: 10}}>
                        <Button
                        color="#000000"
                        style={{marginTop: 20}}
                        onClick={() => this.props.navigation.navigate('Home')}
                        >
                        Regrese
                        </Button>
                    </div>

                    <div style={{flex:1}}>
                        <Button
                        color="#000000"
                        style={{marginTop: 20}}
                        onClick={() => this.logout()}
                        >
                        Cerrar
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
      backgroundColor: "black",
    },
    cardblock: {
        width: 10 * 20 ,
        height:120,
        backgroundColor: "white",
        borderRadius: 20,
        height: 190,
        padding: 0,
        shadowColor: '#C0C0C0',
        shadowOffset: { width: .5, height: 1.5 },
        shadowOpacity: 0.9,
        shadowRadius:2,  
        elevation: 1,
        flex: 1,
    },
});

const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      carwash: state.carwash
    }
  };
  
  export default connect(mapStateToProps)(Logout);
