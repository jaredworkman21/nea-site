import React from "react";
import { View, Image, ScrollView, Dimensions, StyleSheet, FlatList} from "react-native";
// import * as Progress from 'react-native-progress';
import { getCarwashDocument} from '../services/firebaseServices';
import {LOAD_CURRENT_CARWASH} from '../actions/types';
import {connect} from 'react-redux';


class WasherSchedule extends React.Component {



    displayProgress() {
        console.log(this.props.carwashes)
        if(this.props.washer.status == "approved"){
            if(this.props.carwashes.carwashes.length > 0){
                return (
                    <div style={{alignItems:'center'}}>
                            <FlatList
                                    data={this.props.carwashes.carwashes}
                                    renderItem={({item}) =>
                                    <div 
                                    >
                                        {(item.status == 'accepted') && <div style={{marginTop: 20}}>
                                            <div style={styles.cardblock} >
                                        <div style={styles.cardimage}>
                                        {(item.car.car.carUrl == '' || item.car.car.carUrl == null) && 
                                                        <div>
                                                            <img 
                                                                style={{height: 60, width: 100, margin: 10, borderRadius: 3}}
                                                                src={require('../assets/imgs/filler.png')}
                                                                />
                                                            </div>
                                                        }
                                                        {(item.car.car.carUrl != '' && item.car.car.carUrl != null) && 
                                                            <div>
                                                                <img
                                                                    style={{height: 60, width: 100, margin: 10, borderRadius: 3}}
                                                                    src={{uri: item.car.car.carUrl}}
                                                                    />
                                                            </div>
                                                        }
                                        </div>
                                        <div>
                                            <div h5  style={{paddingTop: 5, fontWeight: 'bold'}}> {item.car.car.make} {item.car.car.model}</div>
                                            <div > {item.car.car.address.city}</div>
                                            <div > {item.time} {item.dateString}</div>
                                            <Button title="Show Date Picker" onClick={() => this.openCarwashDetails(item)} 
                                                        color="#286AEC"
                                                        shadowless
                                                        style={{marginTop: 10, width: 170, height: 30}}>Completar</Button>
                                        </div>
                                        </div>   
                                        </div>}     
                                    </div>
                                }
                                />
                        </div>
                )
            }
            else {
                return(
                    <div style={{alignItems: 'center', paddingTop: 40, paddingBottom: 50}}>
                    <img
                        style={{ width: 180, height: 70 }}
                        src={require('../assets/imgs/no-car.png')}
                    />
                    <div style={{width: 200, textAlign:'center', paddingTop: 15, fontSize: 20, color: 'grey'}}>
                        No has acceptado a lavar un carro :(
                    </div>
                </div>
                )
            }
        }

    }
    openCarwashDetails(carwash) {
        console.log('carwash3: ', carwash)
        this.props.dispatch({
            type: LOAD_CURRENT_CARWASH,
            payload: {
                  currentCarwash: carwash,
            }
          });
        this.props.navigation.navigate('CarwashDetails')
    }
    render () {

        return (
            <div>
                <ScrollView >
                    <div >
                    {this.displayProgress()}
                    </div>
                </div>

            </div>
            
        );

    }
}

const styles = {
    container: {
        backgroundColor: 'white',
      padding: 40
    },
    cardblock: {
        width: 10 * 22 ,
        height:120,
        backgroundColor: "white",
        borderRadius: 15,
        shadowColor: '#C0C0C0',
        shadowOffset: { width: .5, height: 1.5 },
        shadowOpacity: 0.9,
        shadowRadius:2,  
        elevation: 1,
        flex: 1,
        flexDirection: 'row'
    },
    cardblock2: {
        width: 10 * 22,
        marginTop: 20,
        height:  10 * 4,
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
        width: 10 * 22,
        marginTop: 20,
        height:  10 * 4,
        backgroundColor: "black",
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
      washer: state.washer.washer,
      carwashes: state.carwash
    }
  };
  
  export default connect(mapStateToProps)(WasherSchedule);
