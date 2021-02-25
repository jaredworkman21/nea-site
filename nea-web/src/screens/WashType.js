import React from "react";
import {connect} from 'react-redux';
import { ADD_PRICETEMP, ADD_SUBSCRIPTION_TO_CARWASH, ADD_TYPE_TO_CARWASH } from '../actions/types';
import {Link, withRouter} from 'react-router-dom';
import {Button} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Header from "../components/Header";


class WashType extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      priceSmall: {
        expressPrice: 130,
        enceradoPrice: 250,
        detalladoPrice: 500,
        interiorPrice: 1000,
        polishedPrice: 1000,
      },
      priceMedium: {
        expressPrice: 150,
        enceradoPrice: 270,
        detalladoPrice: 600,
        interiorPrice: 1100,
        polishedPrice: 1100,

      },
      priceLarge: {
        expressPrice: 180,
        enceradoPrice: 300,
        detalladoPrice: 700,
        interiorPrice: 1150,
        polishedPrice: 1150,

      },
      showExpress: false,
      showEcologico: false,
      showEncerado: false,
      showDetallado: false,
      expressDetails: {
        fuera: true,
        jantas: true,
      }
    }
  }
  toggleExpress = () => {
    let price = 0
    if(this.props.carwash.currentCarwash.car.car.size == 'chico'){
      price = this.state.priceSmall.expressPrice;
    }
    else if(this.props.carwash.currentCarwash.car.car.size == 'mediano'){
      price = this.state.priceMedium.expressPrice;
    }
    else if(this.props.carwash.currentCarwash.car.car.size == 'grande'){
      price = this.state.priceLarge.expressPrice;
    }
    this.props.dispatch({
      type: ADD_PRICETEMP,
      payload: {
          price: price,
      }
    });
    this.props.dispatch({
      type: ADD_TYPE_TO_CARWASH,
      payload: {
        washType: {
          level: 'express'
        }
      }
    });
    this.props.history.push("/subscription-type");
  }
  toggleEncerado = () => {
    let price = 0
    if(this.props.carwash.currentCarwash.car.car.size == 'chico'){
      price = this.state.priceSmall.enceradoPrice;
    }
    else if(this.props.carwash.currentCarwash.car.car.size == 'mediano'){
      price = this.state.priceMedium.enceradoPrice;
    }
    else if(this.props.carwash.currentCarwash.car.car.size == 'grande'){
      price = this.state.priceLarge.enceradoPrice;
    }
    this.props.dispatch({
      type: ADD_PRICETEMP,
      payload: {
          price: price,
      }
    });
    this.props.dispatch({
      type: ADD_TYPE_TO_CARWASH,
      payload: {
        washType: {
          level: 'encerado'
        }
      }
    });
    this.props.history.push("/subscription-type");
  }
  toggleDetallado = () => {
    let price = 0
    if(this.props.carwash.currentCarwash.car.car.size == 'chico'){
      price = this.state.priceSmall.detalladoPrice;
    }
    else if(this.props.carwash.currentCarwash.car.car.size == 'mediano'){
      price = this.state.priceMedium.detalladoPrice;
    }
    else if(this.props.carwash.currentCarwash.car.car.size == 'grande'){
      price = this.state.priceLarge.detalladoPrice;
    }
    this.props.dispatch({
      type: ADD_PRICETEMP,
      payload: {
          price: price,
      }
    });
    this.props.dispatch({
      type: ADD_TYPE_TO_CARWASH,
      payload: {
        washType: {
          level: 'detallado'
        }
      }
    });
    this.props.history.push("/subscription-type");
  }
  toggleInterior = () => {
    let price = 0
    if(this.props.carwash.currentCarwash.car.car.size == 'chico'){
      price = this.state.priceSmall.interiorPrice;
    }
    else if(this.props.carwash.currentCarwash.car.car.size == 'mediano'){
      price = this.state.priceMedium.interiorPrice;
    }
    else if(this.props.carwash.currentCarwash.car.car.size == 'grande'){
      price = this.state.priceLarge.interiorPrice;
    }
    this.props.dispatch({
      type: ADD_PRICETEMP,
      payload: {
          price: price,
      }
    });
    this.props.dispatch({
      type: ADD_TYPE_TO_CARWASH,
      payload: {
        washType: {
          level: 'interior'
        }
      }
    });
    this.props.history.push("/subscription-type");
  }
  togglePolished = () => {
    let price = 0
    if(this.props.carwash.currentCarwash.car.car.size == 'chico'){
      price = this.state.priceSmall.interiorPrice;
    }
    else if(this.props.carwash.currentCarwash.car.car.size == 'mediano'){
      price = this.state.priceMedium.interiorPrice;
    }
    else if(this.props.carwash.currentCarwash.car.car.size == 'grande'){
      price = this.state.priceLarge.interiorPrice;
    }
    this.props.dispatch({
      type: ADD_PRICETEMP,
      payload: {
          price: price,
      }
    });
    this.props.dispatch({
      type: ADD_TYPE_TO_CARWASH,
      payload: {
        washType: {
          level: 'polished'
        }
      }
    });
    this.props.history.push("/subscription-type");
  }

  render() {
    console.log(this.props.carwash.currentCarwash.car.car.size)
    return (
      <div >
        <Header/>
        <div
        >
        <div style={{textAlign: 'center', width: '100%', display: 'inline-block', backgroundColor: '#F0F0F0', height: 1000, padding: '5%'}}>

            <Card style={styles.cardblock}>
              <h2 style={{color: '#286AEC', marginTop: 20, shadowColor:'white'}}>Express</h2>
              <div
                style={{
                  width: 200,
                  marginTop: 20,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                }}
              />
                {this.props.carwash.currentCarwash.car.car.size == 'chico' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceSmall.expressPrice}
                    </h3>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'mediano' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceMedium.expressPrice}
                    </h3>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'grande' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceLarge.expressPrice}
                    </h3>
                 </div>
                }
              <div style={{fontSize: 18, width: 200, textAlign: 'center', color: 'black', shadowColor:'white', paddingTop: 20, }}>
                Lavado de la fuera del carro, con jantas
                </div>
              <Button
                  color="black"
                  style={{ backgroundColor: 'black', width: 150, borderRadius: 5, marginTop: 30}}
                  onClick={this.toggleExpress}
                  
                  >
                  <div p style={{color: 'white', shadowColor:'white'}}>Empezar</div>
              </Button>
            </Card>

            <Card style={styles.cardblock}>
              <h2 style={{color: '#286AEC', marginTop: 20, shadowColor:'white'}}>Ecológico</h2>
              <div
                style={{
                  width: 200,
                  marginTop: 20,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                }}
              />
                {this.props.carwash.currentCarwash.car.car.size == 'chico' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceSmall.enceradoPrice}
                    </h3>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'mediano' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceMedium.enceradoPrice}
                    </h3>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'grande' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceLarge.enceradoPrice}
                    </h3>
                 </div>
                }            
                <div style={{fontSize: 18, width: 200, textAlign: 'center', color: 'black', shadowColor:'white', paddingTop: 20, }}>
                Lavado de la fuera del carro, con jantas
                </div>
              <Button
                  color="black"
                  style={{ backgroundColor: 'black', width: 150, borderRadius: 5, marginTop: 30}}
                  onClick={this.toggleEncerado}
                  
                  >
                  <div p style={{color: 'white', shadowColor:'white'}}>Empezar</div>
              </Button>
            </Card>
            <Card style={styles.cardblock}>
              <h2 style={{color: '#286AEC', marginTop: 20, shadowColor:'white'}}>Detallado</h2>
              <div
                style={{
                  width: 200,
                  marginTop: 20,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                }}
              />

                {this.props.carwash.currentCarwash.car.car.size == 'chico' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceSmall.detalladoPrice}
                    </h3>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'mediano' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceMedium.detalladoPrice}
                    </h3>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'grande' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceLarge.detalladoPrice}
                    </h3>
                 </div>
                }    

              <div style={{fontSize: 18, width: 200, textAlign: 'center', color: 'black', shadowColor:'white', paddingTop: 20, }}>
                Lavado de la fuera del carro, con jantas
                </div>
              <Button
                  color="black"
                  style={{ backgroundColor: 'black', width: 150, borderRadius: 5, marginTop: 30}}
                  onClick={this.toggleDetallado}
                  
                  >
                  <div p style={{color: 'white', shadowColor:'white'}}>Empezar</div>
              </Button>
            </Card>

            
            <Card style={styles.cardblock}>
              <h2 style={{color: '#286AEC', marginTop: 20, shadowColor:'white'}}>Interior</h2>
              <div
                style={{
                  width: 200,
                  marginTop: 20,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                }}
              />

                {this.props.carwash.currentCarwash.car.car.size == 'chico' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceSmall.interiorPrice}
                    </h3>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'mediano' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceMedium.interiorPrice}
                    </h3>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'grande' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceLarge.interiorPrice}
                    </h3>
                 </div>
                }    

              <div style={{fontSize: 18, width: 200, textAlign: 'center', color: 'black', shadowColor:'white', paddingTop: 20, }}>
                ¡Lavado de la fuera del carro, jantas, motor, por dentro, cera, y más!
                </div>
              <Button
                  color="black"
                  style={{ backgroundColor: 'black', width: 150, borderRadius: 5, marginTop: 30}}
                  onClick={this.toggleInterior}
                  >
                  <div p style={{color: 'white', shadowColor:'white'}}>Empezar</div>
              </Button>
            </Card>
            <Card style={styles.cardblock}>
              <h2 style={{color: '#286AEC', marginTop: 20, shadowColor:'white'}}>Pulido y Encerado</h2>
              <div
                style={{
                  width: 200,
                  marginTop: 20,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                }}
              />

                {this.props.carwash.currentCarwash.car.car.size == 'chico' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceSmall.polishedPrice}
                    </h3>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'mediano' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceMedium.polishedPrice}
                    </h3>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'grande' && 
                 <div>
                    <h3 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceLarge.polishedPrice}
                    </h3>
                 </div>
                }    

              <div style={{fontSize: 18, width: 200, textAlign: 'center', color: 'black', shadowColor:'white', paddingTop: 20, }}>
                Lavado de la fuera del carro, con jantas
                </div>
              <Button
                  color="black"
                  style={{ backgroundColor: 'black', width: 150, borderRadius: 5, marginTop: 30}}
                  onClick={this.togglePolished}
                  
                  >
                  <div p style={{color: 'white', shadowColor:'white'}}>Empezar</div>
              </Button>
            </Card>

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
      float: 'left',
      padding: 50,
      width: 300,
      height: 400,
      margin:10,

      alignItems: 'center',
      backgroundColor: "white",
      borderRadius: 20,
      shadowColor: '#C0C0C0',
      shadowOffset: { width: .5, height: 1.5 },
      shadowOpacity: 0.9,
      shadowRadius:2,  
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
    }
  };
  
  export default withRouter(connect(mapStateToProps)(WashType));