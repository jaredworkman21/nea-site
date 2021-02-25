import React from "react";
import { ADD_CAR_TO_CARWASH } from '../actions/types'
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import filler from '../assets/imgs/filler.png';
import nocar from '../assets/imgs/no-car.png';
import check from '../assets/imgs/check.png';
import Header from "../components/Header";

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
          <div
          style={{ backgroundColor: '#F9F9F9', height: 1000, paddingBottom: 400}}
      >
          <div style={{alignItems:'center', marginTop: 50, marginBottom: 600, display:'inline-block'}}>
          { this.props.user.cars.map((item)=> 

              <div
              key={item.id}
              style={{marginBottom: 15}}
               style={{float: 'left'}}
              >
                  <div 
                          onClick={() => this.selectCar(item)}
                      >
                          <div style={styles.cardblock} >
                              <div className="row">
                                  <div className="col-5 col-md-6">
                                          {(item.car.carUrl == '' || item.car.carUrl == null) && 
                                                  <div>
                                                      <img 
                                                      style={{height:   100, width:   150,  borderTopLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#cecece'}}
                                                      src={filler}
                                                              />
                                                          </div>
                                                      }
                                                      {(item.car.carUrl != '' && item.car.carUrl != null) && 
                                                          <div>
                                                              <img
                                                      style={{height:   100, width:  150,  borderTopLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#cecece'}}
                                                      src={item.car.carUrl}
                                                              />
                                                          </div>
                                                      }
                                          </div>
                                      <div className="col-5 col-md-6" style={{ flex: 1, marginTop: 10, paddingLeft: 15, textAlign: 'left'}}>
                                        <div h5 style={{fontWeight: 'bold', fontSize: 22}} > {item.car.make}</div>
                                            <div  style={{ fontSize: 18 }} > {item.car.model}</div>

                                          {/* <div p > {item.car.carwash.date.getDate().toString()}</div> */}

                                      </div>
                                  
                                  </div>
                                  <div className="row" style={{ marginLeft: 10}}>
                                      <div className="col-6 col-md-6" style={{padding: 15, width: '50%', }}>
                                          <div p style={{fontWeight: 'bold'}}> Temaño</div>
                                          <div p style={{textTransform: 'uppercase'}}> {item.car.size}</div>
                                      </div>
                                      {/* <div style={{padding: 15, maxWidth: 150}}>
                                          <div p style={{fontWeight: 'bold'}}> Cuidad</div>
                                          <div p style={{}}> { ((item.car.address.city).length > 12) ? 
                                                                                          (((item.car.address.city).substring(0,12-3)) + '...') : 
                                                                                          item.car.address.city }</div>
                                      </div> */}
                                      <div className="col-5 col-md-5"  style={{padding: 10, alignItems: 'center', marginRight: 10, width: '50%', }}>
                                      <div p style={{fontWeight: 'bold'}}> Estado</div>

                                          { item.car.carwash != null &&
                                              <div className="row">
                                                  <img
                                                      src={check}
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
                      </div> 
                  </div>
          )}

          </div>
          </div>
      )
  }
  else {
      return (
          this.props.user.cars != [] && 
              <div style={{textAlign: 'center', paddingTop: 40, paddingBottom: 50}}>
                <img
                    style={{ width: 180, height: 90 }}
                    src={nocar}
                />
                <div style={{ paddingTop: 15, fontSize: 20, color: 'grey'}}>
                    Agregar un carro o agenda un lavado
                </div>
          </div>
      )
  }
}
  render() {
    return (
      <div >
        <Header />
        <div style={{textAlign: 'center'}}>

        <div style={{width: '100%', textAlign:'center', paddingTop: 15, fontSize: 25, color: 'grey'}}>
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
      width: 400 ,
      backgroundColor: "white",
      borderRadius: 20,
      margin: 3,
      marginTop: 15,
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