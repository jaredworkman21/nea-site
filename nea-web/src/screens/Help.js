import React from "react";
import { View, Image, ScrollView, FlatList, StyleSheet, Button} from "react-native";
import { ADD_CAR_TO_CARWASH } from '../actions/types'

import {connect} from 'react-redux';
import DashboardTabs from "./DashboardTabs";


class Help extends React.Component {

    render () {
        return (
            <div style={{height: '100%'}}>
                <div style={{alignItems:'center', marginTop: 15}}>
                        <div className="row">
                        <div>
                            <img
                                                        src={require('../assets/imgs/help.png')}
                                                        style={{height: 170, width: 150, marginBottom: 20}}
                                    />
                        </div>
                        </div>
                    <div >
                        <div h5>WhatsApp: +52 1 686 236 4628</div>
                        <div p>Correo: nea.mobile.carwash@gmail.com</div>
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
    cardblock2: {
        width: 10 * 10,
        marginTop: 20,
        height:  10 * 3,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: 'center',
        shadowColor: '#C0C0C0',
        shadowOffset: { width: .5, height: 1.5 },
        shadowOpacity: 0.9,
        shadowRadius:2,  
        elevation: 1,
    },
    cardblock3: {
        width: 10 * 10,
        marginTop: 20,
        height:  10 * 3,
        backgroundColor: "black",
        borderRadius: 10,
        marginLeft: 10,
        justifyContent: 'center',
        shadowColor: '#C0C0C0',
        shadowOffset: { width: .5, height: 1.5 },
        shadowOpacity: 0.9,
        shadowRadius:2,  
        elevation: 1,
    },
    cardblock: {
        width: 10 * 22 ,
        backgroundColor: "white",
        borderRadius: 20,
        margin: 3,
        height:  10 * 18,
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
  
  export default connect(mapStateToProps)(Help);
