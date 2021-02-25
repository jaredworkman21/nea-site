import React from "react";
import { ScrollView, StyleSheet, Switch, Dimensions, Image } from "react-native";
import {connect} from 'react-redux';
import { Express } from "./WashType";

export default class ExpressType extends React.Component {
  render() {
    return (
      <div >
<div>
            <Switch/>
        </div>
        </div>
    )
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
      user: state.user.user,
    }
  };
  
  export default connect(mapStateToProps)(ExpressType);