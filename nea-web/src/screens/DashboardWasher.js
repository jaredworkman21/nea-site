import React from "react";
import { View, Image, ScrollView, Dimensions, StyleSheet, FlatList, Linking, RefreshControl} from "react-native";
// import * as Progress from 'react-native-progress';
import { getCarwashDocument, updateWasher} from '../services/firebaseServices';
import {LOAD_CURRENT_CARWASH, ADD_STRIPE_ACCOUNT_TO_WASHER} from '../actions/types';
import {connect} from 'react-redux';
import axios from 'axios';


class DashboardWasher extends React.Component {
    state = {
        refresh: false
    }
    doRefresh() {
        this.setState({refresh: true})
    }
    displayProgress() {
        console.log('status', this.props.washer.status)
        if(this.props.washer.status == "registered"){
            return (
                <div>
                    <div style={{alignItems: 'center', paddingTop: 40, paddingBottom: 20}}>
                        <img
                            style={{ width: 100, height: 120 }}
                            src={require('../assets/imgs/no-documents.png')}
                        />
                        <div style={{width: 300, textAlign:'center', paddingTop: 15, fontSize: 15, color: 'grey'}}>
                            No has verificado tus documentos todavia. Despues de verificarlos, te podemos mandar tu primer cliente! 
                        </div>
                    </div>
                    <div style={{flexDirection:"row", alignSelf: 'center', alignItems: 'center'}}>
                        <div >
                            {/* <Progress.Bar 
                            progress={0.3} 
                            width={100} 
                            height={40}
                            style={{marginTop: 15}}
                            borderRadius={10}
                            color='black'
                            /> */}
                        </div>
                        <div >
                            <Button
                            color="#000000"
                            style={{marginTop: 20}}
                            onClick={() => this.props.navigation.navigate('AddDocuments')}
                            >
                            Documentos
                            </Button>
                        </div>
                    </div>
                    {/* <div style={{flexDirection:"row", alignSelf: 'center', alignItems: 'center'}}>
                        <div >
                                <Button
                                shadowless
                                style={{marginTop: 20, backgroundColor: 'white'}}
                                onClick={() => this.doRefresh()}
                                >
                                    <div style={{color: 'black'}}>Actualizar</div>
                                </Button>
                            </div>
                    </div> */}
                </div>
            )
        }

         else if(this.props.washer.status == "documented"){
            return (
                <div style={{flexDirection:"row", alignSelf: 'center', alignItems: 'center'}}>
                    <div >
                        {/* <Progress.Bar 
                        progress={0.8} 
                        width={200} 
                        height={40}
                        style={{marginTop: 15}}
                        borderRadius={10}
                        color='black'
                        /> */}
                </div>
                    <div >
                        <Button
                        color="#000000"
                        style={{marginTop: 20}}
                        onClick={() => this.props.navigation.navigate('Capacitacion')}
                        >
                        Capacitacion
                        </Button>
                    </div>
                </div>
            )
        }

        else if(this.props.washer.status == "approved"){
            let numPending = 0;
            this.props.carwashes.carwashes.forEach(wash => {
                if(wash.status == 'pending-approval'){
                    numPending += 1;
                }
            });
            if(numPending > 0){
                return (
                    <div style={{alignItems:'center'}}>
                            <FlatList
                                    data={this.props.carwashes.carwashes}
                                    renderItem={({item}) =>
                                    <div 
                                    style={{marginTop: 20}}
                                    >
                                        {(item.status == 'pending-approval') && <div>
                                            <div style={styles.cardblock} >
                                        <div style={styles.cardimage}>
                                            {/* <Button onClick={() => this.props.navigation.navigate("WashType")}> */}
                                                <div>
                                                {(item.car.car.carUrl == '' || item.car.car.carUrl == null) && 
                                                        <div>
                                                            <img 
                                                                style={{height: 60, width: 100, margin: 10, borderRadius: 3,  backgroundColor: '#cecece'}}
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
                                            {/* </Button> */}
                                        </div>
                                        <div>
                                            <div h5  style={{paddingTop: 5, fontWeight: 'bold'}}> {item.car.car.make} {item.car.car.model}</div>
                                            <div > {item.car.car.address.city}</div>
                                            <div > {item.time} {item.dateString}</div>
                                            <Button title="Show Date Picker" onClick={() => this.openCarwashDetails(item)} 
                                                        color="#286AEC"
                                                        shadowless
                                                        style={{marginTop: 10, width: 170, height: 30}}>Acceptar</Button>
                                        </div>
                                        </div>   
                                        </div>}     
                                    </div>
                                }
                                />
                        </div>
                )
            }
        }

        else if (this.props.washer.status == "trained")
        {
            return(
                <div style={{alignItems: 'center', paddingTop: 40, paddingBottom: 50}}>
                <img
                        style={{ width: 100, height: 120 }}
                        src={require('../assets/imgs/no-documents.png')}
                />
                <div style={{width: 200, textAlign:'center', paddingTop: 15, fontSize: 20, color: 'grey'}}>
                    NEA esta revisando tus documentos
                </div>
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
                    Nadie te a solicitado a lavar :(
                </div>
            </div>
            )
        }
        
    }

    
    openCarwashDetails(carwash) {
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
                <ScrollView style={{height: 450}}>
                    <div >
                    {this.displayProgress()}
                    </div>
                </div>
                <div style={{backgroundColor: 'white'}}>
                <div style={{alignItems:'center', marginTop: 15}}>
                    <Button
                     onClick={() => this.props.navigation.navigate('Schedule')}
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
                                <div p style={{color: 'white'}}>Lavados Acceptados</div>
                            </div>
                            </div>
                        </div>
                    </Button>
                </div>
                {/* <div style={{alignItems:'center'}}>
                    <Button
                      onClick={() => this.props.navigation.navigate('Agenda')}
                    >
                        <div style={styles.cardblock2}>
                            <div className="row">
                            <div>
                                <img
                                        src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fabilities.png?alt=media&token=3a62c4bf-d18f-4ac1-8954-eb873eed15af'}}
                                        style={{height: 60, width: 40, marginLeft: 30}}
                                        />
                            </div>
                            <div style={{marginLeft: 20, justifyContent: 'center'}}>
                                <div p>Aprender Abilidades</div>
                            </div>
                            </div>
                        </div>
                    </Button>
                </div> */}
                {/* <div style={{alignItems:'center'}}>
                    <Button
                         onClick={() => this.props.navigation.navigate('AddCar')}

                    >
                    <div style={styles.cardblock3}>
                        <div className="row">
                        <div>
                            <img
                                    src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fprofilewhite.png?alt=media&token=5c815b90-2627-42af-8a3b-29f6126d55cf'}}
                                    style={{height: 50, width: 50, marginLeft: 30}}
                                    />
                        </div>
                        <div style={{marginLeft: 20, justifyContent: 'center'}}>
                            <div p style={{color: 'white'}}>Configurar Perfil</div>
                        </div>
                        </div>
                    </div>
                    </Button>
                </div> */}
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
    cardblock4: {
        width: 10 * 22,
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
  
  export default connect(mapStateToProps)(DashboardWasher);
