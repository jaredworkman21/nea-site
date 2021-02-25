import React from "react";
import {
  Platform, StyleSheet, Dimensions, Text,
   Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { View } from 'react-native';
import {connect} from 'react-redux';
import {getAllWashers} from '../services/firebaseServices';
import { LOAD_NOTIFICATION, LOAD_REVIEW } from '../actions/types';


class Notifications extends React.Component {
    state = {
        chats: this.props.user.chatIds
    }
    selectNotification = (notification) => {
        this.props.dispatch({
            type: LOAD_NOTIFICATION,
            payload: {
                notification: notification
            }
          });
        this.props.navigation.navigate('NotificationDetails');
    }
    selectReview = (notification) => {
      this.props.dispatch({
          type: LOAD_REVIEW,
          payload: {
            notification: notification
          }
        });
      this.props.navigation.navigate('ReviewDetails');
  }
    selectLeaveReview = (notification) => {
      this.props.dispatch({
          type: LOAD_REVIEW,
          payload: {
              review: notification
          }
        });
      this.props.navigation.navigate('LeaveReview');
    }
    render() {
      console.log(this.props.user.notifications);
      return (
        <ScrollView>
            <div style={{alignItems: 'center'}}>
                    <div style={{fontSize: 30,  marginTop: 40, textAlign: 'center'}}>Notificaciónes</div>
                    <div style={{alignItems: 'center', marginTop: 30, marginBottom: 30}}>
                      <div style={{alignItems: 'center'}}>
                            
                            {this.props.user.notifications.map(notification => (
                                <div 
                                style={{alignSelf: 'stretch', textAlign: 'center',}}

                                // key={notification.id}
                                >
                                   {(notification.type == 'leave-review') && 
                                    <div 
                                    >
                                        <Button 
                                        style={styles.cardblock}
                                        onClick={()=> this.selectLeaveReview(notification)}
                                        >
                                         <div style={{flexDirection: 'row', justifyContent: 'center',  margin: 20}}>
                                            <div style={{fontSize: 25, marginLeft: 20, width: 60, height: 60, justifyContent: 'center', borderWidth: 1, borderRadius: 50}}>
                                               {/* <Stars
                                                 half={true}
                                                 default={2.5}
                                                 // update={(val)=>{this.setState({stars: val})}}
                                                 spacing={4}
                                                 starSize={15}
                                                 count={3}/> */}
                                             </div>
                                             <div>
                                                <div style={{ flex: 1, fontSize: 20, paddingLeft: 20, height: 30, marginTop: 5}}>
                                                  Carro lavado, deja una reseña!
                                                </div>
                                                <div style={{ flex: 1, fontSize: 12, paddingLeft: 20, height: 30, marginTop: 5}}>
                                                  Si algo no quedo como tu quieres, queremos saber.
                                                </div>
                                            </div>
                                         </div>
                                      
                                       </Button>
                                  </div>
                                }

                                {(notification.type == 'message') && 
                                        <div 
                                        >
                                            <Button 
                                            style={styles.cardblock}
                                            onClick={()=> this.selectNotification(notification)}
                                            >
                                            <div style={{flexDirection: 'row', justifyContent: 'center',  margin: 20}}>
                                                <div style={{fontSize: 25, marginLeft: 20, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 50}}>
                                                  <img
                                                    src={{uri: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fmessage-icon.png?alt=media&token=e433cf85-ab02-490e-91dd-4bba6ea6aa57'}}
                                                    style={{height: 33, width: 40}}
                                                  />

                                                </div>
                                                <div>
                                                    <div style={{ flex: 1, fontSize: 20, paddingLeft: 20, height: 30, marginTop: 5}}>
                                                      {notification.header}
                                                    </div>
                                                    <div style={{ flex: 1, fontSize: 12, paddingLeft: 20, height: 30, marginTop: 5}}>
                                                      {notification.subject}
                                                    </div>
                                                </div>
                                            </div>
                                          
                                          </Button>
                                      </div>
                                
                                }
                                </div>
                              ))}

                                
                      </div>
                  </div>
            </div>
        </div>
      
      );
    }
  }

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      cardblock: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        height: 100,
        marginBottom: 2,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: '#C0C0C0',
        shadowOffset: { width: .5, height: 1.5 },
        shadowOpacity: 0.9,
        shadowRadius:2,  
        elevation: 1,
    },
      container2: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }
  });

  const mapStateToProps = (state) => {
    return {
      user: state.user.user,
      carwash: state.carwash,
      staticData: state.staticData,
      washer: state.washer.washer
    }
  };
  
  export default connect(mapStateToProps)(Notifications);