import React from "react";
import {connect} from 'react-redux';
import { ADD_PRICETEMP, ADD_SUBSCRIPTION_TO_CARWASH, ADD_TYPE_TO_CARWASH } from '../actions/types';
import {Link, withRouter} from 'react-router-dom';
import {Button} from '@material-ui/core';


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
        <div
        >
        <div style={{textAlign: 'center'}}>

            <div style={styles.cardblock}>
              <div h3 style={{color: '#286AEC', marginTop: 20, shadowColor:'white'}}>Express</div>
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
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceSmall.expressPrice}
                    </div>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'mediano' && 
                 <div>
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceMedium.expressPrice}
                    </div>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'grande' && 
                 <div>
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceLarge.expressPrice}
                    </div>
                 </div>
                }
              <div style={{fontSize: 18, width: 200, textAlign: 'center', color: 'black', shadowColor:'white', paddingTop: 20, }}>
                Lavado de la fuera del carro, con jantas
                </div>
              <Button
                  color="black"
                  style={{ width: 150, borderRadius: 5, marginTop: 30}}
                  onClick={this.toggleExpress}
                  
                  >
                  <div p style={{color: 'white', shadowColor:'white'}}>Empezar</div>
              </Button>
            </div>

            <div style={styles.cardblock}>
              <div h3 style={{color: '#286AEC', marginTop: 20, shadowColor:'white'}}>Ecológico</div>
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
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceSmall.enceradoPrice}
                    </div>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'mediano' && 
                 <div>
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceMedium.enceradoPrice}
                    </div>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'grande' && 
                 <div>
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceLarge.enceradoPrice}
                    </div>
                 </div>
                }            
                <div style={{fontSize: 18, width: 200, textAlign: 'center', color: 'black', shadowColor:'white', paddingTop: 20, }}>
                Lavado de la fuera del carro, con jantas
                </div>
              <Button
                  color="black"
                  style={{ width: 150, borderRadius: 5, marginTop: 30}}
                  onClick={this.toggleEncerado}
                  
                  >
                  <div p style={{color: 'white', shadowColor:'white'}}>Empezar</div>
              </Button>
            </div>
            <div style={styles.cardblock}>
              <div h3 style={{color: '#286AEC', marginTop: 20, shadowColor:'white'}}>Detallado</div>
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
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceSmall.detalladoPrice}
                    </div>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'mediano' && 
                 <div>
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceMedium.detalladoPrice}
                    </div>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'grande' && 
                 <div>
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceLarge.detalladoPrice}
                    </div>
                 </div>
                }    

              <div style={{fontSize: 18, width: 200, textAlign: 'center', color: 'black', shadowColor:'white', paddingTop: 20, }}>
                Lavado de la fuera del carro, con jantas
                </div>
              <Button
                  color="black"
                  style={{ width: 150, borderRadius: 5, marginTop: 30}}
                  onClick={this.toggleDetallado}
                  
                  >
                  <div p style={{color: 'white', shadowColor:'white'}}>Empezar</div>
              </Button>
            </div>

            
            <div style={styles.cardblock}>
              <div h3 style={{color: '#286AEC', marginTop: 20, shadowColor:'white'}}>Interior</div>
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
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceSmall.interiorPrice}
                    </div>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'mediano' && 
                 <div>
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceMedium.interiorPrice}
                    </div>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'grande' && 
                 <div>
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceLarge.interiorPrice}
                    </div>
                 </div>
                }    

              <div style={{fontSize: 18, width: 200, textAlign: 'center', color: 'black', shadowColor:'white', paddingTop: 20, }}>
                ¡Lavado de la fuera del carro, jantas, motor, por dentro, cera, y más!
                </div>
              <Button
                  color="black"
                  style={{ width: 150, borderRadius: 5, marginTop: 30}}
                  onClick={this.toggleInterior}
                  >
                  <div p style={{color: 'white', shadowColor:'white'}}>Empezar</div>
              </Button>
            </div>
            <div style={styles.cardblock}>
              <div h3 style={{color: '#286AEC', marginTop: 20, shadowColor:'white'}}>Pulido y Encerado</div>
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
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceSmall.polishedPrice}
                    </div>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'mediano' && 
                 <div>
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceMedium.polishedPrice}
                    </div>
                 </div>
                }
                {this.props.carwash.currentCarwash.car.car.size == 'grande' && 
                 <div>
                    <div h1 style={{  marginTop: 30, color: 'black', shadowColor:'white'}}>
                      ${this.state.priceLarge.polishedPrice}
                    </div>
                 </div>
                }    

              <div style={{fontSize: 18, width: 200, textAlign: 'center', color: 'black', shadowColor:'white', paddingTop: 20, }}>
                Lavado de la fuera del carro, con jantas
                </div>
              <Button
                  color="black"
                  style={{ width: 150, borderRadius: 5, marginTop: 30}}
                  onClick={this.togglePolished}
                  
                  >
                  <div p style={{color: 'white', shadowColor:'white'}}>Empezar</div>
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
      marginTop: 20,
      paddingTop: 20,
      alignItems: 'center',
      backgroundColor: "white",
      borderRadius: 20,
      height:  10 * 25,
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
      carwash: state.carwash,
    }
  };
  
  export default withRouter(connect(mapStateToProps)(WashType));