import React from "react";
import { ScrollView, StyleSheet, Linking, Dimensions, Image } from "react-native";
import {connect} from 'react-redux';
import {updateWasher} from '../services/firebaseServices';
import {UPDATE_WASHER_STATUS} from '../actions/types'


class Capacitacion extends React.Component {

  setTrained = async () =>{
    this.props.dispatch({
      type: UPDATE_WASHER_STATUS,
      payload: {
      status: 'trained',
      }
    });
  await updateWasher(this.props.washer, 'trained');
  this.props.navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        { name: 'Work' },
      ],
    })
  );

  }
  openVideo = () => {
    Linking.openURL('https://www.youtube.com/channel/UCRwYM-gYLQncDYC9mJTe5Ig');

  }
  render() {
    return (
      <div >
<div>
        <div style={{textAlign: 'center'}}>
            <div 
                h4
                style={{  marginBottom:  10 / 2, marginTop:  10 *2 }}
                color='black'
            >
                Video
            </div>
            <Button
              onClick={() => this.openVideo()}
            >
            <img
              style={{height: 200, width: 300}}
              src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/Screen%20Shot%202021-01-11%20at%2012.42.23%20PM.png?alt=media&token=9aae3baf-2009-4783-ad1c-251eecdbc0ba'}}
              />
            </Button>

            <Button
                        color="#000000"
                        style={{marginTop: 20}}
                        onClick={() => this.setTrained()}
                        >
                        Terminar
                        </Button>
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
        borderRadius: 4,
        shadowColor: '#C0C0C0',
        shadowOffset: { width: .5, height: 1.5 },
        shadowOpacity: 0.9,
        shadowRadius:2,  
        elevation: 1,
        flex: 1,
        flexDirection: 'row'
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
      washer: state.washer.washer,
    }
  };
  
  export default connect(mapStateToProps)(Capacitacion);