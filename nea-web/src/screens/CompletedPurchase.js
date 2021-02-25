import React from "react";
import { ScrollView, StyleSheet, Dimensions, View, Image, ImageBackground } from "react-native";
import {connect} from 'react-redux';

import { LOAD_CHAT } from "../actions/types";
import {getChatDocument} from '../services/firebaseServices';

class CompletedPurchase extends React.Component {
  loadChat = async () =>{
    this.props.navigation.navigate('Chat')
  }
  render() {

    return (
      <div style={styles.container}>
        <img src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Flighter_background_wet.png?alt=media&token=e129172c-0b32-4f31-bcf3-6f7b2158bd9b'}} style={styles.image}>
            <div style={{alignItems: 'center'}}>
              <div style={styles.cardblock} >
                    <div style={{alignItems: 'center'}}>
                      <div 
                          h1
                          style={{  marginBottom:  10 / 2, marginTop:  10 *2 }}
                          color='black'
                      >
                          Exito!
                      </div>
                      <img
                          src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fcheck.png?alt=media&token=2bcf402a-0cd8-412b-9ce7-05ea16ff0620'}}
                          style={{height: 150, width: 150}}
                        />
                      <Button
                      shadowless
                      style={{backgroundColor: 'black'}}
                        onClick={() => this.props.navigation.navigate('Chat')}
                      >
                        <div style={{color:'white', fontWeight: 'bold'}}
                        onClick={() =>  this.loadChat()}
                        >
                          Contactar Lavador
                          </div>
                      </Button>
                      <Button
                            onClick={() => this.props.navigation.dispatch(CommonActions.reset({
                              index: 1,
                              routes: [
                                { name: 'Home' },
                              ],
                            })
                            )}
                          >
                              <div>Inicio</div>
                          </Button>
                    </div>
              </div>
            </div>
        </ImageBackground>
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
      width: 10 * 17 ,
      paddingTop: 20,
      height: 370,
      backgroundColor: "white",
      borderRadius: 10,
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
    }
  };
  
  export default connect(mapStateToProps)(CompletedPurchase);