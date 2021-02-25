import React from "react";
import {connect} from 'react-redux';
import { ADD_SUBSCRIPTION_TO_CARWASH } from '../actions/types';
import {Link, withRouter} from 'react-router-dom';
import {Button, Switch} from '@material-ui/core';



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
            <div style={{flexDirection:"row"}}>
                <div style={{flex:1, alignItems: 'center'}}>
                    <div style={styles.cardblock}>
                        {(this.props.carwash.currentCarwash.washType == 'express') &&
                        <div h3>${(this.props.carwash.currentCarwash.priceTemp * 11/12).toFixed(0)}</div>
                        }
                        {(this.props.carwash.currentCarwash.washType == 'encerado') &&
                        <div h3>${(this.props.carwash.currentCarwash.priceTemp * 11/12).toFixed(0)}</div>
                        }
                        {(this.props.carwash.currentCarwash.washType == 'detallado') &&
                        <div h3>${(this.props.carwash.currentCarwash.priceTemp * 11/12).toFixed(0)}</div>
                        }
                        {(this.props.carwash.currentCarwash.washType == 'interior') &&
                        <div h3>${(this.props.carwash.currentCarwash.priceTemp * 11/12).toFixed(0)}</div>
                        }
                        {(this.props.carwash.currentCarwash.washType == 'polished') &&
                        <div h3>${(this.props.carwash.currentCarwash.priceTemp * 11/12).toFixed(0)}</div>
                        }
                        <div style={{marginTop: 10}}>Cada Mes</div>
                        <Button 
                            color="#286AEC"
                            style={{width: 100, height: 40, margin: 20}}
                            onClick={() => this.selectBilling('monthly-yearly')}
                            >
                                Seleccione
                            </Button>
                    </div>
                </div>
                <div style={{flex:1, alignItems: 'center'}}>
                    <div style={styles.cardblock}>
                        {(this.props.carwash.currentCarwash.washType == 'express') &&
                        <div h3>${(this.props.carwash.currentCarwash.priceTemp * 10/12).toFixed(0) }</div>
                        }
                        {(this.props.carwash.currentCarwash.washType == 'encerado') &&
                        <div h3>${(this.props.carwash.currentCarwash.priceTemp * 10/12).toFixed(0) }</div>
                        }
                        {(this.props.carwash.currentCarwash.washType == 'detallado') &&
                        <div h3>${(this.props.carwash.currentCarwash.priceTemp * 10/12).toFixed(0) }</div>
                        }
                        {(this.props.carwash.currentCarwash.washType == 'interior') &&
                        <div h3>${(this.props.carwash.currentCarwash.priceTemp * 10/12).toFixed(0) }</div>
                        }
                        {(this.props.carwash.currentCarwash.washType == 'polished') &&
                        <div h3>${(this.props.carwash.currentCarwash.priceTemp * 10/12).toFixed(0) }</div>
                        }                           
                        <div style={{marginTop: 10}}>Cada Semana</div>
                        <Button 
                            color="#286AEC"
                            style={{width: 100, height: 40, margin: 20}}
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
              <div style={{flexDirection:"row"}}>
                  <div style={{flex:1, alignItems: 'center'}}>
                      <div style={styles.cardblock}>
                        {(this.props.carwash.currentCarwash.washType == 'express') &&
                            <div h3>${(this.props.carwash.currentCarwash.priceTemp * .95).toFixed(0) }</div>
                            }
                            {(this.props.carwash.currentCarwash.washType == 'encerado') &&
                            <div h3>${(this.props.carwash.currentCarwash.priceTemp * .95).toFixed(0) }</div>
                            }
                            {(this.props.carwash.currentCarwash.washType == 'detallado') &&
                            <div h3>${(this.props.carwash.currentCarwash.priceTemp * .95).toFixed(0) }</div>
                            }
                            {(this.props.carwash.currentCarwash.washType == 'interior') &&
                            <div h3>${(this.props.carwash.currentCarwash.priceTemp * .95).toFixed(0) }</div>
                            }   
                            {(this.props.carwash.currentCarwash.washType == 'polished') &&
                            <div h3>${(this.props.carwash.currentCarwash.priceTemp * .95).toFixed(0) }</div>
                            }                              
                          <div style={{marginTop: 10}}>Cada Mes</div>
                          <Button 
                              color="#286AEC"
                              style={{width: 100, height: 40, margin: 20}}
                              onClick={() => this.selectBilling('monthly-monthly')}
                              >
                                  Seleccione
                              </Button>
                      </div>
                  </div>
                  <div style={{flex:1, alignItems: 'center'}}>
                      <div style={styles.cardblock}>
                            {(this.props.carwash.currentCarwash.washType == 'express') &&
                            <div h3>${(this.props.carwash.currentCarwash.priceTemp * .9).toFixed(0) }</div>
                            }
                            {(this.props.carwash.currentCarwash.washType == 'encerado') &&
                            <div h3>${(this.props.carwash.currentCarwash.priceTemp * .9).toFixed(0) }</div>
                            }
                            {(this.props.carwash.currentCarwash.washType == 'detallado') &&
                            <div h3>${(this.props.carwash.currentCarwash.priceTemp * .9).toFixed(0) }</div>
                            }
                            {(this.props.carwash.currentCarwash.washType == 'interior') &&
                            <div h3>${(this.props.carwash.currentCarwash.priceTemp * .9).toFixed(0) }</div>
                            }  
                            {(this.props.carwash.currentCarwash.washType == 'polished') &&
                            <div h3>${(this.props.carwash.currentCarwash.priceTemp * .9).toFixed(0) }</div>
                            }      
                          <div style={{marginTop: 10}}>Cada Semana</div>
                          <Button 
                              color="#286AEC"
                              style={{width: 100, height: 40, margin: 20}}
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
<div>
            <div >
            <div style={{flex:1, alignItems: 'center', marginTop: 40, marginBottom: 40}}>
            <div 
                h4
                style={{  marginBottom:  10 *2, marginTop:  10 *1 }}
                color='black'
            >
                Una Vez
            </div>
                    <div style={styles.cardblock}>
                        <div h3>${this.props.carwash.currentCarwash.priceTemp}</div>
                        <div style={{marginTop: 10}}>Una Vez</div>
                        <Button 
                            color="black"
                            style={{width: 100, height: 40, margin: 20}}
                            onClick={() => this.selectBilling('one-time')}
                            >
                                Seleccione
                            </Button>
                    </div>
                </div>
                <div style={{height: 600, 
                    backgroundColor: 'white', 
                    marginTop: 30, 
                    shadowColor: 'black', 
                    borderRadius: 50,
                    alignItems: 'center'}}>
            <div 
                h4
                style={{  marginBottom:  10 / 2, marginTop:  10 *2 }}
                color='black'
            >
                Suscripciones
            </div>
                <div style={{ alignItems: 'center'}}>
                    <div style={{flexDirection:"row", alignItems: 'center', marginTop: 15, marginLeft: 100, marginRight: 100, marginBottom: 20}}>
                        <div style={{flex:1, width: 20, alignItems: 'center'}}>
                            <div>Mensual</div>
                        </div>
                        <div style={{flex:1, width: 20, alignItems: 'center'}}>
                            <Switch
                                value={this.state.showYearlyBilling}
                                onValueChange={this.toggleBilling}
                                ios_backgroundColor='black'
                                trackColor={{ false: 'grey', true: '#286AEC' }}
                            />
                        </div>
                        <div style={{flex:1, width: 20, alignItems: 'center'}}>
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
    );
  }
}

const styles = {
    container: {
      backgroundColor: "black",
    },
    cardblock: {
        width: 10 * 11 ,
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