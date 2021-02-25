import React from "react";
import {connect} from 'react-redux';
import { ADD_SUBSCRIPTION_TO_CARWASH } from '../actions/types';
import {Link, withRouter} from 'react-router-dom';
import {Button, Switch, Card} from '@material-ui/core';
import Header from "../components/Header";
import lighter from '../assets/imgs/lighter_background_wet.png'




class SubscriptionType extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            showBilling: false,
            showYearlyBilling: true,
            typeofBilling: "Yearly"
        }
      }

      selectBilling = (subscription) => {
        let setprice = 0;
        let recurring = false;
        if(subscription == 'monthly-yearly'){
          setprice = this.props.carwash.currentCarwash.priceTemp * 10
          setprice = setprice.toFixed(0);

        }
        else if(subscription == 'weekly-yearly'){
          setprice = this.props.carwash.currentCarwash.priceTemp * 46
          setprice = setprice.toFixed(0);

        }
        else if(subscription == 'monthly-monthly'){
          setprice = this.props.carwash.currentCarwash.priceTemp * .95
          setprice = setprice.toFixed(0);
        }
        else if(subscription == 'weekly-monthly'){
          setprice = this.props.carwash.currentCarwash.priceTemp * 4 * .9
          setprice = setprice.toFixed(0);
        }
        else if(subscription == 'one-time'){
          setprice = this.props.carwash.currentCarwash.priceTemp 
          setprice = setprice.toFixed(0);
        }
        this.props.dispatch({
          type: ADD_SUBSCRIPTION_TO_CARWASH,
          payload: {
                subscription: subscription,
                price: setprice
          }
        });
        this.props.history.push("/date-select");
    }
    yearly () {
      return  <div style={{textAlign: 'center'}}>
            <div className="row">
                  <div className="col-6 col-md-6" style={{flex:1, alignItems: 'center'}}>
                    <div style={styles.cardblock}>
                        {(this.props.carwash.currentCarwash.washType == 'express') &&
                        <h3>${(this.props.carwash.currentCarwash.priceTemp * 11/12).toFixed(0)}</h3>
                        }
                        {(this.props.carwash.currentCarwash.washType == 'encerado') &&
                        <h3>${(this.props.carwash.currentCarwash.priceTemp * 11/12).toFixed(0)}</h3>
                      }
                        {(this.props.carwash.currentCarwash.washType == 'detallado') &&
                        <h3>${(this.props.carwash.currentCarwash.priceTemp * 11/12).toFixed(0)}</h3>
                      }
                        {(this.props.carwash.currentCarwash.washType == 'interior') &&
                        <h3>${(this.props.carwash.currentCarwash.priceTemp * 11/12).toFixed(0)}</h3>
                      }
                        {(this.props.carwash.currentCarwash.washType == 'polished') &&
                        <h3>${(this.props.carwash.currentCarwash.priceTemp * 11/12).toFixed(0)}</h3>
                      }
                        <div style={{marginTop: 10}}>Cada Mes</div>
                        <Button 
                            color="#286AEC"
                            style={{paddingLeft: 15, paddingRight: 15, backgroundColor: '#286AEC', width: 130, color:"white", height: 40, margin: 20}}
                            onClick={() => this.selectBilling('monthly-yearly')}
                            >
                                Seleccione
                            </Button>
                    </div>
                </div>
                <div className="col-6 col-md-6" style={{flex:1, alignItems: 'center'}}>
                    <div style={styles.cardblock}>
                        {(this.props.carwash.currentCarwash.washType == 'express') &&
                        <h3>${(this.props.carwash.currentCarwash.priceTemp * 10/12).toFixed(0) }</h3>
                        }
                        {(this.props.carwash.currentCarwash.washType == 'encerado') &&
                        <h3>${(this.props.carwash.currentCarwash.priceTemp * 10/12).toFixed(0) }</h3>
                      }
                        {(this.props.carwash.currentCarwash.washType == 'detallado') &&
                        <h3>${(this.props.carwash.currentCarwash.priceTemp * 10/12).toFixed(0) }</h3>
                      }
                        {(this.props.carwash.currentCarwash.washType == 'interior') &&
                        <h3>${(this.props.carwash.currentCarwash.priceTemp * 10/12).toFixed(0) }</h3>
                      }
                        {(this.props.carwash.currentCarwash.washType == 'polished') &&
                        <h3>${(this.props.carwash.currentCarwash.priceTemp * 10/12).toFixed(0) }</h3>
                      }                           
                        <div style={{marginTop: 10}}>Cada Semana</div>
                        <Button 
                            color="#286AEC"
                            style={{paddingLeft: 15, paddingRight: 15, backgroundColor: '#286AEC', width: 130, color:"white", height: 40, margin: 20}}
                            onClick={() => this.selectBilling('weekly-yearly')}
                            >
                                Seleccione
                            </Button>
                    </div>
                </div>
            </div>
        </div>;
    }
      monthly () {
        return  <div style={{textAlign: 'center'}}>
              <div className="row">
                  <div className="col-6 col-md-6" style={{flex:1, alignItems: 'center'}}>
                      <div style={styles.cardblock}>
                        {(this.props.carwash.currentCarwash.washType == 'express') &&
                            <h3>${(this.props.carwash.currentCarwash.priceTemp * .95).toFixed(0) }</h3>
                            }
                            {(this.props.carwash.currentCarwash.washType == 'encerado') &&
                            <h3>${(this.props.carwash.currentCarwash.priceTemp * .95).toFixed(0) }</h3>
                          }
                            {(this.props.carwash.currentCarwash.washType == 'detallado') &&
                            <h3>${(this.props.carwash.currentCarwash.priceTemp * .95).toFixed(0) }</h3>
                          }
                            {(this.props.carwash.currentCarwash.washType == 'interior') &&
                            <h3>${(this.props.carwash.currentCarwash.priceTemp * .95).toFixed(0) }</h3>
                          }   
                            {(this.props.carwash.currentCarwash.washType == 'polished') &&
                            <h3>${(this.props.carwash.currentCarwash.priceTemp * .95).toFixed(0) }</h3>
                          }                              
                          <div style={{marginTop: 10}}>Cada Mes</div>
                          <Button 
                              color="#286AEC"
                              style={{paddingLeft: 15, paddingRight: 15, backgroundColor: '#286AEC', width: 130, color:"white", height: 40, margin: 20}}
                              onClick={() => this.selectBilling('monthly-monthly')}
                              >
                                  Seleccione
                              </Button>
                      </div>
                  </div>
                  <div className="col-6 col-md-6" style={{flex:1, alignItems: 'center'}}>
                      <div style={styles.cardblock}>
                            {(this.props.carwash.currentCarwash.washType == 'express') &&
                            <h3>${(this.props.carwash.currentCarwash.priceTemp * .9).toFixed(0) }</h3>
                            }
                            {(this.props.carwash.currentCarwash.washType == 'encerado') &&
                            <h3>${(this.props.carwash.currentCarwash.priceTemp * .9).toFixed(0) }</h3>
                          }
                            {(this.props.carwash.currentCarwash.washType == 'detallado') &&
                            <h3>${(this.props.carwash.currentCarwash.priceTemp * .9).toFixed(0) }</h3>
                          }
                            {(this.props.carwash.currentCarwash.washType == 'interior') &&
                            <h3>${(this.props.carwash.currentCarwash.priceTemp * .9).toFixed(0) }</h3>
                          }  
                            {(this.props.carwash.currentCarwash.washType == 'polished') &&
                            <h3>${(this.props.carwash.currentCarwash.priceTemp * .9).toFixed(0) }</h3>
                          }      
                          <div style={{marginTop: 10}}>Cada Semana</div>
                          <Button 
                              color="#286AEC"
                              style={{paddingLeft: 15, paddingRight: 15, backgroundColor: '#286AEC', width: 130, color:"white", height: 40, margin: 20}}
                              onClick={() => this.selectBilling('weekly-monthly')}
                              >
                                  Seleccione
                              </Button>
                      </div>
                  </div>
              </div>
          </div>;
        
      }



    toggleBilling = () => {

        this.setState({
            showBilling: !this.state.showBilling,
            showYearlyBilling: !this.state.showYearlyBilling
        });
      }

  render() {
    return (
      <div >
        <Header/>
<div>
        <div  style={{textAlign: 'center'}}>
            <div style={{ backgroundImage: `url(${lighter})`, paddingTop: 100}} className="new-banner1">
              <div  style={{textAlign: 'center'}}>
                <div style={styles.registerContainer} className="register-container">            
                <div style={{ alignText: 'center', margin:40}}>
            <h4 
                style={{  marginBottom:  10 *2, marginTop:  10 *1 }}
                color='black'
            >
                Una Vez
            </h4>
                    <Card style={styles.cardblock}>
                        <h3>${this.props.carwash.currentCarwash.priceTemp}</h3>
                        <div style={{marginTop: 10}}>Una Vez</div>
                        <Button 
                            color="black"
                            style={{paddingLeft: 15, paddingRight: 15, backgroundColor: '#286AEC', width: 130, color:"white", height: 40, margin: 20}}
                            onClick={() => this.selectBilling('one-time')}
                            >
                                Seleccione
                            </Button>
                    </Card>
                </div>
                <div style={{height: 600, 
                    backgroundColor: 'white', 
                    marginTop: 30, 
                    shadowColor: 'black', 
                    borderRadius: 50,
                    alignItems: 'center'}}>
            <h4 
                h4
                style={{  marginBottom:  10 / 2, paddingTop:  40 }}
                color='black'
            >
                Suscripciones
            </h4>
                <div style={{ alignItems: 'center'}}>
                    <div className="row" style={{flexDirection:"row", textAlign: 'center', marginTop: 20}}>
                        <div className="col-3 col-md-3"></div>
                        <div className="col-2 col-md-2" style={{flex:1, width: 20, textAlign: 'center'}}>
                            <div>Mensual</div>
                        </div>
                        <div className="col-2 col-md-2" style={{flex:1, width: 20, textAlign: 'center'}}>
                            <Switch
                              checked={this.state.showYearlyBilling}
                              onChange={this.toggleBilling}
                              color="primary"
                            />
                        </div>
                        <div className="col-2 col-md-2" style={{flex:1, width: 20, textAlign: 'center'}}>
                            <div>Anual</div>
                        </div>
                    </div>

                </div>
              {this.state.showYearlyBilling && this.yearly() }
              {this.state.showBilling && this.monthly() }
            </div>
            </div>
            </div>
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
        width: '100%' ,
        paddingTop: 30,
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: '#C0C0C0',
        shadowOffset: { width: .5, height: 1.5 },
        shadowOpacity: 0.9,
        shadowRadius:2,  
        elevation: 1,
    },
    registerContainer: {
      backgroundColor: "#F0F0F0",
      borderRadius: 10,
      shadowColor: "black",
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
      overflow: "hidden"
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
  
  export default withRouter(connect(mapStateToProps)(SubscriptionType));