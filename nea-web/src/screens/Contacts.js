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
import { ADD_WASHER_TO_CARWASH, LOAD_CHAT } from '../actions/types';


class Contacts extends React.Component {
    state = {
        chats: this.props.user.chatIds
    }
    selectChat = (chat) => {
        this.props.dispatch({
            type: LOAD_CHAT,
            payload: {
                  chat: chat
            }
          });
        this.props.navigation.navigate('Chat');
    }
    render() {
      return (
        <ScrollView>
          <div style={styles.container2}>
            <div style={{alignItems: 'center'}}>
                    <div style={{fontSize: 30, marginLeft: -80, marginTop: 40}}>Contactos</div>
                    <div style={{alignItems: 'center', marginTop: 30, marginBottom: 30}}>
                      <div style={{alignItems: 'center'}}>
                            {this.props.user.chatIds.map(chat => (
                                <div key={chat.id}>
                                    <Button 
                              style={styles.cardblock}
                               onClick={()=> this.selectChat(chat)}
                              >
                                <div >
                                    <img src={{uri: chat.washerUrl}} style={{height: 60, width:60, borderRadius: 50 }} />
                                </div>
                                <div>
                                    {/* <div style={{fontSize: 25, paddingLeft: 20}}>{washer.names}</div> */}
                                    {/* <div style={{fontSize: 25, paddingLeft: 20, width: 140}}>
                                      <Stars
                                        half={true}
                                        default={2.5}
                                        update={(val)=>{this.setState({stars: val})}}
                                        spacing={4}
                                        starSize={20}
                                        count={5}/>
                                    </div> */}
                                    <div>
                                    <div style={{fontSize: 15, paddingLeft: 20, paddingTop: 20}}>{chat.washerName}</div>

                                    </div>
                                </div>
                              </Button>
                                </div>
                            ))}
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
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      cardblock: {
        flexDirection: 'row',
        width:  10 * 30 ,
        padding: 30,
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
    }
  };
  
  export default connect(mapStateToProps)(Contacts);