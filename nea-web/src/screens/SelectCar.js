import React from "react";
import { ADD_CAR_TO_CARWASH } from '../actions/types'
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';


class SelectCar extends React.Component {
  selectCar (car) {
    this.props.history.push("/wash-type");
    this.props.dispatch({
      type: ADD_CAR_TO_CARWASH,
      payload: {
      car: car
      }
  });

  }


  displayCars() {
    if(this.props.user.cars.length > 0){
        return (
          <div style={{alignItems:'center', marginTop: 10}}>
            <div
            style={{  height: 500, paddingBottom: 400}}
            >
            <div style={{alignItems:'center', marginTop: 20, marginBottom: 100}}>
                  { this.props.user.cars.map((item)=>
                    <div
                    key={item.id}
                    style={{marginBottom: 15}}
                    >
                        <div
                key={item.id}
                style={{marginBottom: 15}}
                >
                    <Button 
                            onClick={() => this.selectCar(item)}
                        >
                            <div style={styles.cardblock} >
                                <div className="row">
                                    <div>
                                            {(item.car.carUrl == '' || item.car.carUrl == null) && 
                                                    <div>
                                                        <img 
                                                        style={{height:   10 * 4, width:   10 * 7,  borderTopLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#cecece'}}
                                                        src={require('../assets/imgs/filler.png')}
                                                                />
                                                            </div>
                                                        }
                                                        {(item.car.carUrl != '' && item.car.carUrl != null) && 
                                                            <div>
                                                                <img
                                                        style={{height:   10 * 4, width:   10 * 7,  borderTopLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#cecece'}}
                                                        src={{uri: item.car.carUrl}}
                                                                />
                                                            </div>
                                                        }
                                            </div>
                                        <div style={{ flex: 1, marginTop: 10, marginLeft: 15}}>
                                        <div h5 style={{fontWeight: 'bold', fontSize: 22}} > {item.car.make}</div>
                                            <div  style={{ fontSize: 18 }} > {item.car.model}</div>

                                            {/* <div p > {item.car.carwash.date.getDate().toString()}</div> */}

                                        </div>
                                    
                                    </div>
                                    <div style={{flexDirection: 'row', marginLeft: 10}}>
                                        <div style={{padding: 15, width: '50%', }}>
                                            <div p style={{fontWeight: 'bold'}}> Temaño</div>
                                            <div p style={{textTransform: 'uppercase'}}> {item.car.size}</div>
                                        </div>
                                        {/* <div style={{padding: 15, maxWidth: 150}}>
                                            <div p style={{fontWeight: 'bold'}}> Cuidad</div>
                                            <div p style={{}}> { ((item.car.address.city).length > 12) ? 
                                                                                            (((item.car.address.city).substring(0,12-3)) + '...') : 
                                                                                            item.car.address.city }</div>
                                        </div> */}
                                        <div style={{padding: 10, alignItems: 'center', marginRight: 10, width: '50%', }}>
                                        <div p style={{fontWeight: 'bold'}}> Estado</div>

                                            { item.car.carwash != null &&
                                                <div className="row">
                                                    <img
                                                        src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fcheck.png?alt=media&token=2bcf402a-0cd8-412b-9ce7-05ea16ff0620'}}
                                                        style={{height: 30, width: 30,  marginLeft: 10}}
                                                        />
                                                    <div p style={{color: '#286AEC',paddingTop: 5, paddingRight: 3}}> Agendado</div>
                                                </div>
                                            }
                                            { item.car.carwash == null &&
                                                <div className="row">
                                                <img
                                                        src={require('../assets/imgs/dirty.png')}
                                                        style={{height: 30, width: 30,  marginLeft: 10}}
                                                        />
                                                    <div p style={{color: '#8B4513', paddingTop: 5, paddingRight: 3}}>Sucio</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                        </div>   
                        </Button> 
                    </div>
                    </div> 
                  )}   
            </div>
            </div>
            </div>
        )
    }
    else {
        return (
            this.props.user.cars != [] && 
                <div style={{alignItems: 'center', paddingTop: 40, paddingBottom: 50}}>
                <img
                    style={{ width: 180, height: 70 }}
                    src={require('../assets/imgs/no-car.png')}
                />
                <div style={{width: 200, textAlign:'center', paddingTop: 15, fontSize: 20, color: 'grey'}}>
                    Agregar un carro
                </div>
            </div>
        )
    }
}
  render() {
    return (
      <div >

        <div style={{textAlign: 'center'}}>

        <div style={{width: 200, textAlign:'center', paddingTop: 15, fontSize: 20, color: 'grey'}}>
                    Agregar un carro
                </div>
            {this.displayCars(this.props.navigation)}
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
        backgroundColor: "white",
        borderRadius: 20,
        margin: 3,
        height:  10 * 9,
        padding: 0,
        shadowColor: '#C0C0C0',
        shadowOffset: { width: .5, height: 1.5 },
        shadowOpacity: 0.9,
        shadowRadius:2,  
        elevation: 1,
        flex: 1,
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
      carwash: state.carwash
    }
  };
  
  export default withRouter(connect(mapStateToProps)(SelectCar));