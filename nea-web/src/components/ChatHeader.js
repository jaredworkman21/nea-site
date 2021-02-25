import React from "react";
import { Image, View, Text } from "react-native";



class ChatHeader extends React.Component  {

    render(){
        return (
            <div style={{flexDirection:"row"}}>
                <div style={{flex:1}}>
                    <Button
                    onClick={() => this.props.navigation.navigate("Contacts")}
                    >
                        <div style={{fontSize: 17, marginLeft:  10 * 1, marginTop: 10, color: '#286AEC' }}>Mensajes</div>
                    </Button>
                </div>
                <div style={{flex:1}}>
                    <img 
                        style={{ width: 90, height: 30, marginLeft:  10 * 5 }}
                        src={require('../assets/imgs/logo_black.png')}
                    />
                </div>
            </div>
        );
    }
  }
export default ChatHeader;