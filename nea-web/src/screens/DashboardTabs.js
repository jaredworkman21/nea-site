import * as React from 'react';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import { ADD_CAR_TO_CARWASH, LOAD_CURRENT_CARWASH } from '../actions/types'
import {Button} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import filler from '../assets/imgs/filler.png';
import nocar from '../assets/imgs/no-car.png';
import check from '../assets/imgs/check.png';
class DashboardTabs extends React.Component {
  state = {
    value: 0,
    routes: [
      { key: 'first', title: 'Carros' },
      { key: 'second', title: 'Lavados Agendados' },
    ],
  };

  
  selectCar (car) {
    this.props.additionalProps.navigation.navigate('CarDetails');
    this.props.dispatch({
      type: ADD_CAR_TO_CARWASH,
      payload: {
      car: car
      }
  });
  }
  openCarwashDetails(carwash) {
    this.props.dispatch({
        type: LOAD_CURRENT_CARWASH,
        payload: {
              currentCarwash: carwash,
        }
      });
    this.props.additionalProps.navigation.navigate('CarwashDetailsUser')
}
  displayCarwashes() {
    let numPending = 0;
    this.props.carwash.carwashes.forEach(wash => {
            numPending += 1;
    });
    if(numPending > 0){

        return (
            <div
            className="tap-small"
            style={{ backgroundColor: '#F9F9F9', height: 1000}}
        >
            <div style={{alignItems:'center', paddingBottom: 800, display:'inline-block'}}>
                    { this.props.carwash.carwashes.map((item)=> 


                            <div 
                            key ={item.id}
                            style={{marginTop: 20, float: 'left'}}
                          
                            >
                                                    <Button 
                            onClick={() => this.openCarwashDetails(item)}
                        >
                                                            <div style={styles.cardblock} >
                                <div className="row">
                                <div className="col-5 col-md-6">
                                    {(item.car.car.carUrl == '' || item.car.car.carUrl == null) && 
                                                    <div>
                                                        <img 
                                                        style={{height:   100, width:   180,  borderTopLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#cecece'}}
                                                        src={filler}
                                                                />
                                                            </div>
                                                        }
                                                        {(item.car.car.carUrl != '' && item.car.car.carUrl != null) && 
                                                            <div>
                                                                <img
                                                        style={{height:   100, width:   180,  borderTopLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#cecece'}}
                                                        src={item.car.car.carUrl}
                                                                />
                                                            </div>
                                                        }
                                            </div>
                                        <div className="col-5 col-md-6" style={{ flex: 1, marginTop: 10, marginLeft: 15}}>
                                            <div h5 style={{fontWeight: 'bold', fontSize: 22}} > {item.dateString}</div>
                                            <div  style={{ fontSize: 18 }} > {item.time}</div>
                                            {/* <div p > {item.car.carwash.date.getDate().toString()}</div> */}

                                        </div>
                                    
                                    </div>
                                    <div className="row" style={{flexDirection: 'row',  marginLeft: 10}}>
                                        <div className="col-4 col-md-4"  style={{padding: 15, width: 100, }}>
                                            <div p style={{fontWeight: 'bold'}}> Precio</div>
                                            <div p style={{textTransform: 'uppercase'}}> {item.price}</div>
                                        </div>
                                        {/* <div style={{padding: 15, maxWidth: 150}}>
                                            <div p style={{fontWeight: 'bold'}}> Cuidad</div>
                                            <div p style={{}}> { ((item.car.car.address.city).length > 12) ? 
                                                                                            (((item.car.car.address.city).substring(0,12-3)) + '...') : 
                                                                                            item.car.car.address.city }</div>
                                        </div> */}
                                        <div className="col-6 col-md-6" style={{padding: 15,  alignItems: 'center', marginRight: 10, width: '50%', }}>
                                        <div p style={{fontWeight: 'bold'}}> Pago</div>

                                            { item.carwash != null &&
                                                <div className="row">
                                                    <img
                                                        src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fcheck.png?alt=media&token=2bcf402a-0cd8-412b-9ce7-05ea16ff0620'}}
                                                        style={{height: 30, width: 30,  marginLeft: 10}}
                                                        />
                                                    <div p style={{color: '#286AEC',paddingTop: 5, paddingRight: 3}}> Pagado</div>
                                                </div>
                                            }
                                            { item.carwash == null &&
                                                    <div p style={{paddingLeft: 10, paddingRight: 3}}>En Efectivo</div>
                                            }
                                        </div>
                                    </div>
                        </div>   
                        </Button>
                            </div>
                    )
                  }
                </div>
                </div>
                        )
                    }
                    else {
                        return(
                            <div style={{textAlign: 'center', paddingTop: 40, paddingBottom: 50}}>
                            <img
                                style={{ width: 180, height: 90 }}
                                src={nocar}
                            />
                            <div style={{textAlign:'center', paddingTop: 15, fontSize: 20, color: 'grey'}}>
                                No has agendado un lavado. :(
                            </div>
                        </div>
                        )
                    }
                }
  displayCars() {
    if(this.props.user.cars.length > 0){
        return (
            <div
            className="tap-small"
            style={{ backgroundColor: '#f1f1f1', height: 1000, paddingBottom: 400}}
        >
            <div style={{alignItems:'center', marginTop: 50, marginBottom: 600, display:'inline-block'}}>
            { this.props.user.cars.map((item)=> 

                <div
                key={item.id}
                 style={{float: 'left', marginBottom: 20, marginRight: 20}}
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
    const handleChange = (event, newValue) => {
      this.setState({value: newValue});
    };
    return (
      <div  style={{backgroundColor: 'rgb(246, 246, 246)', marginTop: 15}}>
          <AppBar position="static" elevation={0} color="white" style={{paddingLeft: '8%'}}>
              <Tabs
                value={this.state.value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                style={{ boxShadow: 'none', backgroundColor: 'white'}}
                aria-label="full width tabs example"
              >
                <Tab label="Carros" {...a11yProps(0)} />
                <Tab label="Lavados" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
          <div style={{backgroundColor:'#F1f1f1', height: 1000}}>
              <TabPanel value={this.state.value} index={0}>
              {this.displayCars()}
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
              {this.displayCarwashes()}
              </TabPanel>
          </div>
    </div>
    );
  }
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  console.log(value, index);
  return (
  <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 40,
    paddingRight: 15, 
    paddingLeft: 15,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textActive: {
    color: 'black',
  },
  textActive2: {
    color: 'white',
    fontWeight: 'bold'
},
  tabItem2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#286AEC',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  cardblock2: {
    width: 400,
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
cardblock8: {
    width: 400 ,
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
cardblock3: {
    width: 400,
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
};

const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      carwash: state.carwash
    }
  };

  export default connect(mapStateToProps)(DashboardTabs);
