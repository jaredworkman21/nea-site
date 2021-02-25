import React from "react";
import { ADD_CAR_TO_CARWASH } from '../actions/types'
import {Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import Header from '../components/Header';
import carwash_icon from '../assets/imgs/carwash-icon.png'
import add_car from '../assets/imgs/addcar.png';
import DashboardTabs from "./DashboardTabs";


class Dashboard extends React.Component {
    selectCar (car) {
        this.props.history.push("/car-details");
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
                this.props.user.cars.map((item)=>
                    <div
                    key={item.id}
                    style={{marginBottom: 15}}
                    >
                        <Button 
                                onClick={() => this.selectCar(item)}
                            >
                                    <div style={styles.cardblock} >

                                            <div>
                                            {item.car.carUrl == '' && 
                                                    <div>
                                                        <img 
                                                        style={{ height: 50, width: 50, borderTopLeftRadius: 20, borderTopRightRadius: 20}}
                                                        src={require('../assets/imgs/filler.png')}
                                                                />
                                                            </div>
                                                        }
                                                        {item.car.carUrl != '' && 
                                                            <div>
                                                                <img
                                                        style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20}}
                                                        src= {{uri: item.car.carUrl}}
                                                                />
                                                            </div>
                                                        }
                                            </div>
                                    <div className="row">
                                        <div style={{ flex: 1, marginTop: 10, marginLeft: 15}}>
                                            <div h5 > {item.car.make} - {item.car.model}</div>
                                            {/* <div p > {item.car.carwash.date.getDate().toString()}</div> */}

                                            <div p > {item.car.carwash.time}</div>

                                        </div>
                                        <div style={{paddingBottom: 20, alignItems: 'center', marginRight: 10, marginTop: 10}}>
                                            <img
                                                src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fcheck.png?alt=media&token=2bcf402a-0cd8-412b-9ce7-05ea16ff0620'}}
                                                style={{height: 50, width: 50,  marginRight: 0}}
                                                />
                                            <div p style={{color: '#286AEC'}}> {item.car.carwash.type}</div>
                                        </div>
                                    </div>
                            </div>   
                            </Button> 
                        </div>   
                )
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
                        Agregar un carro o agenda un lavado
                    </div>
                </div>
            )
        }
    }
    render () {
        return (
            <div  className="overflow-scroll" style={{height: '1000px'}}>
                <Header/>
                <div style={{alignItems:'center', marginTop: 15 }}>
                    <div className="row">
                    <div className="col-md-4">
                    </div>
                        <div className="col-md-2 col-12" style={{textAlign: 'center'}}
                        onClick={() => this.props.history.push("/select-car")}
                        >
                            <div style={styles.cardblock2}>
                                <div className="row">
                                <div>
                                    <img
                                            src={carwash_icon}
                                            style={{height: 30, width: 40, marginLeft: 5}}
                                            />
                                </div>
                                <div style={{marginLeft: 5, justifyContent: 'center'}}>
                                    <div p>Agenda</div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-12" style={{textAlign: 'center'}}
                            onClick={() => this.props.history.push("/add-car")}

                        >
                        <div style={styles.cardblock3}>
                            <div className="row">
                            <div>
                                <img
                                        src={add_car}
                                        style={{height: 30, width: 40, marginLeft: 5}}
                                        />
                            </div>
                            <div style={{marginLeft: 5, justifyContent: 'center'}}>
                                <div p style={{color: 'white'}}>Agregar carro</div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>


                <DashboardTabs additionalProps={this.props}/>

             </div>
        );

    }
}

const styles = {
    container: {
      backgroundColor: "#286AEC",
    },
    cardblock2: {
        width: '200px',
        padding: 20,
        marginTop: 20,
        marginLeft: 10,
        backgroundColor: "white",
        border: '1px solid black',
        borderColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',

    },
    cardblock3: {
        marginTop: 20,
        width: '200px',
        padding: 20,
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
};

const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      carwash: state.carwash
    }
  };
  
  export default withRouter(connect(mapStateToProps)(Dashboard));
